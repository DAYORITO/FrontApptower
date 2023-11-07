import LogoApptower from '../../assets/Logo-Apptower.png';
import { DropDownList, DropDownNav, ListNav } from '../DropDownNav/DropDownNav';
import './Aside.css';
import { Children, useState } from 'react';

export const Aside = () => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            {/* <button
                onClick={toggleExpand}
                className="navbar-toggler text-muted mt-2 p-0 mr-3">
                <i className={`fe ${expanded ? "fe-menu" : "fe-chevron-left"} navbar-toggler-icon`}></i>
            </button> */}

            <aside className={`sidebar-left ${expanded ? "" : "collapse"}`} id="leftSidebar" >
                <a href="#" className="btn collapseSidebar toggle-btn d-lg-none text-muted mt-3" data-toggle="toggle">
                    <i><span className="sr-only"></span></i>
                </a>
                <nav className="vertnav navbar navbar-light">
                    <div className="w-100 d-flex" id="contenedorLogo">
                        <a className="navbar-brand mx-auto flex-fill text-center" href="./index.html">
                            <img src={LogoApptower} alt="logoApptower" className="logo" />
                        </a>
                    </div>
                    <ul className="navbar-nav flex-fill w-100 mb-2" id="contenedorli">
                        <li className="text-muted nav-heading  mb-1">
                            <span>Procesos</span>
                        </li >

                        <ListNav
                            module={'Dashboard'}
                            icon='fe fe-bar-chart fe-24'
                            href='/#/admin'
                        />
                        <ListNav
                            module={'Usuarios'}
                            icon='fe fe-24 fe-user'
                            href='/#/admin/users'
                        />
                        <DropDownNav
                            id='espacios'
                            dropdownName={'#espacios'}
                            module={'Espacios'}>
                            <DropDownList
                                href='/#/admin/spaces'
                                subprocess={"Espacios"}
                            />

                            <DropDownList
                                href='/#/admin/parkingSpaces'
                                subprocess={"Parqueaderos"}
                            />


                        </DropDownNav>
                        <DropDownNav
                            id='residential'
                            dropdownName={'#residential'}
                            icon='fe fe-24 fe-users'
                            module={'Residencial'}>

                            <DropDownList
                                href='/#/admin/residents'
                                subprocess={"Residentes"}
                            />
                            <DropDownList
                                href='/#/admin/visitors'
                                subprocess={"Visitantes"}
                            />
                            <DropDownList
                                href='/#/admin'
                                subprocess={"Vehiculos"}
                            />
                            <DropDownList
                                href='/#/admin/owners'
                                subprocess={"Propietarios"}
                            />

                        </DropDownNav>
                        <DropDownNav
                            id='ingresos'
                            icon='fe fe-clipboard fe-24'
                            dropdownName={'#ingresos'}
                            module={'Ingresos'}>
                            <DropDownList
                                subprocess={"Ingresos"}
                                href='/#/admin/guest_income/'
                            />

                            <DropDownList
                                subprocess={"Reservas"}
                            />
                        </DropDownNav>
                        <DropDownNav
                            id='notifications'
                            icon='fe fe-bell fe-24'
                            dropdownName={'#notifications'}
                            module={'Notificaciones'}>
                            <DropDownList
                                subprocess={"Notificaciones"}
                            />

                            <DropDownList
                                subprocess={"Multas"}
                            />


                        </DropDownNav>
                        <ListNav
                            module={'Configuracion'}
                            icon='fe fe-24 fe-settings'
                            href='/#/admin/rols'
                        />
                        <ListNav
                            module={'Vigilantes'}
                            icon='fe fe-24 fe-shield'
                            href='/#/admin/watchman'
                        />
                        <ListNav
                            module={'Cerrar sesion'}
                            icon='fe fe-24 fe-slack'
                            href='/#'
                        />


                    </ul>
                </nav>
            </aside>
        </>
    );
};



