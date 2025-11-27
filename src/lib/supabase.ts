import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lbyglcuuchvzxpfqgqny.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxieWdsY3V1Y2h2enhwZnFncW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODI1MTIsImV4cCI6MjA3OTc1ODUxMn0.9J-OjUxE3If_kOC7_u5utmTp99gBzLw-V-YpfawVC3I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
