import './inputsLogIn.css';
import React, { useState, useEffect } from 'react';

export const InputsLogIn = ({
  type,
  name,
  value: propValue,
  onChange,
  placeholder,
  id
}) => {
  const [inputValue, setInputValue] = useState(propValue || '');

  useEffect(() => {
    setInputValue(propValue || '');
  }, [propValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label className="input-label">
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        id={id}

        className={inputValue ? 'input-filled' : ''}
      />
      <span className="placeholder-label">
        {placeholder}
      </span>
    </label>
  );
};
