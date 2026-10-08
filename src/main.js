import { supabase } from './supabase.js';

const logoutBtn = document.getElementById('logout-btn');
const teachersList = document.getElementById('teachers-list');
const loadingText = document.getElementById('loading-text');

// 1. Manejo del botón Cerrar Sesión usando directamente el cliente de Supabase
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = './login.html';
  });
}

// 2. Traer y mostrar los datos de la base de datos
async function fetchTeachers() {
  try {
    // CAMBIA 'docentes' POR EL NOMBRE EXACTO DE TU TABLA EN SUPABASE SI ES DISTINTO
    const { data, error } = await supabase.from('docentes').select('*');

    if (error) {
      console.error('Error de Supabase:', error);
      if (loadingText) loadingText.textContent = 'Error de permisos o tabla inexistente en Supabase.';
      return;
    }

    if (!data || data.length === 0) {
      if (loadingText) loadingText.textContent = 'No hay registros cargados en la base de datos.';
      return;
    }

    if (loadingText) loadingText.style.display = 'none';

    if (teachersList) {
      teachersList.innerHTML = '';
      data.forEach((item) => {
        const li = document.createElement('li');
        // Cambia 'nombre' o 'especialidad' si tus columnas se llaman diferente
        li.textContent = `${item.nombre || 'Sin nombre'} - ${item.especialidad || item.titulo || 'Profesional'}`;
        teachersList.appendChild(li);
      });
    }
  } catch (err) {
    console.error('Error inesperado:', err);
    if (loadingText) loadingText.textContent = 'Error al procesar la lista.';
  }
}

fetchTeachers();
