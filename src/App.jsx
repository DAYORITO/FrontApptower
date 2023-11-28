
import "./Pages/Users/LogIn/LogIn.css"
import { HashRouter, Routes, Route } from 'react-router-dom';
import LogIn from './Pages/Users/LogIn/LogIn';
import { Owners } from './Pages/Residential/Owners/Owners';
import { Residents } from './Pages/Residential/Residents/Residents';
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
import { RolsEdit } from "./Pages/Rols/RolsEdit";
import { RecoverPassword } from './Pages/Users/LogIn/RecoverPassword';
import { UsersCreate } from "./Pages/Users/Users/UsersCreate";
import { ModifyProfile } from "./Pages/Users/Users/modifyProfile";
import Visitors from "./Pages/Residential/Visitors/Visitors";
import GuestIncomeCreate from "./Pages/Booking/GuestIncome/GuestIncomeCreate";
import GuestIncome from "./Pages/Booking/GuestIncome/GuestIncome";
import { WatchmanCreate } from "./Pages/Surveillance/Watchmans/WatchmanCreate";
import { WatchmanShifts } from "./Pages/Surveillance/Watchmans/WatchmanShifts";
import { ResidentDetail } from "./Pages/Residential/Residents/ResidentDetail";
import { Booking } from "./Pages/Booking/Booking/booking";
import { BookingCreate } from "./Pages/Booking/Booking/bookingCreate";
import { OwnerDetails } from "./Pages/Residential/Owners/OwnersDetails";
import { ParkingSpacesDetails } from "./Pages/Spaces/ParkingSpaces/ParkingSpaceDetails";
import { SpaceDetails } from "./Pages/Spaces/Spaces/SpaceDetails";
import { Apartments } from "./Pages/Spaces/Apartments/Apartments";
import { ApartmentCreate } from "./Pages/Spaces/Apartments/ApartmentCreate";
import { RolsEditNew } from "./Pages/Rols/RolsEditNew";
import { AuthProvider } from "./Context/AuthContext";
import { ProtectedRoutes } from "./ProtectedRoutes";



const App = () => {
    return (

        <AuthProvider>

            <HashRouter basename='/'>
                <div className='App'>
                    <Routes>

                        <Route path='/' element={<LogIn />} />
                        <Route path='/recoverpassword' element={<RecoverPassword />} />


                        <Route element={<ProtectedRoutes />}>


                            <Route path='/admin/*' element={<Layout />}>


                                {/* Configuration */}
                                {/* Rols */}
                                <Route path='rols/' element={<Rols />} />

                                {/* Users */}
                                {/* User */}
                                <Route path='users/' element={<Users />} />
                                <Route path='users/create' element={<UsersCreate />} />


                                {/* Surveillance */}
                                {/* Watchman */}
                                <Route path='watchman/' element={<Watchman />} />
                                <Route path='watchman/create' element={<WatchmanCreate />} />

                                {/* Bookings */}
                                {/* Booking */}
                                <Route path='booking/' element={<Booking />} />
                                <Route path='booking/create' element={<BookingCreate />} />

                                {/* GuestIncome */}
                                <Route path='guest_income/create' element={<GuestIncomeCreate />} />
                                <Route path='guest_income/' element={<GuestIncome />} />

                                {/* Spaces */}

                                {/* Space */}
                                <Route path='apartments/' element={<Apartments />} />
                                <Route path='apartments/create' element={<ApartmentCreate />} />
                                <Route path='apartments/details' element={<SpaceDetails />} />


                                {/* Space */}
                                <Route path='spaces/' element={<Spaces />} />
                                <Route path='spaces/create' element={<SpacesCreate />} />
                                <Route path='spaces/details' element={<SpaceDetails />} />


                                {/* Parking Spaces */}
                                <Route path='parkingSpaces/' element={<ParkingSpaces />} />
                                <Route path='parkingSpaces/create' element={<ParkingSpacesCreate />} />
                                <Route path='parkingSpaces/details' element={<ParkingSpacesDetails />} />



                                {/* Residential */}
                                {/* Vehicles */}

                                <Route path='users/' element={<Users />} />
                                <Route path='users/create' element={<UsersCreate />} />
                                <Route path='users/profile' element={<ModifyProfile />} />
                                <Route path='watchman/' element={<Watchman />} />
                                <Route path='watchman/create' element={<WatchmanCreate />} />
                                <Route path='watchman/shifts' element={<WatchmanShifts />} />
                                <Route path='rols/' element={<Rols />} />
                                <Route path='rols/create' element={<RolsCreate />} />
                                <Route path='rols/edit/:idrole' element={<RolsEdit />} />
                                <Route path='rols/editNew/:idrole' element={<RolsEditNew />} />




                                {/* Owners */}
                                <Route path='owners/' element={<Owners />} />
                                <Route path='owners/create' element={<OwnersCreate />} />
                                <Route path='owners/details' element={<OwnerDetails />} />


                                {/* Visitors */}
                                <Route path='visitors/create' element={<VisitorsCreate />} />
                                <Route path='visitors/' element={<Visitors />} />

                                {/* Residents */}
                                <Route path='residents/' element={<Residents />} />
                                <Route path='residents/create' element={<ResidentCreate />} />
                                <Route path='residents/details' element={<ResidentDetail />} />
                                {/* Notifications */}
                                {/* Notification */}

                                {/* Fines */}



                            </Route>
                        </Route>
                        {/* </Route> */}
                    </Routes>
                </div>
            </HashRouter>

        </AuthProvider>

    )
}

export default App