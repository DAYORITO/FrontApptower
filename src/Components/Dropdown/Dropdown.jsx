import React, { useState } from 'react';

export const Dropdown = ({ children, toggleDropdown, isDropdownOpen }) => {

    return (
        <div className="file-action text-right">
            <>
                <button
                    type="button"
                    className="btn btn-link dropdown-toggle more-vertical text-muted"
                    onClick={toggleDropdown}
                >
                </button>
                <div className={`dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`}>
                    <div >

                        {children}
                        
                    </div>
                </div>
            </>

        </div>
    );
};
