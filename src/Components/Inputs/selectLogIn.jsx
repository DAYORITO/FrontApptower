import React, { useState, useEffect } from 'react';
import './inputsLogIn.css';

export const SelectInput = ({ options, placeholder, onChange, value: propValue, id }) => {
    const [selected, setSelected] = useState('');

    useEffect(() => {
        if (propValue !== undefined && propValue !== null) {
            setSelected(propValue);
        }
    }, [propValue]);

    const handleChange = (e) => {
        setSelected(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <label className="input-label select-filled">
            <select
                value={selected}
                onChange={handleChange}
                className={selected !== '' ? 'input-filled' : ''}
            >
                <option value="" disabled></option>
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <span className={`placeholder-label ${selected !== '' ? 'label-shifted' : ''}`} id={id}>
                {selected === placeholder ? '' : placeholder}
            </span>
        </label>
    );
};
