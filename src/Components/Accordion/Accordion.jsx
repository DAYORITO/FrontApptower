import React, { useState, useEffect } from 'react'
import './Accordion.css'

export const Accordion = ({ title, children, isOpen, icon }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(isOpen);
    }, [isOpen]);

    return (
        <div className="accordion-container">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={`fe fe-${icon} fe-16  text-muted `}></span>
                    <span style={{ fontFamily: 'Arial', marginLeft: '8px' }}>{`${title}`}</span>
                </div>
                <span>{isActive ? '-' : '+'}</span>
            </div>
            <div className={`accordion-content ${isActive ? 'active' : ''}`}>
                {children}
            </div>
        </div>
    );
};