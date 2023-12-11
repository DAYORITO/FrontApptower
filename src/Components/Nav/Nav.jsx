import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {

    return (
        <div className="wrapper">
            <nav className="topnav navbar navbar-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-muted my-2" to='#' id="modeSwitcher" data-mode="dark">
                                <i className="fe fe-sun fe-24"></i>
                            </Link>
                        </li>

                        <li className="nav-item nav-notif">
                            <Link className="nav-link text-muted my-2" to="./#" data-toggle="modal" data-target=".modal-notif">
                                <span className="fe fe-bell fe-24"></span>
                                <span className="dot dot-md bg-success"></span>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="avatar avatar-sm mt-2">
                                    <img src="/assets/avatars/face-1.jpg" alt="..." className="avatar-img rounded-circle" />
                                </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="#">Perfil</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    );

}


