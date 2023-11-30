import React from 'react';
import { Link } from 'react-router-dom';
import "./DropDownanchor.css"

export const Dropdownanchor = ({ name, to = "/admin/", icon, onClick }) => {
    return (
        <>
            <div className='myDrop dropdown-item'>

                <div >
                    <Link to={to}>
                        <i className={`fe ${"fe-" + icon} fe-12 mr-4`}></i>{name}
                    </Link>

                </div>

                <div>
                    <Link onClick={onClick}>

                        <i className="fe fe-trash-2 fe-12 text-danger"></i>
                    </Link>
                </div>
            </div >


        </>
    );
};

export const Dropdownanchor2 = ({ name, to = "/admin/", icon = "edit" }) => {
    return (
        <>
            <Link className="dropdown-item" to={to}>
                <i className={`fe ${"fe-" + icon} fe-12 mr-4`}></i>{name}
            </Link>

        </>
    );
};
