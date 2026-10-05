# Zeruell Games

Zeruell Games es un proyecto académico de tienda de videojuegos desarrollado en dos etapas: una versión estática con HTML, CSS y JavaScript y una implementación moderna en React con Vite. El objetivo es simular una experiencia de e-commerce con catálogo, promociones y carrito de compras en una interfaz visual atractiva.

El repositorio actual incluye ambas implementaciones, aunque la versión React es la más reciente y representa el estado actual del proyecto.

## Estado actual del proyecto

La implementación actual se encuentra en la carpeta `zeruell-react/` y utiliza:

- React 19
- Vite
- Bootstrap 5
- JavaScript moderno con componentes funcionales
- Estado local para gestionar el catálogo y el carrito
- Fetch de un archivo JSON local para cargar los productos

La lógica principal del proyecto consiste en mostrar juegos con precio normal y precio de oferta, permitir agregarlos al carrito y calcular el total automáticamente en base a los precios promocionales.

## Estructura del repositorio

```text
tienda-videojuegos-zeruell/
├── index.html                   # versión estática base del proyecto
├── README.md                    # documentación del proyecto
├── assets/
│   ├── css/
│   ├── img/
│   ├── js/
│   └── productos.json
├── zeruell-react/               # implementación actual en React
│   ├── package.json
│   ├── public/
│   │   ├── img/
│   │   ├── productos.json
│   │   └── vite.svg
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       │   ├── ProductItem.jsx
│       │   ├── ProductList.jsx
│       │   ├── CartItem.jsx
│       │   ├── CartTotal.jsx
│       │   └── ShoppingCart.jsx
│       └── utils/
│           └── helpers.js
├── Evidencias/
├── .git/
├── package.json
├── package-lock.json
└── node_modules/
```

## Implementación estática (versión base)

La versión inicial del proyecto se encuentra en la raíz del repositorio y replica una tienda online con:

- barra de navegación con logo y enlaces de sección
- hero section con carrusel promocional
- catálogo dinámico cargado con `fetch()` desde un JSON local
- búsqueda de productos por nombre
- catálogo clásico de tarjetas estáticas
- carrito de compras con cálculo de total
- mensajes visuales y feedback al usuario
- diseño responsivo con Bootstrap 5

### Cómo ejecutar la versión estática

No requiere instalación de dependencias. Puedes abrir directamente `index.html` en el navegador o levantar un servidor local:

```bash
python -m http.server 8000
```

Luego visita:

```text
http://localhost:8000
```

## Implementación actual en React

La carpeta `zeruell-react/` contiene la versión moderna del proyecto. Esta implementación mantiene la idea central de la tienda y refuerza la estructura con componentes React.

### Funcionalidades principales

- renderizado del catálogo desde `public/productos.json`
- tarjetas responsivas con imagen, descripción, precio normal y precio de oferta
- agregado de productos al carrito
- eliminación individual de productos
- contador de productos agregados
- cálculo automático del total usando el precio de oferta
- estado del carrito vacío visualmente identificado
- identificadores únicos con `crypto.randomUUID()` para permitir repetir productos sin conflicto
- diseño oscuro con Bootstrap y una apariencia moderna

### Componentes principales

```text
src/
├── App.jsx            # estado global del carrito y composición principal
├── App.css            # estilos personalizados de la aplicación
├── index.css           # estilos base y ajustes globales
├── main.jsx            # bootstrap del proyecto React
├── components/
│   ├── ProductItem.jsx    # tarjeta de cada producto
│   ├── ProductList.jsx    # listado de productos
│   ├── CartItem.jsx       # fila de producto dentro del carrito
│   ├── CartTotal.jsx      # cálculo y visualización del total
│   └── ShoppingCart.jsx   # resumen del carrito
└── utils/
    └── helpers.js         # utilidades de moneda y cálculo total
```

### Tecnologías de la versión React

- React 19
- React DOM
- Vite
- Bootstrap 5
- ESLint
- Gh-pages para despliegue

### Ejecutar la versión React

Desde la carpeta `zeruell-react/`:

```bash
cd zeruell-react
npm install
npm run dev
```

La app quedará disponible normalmente en:

```text
http://localhost:5173
```

### Scripts disponibles

```bash
npm run dev       # inicia el servidor de desarrollo
npm run build     # compila la aplicación para producción
npm run preview   # vista previa del build generado
npm run lint      # valida el código con ESLint
npm run deploy    # publica la carpeta dist en GitHub Pages
```

## Técnicas y objetivos del proyecto

Este proyecto está orientado a practicar conceptos del desarrollo frontend, especialmente:

- manipulación del DOM y renderizado dinámico
- consumo de datos desde JSON
- estructura de componentes en React
- gestión de estado con hooks
- diseño responsivo con Bootstrap
- lógica de carrito de compras
- buenas prácticas de organización de archivos y reutilización de componentes

## Objetivos del proyecto

El objetivo principal es demostrar cómo crear una tienda visualmente atractiva y funcional usando tecnologías web modernas, con base sólida para futuras mejoras tales como:

- filtros por categoría
- modal con detalle del producto
- almacenamiento del carrito en `localStorage`
- checkout o sistema de pago
- integración con una API real
- búsqueda avanzada y ordenamiento de productos

## Observaciones finales

- La versión HTML/JS representa la base pedagógica del proyecto.
- La versión React es la evolución actual y la que mejor refleja el estado actual del repositorio.
- La documentación y la estructura del proyecto se mantienen alineadas con los archivos reales presentes en el proyecto.


