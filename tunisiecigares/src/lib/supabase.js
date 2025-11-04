// Supabase disabled for now - all orders via Messenger
// To enable: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env

export const supabase = null;

export const isSupabaseConfigured = () => false;

console.log('ℹ️ Orders via Messenger (Supabase disabled)');
