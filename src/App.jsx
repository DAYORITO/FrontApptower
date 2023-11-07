
import "./Pages/LogIn/LogIn.css"
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import LogIn from './Pages/LogIn/LogIn';
import { Owners } from './Pages/Owners/owners';
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
import {RecoverPassword} from './Pages/LogIn/RecoverPassword';
import { UsersCreate} from "./Pages/Users/UsersCreate";
import Visitors from "./Pages/Visitors/Visitors";
import GuestIncomeCreate from "./Pages/GuestIncome/GuestIncomeCreate";
import GuestIncome from "./Pages/GuestIncome/GuestIncome";


const App = () => {
    return (

        <HashRouter basename='/'>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<LogIn />} />
                    <Route path='/recoverpassword' element={<RecoverPassword />} />

                    <Route path='/admin/*' element={<Layout />}>
                        <Route path='residents/' element={<Residents />} />
                        <Route path='residents/create' element={<ResidentCreate />} />

                        <Route path='owners/' element={<Owners />} />
                        <Route path='owners/create' element={<OwnersCreate />} />

                        <Route path='parkingSpaces/' element={<ParkingSpaces />} />
                        <Route path='parkingSpaces/create' element={<ParkingSpacesCreate />} />

                        <Route path='spaces/' element={<Spaces />} />
                        <Route path='spaces/create' element={<SpacesCreate />} />

                        <Route path='visitors/create' element={<VisitorsCreate />} />
                        <Route path='visitors/' element={<Visitors />} />

                        <Route path='guest_income/create' element={<GuestIncomeCreate />} />
                        <Route path='guest_income/' element={<GuestIncome />} />
                        

                        <Route path='users/' element={<Users />} />
                        <Route path='users/create' element={<UsersCreate />} />
                        <Route path='watchman/' element={<Watchman />} />
                        <Route path='watchman/create' element={<WatchmanCreate />} />
                        <Route path='rols/' element={<Rols />} />
                        
                    </Route>



                </Routes>
            </div>
        </HashRouter>
    )
}

export default App