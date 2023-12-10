import React from 'react';
import { Link } from 'react-router-dom';
import "./DropDownanchor.css"

export const Dropdownanchor = ({ name, to = "/admin/", icon, onClick, onClickModal }) => {
    return (
        <>
            <div className='myDrop dropdown-item'>

                <div >
                    <Link to={to}>
                        {name}
                    </Link>

                </div>

                <div>

                    <Link onClick={onClickModal}>
                        <i className="fe fe-edit-2 fe-12 text-secondary mr-2" ></i>
                    </Link>

                    <Link onClick={onClick}>

                        <i className="fe fe-trash-2 fe-12 text-danger"></i>
                    </Link>
                </div>
            </div >


        </>
    );
};

export const Dropdownanchor2 = ({ name, to = "/admin/", icon = "edit", onClick }) => {
    return (
        <>
            <Link onClick={onClick} className="dropdown-item" to={to}>
                {name}
            </Link>


        </>
    );
};
