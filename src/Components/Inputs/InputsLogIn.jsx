import './inputsLogIn.css';
import React, { useState } from 'react';


export const InputsLogIn = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  id
}) => {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const inputFilled = !!inputValue;

  return (
    <label className="input-label">
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        id={id}
        className={inputFilled ? 'input-filled' : ''}
      />

      <span className="placeholder-label">
        {placeholder}
      </span>

    </label>
  );
}