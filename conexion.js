// ====================================================
// CONFIGURACIÓN DE CONEXIÓN A SUPABASE
// ====================================================

// URL base de tu proyecto en Supabase
const SUPABASE_URL = "https://divqbwusdjcsdrvznain.supabase.co";

// Clave pública / anon key
const SUPABASE_ANON_KEY = "sb_publishable_NIUPnzGvx1nZmwcn34wB_Q_vBStFpTm";

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * BOTÓN 1: Leer Todos los Datos de la tabla 'docentes'
 */
async function leerTodosLosDocentes() {
    mostrarMensaje("Cargando padrón completo del distrito...", "info");
    
    try {
        const { data, error } = await supabase
            .from('docentes')
            .select('*')
            .order('apellido', { ascending: true });

        if (error) throw error;

        renderizarTabla(data);
        mostrarMensaje(`Se cargaron ${data.length} docentes registrados.`, "success");
    } catch (err) {
        console.error("Error al leer datos:", err.message);
        mostrarMensaje("Error de conexión con Supabase. Verifique las credenciales.", "error");
    }
}

/**
 * BOTÓN 2: Consultar Datos con filtros de búsqueda
 */
async function consultarDocentes() {
    const textoBusqueda = document.getElementById('search-input').value.trim();
    const escuelaFiltro = document.getElementById('filter-escuela').value;

    mostrarMensaje("Buscando en la base de datos...", "info");

    try {
        let query = supabase.from('docentes').select('*');

        // Filtrar por Escuela si seleccionó una
        if (escuelaFiltro) {
            query = query.eq('escuela', escuelaFiltro);
        }

        // Búsqueda por DNI o por Nombre / Apellido
        if (textoBusqueda) {
            if (!isNaN(textoBusqueda)) {
                query = query.like('dni', `%${textoBusqueda}%`);
            } else {
                query = query.or(`nombre.ilike.%${textoBusqueda}%,apellido.ilike.%${textoBusqueda}%`);
            }
        }

        const { data, error } = await query.order('apellido', { ascending: true });

        if (error) throw error;

        renderizarTabla(data);
        
        if (data.length === 0) {
            mostrarMensaje("No se encontraron coincidencias.", "error");
        } else {
            mostrarMensaje(`Consulta completada: ${data.length} docente(s) encontrado(s).`, "success");
        }

    } catch (err) {
        console.error("Error al consultar:", err.message);
        mostrarMensaje("Ocurrió un error al ejecutar la consulta.", "error");
    }
}

/**
 * Dibuja las filas dinámicamente en la tabla HTML
 */
function renderizarTabla(docentes) {
    const tbody = document.getElementById('docentes-table-body');
    const countBadge = document.getElementById('record-count');
    tbody.innerHTML = '';

    countBadge.textContent = `${docentes ? docentes.length : 0} registros`;

    if (!docentes || docentes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">No hay registros para mostrar.</td></tr>`;
        return;
    }

    docentes.forEach(docente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${docente.dni || '-'}</strong></td>
            <td>${docente.apellido || ''}, ${docente.nombre || ''}</td>
            <td>${docente.escuela || 'N/A'}</td>
            <td>${docente.cargo || 'N/A'}</td>
            <td>${docente.turno || 'N/A'}</td>
            <td>${docente.email ? `<a href="mailto:${docente.email}">${docente.email}</a>` : 'Sin correo'}</td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Muestra alertas informativas en pantalla
 */
function mostrarMensaje(texto, tipo) {
    const box = document.getElementById('status-message');
    box.className = `message-box ${tipo}`;
    box.textContent = texto;
    box.classList.remove('hidden');

    setTimeout(() => {
        box.classList.add('hidden');
    }, 4000);
}

// Asignar los eventos a los botones una vez cargado el DOM
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-consultar').addEventListener('click', consultarDocentes);
    document.getElementById('btn-leer-todos').addEventListener('click', leerTodosLosDocentes);
});