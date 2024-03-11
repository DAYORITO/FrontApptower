import './inputsLogIn.css';
import React, { useState, useEffect, useRef } from 'react';

export const InputsLogIn = ({
  type,
  name,
  value: propValue,
  onChange,
  placeholder,
  onKeyPress,
  id,
  errors,
  identifier,
}) => {
  const [inputValue, setInputValue] = useState(propValue || '');
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessageToShow, setErrorMessageToShow] = useState(null);
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

  const organizarErrores = () => {
    if (errors) {
      return errors.reduce((a, b) => {
        a[b.field] = b.message;
        return a;
      }, {})
    }
  }

  useEffect(() => {
    if (errors) {
      setErrorMessageToShow(organizarErrores());
    }
    console.log("errors en el input:", errors)

  }, [errors])

  return (
    <>
      <label className="input-label">
        <input
          type={inputType}
          name={name}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={onKeyPress}
          className={`${inputValue ? 'input-filled' : ''} ${errorMessageToShow != null && errorMessageToShow[identifier] != null ? "border-danger" : ""}`}
          id="inputLogin"
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
      {errorMessageToShow && errorMessageToShow[identifier] &&
        <div className="error-message text-right" style={{ color: 'red', fontSize: '9px', marginTop: '-17px', padding: '5px' }}>{errorMessageToShow[identifier]}</div>}
    </>

  );
};
