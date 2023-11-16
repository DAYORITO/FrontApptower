import React from 'react';
import './Aside.css';
import LogoApptower from '../../assets/Logo-Apptower.png';
import { DropDownList, DropDownNav, ListNav } from '../DropDownNav/DropDownNav';

export const Aside = () => {


    return (
        <>
            <nav className="myNav">

                <div>
                    <button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
                        <i class="fe fe-menu fe-24 navbar-toggler-icon"></i>
                    </button>

                    <li className="logoApptower">

                        <img src={LogoApptower} alt="logoApptower" className="logo" />
                    </li>
                </div>



            </nav >
        </>
    )
}
