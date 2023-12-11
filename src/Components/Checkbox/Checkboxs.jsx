import React from 'react'
import './Checkboxs.css'

export const Checkboxs = ({ id, label, value = false, onChange }) => {
    return (
        <div className='check'>
            <input className='checkInput'
                id={id}
                type="checkbox"
                checked={value}
                onChange={onChange}
            />
            <label className='labelinput' htmlFor={id}>{label}</label>
        </div>
    );
};

