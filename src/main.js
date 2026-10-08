// src/main.js
import { getSession, logoutUser } from './auth.js';
import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. PROTECCIÓN DE RUTA
    const { data: { session } } = await getSession();

    if (!session) {
        // Si no hay sesión iniciada, redirigir al login
        window.location.href = 'login.html';
        return;
    }

    // 2. LÓGICA PRINCIPAL - Mostrar usuario y configurar botón de salir
    document.getElementById('user-email').textContent = session.user.email;
    document.getElementById('logout-btn').addEventListener('click', logoutUser);

    // 3. CARGAR DATOS
    cargarProfesionales();
});

async function cargarProfesionales() {
    // Asumiendo que crearás una tabla llamada 'profesionales' en Supabase
    const { data, error } = await supabase
        .from('profesionales')
        .select('*');

    if (error) {
        console.error('Error al cargar datos:', error);
        return;
    }

    const lista = document.getElementById('profesionales-list');
    lista.innerHTML = ''; // Limpiar el "Cargando..."
    
    data.forEach(prof => {
        const li = document.createElement('li');
        // Suponiendo que tus columnas se llaman 'nombre', 'apellido' y 'especialidad'
        li.textContent = `${prof.nombre} ${prof.apellido} - Especialidad: ${prof.especialidad}`;
        lista.appendChild(li);
    });
}