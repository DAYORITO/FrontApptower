import React, { useState, useEffect, useRef } from 'react';
import './Inputs.css';

function TimeInput({ name, placeholder, id }) {
  const [time, setTime] = useState('');
  const inputRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const handleFocus = () => {
      labelRef.current.classList.add('active');
    };

    const handleBlur = () => {
      if (time !== '') {
        labelRef.current.classList.add('lleno');
      } else {
        labelRef.current.classList.remove('lleno');
      }
      labelRef.current.classList.remove('active');
      validateTime();
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener('focus', handleFocus);
    inputElement.addEventListener('blur', handleBlur);

    return () => {
      inputElement.removeEventListener('focus', handleFocus);
      inputElement.removeEventListener('blur', handleBlur);
    };
  }, [time]);

  const handleChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, ''); // Solo permite números

    if (value.length <= 4) {
      if (value.length === 1) {
        value = '0' + value + ':';
      } else if (value.length === 2) {
        value = value + ':';
      } else if (value.length === 3 || value.length === 4) {
        value = value.substring(0, 2) + ':' + value.substring(2);
      }
      setTime(value);
    }
  };

  const validateTime = () => {
    const cleanTime = time.replace(':', '');
    const hour = parseInt(cleanTime.substring(0, 2), 10);
    const minute = parseInt(cleanTime.substring(2, 4), 10);

    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      alert('Por favor, ingrese una hora válida (00:00 a 23:59)');
      setTime('');
    }
  };

  return (
    <div className='form-group mb-3 col-sm-12 col-md-12 inputContainer'>
      <span className='inputSpan'>
        <input
          type="text"
          name={name}
          value={time}
          onChange={handleChange}
          placeholder={placeholder || '00:00'}
          className=''
          ref={inputRef}
          id={id}
        />
      </span>
      <label htmlFor={name} className='form-label' ref={labelRef}>{name}</label>
    </div>
  );
}

export default TimeInput;
