
import "./Pages/Users/LogIn/LogIn.css"
import { HashRouter, Routes, Route } from 'react-router-dom';
import LogIn from './Pages/Users/LogIn/LogIn';
import { Owners } from './Pages/Residential/Owners/Owners';

import { ResidentCreate } from "./Pages/Residential/Residents/ResidentCreate";
import VisitorsCreate from "./Pages/Residential/Visitors/VisitorsCreate";
import { Layout } from "./Pages/Layout/Layout";
import { OwnersCreate } from "./Pages/Residential/Owners/OwnersCreate";
import { ParkingSpaces } from "./Pages/Spaces/ParkingSpaces/ParkingSpaces";
import { ParkingSpacesCreate } from "./Pages/Spaces/ParkingSpaces/ParkingSpacesCreate";
import { Spaces } from "./Pages/Spaces/Spaces/Spaces";
import { SpacesCreate } from "./Pages/Spaces/Spaces/SpacesCreate";
import { Users } from "./Pages/Users/Users/UsersList";
import { Watchman } from "./Pages/Surveillance/Watchmans/WatchmanList";
import { Rols } from "./Pages/Rols/RolsList";
import { RolsCreate } from "./Pages/Rols/RolsCreate";
import { RecoverPassword } from './Pages/Users/LogIn/RecoverPassword';
import { UsersCreate } from "./Pages/Users/Users/UsersCreate";
import { UsersEdit } from "./Pages/Users/Users/UserEdit";
import { ModifyProfile } from "./Pages/Users/Users/ModifyProfile";
import { ModifyProfileList } from "./Pages/Users/Users/ModifyProfileList";
import Visitors from "./Pages/Residential/Visitors/Visitors";
import GuestIncomeCreate from "./Pages/Booking/GuestIncome/GuestIncomeCreate";
import GuestIncome from "./Pages/Booking/GuestIncome/GuestIncome";
import { WatchmanCreate } from "./Pages/Surveillance/Watchmans/WatchmanCreate";
import { WatchmanShifts } from "./Pages/Surveillance/Watchmans/WatchmanShifts";
import { WatchmanDetails } from "./Pages/Surveillance/Watchmans/WatchmanDetails";
import { ResidentDetail } from "./Pages/Residential/Residents/ResidentDetail";
import { Booking } from "./Pages/Booking/Booking/booking";
import { BookingCreate } from "./Pages/Booking/Booking/bookingCreate";
import { OwnerDetail } from "./Pages/Residential/Owners/OwnersDetails";
import { ParkingSpacesDetails } from "./Pages/Spaces/ParkingSpaces/ParkingSpaceDetails";
import { SpaceDetails } from "./Pages/Spaces/Spaces/SpaceDetails";
import { Apartments } from "./Pages/Spaces/Apartments/Apartments";
import { ApartmentCreate } from "./Pages/Spaces/Apartments/ApartmentCreate";
import { RolsEditNew } from "./Pages/Rols/RolsEditNew";
import { AuthProvider } from "./Context/AuthContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Towers } from "./Pages/Spaces/Towers/Towers";
import { ApartmentDetails } from "./Pages/Spaces/Apartments/ApartmentDetail";
import { EnterRecoveryCode } from "./Pages/Users/LogIn/EnterRecoveryCode";
import { ResetPassword } from "./Pages/Users/LogIn/ResetPassword ";
import { EnterpriceSecurity } from "./Pages/Surveillance/Watchmans/EnterpriceSecurity";
import { EnterpriceSecurityCreate } from "./Pages/Surveillance/Watchmans/EnterpriceSecurityCreate";
// import Dashboard from "./Pages/Dashboard/Dashboard";
import { Notifications } from "./Pages/Notifications/Notifications";
import { Vehicle } from "./Pages/Residential/Vehicle/Vehicle";
import { VehicleCreate } from "./Pages/Residential/Vehicle/vehicleCreate";
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { idToPermissionName, idToPrivilegesName } from './Hooks/permissionRols';



import Fines from "./Pages/Fines/fines";
import FinesCreate from "./Pages/Fines/finesCreate";
import { Residents } from "./Pages/Residential/Residents/Residents";
import { TowerCreate } from "./Pages/Spaces/Towers/TowerCreate";

const socket = io('https://apptowerbackend.onrender.com/');


