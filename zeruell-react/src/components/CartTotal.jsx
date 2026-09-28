export const CartTotal = ({ carrito }) => {
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precioOferta, 0);

    return (
        <div className="text-end mt-3">
            <h4 className="text-light">Total: <span className="text-info fw-bold">${total.toLocaleString('es-CL')}</span></h4>
        </div>
    );
};