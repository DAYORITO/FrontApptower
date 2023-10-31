import LogoApptower from '../../assets/Apptower.png';
import './Nav.css';

const Nav = () => {
    return (
        <aside className="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
            <a href="#" className="btn collapseSidebar toggle-btn d-lg-none text-muted mt-3" data-toggle="toggle">

                <i className="fe fe-x"><span className="sr-only"></span></i>
            </a>
            <nav className="vertnav navbar navbar-light">

                <div className="w-100 d-flex" id='contenedorLogo'>
                    <a className="navbar-brand mx-auto flex-fill text-center" href="./index.html">
                        <img src={LogoApptower} alt="logoApptower" className='logo' />
                    </a>
                </div>

                <ul className="navbar-nav flex-fill w-100 mb-2" id='contenedorli'>
                    {/* <li className="text-muted nav-heading  mb-1">
                        <span>Procesos</span>
                    </li > */}
                    <li className="nav-item w-100">
                        <a className="nav-link" >
                            <i className="fe fe-bar-chart fe-24"></i>
                            <span className="ml-3 item-text">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item w-100">
                        <a className="nav-link"  >
                            <i className="fe fe-24 fe-user"></i>
                            <span className="ml-3 item-text">Usuarios</span>
                        </a>
                    </li>


                    <li className="nav-item dropdown">
                        <a href="#residencial" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                            <i className="fe fe-home fe-24"></i>
                            <span className="ml-3 item-text">Residencial</span>
                        </a>
                        <ul className="collapse list-unstyled pl-4 w-100" id="residencial">
                            <li className="nav-item">
                                <a className="nav-link pl-3"><span className="ml-1 item-text">Propietarios</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3" ><span className="ml-1 item-text">Residentes</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3"><span className="ml-1 item-text">Vehiculos</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3" ><span className="ml-1 item-text">Visitantes</span></a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="#espacios" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                            <i className="fe fe-24 fe-maximize"></i>
                            <span className="ml-3 item-text">Espacios</span>
                        </a>
                        <ul className="collapse list-unstyled pl-4 w-100" id="espacios">
                            <li className="nav-item">
                                <a className="nav-link pl-3"><span className="ml-1 item-text">Espacios</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3"><span className="ml-1 item-text">Parqueaderos</span></a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="#reservas" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                            <i className="fe fe-clipboard fe-24"></i>
                            <span className="ml-3 item-text">Reservas</span>
                        </a>
                        <ul className="collapse list-unstyled pl-4 w-100" id="reservas">
                            <li className="nav-item">
                                <a className="nav-link pl-3"  >
                                    <span className="ml-1 item-text">Reservas</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3" ><span className="ml-1 item-text">Ingresos</span></a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="#notificacionM" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                            <i className="fe fe-bell  fe-24"></i>
                            <span className="ml-3 item-text">Notificaciones</span>
                        </a>
                        <ul className="collapse list-unstyled pl-4 w-100" id="notificacionM">
                            <li className="nav-item">
                                <a className="nav-link pl-3"  >
                                    <span className="ml-1 item-text">Notificaciones</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3" ><span className="ml-1 item-text">Multas</span></a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item w-100">
                        <a className="nav-link"  >
                            <i className="fe fe-24 fe-settings"></i>
                            <span className="ml-3 item-text">Roles</span>
                        </a>
                    </li>
                    <li className="nav-item w-100">
                        <a className="nav-link"  >
                            <i className="fe fe-24 fe-shield"></i>
                            <span className="ml-3 item-text">Vigilantes</span>
                        </a>
                    </li>
                    <li className="nav-item" id='logout'>
                        <a href="/" className="nav-link" id="salir">
                            <i className="fe fe-24 fe-slack"></i>
                            <span className="ml-3 item-text">Cerrar Sesión</span>
                        </a>
                    </li>
                </ul >
            </nav >

        </aside >
    );
}

export default Nav;

