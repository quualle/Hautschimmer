import { writeOutboxSms } from '../storage/fileStore';

const SEVEN_API_KEY = process.env.SEVEN_IO_API_KEY || process.env.SEVEN_API_KEY || '';
const SMS_SENDER_ID = process.env.SMS_SENDER_ID || 'MedEstetique';

function normalizePhoneE164(phone: string): string {
  if (!phone) return phone;
  let p = phone.replace(/[^+0-9]/g, '');
  if (p.startsWith('00')) p = '+' + p.slice(2);
  if (p.startsWith('+')) return p;
  // Assume German numbers if leading 0
  if (p.startsWith('0')) return '+49' + p.slice(1);
  // Fallback: try to prepend +
  if (!p.startsWith('+')) return '+' + p;
  return p;
}

export async function sendSmsOrOutbox(bookingId: string, kind: 'confirm' | 'reminder', to: string, text: string) {
  // Always write to outbox for traceability
  try { writeOutboxSms(bookingId, kind, text); } catch {}

  if (!SEVEN_API_KEY) {
    return { ok: false, reason: 'SEVEN_IO_API_KEY not set – wrote to outbox' };
  }

  const normalized = normalizePhoneE164(to);
  try {
    const res = await fetch('https://gateway.seven.io/api/sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': SEVEN_API_KEY,
      },
      body: JSON.stringify({
        to: normalized,
        text,
        from: SMS_SENDER_ID,
        json: true,
        foreign_id: `${bookingId}-${kind}`,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, reason: `seven.io error ${res.status}: ${body}` };
    }
    const data = await res.json();
    return { ok: true, data };
  } catch (e: any) {
    return { ok: false, reason: e?.message || 'fetch failed' };
  }
}

