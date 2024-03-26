import React, { useState, useEffect, useContext } from 'react';
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
import { useAllowedPermissions, useFetch, useFetchUserInformation, useFetchget } from '../../Hooks/useFetch';

import { RowNotificactions } from '../RowNotificacions/RowNotificactions';
import { NotificationsAlert } from '../NotificationsAlert/NotificationsAlert';
import { SocketContext } from '../../Context/SocketContext';
import { useUserLogged } from '../../Helpers/Helpers';

export const Aside = () => {

    const { user, login, logout } = useAuth();

    const token = Cookies.get('token');


    const { idUserLogged, idRolLogged } = useUserLogged()



    // Socket

    const { notifications, socket, setNotifications } = useContext(SocketContext)


    //Consulta Permisos

    const allowedPermissions = useAllowedPermissions(idToPermissionName);

    const [userRole, setUserRole] = useState('');
    const [userDocument, SetUserDocument] = useState('');
    const [idResidents, setIdResidents] = useState('');
    const [idApartment, setIdapartaments] = useState('');

    const { data: userData, get: getUser, loading: loadingUser } = useFetchUserInformation(token);

    const [profile, setProfile] = useState(userData)

    const [nameRole, setNameRole] = useState('');
    const { data, load, error } = useFetchget('rols')

    console.log(nameRole, 'nameRole')


    useEffect(() => {
        if (data && userData && userData?.user) {
            const userRole = data?.rols?.find(role => role.idrole === userData?.user?.idrole)?.namerole;
            setNameRole(userRole);
        }
    }, [data, userData]);



    const url = "https://apptowerbackend.onrender.com/api/"

    const { data: resident, get: getResident, loading } = useFetch(url)

    console.log(resident, 'resident')
    const { data: apartmentResidents, get: getApartmentResidents } = useFetch(url)

    const IdApartment = resident?.data?.residents?.find(resident => resident.iduser === idUserLogged)?.apartments[0]?.idApartment;


    const rutadetailsapartment = `apartments/details/${IdApartment}`

    useEffect(() => {
        getResident('residents')

    }, [])




    // Seen notification

    const [idnotification, setIdNotification] = useState('')

    const isSeen = (id) => {

        setIdNotification(id)

        socket.emit('seen-notification', id)

        socket.on('notifications-user', (notificationsUpdated) => {

            setNotifications(notificationsUpdated)

        })


    }

    const [notificationsModal, setNotificationsModal] = useState(false)



    // Open modal notifications

    const openNotifications = () => {

        setNotificationsModal(!notificationsModal)

        socket.disconnect(); socket.connect();

    }

    // Open and closed sidevar

    const [isCloset, setIsCloset] = useState(false);

    const toggleSidebar = async () => {

        setIsCloset(!isCloset);

        socket.disconnect(); socket.connect();

    };


    const filteredNotifications = notifications.filter((notification) => {

        let notificationToSee;

        if (notification.iduser == idUserLogged) {

            notificationToSee = !notification.seen
        } else {

            notificationToSee = !notification.seen && notification.iduser !== idUserLogged
        }
        // return notificationToSee;
        return !notification.seen && notification.iduser !== idUserLogged;
    });

    const [activeLink, setActiveLink] = useState('');

    const handleClick = (href) => {
        setActiveLink(href);
    };

    return (
        <>

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
                    name={userData?.user?.name ? userData?.user?.name : ''}
                    lastName={userData?.user?.lastName ? userData?.user?.lastName : ''}
                    rol={nameRole ? nameRole : ''}
                    userImg={userData?.user?.userImg}

                    to={
                        nameRole?.toLocaleLowerCase().includes('vigilante') ||
                            nameRole?.toLocaleLowerCase().includes('vigilancia') ||
                            nameRole?.toLocaleLowerCase().includes('seguridad')
                            ? `watchman/details/${userData?.user?.iduser}`
                            : nameRole?.toLocaleLowerCase().includes('residente')
                                ? `resident/details/${userData?.user?.iduser}`
                                : `users/details/${userData?.user?.iduser}`
                    }


                />


                <div className='myNav-links'>
                    <div className='myNav-links-content'  >
                        {allowedPermissions && (
                            <>
                                {allowedPermissions.includes('Usuarios') && nameRole?.toLocaleLowerCase().includes('administrador') && (
                                    <ListNav module={'Dashboard'} href='dashboard' icon='fe fe-bar-chart fe-24'
                                    />
                                )}

                                {allowedPermissions.includes('Notificaciones') && (
                                    <ListNav onClick={openNotifications}
                                        A1={filteredNotifications?.length}
                                        module={'Notificaciones'} icon='fe fe-message-circle fe-16'
                                    />
                                )}

                                {allowedPermissions.includes('Usuarios') && (
                                    <ListNav module={'Usuarios'} href='users/' icon='fe fe-user' />
                                )}

                                {allowedPermissions.includes('Vigilantes') && (
                                    <DropDownNav module={"Vigilancia"} icon='fe fe-shield fe-24' isNavClosed={isCloset ? 'expended' : 'collapsed'}>
                                        <>
                                            {allowedPermissions.includes('Vigilantes') && (
                                                <DropDownList subprocess={"Empresas de Seguridad"} href='watchman/enterprice'></DropDownList>
                                            )}
                                            {allowedPermissions.includes('Vigilantes') && (
                                                <DropDownList subprocess={"Vigilantes"} href='watchman/'></DropDownList>
                                            )}

                                        </>
                                    </DropDownNav>
                                )}

                                {
                                    allowedPermissions && allowedPermissions.includes('Reservas')
                                        ?

                                        (nameRole?.toLowerCase()?.includes('residente'))
                                            ? <ListNav module={'Reservas'} href='booking/calendar' icon='fe fe-calendar fe-24' />
                                            : <ListNav module={'Reservas'} href='booking' icon='fe fe-calendar fe-24' />

                                        : null
                                }

                                {allowedPermissions && (
                                    <>
                                        {allowedPermissions.includes('Propietarios') ||
                                            allowedPermissions.includes('Residentes') ||
                                            allowedPermissions.includes('Visitantes') ||
                                            allowedPermissions.includes('Ingresos') ||
                                            allowedPermissions.includes('Vehiculos') ? (
                                            <DropDownNav module={"Residencial"} icon='fe fe-users fe-24' isNavClosed={isCloset ? 'expended' : 'collapsed'}>

                                                <>
                                                    {allowedPermissions.includes('Ingresos') && (
                                                        <DropDownList subprocess={"Ingresos de Visitantes"} href='guest_income/' ></DropDownList>
                                                    )}
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
                                        <DropDownNav module={"Espacios"} isNavClosed={isCloset ? 'expended' : 'collapsed'}>

                                            {allowedPermissions.includes('Apartamentos') && (

                                                (nameRole === 'Residente' || nameRole === 'Residentes') ?
                                                    < DropDownList subprocess={"Apartamentos"} href={rutadetailsapartment} />
                                                    : <DropDownList subprocess={"Apartamentos"} href='apartments/' ></DropDownList>


                                            )}


                                            {allowedPermissions.includes('Apartamentos') && (
                                                nameRole === 'Residente' ? null : <DropDownList subprocess={"Bloques"} href='towers' />
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
                                    <ListNav module={'Multas'} href='fines' icon='fe fe-file-plus fe-24' />
                                )}
                                {/* <ListNav module={'Multas'} href='fines' icon='fe fe-x-square fe-24' /> */}



                                {/* {allowedPermissions.includes('Vigilantes') && (
                                    <ListNav module={'Vigilantes'} href='watchman/' icon='fe fe-x-square fe-24' />
                                )} */}

                            </>
                        )}

                    </div>

                    <div className='myNav-links-end'>
                        {allowedPermissions && (allowedPermissions.includes('Usuarios') && nameRole?.toLocaleLowerCase().includes("administrador")) && (
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

                                {
                                    notifications?.length == 0 ? <NotificationsAlert msg={'No tienes notificaciones.'} /> :
                                        notifications?.map((notification, index) => {
                                            return (
                                                <RowNotificactions
                                                    isNotification={true}
                                                    who={notification?.content?.information?.userLogged && notification?.content?.information?.userLogged}
                                                    seen={notification.seen}
                                                    key={index}
                                                    type={notification.type}
                                                    msg={notification.content.message}
                                                    to={notification.content.information}
                                                    date={notification.createdAt}
                                                    onclick={() => isSeen(notification.idnotification)}
                                                />
                                            )
                                        })
                                }
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
