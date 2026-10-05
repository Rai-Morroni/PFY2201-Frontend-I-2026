import PropTypes from 'prop-types';
import { calculateCartTotal, formatCurrency } from '../utils/helpers';

export const CartTotal = ({ carrito }) => {
    // Delega el cálculo y el formateo a utilidades centralizadas
    const total = calculateCartTotal(carrito);

    return (
        <div className="text-end mt-3">
            <h4 className="text-light">
                Total: <span className="text-info fw-bold">{formatCurrency(total)}</span>
            </h4>
        </div>
    );
};

CartTotal.propTypes = {
    carrito: PropTypes.array.isRequired,
};