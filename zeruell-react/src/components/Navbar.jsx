export const Navbar = () => { // Componente funcional para el Navbar
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-info sticky-top">
            <div className="container">
                <a className="navbar-brand text-info fw-bold fs-3" href="#inicio">Zeruell Games</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#inicio">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#catalogo">Catálogo</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#contacto">Contacto</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};