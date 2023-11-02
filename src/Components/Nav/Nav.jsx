// import LogoApptower from '../../assets/Apptower.png';
// import './Nav.css';

// const Nav = () => {
//     return (
//         <aside className="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
//             <a href="#" className="btn collapseSidebar toggle-btn d-lg-none text-muted mt-3" data-toggle="toggle">

//                 <i className="fe fe-x"><span className="sr-only"></span></i>
//             </a>
//             <nav className="vertnav navbar navbar-light">

//                 <div className="w-100 d-flex" id='contenedorLogo'>
//                     <a className="navbar-brand mx-auto flex-fill text-center" href="./index.html">
//                         <img src={LogoApptower} alt="logoApptower" className='logo' />
//                     </a>
//                 </div>

//                 <ul className="navbar-nav flex-fill w-100 mb-2" id='contenedorli'>
//                     {/* <li className="text-muted nav-heading  mb-1">
//                         <span>Procesos</span>
//                     </li > */}
//                     <li className="nav-item w-100">
//                         <a className="nav-link" >
//                             <i className="fe fe-bar-chart fe-24"></i>
//                             <span className="ml-3 item-text">Dashboard</span>
//                         </a>
//                     </li>
//                     <li className="nav-item w-100">
//                         <a className="nav-link"  >
//                             <i className="fe fe-24 fe-user"></i>
//                             <span className="ml-3 item-text">Usuarios</span>
//                         </a>
//                     </li>


//                     <li className="nav-item dropdown">
//                         <a href="#residencial" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
//                             <i className="fe fe-home fe-24"></i>
//                             <span className="ml-3 item-text">Residencial</span>
//                         </a>
//                         <ul className="collapse list-unstyled pl-4 w-100" id="residencial">
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3"><span className="ml-1 item-text">Propietarios</span></a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3" ><span className="ml-1 item-text">Residentes</span></a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3"><span className="ml-1 item-text">Vehiculos</span></a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3" ><span className="ml-1 item-text">Visitantes</span></a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="nav-item dropdown">
//                         <a href="#espacios" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
//                             <i className="fe fe-24 fe-maximize"></i>
//                             <span className="ml-3 item-text">Espacios</span>
//                         </a>
//                         <ul className="collapse list-unstyled pl-4 w-100" id="espacios">
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3"><span className="ml-1 item-text">Espacios</span></a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3"><span className="ml-1 item-text">Parqueaderos</span></a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="nav-item dropdown">
//                         <a href="#reservas" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
//                             <i className="fe fe-clipboard fe-24"></i>
//                             <span className="ml-3 item-text">Reservas</span>
//                         </a>
//                         <ul className="collapse list-unstyled pl-4 w-100" id="reservas">
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3"  >
//                                     <span className="ml-1 item-text">Reservas</span>
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3" ><span className="ml-1 item-text">Ingresos</span></a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="nav-item dropdown">
//                         <a href="#notificacionM" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
//                             <i className="fe fe-bell  fe-24"></i>
//                             <span className="ml-3 item-text">Notificaciones</span>
//                         </a>
//                         <ul className="collapse list-unstyled pl-4 w-100" id="notificacionM">
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3"  >
//                                     <span className="ml-1 item-text">Notificaciones</span>
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link pl-3" ><span className="ml-1 item-text">Multas</span></a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="nav-item w-100">
//                         <a className="nav-link"  >
//                             <i className="fe fe-24 fe-settings"></i>
//                             <span className="ml-3 item-text">Roles</span>
//                         </a>
//                     </li>
//                     <li className="nav-item w-100">
//                         <a className="nav-link"  >
//                             <i className="fe fe-24 fe-shield"></i>
//                             <span className="ml-3 item-text">Vigilantes</span>
//                         </a>
//                     </li>
//                     <li className="nav-item" id='logout'>
//                         <a href="/" className="nav-link" id="salir">
//                             <i className="fe fe-24 fe-slack"></i>
//                             <span className="ml-3 item-text">Cerrar Sesión</span>
//                         </a>
//                     </li>
//                 </ul >
//             </nav >

//         </aside >
//     );
// }

// export default Nav;

// import React from 'react'

// export const Nav = () => {
//     return (
//         <div class="wrapper">
//             <nav class="topnav navbar navbar-light">
//                 <button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
//                     <i class="fe fe-menu navbar-toggler-icon"></i>
//                 </button>

//                 <ul class="nav">
//                     <li class="nav-item">
//                         <a class="nav-link text-muted my-2" href="#" id="modeSwitcher" data-mode="dark">
//                             <i class="fe fe-sun fe-24"></i>
//                         </a>
//                     </li>

