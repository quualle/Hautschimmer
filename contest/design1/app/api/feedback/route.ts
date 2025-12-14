import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase/marketing';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rating, treatment_type, improvement_suggestion, contact_permission, contact_email } = body;

    // Validate rating (1-3 for internal feedback)
    if (!rating || rating < 1 || rating > 3) {
      return NextResponse.json(
        { error: 'Invalid rating' },
        { status: 400 }
      );
    }

    // Hash IP for spam prevention (privacy-friendly)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const ipHash = crypto.createHash('sha256').update(ip + process.env.MARKETING_SUPABASE_SERVICE_ROLE_KEY).digest('hex').substring(0, 16);

    // Rate limiting: Check if same IP submitted recently (last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentFeedback } = await supabase
      .from('feedback')
      .select('id')
      .eq('ip_hash', ipHash)
      .gte('created_at', oneHourAgo)
      .limit(1);

    if (recentFeedback && recentFeedback.length > 0) {
      return NextResponse.json(
        { error: 'Sie haben kürzlich bereits Feedback gegeben. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      );
    }

    // Insert feedback
    const { error } = await supabase
      .from('feedback')
      .insert({
        rating,
        treatment_type: treatment_type || null,
        improvement_suggestion: improvement_suggestion || null,
        contact_permission: contact_permission || false,
        contact_email: contact_permission ? contact_email : null,
        ip_hash: ipHash,
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
