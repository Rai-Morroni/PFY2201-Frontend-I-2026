import { useState } from 'react';

export const ContactForm = () => {
    // Estados para los campos, los errores y el mensaje de éxito
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    // Actualiza el estado cuando el usuario escribe
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Lógica de validación
    const validar = () => {
        let nuevosErrores = {};
        if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        
        if (!formData.email.trim()) {
            nuevosErrores.email = "El email es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            nuevosErrores.email = "El formato del correo no es válido.";
        }

        if (!formData.mensaje.trim()) nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
        
        return nuevosErrores;
    };

    // Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        const erroresValidacion = validar();
        
        if (Object.keys(erroresValidacion).length === 0) {
            setEnviado(true);
            setErrores({});
            setFormData({ nombre: '', email: '', mensaje: '' }); // Limpia el formulario
            setTimeout(() => setEnviado(false), 5000); // Oculta el mensaje de éxito después de 5s
        } else {
            setErrores(erroresValidacion);
            setEnviado(false);
        }
    };

    return (
        <section id="contacto" className="mt-5 mb-5 p-4 bg-black border border-info rounded-4">
            <h2 className="text-info text-center mb-4">✉️ Contáctanos</h2>
            
            {enviado && <div className="alert alert-success text-center">¡Mensaje enviado con éxito! Te responderemos pronto.</div>}
            
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label text-light">Nombre Completo</label>
                    <input type="text" className={`form-control bg-dark text-light border-secondary ${errores.nombre ? 'is-invalid' : ''}`} id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-light">Correo Electrónico</label>
                    <input type="email" className={`form-control bg-dark text-light border-secondary ${errores.email ? 'is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                </div>
                
                <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label text-light">Mensaje</label>
                    <textarea className={`form-control bg-dark text-light border-secondary ${errores.mensaje ? 'is-invalid' : ''}`} id="mensaje" name="mensaje" rows="4" value={formData.mensaje} onChange={handleChange}></textarea>
                    {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
                </div>
                
                <button type="submit" className="btn btn-info w-100 fw-bold rounded-pill">Enviar Mensaje</button>
            </form>
        </section>
    );
};