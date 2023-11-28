import { useNavigate } from 'react-router'
import './DropDownNav.css'

export const DropDownNav = ({ module, dropdownName = "#", id = 'id', icon = "fe fe-home fe-24", children }) => {
    return (
        <li className="nav-item dropdown">
            <a href={dropdownName} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                <i className={icon} id='fas'></i>
                <span className="ml-3 item-text span">{module}</span>
            </a>
            <ul className="collapse list-unstyled pl-4 w-100" id={id}>
                {children}
            </ul>
        </li>)
}


export const ListNav = ({ href, module, icon = "fe fe-home", id = 'process', onClick }) => {
    return (
        <li className="nav-item">
            <a className="nav-link" href={href || ''} onClick={onClick}>
                <i className={icon} id='fas'></i>
                <span className='item-text span'>{module}</span>
            </a>
        </li>
    )
}

// 


import React from 'react'

export const DropDownList = ({ subprocess, href = '/#/admin/' }) => {
    return (
        <li className="nav-item">
            <a className="nav-link pl-3" href={href}><span className="ml-1 item-text span">{subprocess}</span></a>
        </li>)
}

