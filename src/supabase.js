import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../conexion.js';
export const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
