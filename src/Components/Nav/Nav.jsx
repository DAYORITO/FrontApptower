import React from 'react';

export const Nav = () => {

    return (
        <div className="wrapper">
            <nav className="topnav navbar navbar-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link text-muted my-2" href="#" id="modeSwitcher" data-mode="dark">
                                <i className="fe fe-sun fe-24"></i>
                            </a>
                        </li>

                        <li className="nav-item nav-notif">
                            <a className="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-notif">
                                <span className="fe fe-bell fe-24"></span>
                                <span className="dot dot-md bg-success"></span>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="avatar avatar-sm mt-2">
                                    <img src="/assets/avatars/face-1.jpg" alt="..." className="avatar-img rounded-circle" />
                                </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Perfil</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    );

}


