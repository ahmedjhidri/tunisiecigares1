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
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'apikey': supabaseAnonKey
        }
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

// Test connection (async, non-blocking)
if (supabase) {
  // Run connection test asynchronously to avoid blocking app initialization
  // Note: This SELECT will fail if RLS blocks SELECT for anon (which is expected/secure)
  // We're just testing if the client can connect, not if SELECT works
  setTimeout(() => {
    // Check if we can at least reach Supabase (this doesn't require RLS)
    supabase.from('orders').select('count', { count: 'exact', head: true })
      .then(({ count, error }) => {
        if (error) {
          // SELECT errors are expected if RLS blocks SELECT (which is secure)
          if (error.code === '42501' || error.message?.includes('row-level security')) {
            console.log('✅ Supabase connected (RLS blocking SELECT is expected/secure)');
          } else {
            console.error('❌ Supabase connection test failed:', error.message);
          }
        } else {
          console.log('✅ Supabase connected - Orders count:', count);
        }
      })
      .catch(err => {
        console.error('❌ Supabase connection test error:', err);
      });
  }, 100);
}
