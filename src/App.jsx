
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

const App = () => {
    return (

        <HashRouter basename='/'>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<LogIn />} />

                    <Route path='/admin/*' element={<Layout />}>
                        <Route path='residents/' element={<Residents />} />
                        <Route path='residents/create' element={<ResidentCreate />} />

                        <Route path='owners/' element={<Owners />} />
                        <Route path='owners/create' element={<OwnersCreate />} />

                        <Route path='parkingSpaces/' element={<ParkingSpaces />} />
                        <Route path='parkingSpaces/create' element={<ParkingSpacesCreate />} />

                        <Route path='spaces/' element={<Spaces />} />
                        <Route path='spaces/create' element={<SpacesCreate />} />

                    </Route>

                    <Route path='/visitors/create' element={<VisitorsCreate />} />


                </Routes>
            </div>
        </HashRouter>
    )
}

export default App