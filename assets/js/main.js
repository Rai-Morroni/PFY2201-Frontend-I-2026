/**
 * ============================================================================
 * ZERUELL GAMES - SEMANA 6 (Optimización, Fetch API y Carrito)
 * ============================================================================
 */

// ============================================================================
// 1. REFERENCIAS DEL DOM CACHEADO (Mejora de rendimiento: evitar consultas repetitivas)
// ============================================================================
const catalogoDinamico = document.getElementById('catalogo-dinamico');
const formBusqueda = document.getElementById('form-busqueda');
const inputBusqueda = document.getElementById('input-busqueda');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarritoEl = document.getElementById('total-carrito');
const btnAgregarClasicos = document.querySelectorAll('.btn-agregar-carrito');
const toastMensaje = document.getElementById('toast-mensaje');
const errorToast = document.getElementById('errorToast');

// Variables de estado
let productosCargados = []; // Almacenará los datos del JSON para poder filtrarlos
let carrito = [];           // Almacenará los productos seleccionados por el usuario

// ============================================================================
// 2. INICIALIZACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté completamente cargado
    cargarProductosJSON();
    configurarBuscador();
    configurarCarritoClasico();
});

// ============================================================================
// 3. FETCH API Y MANEJO DE ERRORES (async/await y try/catch)
// ============================================================================
async function cargarProductosJSON() { // Función asíncrona para cargar productos desde un archivo JSON local
    try {
        // Mostrar estado de carga seguro
        catalogoDinamico.textContent = 'Cargando productos destacados...';
        catalogoDinamico.className = 'row g-4 text-center text-info fw-bold';

        // Petición asíncrona al JSON local
        const respuesta = await fetch('assets/productos.json');
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        // Guardar datos en la variable global
        productosCargados = await respuesta.json();
        
        // Renderizar en pantalla
        renderizarProductos(productosCargados);

    } catch (error) { // Manejo de errores: muestra un mensaje en consola y en el Toast
        console.error("Fallo al cargar el catálogo dinámico:", error);
        catalogoDinamico.textContent = ''; // Limpiar el área
        
        // Disparar el Toast de Bootstrap con el mensaje de error
        mostrarError("No se pudieron cargar los productos destacados. Verifica tu conexión o consulta al administrador del sitio.");
    }
}

// Función Helper para disparar el Toast visual
function mostrarError(mensaje) {
    toastMensaje.textContent = mensaje;
    const toast = new bootstrap.Toast(errorToast);
    toast.show();
}

// ============================================================================
// 4. RENDERIZADO MODULAR EN EL DOM (innerHTML retirado por seguridad y rendimiento, uso de createElement)
// ============================================================================
function renderizarProductos(productos) { // Función para renderizar productos en el DOM de manera segura y modular
    catalogoDinamico.textContent = ''; // Limpieza segura del contenedor

    // Estado vacío si la búsqueda no arroja resultados
    if (productos.length === 0) {
        catalogoDinamico.textContent = 'No se encontraron productos coincidentes.';
        catalogoDinamico.className = 'row g-4 text-center text-warning fw-bold';
        return;
    }

    catalogoDinamico.className = 'row g-4'; // Restaurar clases del grid

    // Construcción de tarjetas usando createElement y textContent para evitar inyección de HTML
    productos.forEach(producto => {
        const columna = document.createElement('div');
        columna.className = 'col-12 col-md-6 col-lg-3';

        const article = document.createElement('article');
        article.className = 'card h-100 bg-black text-light border-info p-3 custom-card';
        article.style.borderWidth = '2px';

        const img = document.createElement('img'); // Elemento de imagen para la carátula del producto
        // Le asignamos la misma clase que usan tus tarjetas estáticas
        img.className = 'card-img-top game-img'; 
        img.src = producto.image;
        img.alt = `Carátula de ${producto.title}`;

        const cardBody = document.createElement('div'); // Contenedor del cuerpo de la tarjeta
        cardBody.className = 'card-body d-flex flex-column text-center';

        const title = document.createElement('h3'); // Título del producto
        title.className = 'card-title fs-6 mt-auto text-light';
        title.textContent = producto.title;

        const price = document.createElement('p'); // Precio del producto
        price.className = 'price my-3 text-info fw-bold';
        price.textContent = `$${producto.price.toLocaleString('es-CL')}`;

        const btn = document.createElement('button'); // Botón de agregar al carrito
        btn.className = 'btn btn-outline-info rounded-pill w-100 mt-auto';
        btn.textContent = 'Añadir al carrito';
        
        // Evento Click: Agregar producto dinámico al carrito
        btn.addEventListener('click', () => {
            agregarAlCarrito(producto.title, producto.price);
            
            // Feedback visual en el botón
            btn.textContent = '¡Añadido!';
            btn.classList.replace('btn-outline-info', 'btn-success');
            setTimeout(() => {
                btn.textContent = 'Añadir al carrito';
                btn.classList.replace('btn-success', 'btn-outline-info');
            }, 2000);
        });

        // Ensamblar DOM
        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(btn);
        article.appendChild(img);
        article.appendChild(cardBody);
        columna.appendChild(article);
        
        catalogoDinamico.appendChild(columna);
    });
}

