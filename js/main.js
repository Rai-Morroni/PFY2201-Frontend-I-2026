/**
 * ============================================================================
 * ZERUELL GAMES - SEMANA 5
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
 * Selecciona las tarjetas de juegos y sus botones para añadir interactividad.
 */
function configurarEventosTarjetas() {
    // Selecciona todas las tarjetas de juegos y botones de compra
    const gameCards = document.querySelectorAll('.game-card');
    const buyButtons = document.querySelectorAll('.custom-btn');

    // EVENTO MOUSEOVER: Agrega un brillo especial al pasar el cursor sobre las tarjetas
    gameCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            // Manipulación de DOM: alterando el estilo en línea
            card.style.boxShadow = '0 0 20px #00ffcc'; 
        });

        // Evento mouseout para revertir el cambio cuando el cursor sale
        card.addEventListener('mouseout', () => {
            card.style.boxShadow = 'none';
        });
    });

    // EVENTO CLICK: Simula agregar un producto al carrito y da feedback visual
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Guardamos el texto original
            const textoOriginal = this.textContent;
            
            // Manipulación del DOM: cambiamos texto y clases CSS de Bootstrap
            this.textContent = '¡Añadido!';
            this.classList.replace('btn-info', 'btn-success');
            this.classList.add('bg-success', 'text-white');

            // Usamos setTimeout para revertir el botón a su estado normal tras 2 segundos
            setTimeout(() => {
                this.textContent = textoOriginal;
                this.classList.replace('btn-success', 'btn-info');
                this.classList.remove('bg-success', 'text-white');
            }, 2000); // 2000 milisegundos = 2 segundos
        });
    });
}

/**
 * ============================================================================
 * PASO 2 Y 1: EVENTO SUBMIT Y MANIPULACIÓN DINÁMICA DEL DOM
 * ============================================================================
 * Controla el formulario del footer, previene la recarga y muestra un mensaje.
 */
function configurarEventoFormulario() { // Verifica que el formulario exista en el DOM
    const form = document.getElementById('suscripcion-form');
    const emailInput = document.getElementById('email-input');
    const mensajeForm = document.getElementById('form-mensaje');

    if (form) {
        // EVENTO SUBMIT
        form.addEventListener('submit', (evento) => {
            // preventDefault evita que la página se recargue al enviar el formulario
            evento.preventDefault(); 
            
            // Obtenemos el valor escrito por el usuario
            const email = emailInput.value;

            // Manipulación del DOM: Insertamos contenido dinámico
            mensajeForm.textContent = `¡Felicidades! Se ha enviado un código de descuento a ${email}`;
            
            // Limpiamos el campo de texto
            emailInput.value = '';

            // Borramos el mensaje después de 8 segundos
            setTimeout(() => {
                mensajeForm.textContent = '';
            }, 8000); // 8000 milisegundos = 8 segundos
        });
    }
}

/**
 * ============================================================================
 * PASO 3: FETCH API Y PROMESAS
 * ============================================================================
 * Consume datos desde FakeStoreAPI y construye elementos HTML dinámicamente.
 */
function cargarHardwareDesdeAPI() {
    const apiContainer = document.getElementById('api-hardware');
    
    // Muestra un mensaje de carga mientras llegan los datos
    apiContainer.innerHTML = '<p class="text-center text-info">Cargando Hardware oficial...</p>';

    // Hacemos la petición HTTP GET a una API pública (categoría de electrónica simulando hardware gamer)
    fetch('https://fakestoreapi.com/products/category/electronics?limit=4')
        .then(respuesta => {
            // Validamos que la respuesta del servidor sea exitosa
            if (!respuesta.ok) {
                throw new Error('Error al conectar con el servidor');
            }
            // Convertimos la respuesta a formato JSON
            return respuesta.json();
        })
        .then(datos => {
            // Limpiamos el mensaje de carga
            apiContainer.innerHTML = '';

            // Iteramos sobre los datos obtenidos
            datos.forEach(producto => {
                // Manipulación del DOM (Paso 1): createElement para construir la tarjeta
                const columna = document.createElement('div');
                columna.className = 'col-12 col-md-6 col-lg-3';

                // Usamos innerHTML para construir la estructura interna con los datos de la API
                columna.innerHTML = `
                    <article class="card h-100 bg-black text-light border-info p-3 custom-card" style="border-width: 2px;">
                        <img src="${producto.image}" alt="${producto.title}" class="card-img-top bg-white rounded-4" style="height: 200px; object-fit: contain; padding: 1rem;">
                        <div class="card-body d-flex flex-column text-center">
                            <h3 class="card-title fs-6 mt-auto text-light">${producto.title.substring(0, 30)}...</h3>
                            <p class="price my-3 text-info fw-bold">$${producto.price}</p>
                            <button class="btn btn-outline-info rounded-pill w-100 mt-auto">Ver detalle</button>
                        </div>
                    </article>
                `;

                // Finalmente agregamos el elemento recién creado al DOM usando appendChild
                apiContainer.appendChild(columna);
            });
        })
        .catch(error => {
            // Manejo de errores en caso de fallo en la promesa
            console.error('Hubo un problema con la Fetch API:', error);
            apiContainer.innerHTML = `<p class="text-danger text-center fw-bold">No se pudo cargar el hardware en este momento. Inténtalo más tarde.</p>`;
        });
}