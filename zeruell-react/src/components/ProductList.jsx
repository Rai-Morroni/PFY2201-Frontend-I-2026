export const ProductList = ({ productos, agregarAlCarrito }) => {
    return (
        <div className="row g-4">
            {productos.map((producto) => (
                <div className="col-12 col-md-6 col-lg-3" key={producto.id}>
                    <article className="card h-100 bg-black text-light border-info p-3">
                        <img src={producto.imagen} alt={producto.nombre} className="card-img-top game-img rounded-4" style={{ height: '300px', objectFit: 'cover' }} />
                        <div className="card-body d-flex flex-column text-center">
                            <h3 className="card-title fs-6">{producto.nombre}</h3>
                            <p className="text-secondary small mb-2">{producto.descripcion}</p>
                            <div className="mt-auto">
                                <p className="text-decoration-line-through text-danger mb-0">${producto.precioNormal.toLocaleString('es-CL')}</p>
                                <p className="text-info fw-bold fs-5 mb-3">${producto.precioOferta.toLocaleString('es-CL')}</p>
                                <button className="btn btn-outline-info w-100 rounded-pill" onClick={() => agregarAlCarrito(producto)}>
                                    Añadir al carrito
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            ))}
        </div>
    );
};