// ============================================================================
// 5. EVENTO SUBMIT: FILTRO DE BÚSQUEDA
// ============================================================================
function configurarBuscador() { // Función para configurar el buscador de productos
    formBusqueda.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evitar que la página recargue
        
        const terminoBusqueda = inputBusqueda.value.toLowerCase().trim();

        // Filtrar el array de productos guardado en memoria
        const productosFiltrados = productosCargados.filter(producto =>
            producto.title.toLowerCase().includes(terminoBusqueda)
        );

        renderizarProductos(productosFiltrados); // Renderizar resultados filtrados
    });

    // Evento Input: Restaurar catálogo si el usuario borra o reinicia la búsqueda
    inputBusqueda.addEventListener('input', () => {
        if (inputBusqueda.value.trim() === '') {
            renderizarProductos(productosCargados);
        }
    });
}

// ============================================================================
// 6. GESTIÓN DEL CARRITO DE COMPRAS (DOM Dinámico)
// ============================================================================

// A. Configurar botones del "Catálogo Clásico" (HTML estático)
function configurarCarritoClasico() { // Función para configurar los botones de agregar al carrito en el catálogo clásico
    btnAgregarClasicos.forEach(boton => {
        boton.addEventListener('click', function() {
            // Leer atributos dataset definidos en el HTML
            const nombre = this.getAttribute('data-nombre');
            const precio = parseInt(this.getAttribute('data-precio'));

            agregarAlCarrito(nombre, precio);

            // Feedback visual del botón
            const textoOriginal = this.textContent;
            this.textContent = '¡Añadido!';
            this.classList.replace('btn-info', 'btn-success');
            this.classList.add('bg-success', 'text-white');

            setTimeout(() => {
                this.textContent = textoOriginal;
                this.classList.replace('btn-success', 'btn-info');
                this.classList.remove('bg-success', 'text-white');
            }, 2000);
        });
    });
}

// B. Lógica central del carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarInterfazCarrito();
}

// C. Actualizar el panel de resumen en el DOM
function actualizarInterfazCarrito() {
    listaCarrito.textContent = ''; // Limpiar lista
    let total = 0;

    if (carrito.length === 0) {
        // Estado vacío
        const liVacio = document.createElement('li');
        liVacio.className = 'list-group-item bg-dark text-light border-secondary text-center';
        liVacio.textContent = 'Tu carrito está vacío. ¡Agrega algunos juegos!';
        listaCarrito.appendChild(liVacio);
        totalCarritoEl.textContent = '$0';
        return;
    }

    // Renderizar cada item del carrito
    carrito.forEach(item => {
        total += item.precio;

        const li = document.createElement('li');
        li.className = 'list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center';
        li.textContent = item.nombre;

        const spanPrecio = document.createElement('span');
        spanPrecio.className = 'badge bg-info text-dark rounded-pill';
        spanPrecio.textContent = `$${item.precio.toLocaleString('es-CL')}`;

        li.appendChild(spanPrecio);
        listaCarrito.appendChild(li);
    });

    // Actualizar el monto total
    totalCarritoEl.textContent = `$${total.toLocaleString('es-CL')}`;
}