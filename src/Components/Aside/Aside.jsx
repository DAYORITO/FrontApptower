import React, { useState, useEffect } from 'react';
import './Aside.css';
import './AsideNotifications.css';

import { DropDownList, DropDownNav, ListNav } from '../DropDownNav/DropDownNav';
import { CardUserNav } from '../CardUserNav/CardUserNav';
import { useAuth } from '../../Context/AuthContext';
import { idToPermissionName } from '../../Hooks/permissionRols';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import LogoApptower from '../../assets/Logo-Apptower.png';


export const Aside = () => {
    const { user, login, logout } = useAuth();
    const token = Cookies.get('token');
    const [allowedPermissions, setAllowedPermissions] = useState([]);
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState('');
    const [userDocument, SetUserDocument] = useState('');
    const [idResidents, setIdResidents] = useState('');
    console.log(userRole, 'userRole aqui en login');
    const [idApartment, setIdapartaments] = useState('');
    console.log(idApartment, 'idapartement')
    console.log('documento', userDocument)
    console.log(idResidents, 'holaaaaaa id')
    console.log('userData aqui en login:', userData);

    const [notificationsModal, setNotificationsModal] = useState(false)

    const openNotifications = () => {

        setNotificationsModal(!notificationsModal)
    }

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
            SetUserDocument(data.user.document);

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





    const redireccion = useNavigate();

    useEffect(() => {
        if (token) {

            fetchUserInformation(token);
        }
    }, [token]);





    fetch(`https://apptowerbackend.onrender.com/api/residents/document/${userDocument}`)
        .then(response => response.json())
        .then(data => {
            if (data.residente) {
                setIdResidents(data.residente.idResident);

            }
        })
        .catch(error => console.error('Error:', error));


    fetch(`https://apptowerbackend.onrender.com/api/aparmentResidents/resident/${idResidents}`)
        .then(response => response.json())
        .then(data => {
            if (data.apartmentResidents) {
                setIdapartaments(data.apartmentResidents.idApartment)


            }
        })
        .catch(error => console.error('Error:', error));


    const rutadetailsapartment = `apartments/details/${idApartment}`



    console.log(allowedPermissions, 'allowedPermissions Aside ');

    const [isCloset, isOpem] = useState(true);

    const toggleSidebar = () => {
        isOpem(!isCloset);
    };

    return (
        <>
            <nav className={`myNav ${isCloset ? 'expanded' : 'collapsed'}`}
                onMouseEnter={isCloset ? null : toggleSidebar}>
                <div className='myNav-header'>
                    <button
                        type="button"
                        className="navbar-toggler text-muted collapseSidebar"
                        onClick={toggleSidebar}

                    >
                        <i className="fe fe-menu fe-16 navbar-toggler-icon"></i>
                    </button>
                </div>
                {console.log(userData)}
                {/* Mover la tarjeta de usuario fuera del contenedor 'myNav-links' */}
                <CardUserNav
                    name={userData.user?.name ? userData.user.name : ''}
                    lastName={userData.user?.lastName ? userData.user.lastName : ''}
                    rol={userRole ? userRole : ''}
                    userImg={userData.user?.userImg}
                />


                <div className='myNav-links'>
                    <div className='myNav-links-content'  >
                        {allowedPermissions && (
                            <>
                                {allowedPermissions.includes('Dashboard') || allowedPermissions.includes('Usuarios') && (
                                    <ListNav module={'Dashboard'} href='dashboard' icon='fe fe-bar-chart fe-24'
                                    />
                                )}
                                {allowedPermissions.includes('Notificaciones') && (
                                    <ListNav onClick={openNotifications} A1={1} module={'Notificaciones'} href='notifications' icon='fe fe-message-circle fe-24' />
                                )}
                                {allowedPermissions && (allowedPermissions.includes('Reservas') || allowedPermissions.includes('Ingresos')) ? (
                                    <DropDownNav module={"Reservas"} icon='fe fe-phone-outgoing fe-24'
                                    >

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

                                                (userRole === 'Administrador' || userRole === 'Admin' || userRole === 'Super Administrador') ?
                                                    < DropDownList subprocess={"Apartamentos"} href='apartments' />
                                                    : (userRole === 'Residente' || userRole === 'Residentes') ?
                                                        < DropDownList subprocess={"Apartamentos"} href={rutadetailsapartment} />
                                                        : null

                                            )}

                                            {/* {allowedPermissions.includes('Apartamentos') && (
                                                (userRole === 'Administrador' || userRole === 'Admin' || userRole === 'Super Administrador')
                                                    ? <ListNav module={'Apartamentos'} href='apartments' />
                                                    : (userRole === 'Residente' || userRole === 'Residentes')
                                                        ? <ListNav module={'Apartamentos'} href={rutadetailsapartment} />
                                                        : null
                                            )} */}

                                            {allowedPermissions.includes('Parqueaderos') && (
                                                <DropDownList subprocess={"Parqueaderos"} href='parkingSpaces/'></DropDownList>
                                            )}
                                            {allowedPermissions.includes('Zona Comunes') && (
                                                <DropDownList subprocess={"Zonas comunes"} href='spaces'></DropDownList>
                                            )}
                                            {allowedPermissions.includes('Zona Comunes') && (
                                                <DropDownList subprocess={"Bloques"} href='towers'></DropDownList>
                                            )}

                                        </DropDownNav>
                                    </>
                                ) : null}


                                {/* {allowedPermissions.includes('Multas') && (
                                    <ListNav module={'Multas'} href='fines' icon='fe fe-x-square fe-24' />
                                )} */}
                                <ListNav module={'Multas'} href='fines' icon='fe fe-x-square fe-24' />

                                {allowedPermissions.includes('Usuarios') && (
                                    <ListNav module={'Usuarios'} href='users/' icon='fe fe-user' />
                                )}

                                {allowedPermissions.includes('Vigilantes') && (
                                    (userRole === 'Administrador' || userRole === 'Admin' || userRole === 'Super Administrador')
                                        ? <DropDownNav module={"Seguridad"} icon='fe fe-shield fe-24'>

                                            <>
                                                {allowedPermissions.includes('Vigilantes') && (
                                                    <DropDownList subprocess={"Vigilantes"} href='watchman/'></DropDownList>
                                                )}
                                                {allowedPermissions.includes('Vigilantes') && (
                                                    <DropDownList subprocess={"Empresas Aliadas"} href='watchman/enterprice'></DropDownList>
                                                )}
                                            </>

                                        </DropDownNav>
                                        : (userRole === 'Vigilante' || userRole === 'Vigilantes' || userRole === 'Seguridad')
                                            ? <ListNav module={'Vigilantes'} href='watchman/shifts' icon='fe fe-shield' />
                                            : null
                                )}

                                {/* {allowedPermissions.includes('Vigilantes') && (
                                    <ListNav module={'Vigilantes'} href='watchman/' icon='fe fe-x-square fe-24' />
                                )} */}

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

            {/* Notifications */}

            {
                notificationsModal ?
                
                    <div class="modal fade modal-notif modal-slide notifications" >
                        <div class="modal-dialog modal-sm" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="defaultModalLabel">Notifications</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="list-group list-group-flush my-n3">
                                        <div class="list-group-item bg-transparent">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <span class="fe fe-box fe-24"></span>
                                                </div>
                                                <div class="col">
                                                    <small><strong>Package has uploaded successfull</strong></small>
                                                    <div class="my-0 text-muted small">Package is zipped and uploaded</div>
                                                    <small class="badge badge-pill badge-light text-muted">1m ago</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item bg-transparent">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <span class="fe fe-download fe-24"></span>
                                                </div>
                                                <div class="col">
                                                    <small><strong>Widgets are updated successfull</strong></small>
                                                    <div class="my-0 text-muted small">Just create new layout Index, form, table</div>
                                                    <small class="badge badge-pill badge-light text-muted">2m ago</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item bg-transparent">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <span class="fe fe-inbox fe-24"></span>
                                                </div>
                                                <div class="col">
                                                    <small><strong>Notifications have been sent</strong></small>
                                                    <div class="my-0 text-muted small">Fusce dapibus, tellus ac cursus commodo</div>
                                                    <small class="badge badge-pill badge-light text-muted">30m ago</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item bg-transparent">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <span class="fe fe-link fe-24"></span>
                                                </div>
                                                <div class="col">
                                                    <small><strong>Link was attached to menu</strong></small>
                                                    <div class="my-0 text-muted small">New layout has been attached to the menu</div>
                                                    <small class="badge badge-pill badge-light text-muted">1h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal">Clear All</button>
                                </div>
                            </div>
                        </div>
                    </div> : null
            }


        </>

    )
}
