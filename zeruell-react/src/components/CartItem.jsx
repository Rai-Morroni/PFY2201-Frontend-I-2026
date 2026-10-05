import PropTypes from 'prop-types';
import { formatCurrency } from '../utils/helpers';

export const CartItem = ({ item, eliminarDelCarrito }) => {
    const { uniqueId, nombre, precioOferta } = item;

    return (
        <li className="list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center">
            {nombre || 'Producto desconocido'}
            <div>
                <span className="badge bg-info text-dark rounded-pill me-3">
                    {formatCurrency(precioOferta)}
                </span>
                <button 
                    className="btn btn-sm btn-danger rounded-circle" 
                    onClick={() => eliminarDelCarrito(uniqueId)}
                    aria-label={`Eliminar ${nombre} del carrito`}
                >
                    X
                </button>
            </div>
        </li>
    );
};

// Validación de estructura
CartItem.propTypes = {
    item: PropTypes.shape({
        uniqueId: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        precioOferta: PropTypes.number.isRequired,
    }).isRequired,
    eliminarDelCarrito: PropTypes.func.isRequired,
};