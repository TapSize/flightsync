import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://wyhiabygrhyneskpocng.supabase.co'
const supabaseKey = 'sb_publishable_7ccJRG3-q6ikQAY8HmcBJg_JPVHVy8_'

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)