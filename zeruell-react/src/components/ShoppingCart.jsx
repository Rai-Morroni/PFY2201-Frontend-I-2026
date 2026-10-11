import PropTypes from 'prop-types';
import { CartItem } from './CartItem';
import { CartTotal } from './CartTotal';

export const ShoppingCart = ({ carrito = [], eliminarDelCarrito, vaciarCarrito }) => {
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
            <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-3">
                <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={vaciarCarrito}
                    disabled={carrito.length === 0}
                >
                    Vaciar carrito
                </button>
                <button
                    type="button"
                    className="btn btn-info fw-bold"
                    disabled
                    aria-label="Continuar al pago: próximamente"
                >
                    Continuar al pago - (Próximamente)
                </button>
            </div>
        </section>
    );
};

ShoppingCart.propTypes = {
    carrito: PropTypes.array.isRequired,
    eliminarDelCarrito: PropTypes.func.isRequired,
    vaciarCarrito: PropTypes.func.isRequired,
};