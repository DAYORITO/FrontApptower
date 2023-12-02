import React, { useState } from 'react';
import { DropdownExcel } from '../Buttons/Buttons';
import "./DropdownInfo.css";
import { Link } from 'react-router-dom';
import { Dropdownanchor, Dropdownanchor2 } from '../DropDownAnchor/Dropdownanchor';

export const DropdownInfo = ({ name, children, to1="/admin/", onClick }) => {
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="card shadow card-drop" >
            <div className={`card-header ${isDropdownOpen ? 'active' : ''}`} id="heading1">
                <a role="button" onClick={toggleAccordion}>
                    <strong>{name}</strong>
                </a>
                <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                    <button className="btn btn-sm dropdown-toggle more-dropdown" type="button" onClick={toggleDropdown}>
                        <span className="sr-only"></span>
                    </button>
                    <div className={`dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`}>
                        <Dropdownanchor2 icon={"user"} name={`Crear nuevo ${name}`} to={to1}/>
                        <Dropdownanchor2 onClick={onClick} icon={"user"} name={`Asignar ${name} existente`}/>

                    </div>
                </div>
            </div>
            <div className={`collapse ${isAccordionOpen ? 'show' : ''}`}>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    );
};
