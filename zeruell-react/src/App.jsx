import { useState, useEffect } from 'react';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';

function App() {
    // 1. Gestión de estados (Catálogo y Carrito)
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    // 2. Manejo de Efectos: Carga dinámica de datos al montar el componente
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

    const agregarAlCarrito = (producto) => {
        const productoConIdUnico = { ...producto, uniqueId: crypto.randomUUID() };
        setCarrito([...carrito, productoConIdUnico]);
    };

    const eliminarDelCarrito = (uniqueId) => {
        const nuevoCarrito = carrito.filter(item => item.uniqueId !== uniqueId);
        setCarrito(nuevoCarrito);
    };

    return (
        <div className="bg-dark min-vh-100 py-5">
            <div className="container">
                <header className="text-center mb-5 border-bottom border-info pb-4">
                    <h1 className="text-info fw-bold display-4">Zeruell Games</h1>
                    <p className="text-light fs-5">Tu tienda de Videojuegos (Versión React)</p>
                </header>

                <h2 className="text-light mb-4">Catálogo de Productos</h2>
                {/* Pasamos el estado de productos y el carrito para las validaciones */}
                <ProductList productos={productos} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
                
                <ShoppingCart carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
            </div>
        </div>
    );
}

export default App;