import React from 'react';
import { Link } from 'react-router-dom';
import "./DropDownanchor.css"

export const Dropdownanchor = ({ name, status, to = "/admin/", icon, onClick, onClickModal, showEditIcon = true }) => {
    return (
        <>
            <div className='myDrop dropdown-item'>

                <div >
                    <Link className='text-light' to={to}>
                        <span className={`dot dot-md  ${status ? status === 'Active' || status === 'Activo' ? 'bg-success' : 'bg-danger' : 'bg-info'} mb-1 mr-2`}></span>
                        {name}
                    </Link>
                </div>

                <div>
                    {showEditIcon && onClickModal && (
                        <Link onClick={onClickModal}>
                            <i className="fe fe-edit-2 fe-12 text-secondary mr-2"></i>
                        </Link>
                    )}

                    {onClick && (
                        <Link onClick={onClick}>
                            <i className="fe fe-trash-2 fe-12 text-danger"></i>
                        </Link>
                    )}
                </div>
            </div>
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
