import PropTypes from 'prop-types';
import { CartItem } from './CartItem';
import { CartTotal } from './CartTotal';

export const ShoppingCart = ({ carrito = [], eliminarDelCarrito }) => {
    return (
        <section className="p-4 bg-black border border-info rounded-4 mt-5">
            <h3 className="text-info text-center mb-4">
                🛒 Resumen del Carrito <span className="badge bg-info text-dark rounded-pill fs-6">{carrito.length}</span>
            </h3>
            
            <ul className="list-group mb-3">
                {carrito.length === 0 ? (
                    <li className="list-group-item bg-dark text-light border-secondary text-center">
                        Tu carrito está vacío. ¡Agrega algunos juegos!
                    </li>
                ) : (
                    carrito.map((item) => (
                        <CartItem 
                            key={item.uniqueId} 
                            item={item} 
                            eliminarDelCarrito={eliminarDelCarrito} 
                        />
                    ))
                )}
            </ul>
            <CartTotal carrito={carrito} />
        </section>
    );
};

ShoppingCart.propTypes = {
    carrito: PropTypes.array.isRequired,
    eliminarDelCarrito: PropTypes.func.isRequired,
};