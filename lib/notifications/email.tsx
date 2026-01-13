import { Booking } from '../storage/fileStore';
import { LOCATIONS } from '../../src/data/locations';

export function renderBookingEmailHTML(booking: Booking) {
  const fullName = `${booking.firstName} ${booking.lastName}`.trim();
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const localeDate = date.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  const time = `${booking.startTime}–${booking.endTime} Uhr`;

  // Location-spezifische Daten
  const loc = LOCATIONS[booking.location] || LOCATIONS.neumarkt;
  const isKW = booking.location === 'kw';

  const brandName = isKW ? 'Hautschimmer' : 'MedEstetique by Saskia Heer';
  const locationText = isKW
    ? `<strong>Königs Wusterhausen</strong><br/><span style="font-size: 13px; color: #64748B;">im Kosmetikstudio Glam & Glow Beauty</span>`
    : `<strong>Neumarkt i.d.Opf</strong>`;
  const mapsUrl = loc.mapsUrl;
  const footerLocation = isKW ? 'Hautschimmer · Königs Wusterhausen' : 'MedEstetique · Neumarkt i.d.Opf';

  return `<!DOCTYPE html>
  <html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Terminbestätigung – ${brandName}</title>
    <style>
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; background: #F7FAFC; color: #1A202C; }
      .container { max-width: 640px; margin: 0 auto; padding: 24px; }
      .card { background: white linear-gradient(135deg, rgba(113,128,150,0.06), rgba(203,213,224,0.08)); border: 1px solid #E2E8F0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
      .header { padding: 28px 28px 16px; background: linear-gradient(135deg,#EDF2F7, #E2E8F0); border-bottom: 1px solid #E2E8F0; }
      .brand { font-family: Georgia, 'Times New Roman', serif; letter-spacing: 0.02em; color: #2D3748; font-size: 20px; }
      .title { margin-top: 8px; font-size: 28px; line-height: 1.2; color: #2D3748; }
      .content { padding: 24px 28px 28px; }
      .pill { display: inline-block; padding: 6px 10px; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 999px; font-size: 12px; color: #475569; letter-spacing: .02em; }
      .row { display: flex; gap: 12px; margin: 16px 0; }
      .cell { flex: 1; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 12px 14px; }
      .label { font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 6px; }
      .value { font-size: 16px; color: #1F2937; }
      .cta { display: inline-block; padding: 12px 18px; background: linear-gradient(135deg, #718096, #4A5568); color: #fff; text-decoration: none; border-radius: 12px; box-shadow: 0 8px 20px rgba(74,85,104,0.25); }
      .note { font-size: 13px; color: #475569; line-height: 1.6; }
      .footer { padding: 16px 24px; font-size: 12px; color: #64748B; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <div class="brand">${brandName}</div>
          <div class="title">Ihre Terminbestätigung</div>
        </div>
        <div class="content">
          <p>Liebe/r ${fullName},</p>
          <p>vielen Dank für Ihre Buchung. Wir freuen uns, Sie bei uns in ${locationText} begrüßen zu dürfen.</p>

          <div class="row">
            <div class="cell">
              <div class="label">Behandlung</div>
              <div class="value">${booking.treatmentName}</div>
            </div>
            <div class="cell">
              <div class="label">Preis</div>
              <div class="value">€ ${booking.priceEUR.toFixed(0)}</div>
            </div>
          </div>

          <div class="row">
            <div class="cell">
              <div class="label">Datum</div>
              <div class="value">${localeDate}</div>
            </div>
            <div class="cell">
              <div class="label">Uhrzeit</div>
              <div class="value">${time}</div>
            </div>
          </div>

          <p class="note">Bitte kommen Sie 5 Minuten vor Ihrem Termin und bringen Sie ggf. relevante Unterlagen mit. Falls Sie verhindert sind, geben Sie uns bitte frühzeitig Bescheid.</p>

          <p style="margin-top: 18px;">
            <a class="cta" href="${mapsUrl}" target="_blank" rel="noopener">Route planen</a>
          </p>

          <p class="note" style="margin-top: 20px;">
            Sie erhalten ${booking.smsOptIn ? 'eine Bestätigungs-SMS sowie' : ''} automatisch eine Erinnerungsnachricht einen Tag vor Ihrem Termin.
          </p>
        </div>
        <div class="footer">
          ${footerLocation} · Diese E‑Mail wurde automatisch generiert
        </div>
      </div>
    </div>
  </body>
  </html>`;
}
