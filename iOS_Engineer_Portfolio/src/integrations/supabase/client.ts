import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ieovueabqdwloehwlasj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllb3Z1ZWFicWR3bG9laHdsYXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NzY2MjQsImV4cCI6MjA5OTM1MjYyNH0.XwE0KUyJrnk5WrFUmM8zzCQemE-JCTk_jy0Ez22me1U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// For React:
// import { supabase } from "@/integrations/supabase/client";
// For React Native:
// import { supabase } from "@/src/integrations/supabase/client";
