import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'

export const sb = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)
