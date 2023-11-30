import React, { useState } from 'react';

export const Dropdown = ({ children, toggleDropdown, isDropdownOpen }) => {

    return (
        <div className="file-action text-right">
            <>
                <button
                    type="button"
                    className="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto"
                    onClick={toggleDropdown}
                >
                    <span className="text-muted sr-only">Action</span>
                </button>
                <div className={`dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`}>
                    <div className="card-body">

                        {children}
                        
                    </div>
                </div>
            </>

        </div>
    );
};
