import React, { useState, useEffect } from 'react';
import './Aside.css';
import './AsideNotifications.css';

import { DropDownList, DropDownNav, ListNav } from '../DropDownNav/DropDownNav';
import { CardUserNav } from '../CardUserNav/CardUserNav';
import { useAuth } from '../../Context/AuthContext';
import { idToPermissionName } from '../../Hooks/permissionRols';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Modal, ModalContainer, ModalNotifications } from '../Modals/ModalTwo';
import { useFetchUserInformation, useFetchget } from '../../Hooks/useFetch';


export const Aside = () => {

    const { user, login, logout } = useAuth();
    const token = Cookies.get('token');
    const [allowedPermissions, setAllowedPermissions] = useState([]);

    const [userRole, setUserRole] = useState('');
    const [userDocument, SetUserDocument] = useState('');
    const [idResidents, setIdResidents] = useState('');
    const [idApartment, setIdapartaments] = useState('');

    const [notificationsModal, setNotificationsModal] = useState(false)

    const openNotifications = () => {

        setNotificationsModal(!notificationsModal)
    }

    useEffect(() => {
        if (token) {
            fetchUserPermissions(token);
            // fetchUserInformation(token);
        }
    }, [token]);

    // console.log(token, 'holaaa')
    // console.log(allowedPermissions, 'permisos hptassss')


    const fetchUserPermissions = async (token) => {
        try {
            const response = await fetch('http://localhost:3000/api/permissionfromrole', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
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
            // console.error('Error fetching user permissions:', error);
        }
    };

    // const fetchUserInformation = async (token) => {
    //     try {
    //         const response = await fetch('https://apptowerbackend.onrender.com/api/informationUser', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch user information');
    //         }

    //         const data = await response.json();
    //         setuserD(data);
    //         SetUserDocument(data.user.document);

    //     } catch (error) {
    //         console.error('Error fetching user information:', error);
    //     }
    // };

    const { data: userD, get: getUser, loading: loadingUser } = useFetchUserInformation(token);

    // console.log(userD, 'holaaa')

    const fechDataRols = async () => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/rols');

            if (!response.ok) {
                throw new Error('Failed to fetch roles');
            }

            const data = await response.json();
            const rols = data.rols;
            if (Array.isArray(rols)) {
                const userRole = rols.find(role => role.idrole === userD.user.idrole)?.namerole;
                setUserRole(userRole);
            } else {
                // console.error('Error: roles data is not an array:', rols);
            }
        } catch (error) {
            // console.error('Error fetching roles:', error);
        }
    };

    useEffect(() => {
        if (userD?.user && userD?.user?.idrole) {
            fechDataRols();
        }
    }, [userD]);

    const { dataRoles, load, error } = useFetchget('rols')

    // console.log(dataRoles)



    const redireccion = useNavigate();

    // useEffect(() => {
    //     if (token) {

    //         fetchUserInformation(token);
    //     }
    // }, [token]);





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

    const [isCloset, isOpem] = useState(false);

    const toggleSidebar = () => {
        isOpem(!isCloset);
    };

    // // Sockets

    // let [isConect, setIsConect] = useState(false);

    // const socket = io("http://localhost:3000/");

    // socket.on('connect', () => {
    //     setIsConect(true);
    // });

    // socket.on('disconnect', () => {
    //     setIsConect(false);
    // });

    // socket.on('connect', () => {
    //   console.log('Conexión establecida con el servidor');
    // });

    // console.log(isConect? 'Esta conectado': 'No esta conectado')

    return (
        <>
            <div>

            </div>
            <nav className={`myNav ${isCloset ? 'expanded' : 'collapsed'}`}
                onMouseEnter={isCloset ? null : toggleSidebar}
            >


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
                    name={userD?.user?.name ? userD?.user?.name : ''}
                    lastName={userD?.user?.lastName ? userD?.user?.lastName : ''}
                    rol={userRole ? userRole : ''}
                    userImg={userD?.user?.userImg}

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
                                    <ListNav onClick={openNotifications} A1={1} module={'Notificaciones'} icon='fe fe-message-circle fe-24' />
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


                                {allowedPermissions.includes('Multas') && (
                                    <ListNav module={'Multas'} href='fines' icon='fe fe-x-square fe-24' />
                                )}
                                {/* <ListNav module={'Multas'} href='fines' icon='fe fe-x-square fe-24' /> */}

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

            {notificationsModal &&
                createPortal(
                    <>
                        <ModalContainer showModal={setNotificationsModal}>
                            <ModalNotifications showModal={setNotificationsModal}>

                            </ModalNotifications>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

            {/* Notifications */}

            {/* {
                notificationsModal ?

                
                    
                    : null
            } */}


        </>

    )
}
