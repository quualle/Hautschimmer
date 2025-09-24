// Prefer dedicated booking env vars; fall back to marketing ones if not provided
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_MARKETING_SUPABASE_URL ||
  '';

export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  (process.env as any).MARKETING_SUPABASE_SERVICE_ROLE_KEY ||
  '';

export const HAS_SUPABASE = Boolean(SUPABASE_SERVICE_ROLE_KEY && SUPABASE_URL);
