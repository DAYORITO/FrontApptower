import React, { useState } from 'react';
import './Aside.css';
import LogoApptower from '../../assets/Logo-Apptower.png';
import { DropDownList, DropDownNav, ListNav } from '../DropDownNav/DropDownNav';

export const Aside = () => {
    const [isCloset, isOpem] = useState(true);

    const toggleSidebar = () => {
        console.log('Hola samuel intensox')
        isOpem(!isCloset);
    };

    return (
        <>
            <nav className={`myNav ${isCloset ? 'expanded' : 'collapsed'}`}>

                <div className='myNav-header'>
                    <button
                        type="button"
                        className="navbar-toggler text-muted collapseSidebar"
                        onClick={toggleSidebar}
                    >
                        <i class="fe fe-menu fe-16 navbar-toggler-icon"></i>
                    </button>


                </div>
                <div className='myNav-lrofile'>
                    <img src={LogoApptower} alt="logoApptower" className="logo" />
                </div>
                <div className='myNav-links'>
                    <div className='myNav-links-content'>

                        <ListNav module={'Espacios'} href='/#/admin/spaces' />
                        <ListNav module={'Espacios'} href='/#/admin/spaces' />
                        <ListNav module={'Espacios'} href='/#/admin/spaces' />
                        <ListNav module={'Espacios'} href='/#/admin/spaces' />
                        <ListNav module={'Espacios'} href='/#/admin/spaces' />
                        

                    </div>
                    <div className='myNav-links-end'>
                        <ListNav module={'Espacios'} href='/#/admin/spaces' />
                        <ListNav module={'Espacios'} href='/#/admin/spaces' />

                    </div>

                </div>





            </nav >
        </>
    )
}
