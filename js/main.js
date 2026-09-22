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
 * PASO 3 y 4: FETCH API AVANZADO Y PROMESAS (Refactorizado según retroalimentación Formativa 4)
 * Reemplazo de innerHTML por textContent (para evitar vulnerabilidades de inyección).
 * Implementa resiliencia ante fallos de red y optimiza la carga usando localStorage temporal.
 * ============================================================================
 */
async function cargarHardwareDesdeAPI(reintentosMaximos = 3) { // Función para cargar hardware desde la API y manejar errores de forma segura
    const apiContainer = document.getElementById('api-hardware');
    const CACHE_KEY = 'hardware_data_zeruell';
    const CACHE_TIME_KEY = 'hardware_time_zeruell';
    const TIEMPO_EXPIRACION = 1000 * 60 * 60; // 1 hora en milisegundos
    
    // 1. ESTRATEGIA DE CACHÉ: Revisar si ya tenemos los datos guardados
    const datosGuardados = localStorage.getItem(CACHE_KEY); // Recupera los datos guardados en localStorage
    const tiempoGuardado = localStorage.getItem(CACHE_TIME_KEY); // Recupera el tiempo en que se guardaron los datos
    const tiempoActual = new Date().getTime(); // Obtiene el tiempo actual en milisegundos

    if (datosGuardados && tiempoGuardado && (tiempoActual - tiempoGuardado < TIEMPO_EXPIRACION)) { // Si los datos están en caché y no han expirado
        console.log("Cargando hardware desde la caché local.");
        renderizarHardware(JSON.parse(datosGuardados), apiContainer);
        return; // Sale de la función sin hacer la petición web nuevamente
    }

    // 2. ESTRATEGIA DE REINTENTOS: Fetch con manejo avanzado de errores
    for (let intento = 1; intento <= reintentosMaximos; intento++) {
        try {
            apiContainer.textContent = `Conectando con el servidor (Intento ${intento}/${reintentosMaximos})...`; // Mensaje de estado mientras se intenta la conexión
            apiContainer.className = 'row g-4 text-center text-info fw-bold'; // Clase de estilo para el mensaje de estado

            // Petición a la API
            const respuesta = await fetch('https://fakestoreapi.com/products/category/electronics?limit=4');
            
            if (!respuesta.ok) throw new Error(`Fallo en el servidor: ${respuesta.status}`); // Lanza un error si la respuesta no es exitosa
            
            const datos = await respuesta.json(); // Convierte la respuesta en JSON

            // Guardamos los datos nuevos en la caché del navegador
            localStorage.setItem(CACHE_KEY, JSON.stringify(datos)); // Guardamos los datos en localStorage como string
            localStorage.setItem(CACHE_TIME_KEY, tiempoActual.toString()); // Guardamos el tiempo actual en localStorage para controlar la expiración

            // Renderizamos los productos
            console.log("Datos obtenidos de la API y guardados en caché.");
            renderizarHardware(datos, apiContainer); // Renderiza los productos en el contenedor del DOM
            
            return; // Éxito, sale del ciclo de reintentos

        } catch (error) { // Captura cualquier error de red o de la API
            console.warn(`Intento ${intento} fallido:`, error.message); // Muestra un mensaje de advertencia en la consola
            
            if (intento === reintentosMaximos) { // Si es el último intento, mostramos el estado vacío/error al usuario
                apiContainer.textContent = 'Servicio no disponible momentáneamente. Por favor, revisa tu conexión o intenta más tarde.';
                apiContainer.className = 'row g-4 text-center text-danger fw-bold';
            } else {
                // Pausa artificial de 1.5 segundos antes del siguiente intento
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }
    }
}

/**
 * Helper extra para renderizar el contenedor completo sin repetir código
 */
function renderizarHardware(datos, contenedor) { // Función para renderizar los productos de hardware en el contenedor del DOM
    contenedor.textContent = ''; // Limpieza segura
    contenedor.className = 'row g-4'; // Restaura el grid

    datos.forEach(producto => { // Itera sobre cada producto y crea su tarjeta correspondiente
        const tarjeta = crearTarjetaHardware(producto);
        contenedor.appendChild(tarjeta);
    });
}