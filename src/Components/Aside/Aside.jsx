import React, { useState } from 'react';
import './Aside.css';
import { ListNav } from '../DropDownNav/DropDownNav';
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
                        <i class="fe fe-menu fe-16 navbar-toggler-icon"></i>
                    </button>
                </div>

                <CardUserNav></CardUserNav>

                <div className='myNav-links'>
                    <div className='myNav-links-content'>

                        <ListNav module={'Dashborad'} href='/#/admin/' icon='fe fe-bar-chart' />
                        <ListNav module={'Notificaciones'} href='/#/admin/notifications' icon='fe fe-message-circle' />

                        <ListNav module={'Apartamentos'} href='/#/admin/apartments' />

                        <ListNav module={'Ingresos'} href='/#/admin/guest_income/' icon='fe fe-phone-outgoing' />
                        <ListNav module={'Reservas'} href='/#/admin/booking/' icon='fe fe-calendar' />

                        <ListNav module={'Visitantes'} href='/#/admin/visitors' icon='fe fe-user-plus' />
                        <ListNav module={'Espacios'} href='/#/admin/spaces' icon='fe fe-sun fe-16' />
                        <ListNav module={'Parkeaderos'} href='/#/admin/parkingSpaces/' icon='fe fe-octagon' />
                        <ListNav module={'Vehiculos'} href='/#/admin/' icon='fe fe-truck' />
                        <ListNav module={'Propietarios'} href='/#/admin/owners' icon='fe fe-user-check' />
                        <ListNav module={'Residentes'} href='/#/admin/residents' icon='fe fe-users' />
                        <ListNav module={'Multas'} href='/#/admin/' icon='fe fe-user' />
                        <ListNav module={'Usuarios'} href='/#/admin/users/' icon='fe fe-user' />
                        <ListNav module={'Vigilantes'} href='/#/admin/watchman/' icon='fe fe-shield' />


                    </div>
                    <div className='myNav-links-end'>
                        <ListNav module={'Configuracion'} href='/#/admin/rols/' icon='fe fe-settings' />
                        <ListNav module={'Salir'} href='' icon='fe fe-log-out' />

                    </div>

                </div>





            </nav >
        </>
    )
}
