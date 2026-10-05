import PropTypes from 'prop-types';
import { formatCurrency } from '../utils/helpers';

export const ProductItem = ({ producto, agregarAlCarrito }) => {
    // Valores por defecto por si la API falla o faltan datos
    const { 
        nombre = 'Producto sin nombre', 
        descripcion = 'Sin descripción', 
        precioNormal = 0, 
        precioOferta = 0, 
        imagen = '' 
    } = producto;

    return (
        <div className="col-12 col-md-6 col-lg-3">
            <article className="card h-100 bg-black text-light border-info p-3">
                <img src={imagen} alt={nombre} className="card-img-top game-img rounded-4" style={{ height: '300px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column text-center">
                    <h3 className="card-title fs-6">{nombre}</h3>
                    <p className="text-secondary small mb-2">{descripcion}</p>
                    <div className="mt-auto">
                        <p className="text-decoration-line-through text-danger mb-0">{formatCurrency(precioNormal)}</p>
                        <p className="text-info fw-bold fs-5 mb-3">{formatCurrency(precioOferta)}</p>
                        <button className="btn btn-outline-info w-100 rounded-pill" onClick={() => agregarAlCarrito(producto)}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

// Validación estricta de las propiedades esperadas
ProductItem.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string,
        precioNormal: PropTypes.number,
        precioOferta: PropTypes.number.isRequired,
        imagen: PropTypes.string
    }).isRequired,
    agregarAlCarrito: PropTypes.func.isRequired,
};