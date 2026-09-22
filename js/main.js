/**
 * ============================================================================
 * ZERUELL GAMES - SEMANA 6 + Refactorización de API Sugerida
 * ============================================================================
 * Este archivo concentra toda la manipulación del DOM, eventos de usuario 
 * y consumo de datos externos mediante Fetch API.
 */

// Esperar a que todo el HTML se cargue antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAR FUNCIONES PRINCIPALES
    configurarEventosTarjetas();
    configurarEventoFormulario();
    cargarHardwareDesdeAPI();

});

/**
 * ============================================================================
 * PASO 1 Y 2: MANIPULACIÓN DEL DOM Y EVENTOS (CLICK, MOUSEOVER)
 * ============================================================================
 */
function configurarEventosTarjetas() { // Función para configurar eventos en las tarjetas de juego y botones de compra
    const gameCards = document.querySelectorAll('.game-card');
    const buyButtons = document.querySelectorAll('.custom-btn');

    // EVENTO MOUSEOVER: Agrega un efecto de sombra al pasar el mouse sobre la tarjeta
    gameCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.boxShadow = '0 0 20px #00ffcc'; 
        });

        card.addEventListener('mouseout', () => {
            card.style.boxShadow = 'none';
        });
    });

    // EVENTO CLICK: Cambia el texto del botón y su estilo temporalmente al hacer clic
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
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

/**
 * ============================================================================
 * PASO 2 Y 1: EVENTO SUBMIT Y MANIPULACIÓN DINÁMICA DEL DOM
 * ============================================================================
 */
function configurarEventoFormulario() { // Función para manejar el evento de envío del formulario de suscripción
    const form = document.getElementById('suscripcion-form');
    const emailInput = document.getElementById('email-input');
    const mensajeForm = document.getElementById('form-mensaje');

    if (form) {
        form.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            
            const email = emailInput.value;
            mensajeForm.textContent = `¡Felicidades! Se ha enviado un código de descuento a ${email}`;
            emailInput.value = '';

            setTimeout(() => {
                mensajeForm.textContent = '';
            }, 8000); 
        });
    }
}

/**
 * ============================================================================
 * HELPER FUNCTION: CONSTRUCTOR DE TARJETAS (Refactorización de Seguridad)
 * ============================================================================
 * Construye elementos del DOM paso a paso sin usar innerHTML para evitar
 * vulnerabilidades de inyección, siguiendo el feedback del docente.
 */
function crearTarjetaHardware(producto) { // Función para crear dinámicamente una tarjeta de hardware usando elementos del DOM
    // 1. Contenedor de la columna
    const columna = document.createElement('div');
    columna.className = 'col-12 col-md-6 col-lg-3';

    // 2. Elemento Article (La tarjeta base)
    const article = document.createElement('article');
    article.className = 'card h-100 bg-black text-light border-info p-3 custom-card';
    article.style.borderWidth = '2px';

    // 3. Imagen del producto
    const img = document.createElement('img');
    img.className = 'card-img-top bg-white rounded-4';
    img.style.height = '200px';
    img.style.objectFit = 'contain';
    img.style.padding = '1rem';
    // Uso seguro de propiedades
    img.src = producto.image;
    img.alt = `Fotografía de hardware: ${producto.title}`;

    // 4. Cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column text-center';

    // 5. Título (Usando textContent por seguridad)
    const title = document.createElement('h3');
    title.className = 'card-title fs-6 mt-auto text-light';
    title.textContent = producto.title.substring(0, 30) + '...';

    // 6. Precio
    const price = document.createElement('p');
    price.className = 'price my-3 text-info fw-bold';
    price.textContent = `$${producto.price}`;

    // 7. Botón
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-info rounded-pill w-100 mt-auto';
    btn.textContent = 'Ver detalle';

    // 8. Ensamblaje del DOM (de adentro hacia afuera)
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(btn);

    article.appendChild(img);
    article.appendChild(cardBody);
    columna.appendChild(article);

    return columna;
}

/**
 * ============================================================================
 * PASO 3: FETCH API Y PROMESAS (Refactorizado según retroalimentación Formativa 4)
 * Reemplazo de innerHTML por textContent (para evitar vulnerabilidades de inyección)
 * ============================================================================
 */
function cargarHardwareDesdeAPI() { // Función para cargar hardware desde la API y manejar errores de forma segura
    const apiContainer = document.getElementById('api-hardware');
    
    // Mostramos estado de carga usando textContent de forma segura
    apiContainer.textContent = 'Cargando Hardware oficial...';
    apiContainer.className = 'row g-4 text-center text-info fw-bold';

    fetch('https://fakestoreapi.com/products/category/electronics?limit=4')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error al conectar con el servidor');
            }
            return respuesta.json();
        })
        .then(datos => {
            // Limpieza segura del mensaje de carga
            apiContainer.textContent = '';
            // Restauramos la clase original del grid
            apiContainer.className = 'row g-4';

            // Usamos nuestra función Helper para cada producto
            datos.forEach(producto => {
                const tarjeta = crearTarjetaHardware(producto);
                apiContainer.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la Fetch API:', error);
            // Mensaje de error visible y seguro
            apiContainer.textContent = 'No se pudo cargar el hardware en este momento. Inténtalo más tarde.';
            apiContainer.className = 'row g-4 text-center text-danger fw-bold';
        });
}