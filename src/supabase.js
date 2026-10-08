

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../conexion.js';

// Genera el cliente usando la ventana global
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
