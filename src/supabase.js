import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../conexion.js';

// Usamos el objeto global de la librería cargada por CDN (window.supabase)
export const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Si en tus otros archivos importas 'supabase', puedes exportarlo como alias:
export { supabaseClient as supabase };
