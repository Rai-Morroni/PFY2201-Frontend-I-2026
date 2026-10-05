// Limpieza y formateo de moneda
export const formatCurrency = (amount) => {
    // Si no es un número válido, asume 0 para no romper la app
    const validAmount = Number(amount) || 0; 
    return `$${validAmount.toLocaleString('es-CL')}`;
};

// Cálculo centralizado del total
export const calculateCartTotal = (cart) => {
    // Asegura que reciba un arreglo
    if (!Array.isArray(cart)) return 0; 
    return cart.reduce((total, item) => total + (Number(item.precioOferta) || 0), 0);
};