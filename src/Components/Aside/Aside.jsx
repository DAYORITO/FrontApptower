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
import { useFetch, useFetchUserInformation, useFetchUserPermissions, useFetchget } from '../../Hooks/useFetch';
import { Spinner } from '../Spinner/Spinner';
import { io } from 'socket.io-client';

export const Aside = () => {

    const { user, login, logout } = useAuth();
    const token = Cookies.get('token');

    const [userRole, setUserRole] = useState('');
    const [userDocument, SetUserDocument] = useState('');
    const [idResidents, setIdResidents] = useState('');
    const [idApartment, setIdapartaments] = useState('');

    const [notificationsModal, setNotificationsModal] = useState(false)

    const openNotifications = () => {

        setNotificationsModal(!notificationsModal)
    }

    const { data: userData, get: getUser, loading: loadingUser } = useFetchUserInformation(token);
    
    const [profile, setProfile] = useState(userData)


    const { data: allowedPermissions, get: fetchPermissions, loading: loadingPermissions } = useFetchUserPermissions(token, idToPermissionName);

    const [nameRole, setNameRole] = useState('');
    const { data, load, error } = useFetchget('rols')


    useEffect(() => {
        if (data && userData && userData?.user) {
            const userRole = data?.rols?.find(role => role.idrole === userData?.user?.idrole)?.namerole;
            setNameRole(userRole);
        }
    }, [data, userData]);

    useEffect(() => {

        fetchPermissions();
    }, [allowedPermissions]);


    const url = "https://apptowerbackend.onrender.com/api/"

    const { data: resident, get: getResidentByDocument, loading } = useFetch(url)
    const { data: apartmentResidents, get: getApartmentResidents } = useFetch(url)


    useEffect(() => {

        getResidentByDocument(`residents/document/${userDocument}`)
        getApartmentResidents(`aparmentResidents/resident/${idResidents}`)


    }, [])

    useEffect(() => {

        setIdResidents(resident.data.residente && resident.residente.idResident);
        setIdapartaments(apartmentResidents.data.apartmentResidents && apartmentResidents.apartmentResidents.idApartment)

    }, [resident, apartmentResidents])




    // useEffect(() => {

    //     fetch(`https://apptowerbackend.onrender.com/api/residents/document/${userDocument}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.residente) {
    //                 setIdResidents(data.residente.idResident);

    //             }
    //         })
    //         .catch(error => console.error('Error:', error));


    //     fetch(`https://apptowerbackend.onrender.com/api/aparmentResidents/resident/${idResidents}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.apartmentResidents) {
    //                 setIdapartaments(data.apartmentResidents.idApartment)


    //             }
    //         })
    //         .catch(error => console.error('Error:', error));


    // }, [])




    const rutadetailsapartment = `apartments/details/${idApartment}`

    const [isCloset, setIsCloset] = useState(false);

    const toggleSidebar = () => {
        setIsCloset(!isCloset);
    };

    
    
    // useEffect(() => {

    //     const socket = io('http://localhost:3000');

    
    //     socket.emit('user-logied', userData);
        
    
    //     socket.on('user', data => {

    //         setProfile(data);
    //         console.log(profile)

    //     });

        
    //     return () => {
    //         socket.disconnect(); // Desconectar el socket cuando el componente se desmonta
    //     };
    // }, []);

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
                                    <ListNav onClick={openNotifications} A1={1} module={'Notificaciones'} icon='fe fe-message-circle fe-16' />
                                )}

                                {allowedPermissions.includes('Usuarios') && (
                                    <ListNav module={'Usuarios'} href='users/' icon='fe fe-user' />
                                )}

                                {allowedPermissions.includes('Vigilantes') && (
                                    nameRole && (nameRole.toLocaleLowerCase() === 'administrador')
                                        ? <DropDownNav module={"Vigilancia"} icon='fe fe-shield fe-24' isNavClosed={isCloset ? 'expended' : 'collapsed'}>
                                            <>
                                                {allowedPermissions.includes('Vigilantes') && (
                                                    <DropDownList subprocess={"Empresas de Seguridad"} href='watchman/enterprice'></DropDownList>
                                                )}
                                                {allowedPermissions.includes('Vigilantes') && (
                                                    <DropDownList subprocess={"Vigilantes"} href='watchman/'></DropDownList>
                                                )}

                                            </>
                                        </DropDownNav>
                                        : nameRole && (nameRole.toLocaleLowerCase() === 'vigilante' || nameRole.toLocaleLowerCase() === 'vigilancia' || nameRole.toLocaleLowerCase() === 'seguridad')
                                            ? <ListNav module={'Vigilantes'} href='watchman/shifts' icon='fe fe-shield' />
                                            : null
                                )}



                                {allowedPermissions.includes('Reservas') && (
                                    <ListNav module={'Reservas'} href='booking' icon='fe fe-calendar fe-24'
                                    />
                                )}


                                {allowedPermissions && (
                                    <>
                                        {allowedPermissions.includes('Propietarios') ||
                                            allowedPermissions.includes('Residentes') ||
                                            allowedPermissions.includes('Visitantes') ||
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

                                                (nameRole === 'Administrador' || nameRole === 'Admin' || nameRole === 'Super Administrador') ?
                                                    < DropDownList subprocess={"Apartamentos"} href='apartments' />
                                                    : (nameRole === 'Residente' || nameRole === 'Residentes') ?
                                                        < DropDownList subprocess={"Apartamentos"} href={rutadetailsapartment} />
                                                        : null

                                            )}

                                            {allowedPermissions.includes('Apartamentos') && (
                                                <DropDownList subprocess={"Bloques"} href='towers' ></DropDownList>
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
                                {/* <ListNav module={'Multas'} href='fines' icon='fe fe-x-square fe-24' /> */}



                                {/* {allowedPermissions.includes('Vigilantes') && (
                                    <ListNav module={'Vigilantes'} href='watchman/' icon='fe fe-x-square fe-24' />
                                )} */}

                            </>
                        )}

                    </div>

                    <div className='myNav-links-end'>
                        {allowedPermissions && (allowedPermissions.includes('Usuarios') && nameRole.toLocaleLowerCase().includes("administrador")) && (
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
