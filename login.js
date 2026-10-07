// login.js
import { loginUser, getSession } from './src/auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Si el usuario ya está logueado, lo enviamos directo al inicio
    const { data: { session } } = await getSession();
    if (session) {
        window.location.href = 'index.html';
    }

    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página recargue
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await loginUser(email, password);

        if (error) {
            errorMsg.textContent = "Error: Verifica tus credenciales.";
        } else {
            window.location.href = 'index.html'; // Redirige al panel
        }
    });
});