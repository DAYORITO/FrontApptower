import React, { useState } from 'react';
import './Checkbox.css';

export const Checkbox = ({ label, options, onCheckboxChange, type }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onCheckboxChange(label, !isChecked);

    };

    return (
        <div className="checkbox-container">
            <label className="checkbox-label">
                <input
                    className="checkbox-input check"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                {label}
            </label>

            {isChecked && (
                <ul className="checkbox-options">
                    {options.map((option) => (
                        <li key={option}>
                            <label>
                                <input className="check-input" type="checkbox" />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
