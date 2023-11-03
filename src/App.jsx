// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import "./Pages/LogIn/LogIn.css"

// Importar icono
// import favicon from './favicon.ico';

// Importar CSS de simplebar
// import '../public/css/simplebar.css';

// // Importar fuente de Google Fonts
// import 'https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap';

// // Importar iconos CSS
// import '../public/css/feather.css';
// import '../public/css/select2.css';
// import '../public/css/dropzone.css';
// import '../public/css/uppy.min.css';
// import '../public/css/jquery.steps.css';
// import '../public/css/jquery.timepicker.css';
// import '../public/css/quill.snow.css';

// // Importar CSS de Date Range Picker
// import '../public/css/daterangepicker.css';

// // Importar temas de la aplicación
// import '../public/css/app-light.css';
// import '../public/css/app-dark.css';

// // Importar SVG de Vite
// // import viteIcon from '/vite.svg';


import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import LogIn from './Pages/LogIn/LogIn';
import { Owners } from './Pages/Owners/owners';
import { Residents } from './Pages/Residents/Residents';
import { Nav } from './Components/Nav/Nav';
import { Users } from "./Pages/Users/UsersList";

const App = () => {
    return (

        <HashRouter basename='/'>
            <Routes>
                <Route path='/' element={<LogIn />} />
                <Route path='/users/*' element={<Users />} />
                <Route path='/owners/*' element={<Owners />} />
                <Route path='/residents/*' element={<Residents />} />

            </Routes>
        </HashRouter>
    )
}

export default App