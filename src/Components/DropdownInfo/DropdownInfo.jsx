import React, { useState } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { Dropdownanchor } from '../DropDownAnchor/Dropdownanchor';

export const DropdownInfo = ({ name, children }) => {
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const [isDropdownOpen2, setDropdownOpen2] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    const toggleDropdown = () => {
        console.log('Toggle Dropdown');
        console.log(isDropdownOpen2)
        setDropdownOpen2(!isDropdownOpen2);
    };

    return (
        <div className="card shadow card-drop" >
            <div className="card-header" id="heading1">
                <a role="button" onClick={toggleAccordion}>
                    <strong>{name}</strong>
                </a>

                {/* <Dropdown isDropdownOpen={isDropdownOpen2} toggleDropdown={toggleDropdown}>
                    <Dropdownanchor icon={'edit'} name={""} />
                </Dropdown> */}
            </div>
            <div className={`collapse ${isAccordionOpen ? 'show' : ''}`}>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    );
};
