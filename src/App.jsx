import { HashRouter, Routes, Route } from 'react-router-dom';


import React from 'react'
import LogIn from './Pages/LogIn/LogIn';
import { Owners } from './Pages/Owners/owners';
import { Residents } from './Pages/Residents/Residents';
import { Nav } from './Components/Nav/Nav';

const App = () => {
    return (

        <GlobalProvider >
            <HashRouter basename='/'>
                <div className='App'>
                    <Routes>
                        <Route path='/' element={<LogIn />} />

                        <Route path='/owners/*' element={<Nav/>}>
J|
                            <Route path='createOwner' element={<Owners />} />
                            {/* <Route path='editOwner' element={<OwnersCreate />} /> */}


                        </Route>

                    </Routes>
                </div>
            </HashRouter>
        </GlobalProvider>
    )
}

export default App