const App = () => {
    const [allowedPermissions, setAllowedPermissions] = useState([]);
    const token = Cookies.get('token');
    const [userData, setUserData] = useState({});
    console.log('Yo spy el userData App.jx:', userData);
    const [userRole, setUserRole] = useState('');
    console.log('Yo spy el rol App.jx:', userRole);

    useEffect(() => {
        if (token) {
            fetchUserPrivilegeAndPermission(token);
        }
    }, [token]);


    //Consulta privilegios 
    const fetchUserPrivilegeAndPermission = async (token) => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/privilegefromrole', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user privileges');
            }

            const data = await response.json();
            console.log(data, 'data');
            console.log('Allowed Permissions hi:', data.privileges);

            if (data && data.privileges && Array.isArray(data.privileges)) {
                const allowed = {};
                data.privileges.forEach(({ idpermission, idprivilege }) => {
                    const permissionName = idToPermissionName[idpermission];
                    const privilegeName = idToPrivilegesName[idprivilege];

                    if (!allowed[permissionName]) {
                        allowed[permissionName] = [];
                    }
                    allowed[permissionName].push(privilegeName);
                });

                setAllowedPermissions(allowed);
            }
        } catch (error) {
            console.error('Error fetching user permissions:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserInformation(token);

        }
    }, [token]);

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

    // useEffect(() => {
    //     socket.on('connect', () => {
    //     });
    // }, []);
    return (

        <AuthProvider>

            <HashRouter basename='/'>
                <div className='App'>
                    <Routes>

                        <Route path='/' element={<LogIn />} />
                        <Route path='/recoverpassword' element={<RecoverPassword />} />
                        <Route path="/recoveycode" element={<EnterRecoveryCode />} />
                        <Route path="/resetpassword" element={<ResetPassword />} />



                        <Route element={<ProtectedRoutes />}>
                            <Route path='/admin/*' element={<Layout />}>

                                <Route path='notfound' element={<NotFound />} />
                                {/* <Route path='dashboard' element={
                                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Listar') ?
                                        <Dashboard /> : <NotFound />
                                } /> */}

                                {/* Users */}
                                <Route path='users' element={
                                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Listar') ?
                                        <Users /> : <NotFound />
                                } />



                                <Route path='users/create' element={
                                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Crear') ?
                                        <UsersCreate /> : <NotFound />
                                } />

                                {/* <Route path='users/edit' element={
                                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Editar') ?
                                        <UsersEdit /> : <NotFound />
                                } /> */}

                                <Route path='users/edit/:iduser' element={<UsersEdit />} />
                                <Route path='users/profile' element={<ModifyProfile />} />
                                <Route path='users/profileList' element={<ModifyProfileList />} />



                                {/* Surveillance */}
                                <Route path='watchman' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Listar')
                                        ? (userRole === 'Administrador' || userRole === 'Admin' || userRole === 'Super Administrador')
                                            ? <>
                                                <Watchman />
                                                <EnterpriceSecurity />
                                            </>
                                            : <NotFound />
                                        : <NotFound />
                                } />

                                <Route path='watchman/shifts' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Listar')
                                        ? (userRole === 'Vigilante' || userRole === 'Vigilantes' || userRole === 'Seguridad')
                                            ? <WatchmanShifts />
                                            : <NotFound />
                                        : <NotFound />
                                } />
                                <Route path='watchman/create' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Crear') ?
                                        <WatchmanCreate /> : <NotFound />
                                } />

                                <Route path='watchman/details/:idwatchman' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Listar') ?
                                        <WatchmanDetails /> : <NotFound />
                                } />

                                <Route path='watchman/enterprice' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Listar')
                                        ? (userRole === 'Administrador' || userRole === 'Admin' || userRole === 'Super Administrador')
                                            ? <>
                                                <EnterpriceSecurity />
                                            </>
                                            : <NotFound />
                                        : <NotFound />
                                } />



                                <Route path='watchman/enterprice/create' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Crear') ?
                                        <WatchmanCreate /> : <NotFound />
                                } />

                                {/* <Route path='watchman' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Listar') ?
                                        <Watchman /> : <NotFound />
                                } /> */}


                                {/* Rols */}

                                <Route path='rols' element={
                                    allowedPermissions['Usuarios'] ?
                                        <Rols /> : <NotFound />
                                } />
                                <Route path='rols/create' element={
                                    allowedPermissions['Usuarios'] ?
                                        <RolsCreate /> : <NotFound />
                                } />
                                <Route path='rols/editNew/:idrole' element={
                                    allowedPermissions['Usuarios'] ?
                                        <RolsEditNew /> : <NotFound />
                                } />



                                {/* Bookings */}
                                <Route path='booking' element={
                                    allowedPermissions['Reservas'] && allowedPermissions['Reservas'].includes('Listar') ?
                                        <Booking /> : <NotFound />
                                } />

                                <Route path='booking/create' element={
                                    allowedPermissions['Reservas'] && allowedPermissions['Reservas'].includes('Crear') ?
                                        <BookingCreate socket={socket} /> : <NotFound />
                                } />


                                {/* GuestIncome */}
                                <Route path='guest_income' element={
                                    allowedPermissions['Ingresos'] && allowedPermissions['Ingresos'].includes('Listar') ?
                                        <GuestIncome /> : <NotFound />
                                } />

                                <Route path='guest_income/create/:id?' element={
                                    allowedPermissions['Ingresos'] && allowedPermissions['Ingresos'].includes('Crear') ?
                                        <GuestIncomeCreate /> : <NotFound />
                                } />
                                {/* 
                                <Route path='guest_income/create/:id' element={<GuestIncomeCreate />} /> */}
                                <Route path='fines/create/:id?' element={<FinesCreate />} />
                                {/* Visitors */}
                                <Route path='visitors' element={
                                    allowedPermissions['Visitantes'] && allowedPermissions['Visitantes'].includes('Listar') ?
                                        <Visitors /> : <NotFound />
                                } />

                                <Route path='visitors/create' element={
                                    allowedPermissions['Visitantes'] && allowedPermissions['Visitantes'].includes('Crear') ?
                                        <VisitorsCreate /> : <NotFound />
                                } />





                                {/* Spaces */}

                                {/*Apartments*/}
                                <Route path='apartments' element={
                                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Listar') ?
                                        <Apartments /> : <NotFound />
                                } />

                                <Route path='apartments/details/:id' element={
                                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Listar') ?
                                        <ApartmentDetails /> : <NotFound />
                                } />


                                <Route path='apartments/create' element={
                                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Crear') ?
                                        <ApartmentCreate /> : <NotFound />
                                } />

                                {/* Towers */}
                                <Route path='towers' element={<Towers />} />
                                <Route path='towers/create' element={<TowerCreate />} />
                                <Route path='apartments/create/:id' element={<ApartmentCreate />} />
                                <Route path='apartments/:id' element={<Apartments />} />




                                {/* Owners */}
                                <Route path='owners' element={
                                    allowedPermissions['Propietarios'] && allowedPermissions['Propietarios'].includes('Listar') ?
                                        <Owners /> : <NotFound />
                                } />

                                <Route path='owners/details/:id' element={
                                    allowedPermissions['Propietarios'] && allowedPermissions['Propietarios'].includes('Listar') ?
                                        <OwnerDetail /> : <NotFound />
                                } />


                                <Route path='owners/create' element={
                                    allowedPermissions['Propietarios'] && allowedPermissions['Propietarios'].includes('Crear') ?
                                        <OwnersCreate /> : <NotFound />
                                } />

                                <Route path='owners/create/:id' element={<OwnersCreate />} />



                                {/* Space */}
                                <Route path='spaces' element={
                                    allowedPermissions['Zona Comunes'] && allowedPermissions['Zona Comunes'].includes('Listar') ?
                                        <Spaces /> : <NotFound />
                                } />

                                <Route path='spaces/details/' element={
                                    allowedPermissions['Zona Comunes'] && allowedPermissions['Zona Comunes'].includes('Listar') ?
                                        <SpaceDetails /> : <NotFound />
                                } />


                                <Route path='spaces/create' element={
                                    allowedPermissions['Zona Comunes'] && allowedPermissions['Zona Comunes'].includes('Crear') ?
                                        <SpacesCreate /> : <NotFound />
                                } />



                                {/* Parking Spaces */}
                                <Route path='parkingSpaces' element={
                                    allowedPermissions['Parqueaderos'] && allowedPermissions['Parqueaderos'].includes('Listar') ?
                                        <ParkingSpaces /> : <NotFound />
                                } />
                                <Route path='parkingSpaces/details' element={
                                    allowedPermissions['Parqueaderos'] && allowedPermissions['Parqueaderos'].includes('Listar') ?
                                        <ParkingSpacesDetails /> : <NotFound />
                                } />
                                <Route path='parkingSpaces/create' element={
                                    allowedPermissions['Parqueaderos'] && allowedPermissions['Parqueaderos'].includes('Crear') ?
                                        <ParkingSpacesCreate /> : <NotFound />
                                } />




                                {/* Residents */}
                                <Route path='residents' element={
                                    allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Listar') ?
                                        <Residents /> : <NotFound />
                                } />
                                <Route path='residents/details:id' element={
                                    allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Listar') ?
                                        <ResidentDetail /> : <NotFound />
                                } />
                                <Route path='residents/create' element={
                                    allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Crear') ?
                                        <ResidentCreate /> : <NotFound />
                                } />


                                <Route path='residents/create/:id' element={<ResidentCreate />} />

                                {/* Notifications */}
                                <Route path='notifications' element={
                                    allowedPermissions['Notificaciones'] ?
                                        <Notifications socket={socket} /> : <NotFound />
                                } />




                                {/* Vehicles */}
                                <Route path='vehicle' element={
                                    allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Listar') ?
                                        <Vehicle /> : <NotFound />
                                } />
                                <Route path='vehicle/create' element={
                                    allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Crear') ?
                                        <VehicleCreate /> : <NotFound />
                                } />


                                {/* Fines */}
                                <Route path='fines/' element={<Fines />} />
                                {/* <Route path='fines/create' element={<FinesCreate />} /> */}



                            </Route >
                        </Route >
                        {/* </Route> */}
                    </Routes >
                </div >
            </HashRouter >

        </AuthProvider >

    )
}

export default App