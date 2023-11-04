
import "./Pages/LogIn/LogIn.css"
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import LogIn from './Pages/LogIn/LogIn';
import { Owners } from './Pages/Owners/owners';
import { Residents } from './Pages/Residents/Residents';
import { ResidentCreate } from "./Pages/Residents/ResidentCreate";
import VisitorsCreate from "./Pages/Visitors/VisitorsCreate";
import { Layout } from "./Pages/Layout/Layout";
import { Users } from "./Pages/Users/UsersList";
import { Watchman } from "./Pages/Watchmans/WatchmanList";
import { Rols } from "./Pages/Rols/RolsList";

const App = () => {
    return (

        <HashRouter basename='/'>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<LogIn />} />

                    <Route path='/admin/*' element={<Layout />}>
                        <Route path='residents/' element={<Residents />} />
                        <Route path='residents/create' element={<ResidentCreate />} />
                        <Route path='users/' element={<Users />} />
                        <Route path='watchman/' element={<Watchman />} />
                        <Route path='rols/' element={<Rols />} />
                    </Route>
                    <Route path='/owners/*' element={<Owners />} />

                    <Route path='/visitors/create' element={<VisitorsCreate />} />


                </Routes>
            </div>
        </HashRouter>
    )
}

export default App