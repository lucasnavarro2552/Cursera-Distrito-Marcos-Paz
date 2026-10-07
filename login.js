// ====================================================
// AUTENTICACIÓN Y SEGURIDAD (Supabase Auth)
// ====================================================

const modalLogin = document.getElementById('modal-login');
const btnLoginModal = document.getElementById('btn-login-modal');
const btnLogout = document.getElementById('btn-logout');
const btnCloseModal = document.getElementById('close-modal');
const formLogin = document.getElementById('form-login');
const userInfoSpan = document.getElementById('user-info');

// Mostrar u ocultar el modal de Login
btnLoginModal.addEventListener('click', () => modalLogin.classList.remove('hidden'));
btnCloseModal.addEventListener('click', () => modalLogin.classList.add('hidden'));

// Procesar el formulario de Inicio de Sesión
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        alert(`Acceso concedido. Sesión iniciada como: ${data.user.email}`);
        modalLogin.classList.add('hidden');
        formLogin.reset();
        actualizarEstadoAuth(data.user);

    } catch (err) {
        alert("Error de inicio de sesión: " + err.message);
    }
});

// Cerrar sesión
btnLogout.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert("Error al salir: " + error.message);
    } else {
        alert("Has cerrado sesión.");
        actualizarEstadoAuth(null);
    }
});

// Comprobar la sesión activa al recargar la página
async function verificarSesion() {
    const { data: { session } } = await supabase.auth.getSession();
    actualizarEstadoAuth(session ? session.user : null);

    // Escuchar eventos de autenticación en vivo
    supabase.auth.onAuthStateChange((_event, session) => {
        actualizarEstadoAuth(session ? session.user : null);
    });
}

// Cambiar la visualización según si está logueado o no
function actualizarEstadoAuth(usuario) {
    if (usuario) {
        userInfoSpan.innerHTML = `<i class="fa-solid fa-user-check"></i> Usuario: <strong>${usuario.email}</strong>`;
        btnLoginModal.classList.add('hidden');
        btnLogout.classList.remove('hidden');
    } else {
        userInfoSpan.innerHTML = `<i class="fa-solid fa-lock"></i> Modo Consulta (Público)`;
        btnLoginModal.classList.remove('hidden');
        btnLogout.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', verificarSesion);