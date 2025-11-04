import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client or null if not configured
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => {
  const configured = supabase !== null;
  if (!configured) {
    console.warn('⚠️ Supabase not configured');
  } else {
    console.log('✅ Supabase ready');
  }
  return configured;
};
