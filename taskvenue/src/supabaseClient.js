import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


console.log("📦 Supabase URL:", supabaseUrl);
console.log("📦 Supabase Key:", supabaseKey);


export default supabase