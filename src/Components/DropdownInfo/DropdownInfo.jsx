import React, { useState } from 'react';
import { DropdownExcel } from '../Buttons/Buttons';
import "./DropdownInfo.css";
import { Link } from 'react-router-dom';
import { Dropdownanchor2 } from '../DropDownAnchor/Dropdownanchor';

export const DropdownInfo = ({ name, children, to1, onClick }) => {
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="myCard" >
            <div className={`card-header ${isDropdownOpen ? 'active' : ''}`} >
                <a role="button" onClick={toggleAccordion}>
                    <strong>{name}</strong>
                    
                </a>
                <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                    <button className="btn btn-sm dropdown-toggle more-vertical" type="button" onClick={toggleDropdown}>
                        <span className="sr-only"></span>
                    </button>
                    <div className={`dropdown-menu dropdown-menu-right  ${isDropdownOpen ? 'show' : ''}`}>

                        {to1 && <Dropdownanchor2  name={`Crear nuevo ${name}`} to={to1} />}
                        {onClick && <Dropdownanchor2  name={`Asignar ${name} existente`} onClick={onClick} />}
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
