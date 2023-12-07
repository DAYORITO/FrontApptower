import React, { useState } from 'react'
import './Accordion.css'

export const Accordion = ({ title, children }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="accordion-container">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>{title}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            <div className={`accordion-content ${isActive ? 'active' : ''}`}>
                {children}
            </div>
        </div>
    );
};
