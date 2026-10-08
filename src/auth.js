import { supabase } from './supabase.js';

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    // Evita que la página se recargue automáticamente
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (errorMessage) errorMessage.textContent = 'Ingresando...';

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Error de Supabase:', error.message);
        if (errorMessage) errorMessage.textContent = 'Error: Verifica tus credenciales.';
      } else {
        console.log('Inicio de sesión exitoso:', data);
        // Redirige a la página principal del directorio
        window.location.href = './index.html';
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      if (errorMessage) errorMessage.textContent = 'Ocurrió un error inesperado.';
    }
  });
}
