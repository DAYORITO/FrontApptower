import './inputsLogIn.css';
import React, { useState } from 'react';

export const SelectInput = ({ options, placeholder, onChange, value }) => {
    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    const filled = selected !== '';
    const containerClass = filled ? 'select-filled' : '';

    return (
        <label className={`input-label ${containerClass}`}>
            <select
                value={value}
                onChange={onChange}
                className={filled ? 'input-filled' : ''}
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <span className={`placeholder-label ${filled ? 'label-shifted' : ''}`}>
                {placeholder}
            </span>
        </label>
    );
}