//                     <li class="nav-item nav-notif">
//                         <a class="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-notif">
//                             <span class="fe fe-bell fe-24"></span>
//                             <span class="dot dot-md bg-success"></span>
//                         </a>
//                     </li>
//                     <li class="nav-item dropdown">
//                         <a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button"
//                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                             <span class="avatar avatar-sm mt-2">
//                                 <img src="/assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle" />
//                             </span>
//                         </a>
//                         <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
//                             <a class="dropdown-item" href="#">Perfil</a>
//                         </div>
//                     </li>
//                 </ul>
//             </nav>


//             <aside class="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
//                 <a href="#" class="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
//                     <i class="fe fe-x"><span class="sr-only"></span></i>
//                 </a>
//                 <nav class="vertnav navbar navbar-light">

//                     <div class="w-100 mb-4 d-flex">
//                         <a class="navbar-brand mx-auto mt-2 flex-fill text-center" href="/">
//                             <svg version="1.1" class="navbar-brand-img" href="https://i.ibb.co/KL47c1Y/Logo-Apptower.png" x="0px"
//                                 y="0px" viewBox="0 0 100 100" space="preserve">
//                                 <image x="0" y="0" width="100" height="100" href="https://i.ibb.co/KL47c1Y/Logo-Apptower.png" />
//                             </svg>
//                         </a>
//                     </div>

//                     <ul class="navbar-nav flex-fill mb-2">
//                         <li class="text-muted nav-heading mt-4 mb-1">
//                             <span>Procesos</span>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" asp-controller="Home" asp-action="Index">
//                                 <i class="fe fe-bar-chart fe-24"></i>
//                                 <span class="ml-3 item-text">Dashboard</span>
//                             </a>
//                         </li>
//                         <li class="nav-item dropdown">
//                             <a href="#espacios" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">
//                                 <i class="fe fe-home fe-24"></i>
//                                 <span class="ml-3 item-text">Espacios</span>
//                             </a>
//                             <ul class="collapse list-unstyled pl-4 w-100" id="espacios">
//                                 <li class="nav-item">
//                                     <a class="nav-link pl-3" asp-controller="Parqueaderos" asp-action="Index"><span
//                                         class="ml-1 item-text">Parqueaderos</span></a>
//                                 </li>
//                                 <li class="nav-item">
//                                     <a class="nav-link pl-3" asp-controller="Espacios" asp-action="Index"><span
//                                         class="ml-1 item-text">Espacios</span></a>
//                                 </li>
//                                 <li class="nav-item">
//                                     <a class="nav-link pl-3" asp-controller="Propietarios" asp-action="Index"><span
//                                         class="ml-1 item-text">Propietarios</span></a>
//                                 </li>
//                                 <li class="nav-item">
//                                     <a class="nav-link pl-3" asp-controller="Residentes" asp-action="Index"><span
//                                         class="ml-1 item-text">Residentes</span></a>
//                                 </li>
//                             </ul>
//                         </li>
//                         <li class="nav-item dropdown">
//                             <a href="#reservas" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">
//                                 <i class="fe fe-clipboard fe-24"></i>
//                                 <span class="ml-3 item-text">Reservas</span>
//                             </a>
//                             <ul class="collapse list-unstyled pl-4 w-100" id="reservas">
//                                 <li class="nav-item">
//                                     <a class="nav-link pl-3" asp-controller="Reservas" asp-action="Index">
//                                         <span class="ml-1 item-text">Reservas</span>
//                                     </a>
//                                 </li>
//                                 <li class="nav-item">
//                                     <a class="nav-link pl-3" asp-controller="Vehiculoes" asp-action="Index">
//                                         <span class="ml-1 item-text">Vehiculos</span>
//                                     </a>
//                                 </li>
//                                 <li class="nav-item">
//                                     <a class="nav-link pl-3" asp-controller="Visitantes" asp-action="Index"><span
//                                         class="ml-1 item-text">Visitantes</span></a>
//                                 </li>
//                                 <li class="nav-item">
//                                     <a class="nav-link pl-3" asp-controller="" asp-action=""><span
//                                         class="ml-1 item-text">Ingresos</span></a>
//                                 </li>
//                             </ul>
//                         </li>
//                         <li class="nav-item w-100">
//                             <a class="nav-link" asp-controller="Usuarios" asp-action="Index">
//                                 <i class="fe fe-24 fe-user"></i>
//                                 <span class="ml-3 item-text">Usuarios</span>
//                             </a>
//                         </li>
//                         <li class="nav-item">
//                             <a href="/" class="nav-link" id="salir">
//                                 <i class="fe fe-24 fe-slack"></i>
//                                 <span class="ml-3 item-text">Cerrar Sesión</span>
//                             </a>
//                         </li>
//                     </ul>
//                     <partial name="_LoginPartial" />
//                 </nav>

//             </aside>
//         </div>
//     )
// }
