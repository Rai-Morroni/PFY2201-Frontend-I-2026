import PropTypes from 'prop-types';
import { ProductItem } from './ProductItem';

// Asegura que reciba un arreglo
export const ProductList = ({ productos, agregarAlCarrito }) => { 
    if (!Array.isArray(productos)) return <p className="text-light">No hay productos disponibles.</p>;

    return (
        <div className="row g-4">
            {productos.map((producto) => (
                <ProductItem 
                    key={producto.id} 
                    producto={producto} 
                    agregarAlCarrito={agregarAlCarrito} 
                />
            ))}
        </div>
    );
};

ProductList.propTypes = {
    productos: PropTypes.array.isRequired,
    agregarAlCarrito: PropTypes.func.isRequired,
};