import React, { useState, useEffect } from 'react';
import './Aside.css';
import { DropDownList, DropDownNav, ListNav } from '../DropDownNav/DropDownNav';
import { CardUserNav } from '../CardUserNav/CardUserNav';
import { useAuth } from '../../Context/AuthContext';
import { idToPermissionName } from '../../Hooks/permissionRols';
import Cookies from 'js-cookie';

export const Aside = () => {
    const { user, login, logout } = useAuth();
    const token = Cookies.get('token');
    const [allowedPermissions, setAllowedPermissions] = useState([]);
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState('');


    useEffect(() => {
        if (token) {
            fetchUserPermissions(token);
            fetchUserInformation(token);
        }
    }, [token]);


    const fetchUserPermissions = async (token) => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/permissionfromrole', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user permissions');
            }

            const data = await response.json();
            if (data && data.permissions && Array.isArray(data.permissions)) {
                const allowed = data.permissions.map(permission => idToPermissionName[permission]);
                setAllowedPermissions(allowed);

            }
        } catch (error) {
            console.error('Error fetching user permissions:', error);
        }
    };

    const fetchUserInformation = async (token) => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/informationUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }

            const data = await response.json();
            setUserData(data);

        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };



    const fechDataRols = async () => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/rols');

            if (!response.ok) {
                throw new Error('Failed to fetch roles');
            }

            const data = await response.json();
            const rols = data.rols;
            if (Array.isArray(rols)) {
                const userRole = rols.find(role => role.idrole === userData.user.idrole)?.namerole;
                console.log('User Role:', userRole);
                setUserRole(userRole);
            } else {
                console.error('Error: roles data is not an array:', rols);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    useEffect(() => {
        if (userData.user && userData.user.idrole) {
            fechDataRols();
        }
    }, [userData]);



    console.log(allowedPermissions, 'allowedPermissions');

    const [isCloset, isOpem] = useState(true);

    const toggleSidebar = () => {
        isOpem(!isCloset);
    };

    return (
        <>
            <nav className={`myNav ${isCloset ? 'expanded' : 'collapsed'}`}>
                <div className='myNav-header'>
                    <button
                        type="button"
                        className="navbar-toggler text-muted collapseSidebar"
                        onClick={toggleSidebar}
                    >
                        <i className="fe fe-menu fe-16 navbar-toggler-icon"></i>
                    </button>
                </div>

                {/* Mover la tarjeta de usuario fuera del contenedor 'myNav-links' */}
                <CardUserNav
                    name={userData.user?.name ? userData.user.name : ''}
                    lastname={userData.user?.lastname ? userData.user.lastname : ''}
                    rol={userRole ? userRole : ''}
                />


                <div className='myNav-links'>
                    <div className='myNav-links-content'>
                        {allowedPermissions && (
                            <>
                                {allowedPermissions.includes('Dashboard') || allowedPermissions.includes('Usuarios') && (
                                    <ListNav module={'Dashboard'} href='dashboard' icon='fe fe-bar-chart fe-24' />
                                )}
                                {allowedPermissions.includes('Notificaciones') && (
                                    <ListNav module={'Notificaciones'} href='notifications' icon='fe fe-message-circle fe-24' />
                                )}
                                {allowedPermissions && (allowedPermissions.includes('Reservas') || allowedPermissions.includes('Ingresos')) ? (
                                    <DropDownNav module={"Reservas"} icon='fe fe-phone-outgoing fe-24'>

                                        <>
                                            {allowedPermissions.includes('Ingresos') && (
                                                <DropDownList subprocess={"Ingresos"} href='guest_income/'></DropDownList>
                                            )}
                                            {allowedPermissions.includes('Reservas') && (
                                                <DropDownList subprocess={"Reservas"} href='booking'></DropDownList>
                                            )}
                                        </>

                                    </DropDownNav>
                                ) : null}


                                {allowedPermissions && (
                                    <>
                                        {allowedPermissions.includes('Propietarios') ||
                                            allowedPermissions.includes('Residentes') ||
                                            allowedPermissions.includes('Visitantes') ||
                                            allowedPermissions.includes('Vehiculos') ? (
                                            <DropDownNav module={"Residencial"} icon='fe fe-users fe-24'>

                                                <>
                                                    {allowedPermissions.includes('Propietarios') && (
                                                        <DropDownList subprocess={"Propietarios"} href='owners'></DropDownList>
                                                    )}
                                                    {allowedPermissions.includes('Residentes') && (
                                                        <DropDownList subprocess={"Residentes"} href='residents'></DropDownList>
                                                    )}
                                                    {allowedPermissions.includes('Visitantes') && (
                                                        <DropDownList subprocess={"Visitantes"} href='visitors'></DropDownList>
                                                    )}
                                                    {allowedPermissions.includes('Vehiculos') && (
                                                        <DropDownList subprocess={"Vehiculos"} href='vehicle'></DropDownList>
                                                    )}
                                                </>

                                            </DropDownNav>
                                        ) : null}
                                    </>
                                )}


                                {allowedPermissions && (allowedPermissions.includes('Apartamentos') || allowedPermissions.includes('Parqueaderos') || allowedPermissions.includes('Zonas comunes')) ? (
                                    <>
                                        <DropDownNav module={"Espacios"}>

                                            {allowedPermissions.includes('Apartamentos') && (
                                                <DropDownList subprocess={"Apartamentos"} href='apartments'></DropDownList>
                                            )}
                                            {allowedPermissions.includes('Parqueaderos') && (
                                                <DropDownList subprocess={"Parqueaderos"} href='parkingSpaces/'></DropDownList>
                                            )}
                                            {allowedPermissions.includes('Zona Comunes') && (
                                                <DropDownList subprocess={"Zonas comunes"} href='spaces'></DropDownList>
                                            )}

                                        </DropDownNav>
                                    </>
                                ) : null}


                                {allowedPermissions.includes('Multas') && (
                                    <ListNav module={'Multas'} href='fines' icon='fe fe-x-square fe-24' />
                                )}

                                {allowedPermissions.includes('Usuarios') && (
                                    <ListNav module={'Usuarios'} href='users/' icon='fe fe-user' />
                                )}

                                {allowedPermissions.includes('Vigilantes') && (
                                    (userRole === 'Administrador' || userRole === 'Admin' || userRole === 'Super Administrador')
                                        ? <ListNav module={'Vigilantes'} href='watchman/' icon='fe fe-shield' />
                                        : (userRole === 'Vigilante' || userRole === 'Vigilantes' || userRole === 'Seguridad')
                                            ? <ListNav module={'Vigilantes'} href='watchman/shifts' icon='fe fe-shield' />
                                            : null
                                )}

                            </>
                        )}

                    </div>

                    <div className='myNav-links-end'>
                        {allowedPermissions && (allowedPermissions.includes('Usuarios') || allowedPermissions.includes('Roles')) && (
                            <ListNav module={'Configuración'} href='rols/' icon='fe fe-settings fe-24' />
                        )}
                        <ListNav module={'Salir'} onClick={e => {
                            e.preventDefault();
                            logout();
                        }} icon='fe fe-log-out fe-24' />
                    </div>

                </div>
            </nav >
        </>
    )
}
