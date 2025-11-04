import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
console.log('Supabase Key:', supabaseAnonKey ? '✓ Set (length: ' + supabaseAnonKey.length + ')' : '✗ Missing');

// Create client or null if not configured
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null;

export const isSupabaseConfigured = () => {
  const configured = supabase !== null;
  if (!configured) {
    console.warn('⚠️ Supabase not configured');
  } else {
    console.log('✅ Supabase client created');
  }
  return configured;
};

// Test connection
if (supabase) {
  supabase.from('orders').select('count', { count: 'exact', head: true })
    .then(({ count, error }) => {
      if (error) {
        console.error('❌ Supabase connection test failed:', error.message);
      } else {
        console.log('✅ Supabase connected - Orders count:', count);
      }
    });
}
