// src/auth.js
import { supabase } from './supabase.js';

export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}

export async function logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = 'login.html';
    }
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
}