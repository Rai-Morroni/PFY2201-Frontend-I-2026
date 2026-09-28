import { useState } from 'react';
import { productosData } from './productos';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';

function App() {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        // Usamos crypto.randomUUID() para asegurar que elementos repetidos tengan un ID único en el carrito
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
                <ProductList productos={productosData} agregarAlCarrito={agregarAlCarrito} />
                
                <ShoppingCart carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
            </div>
        </div>
    );
}

export default App;