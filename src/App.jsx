
import "./Pages/LogIn/LogIn.css"
import { HashRouter, Routes, Route } from 'react-router-dom';
import LogIn from './Pages/LogIn/LogIn';
import { Owners } from './Pages/Owners/Owners';
import { Residents } from './Pages/Residents/Residents';
import { ResidentCreate } from "./Pages/Residents/ResidentCreate";
import VisitorsCreate from "./Pages/Visitors/VisitorsCreate";
import { Layout } from "./Pages/Layout/Layout";
import { OwnersCreate } from "./Pages/Owners/OwnersCreate";
import { ParkingSpaces } from "./Pages/ParkingSpaces/ParkingSpaces";
import { ParkingSpacesCreate } from "./Pages/ParkingSpaces/ParkingSpacesCreate";
import { Spaces } from "./Pages/Spaces/Spaces";
import { SpacesCreate } from "./Pages/Spaces/SpacesCreate";
import { Users } from "./Pages/Users/UsersList";
import { Watchman } from "./Pages/Watchmans/WatchmanList";
import { Rols } from "./Pages/Rols/RolsList";
import { RecoverPassword } from './Pages/LogIn/RecoverPassword';
import { UsersCreate } from "./Pages/Users/UsersCreate";
import Visitors from "./Pages/Visitors/Visitors";
import GuestIncomeCreate from "./Pages/GuestIncome/GuestIncomeCreate";
import GuestIncome from "./Pages/GuestIncome/GuestIncome";
import { WatchmanCreate } from "./Pages/Watchmans/WatchmanCreate";
import { ResidentDetail } from "./Pages/Residents/ResidentDetail";


const App = () => {
    return (

        <HashRouter basename='/'>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<LogIn />} />
                    <Route path='/recoverpassword' element={<RecoverPassword />} />

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

                            {/* GuestIncome */}
                            <Route path='guest_income/create' element={<GuestIncomeCreate />} />
                            <Route path='guest_income/' element={<GuestIncome />} />

                        {/* Spaces */}
                            {/* Space */}
                            <Route path='spaces/' element={<Spaces />} />
                            <Route path='spaces/create' element={<SpacesCreate />} />

                            {/* Parking Spaces */}
                            <Route path='parkingSpaces/' element={<ParkingSpaces />} />
                            <Route path='parkingSpaces/create' element={<ParkingSpacesCreate />} />

                        {/* Residential */}
                            {/* Vehicles */}

                            {/* Owners */}
                            <Route path='owners/' element={<Owners />} />
                            <Route path='owners/create' element={<OwnersCreate />} />

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
                </Routes>
            </div>
        </HashRouter>
    )
}

export default App