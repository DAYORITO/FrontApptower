import React from 'react';
import './Aside.css';
import LogoApptower from '../../assets/Logo-Apptower.png';
import { DropDownList, DropDownNav, ListNav } from '../DropDownNav/DropDownNav';

export const Aside = () => {


    return (
        <>
            <nav className="myNav">
                <ul>
                    <li className="logoApptower">

                        <img src={LogoApptower} alt="logoApptower" className="logo" />
                    </li>
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
                        module={'Cerrar Sesión'}
                        icon='fe fe-24 fe-log-out'
                        href='/#/admin/'

                    />
                    

                </ul>

            </nav >
        </>
    )
}
