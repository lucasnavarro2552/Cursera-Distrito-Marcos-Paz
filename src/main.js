import { supabase } from './supabase.js';

const logoutBtn = document.getElementById('logout-btn');
const teachersList = document.getElementById('teachers-list');
const loadingText = document.getElementById('loading-text');

// 1. Manejo del botón de Cerrar Sesión
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = './login.html';
  });
}

// 2. Función para obtener y listar los datos
async function fetchTeachers() {
  try {
    // CAMBIA 'docentes' SI TU TABLA TIENE OTRO NOMBRE EN SUPABASE
    const { data, error } = await supabase.from('docentes').select('*');

    if (error) {
      console.error('Error de lectura en Supabase:', error);
      if (loadingText) loadingText.textContent = 'Error al cargar los datos. Revisa los permisos RLS en Supabase.';
      return;
    }

    if (!data || data.length === 0) {
      if (loadingText) loadingText.textContent = 'No hay registros cargados en la base de datos.';
      return;
    }

    // Oculta el mensaje de carga
    if (loadingText) loadingText.style.display = 'none';

    // Limpia y renderiza la lista
    if (teachersList) {
      teachersList.innerHTML = '';
      data.forEach((item) => {
        const li = document.createElement('li');
        // Ajusta 'nombre' y 'especialidad' según los nombres de tus columnas
        li.textContent = `${item.nombre || 'Sin nombre'} - ${item.especialidad || item.titulo || 'Profesional'}`;
        teachersList.appendChild(li);
      });
    }
  } catch (err) {
    console.error('Error inesperado:', err);
    if (loadingText) loadingText.textContent = 'Error inesperado al conectar con el servidor.';
  }
}

// Ejecuta la consulta al cargar
fetchTeachers();
