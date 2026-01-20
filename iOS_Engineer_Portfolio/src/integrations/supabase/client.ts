import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zyrlhyvumguklvyoocmh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cmxoeXZ1bWd1a2x2eW9vY21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzOTc4ODgsImV4cCI6MjA4Mzk3Mzg4OH0.Q6o99k5ik1WDmaEQWid_SHIiVx9sqnugwCZtIVxFEwU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// For React:
// import { supabase } from "@/integrations/supabase/client";
// For React Native:
// import { supabase } from "@/src/integrations/supabase/client";
