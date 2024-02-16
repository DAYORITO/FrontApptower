
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
import { UsersDetails } from "./Pages/Users/Users/UsersDetails";
import { Booking } from "./Pages/Booking/Booking/booking";
import { BookingCreate } from "./Pages/Booking/Booking/bookingCreate";
import { OwnerDetail } from "./Pages/Residential/Owners/OwnersDetails";
import { SpaceDetails } from "./Pages/Spaces/Spaces/SpaceDetails";
import { Apartments } from "./Pages/Spaces/Apartments/Apartments";
import { ApartmentCreate } from "./Pages/Spaces/Apartments/ApartmentCreate";
import { RolsEditNew } from "./Pages/Rols/RolsEditNew";
import { AuthProvider } from "./Context/AuthContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NotFound } from "./Pages/PagesAdicional/NotFound";
import { Towers } from "./Pages/Spaces/Towers/Towers";
import { ApartmentDetails } from "./Pages/Spaces/Apartments/ApartmentDetail";
import { EnterRecoveryCode } from "./Pages/Users/LogIn/EnterRecoveryCode";
import { ResetPassword } from "./Pages/Users/LogIn/ResetPassword ";
import { EnterpriceSecurity } from "./Pages/Surveillance/Watchmans/EnterpriceSecurity";
import { EnterpriceSecurityCreate } from "./Pages/Surveillance/Watchmans/EnterpriceSecurityCreate";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Notifications } from "./Pages/Notifications/Notifications";
import { Vehicle } from "./Pages/Residential/Vehicle/Vehicle";
import { VehicleCreate } from "./Pages/Residential/Vehicle/vehicleCreate";
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { idToPermissionName, idToPrivilegesName } from './Hooks/permissionRols';
import { ResidentDetails } from "./Pages/Residential/Residents/ResidentDetails";
import { LoadingPage } from "./Pages/PagesAdicional/Loading";




import Fines from "./Pages/Fines/fines";
import FinesCreate from "./Pages/Fines/finesCreate";
import { Residents } from "./Pages/Residential/Residents/Residents";
import { TowerCreate } from "./Pages/Spaces/Towers/TowerCreate";
import useFetchUserPrivileges, { useFetchUserInformation, useFetchget } from "./Hooks/useFetch";
// import { UserDetail } from "./Pages/Users/Users/userDetails";

const socket = io('https://apptowerbackend.onrender.com/');


