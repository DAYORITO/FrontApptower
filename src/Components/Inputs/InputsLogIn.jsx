import './inputsLogIn.css';
import React, { useState, useEffect, useRef } from 'react';

export const InputsLogIn = ({
  type,
  name,
  value: propValue,
  onChange,
  placeholder,
  id,

}) => {
  const [inputValue, setInputValue] = useState(propValue || '');
  const [passwordShown, setPasswordShown] = useState(false);
  const eyeIconRef = useRef(null);

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

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const inputType = type === 'password' && passwordShown ? 'text' : type;



  return (
    <label className="input-label">
      <input
        type={inputType}
        name={name}
        value={inputValue}
        onChange={handleChange}
        id="inputLogin"

        className={inputValue ? 'input-filled' : ''}
      />

      <span className="placeholder-label">
        {placeholder}
      </span>
      {type === 'password' && (
        <span
          className={`eye-icon ${passwordShown ? 'show' : ''}`}
          onClick={togglePasswordVisibility}
          ref={eyeIconRef}
          style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
        >
          {passwordShown ? <i className='fe fe-eye fe-16'></i> : <i className='fe fe-eye-off fe-16'></i>}
        </span>
      )}
    </label>
  );
};
