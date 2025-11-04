// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kbmtbewkebgphbeeeewh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtibXRiZXdrZWJncGhiZWVlZXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMTQ3MTMsImV4cCI6MjA3Nzc5MDcxM30.QSI6PW9MVfigpXqWzQCczE4Iqi8g_WQyD3c_CkTylQY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
