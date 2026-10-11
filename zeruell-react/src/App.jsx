import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';
import { ContactForm } from './components/ContactForm';

function App() {
    // 1. Gestión de estados (Catálogo y Carrito)
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [filtro, setFiltro] = useState('Todas'); // Nuevo estado para la categorías

    // 2. Manejo de Efectos: Carga dinámica de datos al montar el componente.    
    useEffect(() => {
        const cargarProductos = async () => {
            try {
                // Simula la llamada a una fuente externa
                const respuesta = await fetch('./productos.json');
                const datos = await respuesta.json();
                setProductos(datos);
            } catch (error) {
                console.error("Error cargando los productos:", error); 
            }
        };        
        cargarProductos();
    }, []); // El arreglo vacío asegura que solo se ejecute una vez

    // 3. Lógica de Filtrado (Se ejecuta antes de enviar a ProductList)
    const productosFiltrados = filtro === 'Todas' // Inicializado con el valor "Todas" para mostrar todos los productos al inicio.
        ? productos 
        : productos.filter(producto => producto.categoria === filtro);

    // Funciones del carrito
    const agregarAlCarrito = (producto) => {
        const productoConIdUnico = { ...producto, uniqueId: crypto.randomUUID() };
        setCarrito([...carrito, productoConIdUnico]);
    };

    const eliminarDelCarrito = (uniqueId) => {
        const nuevoCarrito = carrito.filter(item => item.uniqueId !== uniqueId);
        setCarrito(nuevoCarrito);
    };

    return (
        <div className="bg-dark min-vh-100" id="inicio">
            {/* 4. Barra de Navegación Modularizada */}
            <Navbar />

            {/* Uso de etiquetas semánticas HTML5 (main, section, footer) */}
            <main className="container py-5">
                
                <header className="text-center mb-5 border-bottom border-info pb-4">
                    <h1 className="text-info fw-bold display-4">Explora Nuestro Catálogo</h1>
                    <p className="text-light fs-5">Los mejores títulos para todas las plataformas.</p>
                </header>

                <section id="catalogo">
                    {/* Sección de Filtro */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                        <h2 className="text-light m-0">Catálogo de Productos</h2>
                        <select 
                            className="form-select w-auto bg-black text-light border-info"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        >
                            <option value="Todas">Todas las categorías</option>
                            <option value="Acción">Acción</option>
                            <option value="RPG">RPG</option>
                            <option value="Aventura">Aventura</option>
                        </select>
                    </div>

                    {/* Pasa los productos FILTRADOS en lugar de la lista completa */}
                    <ProductList 
                        productos={productosFiltrados} 
                        carrito={carrito} 
                        agregarAlCarrito={agregarAlCarrito} 
                    />
                    
                    <ShoppingCart carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
                </section>

                {/* 5. Formulario de Contacto Modularizado con Validaciones */}
                <ContactForm />

            </main>

            <footer className="bg-black text-center text-secondary py-4 border-top border-info">
                <p className="mb-0">© 2026 Zeruell Games. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default App;