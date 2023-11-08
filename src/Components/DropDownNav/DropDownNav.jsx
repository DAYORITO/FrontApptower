
export const DropDownNav = ({ module, dropdownName="#", id = 'id', icon = "fe fe-home fe-24", children }) => {
    return (
        <li className="nav-item dropdown">
            <a href={dropdownName} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                <i className={icon}></i>
                <span className="ml-3 item-text">{module}</span>
            </a>
            <ul className="collapse list-unstyled pl-4 w-100" id={id}>
                {children}
            </ul>
        </li>)
}


export const ListNav = ({ href = '/#/admin/', module, icon = "fe fe-home fe-24", }) => {
    return (
        <li className="nav-item w-100">
            <a className="nav-link" href={href}  >
                <i className={icon}></i>
                <span className="ml-3 item-text">{module}</span>
            </a>
        </li>
    )
}


import React from 'react'

export const DropDownList = ({ subprocess, href='/#/admin/' }) => {
    return (
        <li className="nav-item">
            <a className="nav-link pl-3" href={href}><span className="ml-1 item-text">{subprocess}</span></a>
        </li>)
}