const App = () => {
    const token = Cookies.get('token');
    const [userRole, setUserRole] = useState('');

    const { data: userData, get: getUser, loading: loadingUser } = useFetchUserInformation(token);


    const { data: allowedPermissions, get: fetchPermissions, loading: loadingPermissions } = useFetchUserPrivileges(token, idToPermissionName, idToPrivilegesName);

    const [nameRole, setNameRole] = useState('');
    const { data, load, error } = useFetchget('rols')

    useEffect(() => {
        if (data && userData && userData?.user) {
            const userRole = data?.rols?.find(role => role.idrole === userData?.user?.idrole)?.namerole;
            setNameRole(userRole);
        }
    }, [data, userData]);



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
                                <Route path='dashboard' element={
                                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Listar') ?
                                        <Dashboard /> : <NotFound />
                                } />

                                {/* Users */}
                                <Route path='users' element={
                                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Listar') ?
                                        <Users /> : <NotFound />
                                } />

                                <Route path='users/details/:id' element={<UsersDetails />} />

                                <Route path='users/create/:id?' element={
                                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Crear') ?
                                        <UsersCreate /> : <NotFound />
                                } />


                                {/* <Route path='users/edit' element={
                                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Editar') ?
                                        <UsersEdit /> : <NotFound />
                                } /> */}

                                <Route path='users/edit/:iduser' element={<UsersEdit />} />



                                {/* Surveillance */}
                                <Route path='watchman' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Listar')
                                        ? (nameRole && (nameRole.toLocaleLowerCase() === 'administrador'))
                                            ? <>
                                                <Watchman />
                                                <EnterpriceSecurity />
                                            </>
                                            : <NotFound />
                                        : <NotFound />
                                } />

                                <Route path='watchman/shifts' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Listar')
                                        ? (nameRole && (nameRole.toLocaleLowerCase() === 'vigilante' || nameRole.toLocaleLowerCase() === 'vigilancia' || nameRole.toLocaleLowerCase() === 'seguridad'))
                                            ? <WatchmanShifts />
                                            : <NotFound />
                                        : <NotFound />
                                } />


                                <Route path='watchman/create' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Crear') ?
                                        <WatchmanCreate /> : <NotFound />
                                } />

                                <Route path='watchman/details/:id' element={<WatchmanDetails />} />

                                <Route path='watchman/enterprice' element={
                                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Listar')
                                        ? (nameRole && (nameRole.toLocaleLowerCase() === 'administrador'))
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



                                {/* GuestIncome */}
                                <Route path='guest_income' element={
                                    allowedPermissions['Ingresos'] && allowedPermissions['Ingresos'].includes('Listar') ?
                                        <GuestIncome /> : <NotFound />
                                } />

                                <Route path='guest_income/create/:id?' element={
                                    allowedPermissions['Ingresos'] && allowedPermissions['Ingresos'].includes('Crear') ?
                                        <GuestIncomeCreate /> : <NotFound />
                                } />




                                {/* Visitors */}

                                <Route path='visitors' element={
                                    allowedPermissions['Visitantes'] && allowedPermissions['Visitantes'].includes('Listar') ?
                                        <Visitors /> : <NotFound />
                                } />

                                <Route path='visitors/create' element={
                                    allowedPermissions['Visitantes'] && allowedPermissions['Visitantes'].includes('Crear') ?
                                        <VisitorsCreate /> : <NotFound />
                                } />

                                {/* Fines */}
                                <Route path='fines' element={
                                    allowedPermissions['Multas'] && allowedPermissions['Multas'].includes('Listar') ?
                                        <Fines /> : <NotFound />
                                } />

                                <Route path='fines/create' element={
                                    allowedPermissions['Multas'] && allowedPermissions['Multas'].includes('Crear') ?
                                        <FinesCreate /> : <NotFound />
                                } />



                                {/* {/* Spaces */}

                                {/*Apartments*/}
                                <Route path='apartments/:id?' element={
                                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Listar') ?
                                        <Apartments /> : <NotFound />
                                } />

                                <Route path='apartments/details/:id' element={
                                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Listar') ?
                                        <ApartmentDetails /> : <NotFound />
                                } />


                                <Route path='apartments/create/id?' element={
                                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Crear') ?
                                        <ApartmentCreate /> : <NotFound />
                                } />

                                {/* Towers */}
                                <Route path='towers' element={
                                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Listar') ?
                                        <Towers /> : <NotFound />
                                } />

                                <Route path='towers/create' element={
                                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Listar') ?
                                        <TowerCreate /> : <NotFound />
                                } />



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

                                <Route path='owners/create/:id' element={
                                    allowedPermissions['Propietarios'] && allowedPermissions['Propietarios'].includes('Crear') ?
                                        <OwnersCreate /> : <NotFound />
                                } />



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
                                <Route path='parkingSpaces/:id?' element={
                                    allowedPermissions['Parqueaderos'] && allowedPermissions['Parqueaderos'].includes('Listar') ?
                                        <ParkingSpaces /> : <NotFound />
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

                                {/* <Route path='resident/details/:id' element={
                                    allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Listar') ?
                                        <ResidentDetails /> : <NotFound />
                                } /> */}

                                <Route path='residents/create/:id?' element={
                                    allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Crear') ?
                                        <ResidentCreate /> : <NotFound />
                                } />

                                <Route path='resident/details/:id' element={<ResidentDetails />} />





                                {/* Notifications */}
                                <Route path='notifications' element={
                                    allowedPermissions['Notificaciones'] ?
                                        <Notifications socket={socket} /> : <NotFound />
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



                                {/* Vehicles */}
                                <Route path='vehicle' element={
                                    allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Listar') ?
                                        <Vehicle /> : <NotFound />
                                } />
                                <Route path='vehicle/create' element={
                                    allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Crear') ?
                                        <VehicleCreate /> : <NotFound />
                                } />
                                <Route path='vehicle/create/:id?' element={
                                    allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Crear') ?
                                        <VehicleCreate /> : <NotFound />
                                } />





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