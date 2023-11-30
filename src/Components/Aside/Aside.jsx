import React, { useState } from 'react';
import './Aside.css';
import { DropDownList, DropDownNav, ListNav } from '../DropDownNav/DropDownNav';
import { CardUserNav } from '../CardUserNav/CardUserNav';
import LogoApptower from '../../assets/Logo-Apptower.png';
import { Link } from 'react-router-dom';

export const Aside = () => {
    const [isCloset, isOpem] = useState(true);

    const toggleSidebar = () => {
        console.log('Hola samuel intensox')
        isOpem(!isCloset);
    };

    return (
        <>
            <nav className={`myNav ${isCloset ? 'expanded' : 'collapsed'}`}>

                <div className='myNav-header'>

                    {/* <div className='myNav-header-img'>
                        <img src={LogoApptower} alt="logoApptower" className="logo" />
                    </div> */}
                    <button
                        type="button"
                        className="navbar-toggler text-muted collapseSidebar"
                        onClick={toggleSidebar}
                    >
                        <i className="fe fe-menu fe-16 navbar-toggler-icon"></i>
                    </button>
                </div>

                {/* Mover la tarjeta de usuario fuera del contenedor 'myNav-links' */}
                <CardUserNav />

                <div className='myNav-links'>
                    <div className='myNav-links-content'>

                        <ListNav module={'Dashborad'} href='/#/admin/' icon='fe fe-bar-chart fe-24' />
                        <ListNav module={'Notificaciones'} href='/#/admin/' icon='fe fe-message-circle fe-24' />


                        <DropDownNav module={"Ingresos"} icon='fe fe-phone-outgoing fe-24'>

                            {/* <ListNav module={'Ingresos'} href='/#/admin/guest_income/' icon='fe fe-phone-outgoing' />
                            <ListNav module={'Reservas'} href='/#/admin/' icon='fe fe-calendar' /> */}

                            <DropDownList subprocess={"Ingresos"} href='/#/admin/guest_income/'></DropDownList>
                            <DropDownList subprocess={"Reservas"} href='/#/admin/'></DropDownList>

                        </DropDownNav>

                        <DropDownNav module={"Residencial"} icon='fe fe-users fe-24'>

                            {/* <ListNav module={'Propietarios'} href='/#/admin/owners' icon='fe fe-user-check' />
                            <ListNav module={'Residentes'} href='/#/admin/residents' icon='fe fe-users' />
                            <ListNav module={'Visitantes'} href='/#/admin/visitors' icon='fe fe-user-plus' />
                            <ListNav module={'Vehiculos'} href='/#/admin/' icon='fe fe-truck' /> */}

                            <DropDownList subprocess={"Propietarios"} href='/#/admin/owners'></DropDownList>
                            <DropDownList subprocess={"Residentes"} href='/#/admin/residents'></DropDownList>
                            <DropDownList subprocess={"Visitantes"} href='/#/admin/visitors'></DropDownList>
                            <DropDownList subprocess={"Vehiculos"} href='/#/admin/'></DropDownList>

                        </DropDownNav>

                        <DropDownNav module={"Espacios"}>

                            {/* <ListNav module={'Apartamentos'} href='/#/admin/apartments' icon='fe fe-layers' />
                            <ListNav module={'Parkeaderos'} href='/#/admin/parkingSpaces/' icon='fe fe-octagon' />
                            <ListNav module={'Zonas comunes'} href='/#/admin/spaces' icon='fe fe-sun fe-24' /> */}

                            <DropDownList subprocess={"Apartamentos"} href='/#/admin/apartments'></DropDownList>
                            <DropDownList subprocess={"Parkeaderos"} href='/#/admin/parkingSpaces/'></DropDownList>
                            <DropDownList subprocess={"Zonas comunes"} href='/#/admin/spaces'></DropDownList>

                        </DropDownNav>

                        <ListNav module={'Multas'} href='/#/admin/' icon='fe fe-x-square fe-24' />

                        <ListNav module={'Usuarios'} href='/#/admin/users/' icon='fe fe-user' />
                        <ListNav module={'Vigilantes'} href='/#/admin/watchman/' icon='fe fe-shield' />


                    </div>
                    <div className='myNav-links-end'>
                        <ListNav module={'Configuracion'} href='/#/admin/rols/' icon='fe fe-settings fe-24' />
                        <ListNav module={'Salir'} href='' icon='fe fe-log-out fe-24' />

                    </div>

                </div>





            </nav >
        </>
    )
}
