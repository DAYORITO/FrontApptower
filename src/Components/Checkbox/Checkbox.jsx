import React, { useState } from 'react';
import './Checkbox.css';

export const Checkbox = ({ label, options, onCheckboxChange, type, isCheckedAny, isOptionMarked }) => {
    const isCheckedValidate = isCheckedAny ? isCheckedAny() : null
    const isOptionMarkeds = isOptionMarked ? isOptionMarked(isCheckedValidate) : null
    const [isChecked, setIsChecked] = useState(isCheckedValidate || false);
    const [selectedOptions, setSelectedOptions] = useState(isOptionMarkeds || []);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onCheckboxChange(label, newCheckedState ? options : []);

        if (!newCheckedState) {
            setSelectedOptions([]);
        }
    };

    const handleOptionChange = (option) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter((selectedOption) => selectedOption !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updatedOptions);
        onCheckboxChange(label, updatedOptions);
        console.log(selectedOptions, 'Selected Options')
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
                                <input
                                    className="check-input"
                                    type="checkbox"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleOptionChange(option)}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
