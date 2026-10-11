# Zeruell Games — Tienda de videojuegos EFT Semana 9

Zeruell Games es un proyecto académico de tienda de videojuegos desarrollado para EFT Semana 9. La versión actual está construida con React y Vite, y permite explorar un catálogo de juegos, filtrarlos por categoría y gestionar un carrito de compras. El diseño utiliza Bootstrap y una paleta oscura con acentos celestes.

La aplicación es una demostración de frontend: el carrito se mantiene en el estado de React y no se guarda en un servidor. El botón para continuar al pago está deshabilitado y solo indica que la funcionalidad estará disponible próximamente; no se procesan pagos.

## Proyecto desplegado

Puedes visitar la aplicación en GitHub Pages:

**[Abrir Zeruell Games](https://rai-morroni.github.io/PFY2201-Frontend-I-2026/)**

## Requisitos previos

- [Node.js](https://nodejs.org/) instalado. npm se incluye con Node.js.
- Git instalado para clonar el repositorio.
- Una terminal (PowerShell, Terminal de Windows, Git Bash o la terminal integrada de VS Code).

## Instalación y ejecución local

Sigue estos pasos para ejecutar la versión React en tu equipo:

1. Abre una terminal.
2. Clona el repositorio:

   ```bash
   git clone https://github.com/Rai-Morroni/PFY2201-Frontend-I-2026.git
   ```

3. Entra a la carpeta del repositorio:

   ```bash
   cd PFY2201-Frontend-I-2026
   ```

4. Entra a la carpeta de la aplicación React:

   ```bash
   cd zeruell-react
   ```

5. Instala las dependencias:

   ```bash
   npm install
   ```

6. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

7. Abre en el navegador la dirección local que indique Vite en la terminal. Normalmente es:

   ```text
   http://localhost:5173
   ```

Para detener el servidor, vuelve a la terminal y presiona `Ctrl+C`.

## Funcionalidades actuales

- Catálogo cargado desde `public/productos.json`.
- Filtro de juegos por categoría.
- Tarjetas de producto con imagen, descripción y precios.
- Agregado y eliminación individual de productos en el carrito.
- Opción para vaciar el carrito completo.
- Contador de productos y cálculo automático del total con el precio de oferta.
- Botón de pago deshabilitado con el mensaje «Próximamente»; no existe procesamiento de pago.
- Formulario de contacto con validación de nombre (mínimo 5 caracteres), correo y mensaje (mínimo 10 caracteres).
- Mensajes de validación y de envío del formulario en la interfaz.
- Interfaz responsiva con Bootstrap.

## Tecnologías

- React 19 y React DOM
- Vite
- Bootstrap 5
- JavaScript
- ESLint
- gh-pages para el despliegue

## Estructura principal

```text
zeruell-react/
├── public/
│   └── productos.json
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   ├── components/
│   │   ├── ContactForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductItem.jsx
│   │   ├── ProductList.jsx
│   │   ├── CartItem.jsx
│   │   ├── CartTotal.jsx
│   │   └── ShoppingCart.jsx
│   └── utils/
│       └── helpers.js
└── package.json
```

El repositorio también conserva en su raíz una implementación estática anterior en HTML, CSS y JavaScript. Para trabajar con la aplicación actual, ejecuta los comandos desde `zeruell-react/`.

## Comandos disponibles

Ejecuta estos comandos desde la carpeta `zeruell-react/`:

```bash
npm run dev      # inicia el servidor de desarrollo
npm run build    # genera la versión de producción en dist/
npm run preview  # previsualiza la compilación de producción
npm run lint     # revisa el código con ESLint
npm run deploy   # publica dist/ en GitHub Pages
```
