import React from 'react'
import { Link } from 'react-router-dom'

export const Dropdownanchor = ({name, to = "/admin/",  icon}) => {
    return (
        <Link className="dropdown-item" to={to}>
            <i className={`fe ${"fe-" + icon} fe-12 mr-4`}></i>{name}
        </Link>
        
        )
}
