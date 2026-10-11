export const Navbar = ({ setVistaActual }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-info sticky-top">
            <div className="container">
                {/* Al hacer clic en el logo, volvemos al inicio */}
                <span className="navbar-brand text-info fw-bold fs-3" style={{cursor: 'pointer'}} onClick={() => setVistaActual('inicio')}>
                    Zeruell Games
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <span className="nav-link text-light" style={{cursor: 'pointer'}} onClick={() => setVistaActual('inicio')}>Inicio</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link text-light" style={{cursor: 'pointer'}} onClick={() => setVistaActual('contacto')}>Contacto</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};