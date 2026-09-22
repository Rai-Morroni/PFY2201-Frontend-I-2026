# Zeruell Games

Zeruell Games es una tienda de videojuegos creada como proyecto de desarrollo frontend. La aplicación presenta un catálogo de productos en estilo moderno, con enfoque en una experiencia visual atractiva y una navegación sencilla para explorar juegos, buscar títulos y agregarlos a un carrito de compras.

## Descripción general

Este proyecto está desarrollado con HTML, CSS y JavaScript, y utiliza Bootstrap 5 para el diseño responsivo. El sitio simula una tienda online de videojuegos con:

- banner principal con carrusel promocional
- catálogo dinámico cargado desde un archivo JSON local
- búsqueda de productos por nombre
- carrito de compras con actualización de total
- tarjetas de productos con acción de agregar
- mensajes de error y feedback visual para mejor experiencia de usuario

## Funcionalidades principales

### 1. Header y navegación
El sitio cuenta con una barra de navegación superior con:

- logo de la marca
- enlaces de navegación (Inicio, Catálogo, Ofertas)
- campo de búsqueda integrado en el navbar

Esto permite que la tienda se sienta más cercana a una interfaz real de e-commerce.

### 2. Carrusel principal
Se incluye un hero section con carrusel de imágenes, mostrando promociones y videojuegos destacados. Este componente se construye con Bootstrap y ayuda a resaltar ofertas y contenido visual del sitio.

### 3. Catálogo dinámico desde JSON
El proyecto carga productos desde un archivo local llamado `assets/productos.json` usando `fetch()`. Esto permite mantener el catálogo modular y facilitar futuras actualizaciones sin necesidad de editar directamente el HTML.

Entre los datos cargados se incluyen:

- título del juego
- precio
- imagen
- categoría

### 4. Búsqueda de productos
El buscador permite filtrar los productos cargados desde el JSON en tiempo real al enviar el formulario o al escribir en el campo de búsqueda.

La lógica de búsqueda:

- normaliza el texto en minúsculas
- filtra los productos por coincidencia en el nombre
- renderiza solo los resultados coincidentes
- si el usuario borra la búsqueda, vuelve a mostrar el catálogo completo

### 5. Catálogo clásico de productos
Además del catálogo dinámico, el sitio incluye un conjunto de tarjetas estáticas con productos destacados de la tienda. Cada una cuenta con:

- imagen del juego
- nombre del producto
- precio
- botón para agregar al carrito

### 6. Carrito de compras
El proyecto incluye una sección de resumen del carrito donde se muestran los productos agregados y el total. Las funcionalidades del carrito son:

- agregar juegos desde el catálogo dinámico y el catálogo clásico
- mostrar la lista de productos seleccionados
- calcular el total en tiempo real
- mostrar el estado de carrito vacío cuando no hay productos

### 7. Feedback visual y manejo de errores
Se implementan mensajes visuales para mejorar la experiencia del usuario:

- cambio de texto y color del botón al agregar un producto
- toast de error si no se logra cargar el catálogo dinámico
- estado de carga inicial mientras se traen los productos del JSON

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Fetch API
- JSON local

## Estructura del proyecto

```text
tienda-videojuegos-zeruell/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── img/
│   ├── js/
│   │   └── main.js
│   └── productos.json
├── Evidencias/
└── .git/
```

## Cómo ejecutar el proyecto

No requiere instalación de dependencias ni un servidor complejo. Puedes abrir el archivo `index.html` directamente en el navegador o ejecutar un servidor local simple.

Opción recomendada:

```bash
python -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000
```

## Observaciones

Este proyecto es una simulación de una tienda de videojuegos enfocada en la práctica de frontend, especialmente en:

- manipulación del DOM
- consumo de datos desde JSON
- eventos de usuario
- diseño responsivo
- lógica de carrito de compras
- buenas prácticas en JavaScript moderno

## Objetivo del proyecto

El objetivo principal es demostrar cómo crear una tienda visualmente atractiva y funcional usando tecnologías básicas del desarrollo web, con una base sólida para futuras mejoras como:

- filtros por categoría
- modal de detalle de producto
- almacenamiento del carrito en localStorage
- sistema de pagos o checkout
- integración con una API real


