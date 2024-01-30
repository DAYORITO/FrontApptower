import React from 'react'
import { useEffect, useRef, useState } from 'react';
import './Inputs.css'

function Inputs({ name, value, onChange, placeholder, type, list, options, id, readonly = false, inputStyle, errorMessage: externalErrorMessage, validate = false, required = false }) {
  const [internalErrorMessage, setInternalErrorMessage] = useState(null);
  const [labelText, setLabelText] = useState(name);
  const [passwordShown, setPasswordShown] = useState(false);
  const eyeIconRef = useRef(null);
  const inputRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (value !== '') {
      labelRef.current.classList.add('lleno');
    } else {
      labelRef.current.classList.remove('lleno');
    }
  }, [value]);

  //Aqui esta utilizando el prop required para agregar un * al label si el campo es requerido
  useEffect(() => {
    if (inputRef.current.value !== '') {
      labelRef.current.classList.add('lleno');
    }
    inputRef.current.addEventListener('focus', () => {
      labelRef.current.classList.add('active');
      if (required) {
        setLabelText(name + '*');
      }
    });


    inputRef.current.addEventListener('blur', () => {
      if (inputRef.current.value !== '') {
        labelRef.current.classList.add('lleno');
      } else {
        labelRef.current.classList.remove('lleno');
      }
      labelRef.current.classList.remove('active');
      if (required) {
        setLabelText(name);
      }

    });



    return () => {
      inputRef.current?.removeEventListener('focus', () => {
        labelRef.current.classList.add('active');
      });
      inputRef.current?.removeEventListener('blur', () => {
        if (inputRef.current.value === '') {
          labelRef.current.classList.remove('active');
        }
      });
    }
  }, [])

  //Aqui esta utilizando el prop validate para validar si el campo esta vacio y mostrar un mensaje de error
  useEffect(() => {
    if (validate && value === "") {
      setInternalErrorMessage("Este campo es requerido*");
    } else {
      setInternalErrorMessage(null);

    }
  }, [value, validate]);

  const errorMessage = externalErrorMessage || internalErrorMessage;


  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const inputType = type === 'password' && passwordShown ? 'text' : type;


  return (
    <>
      <div className='form-group mb-3  inputContainer'>
        <span className='inputSpan'>
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className=''
            ref={inputRef}
            id={id}
            readOnly={readonly}
            list={list}
            style={inputStyle}
          />
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


        </span>
        <label htmlFor={name} className='form-label' ref={labelRef}>{labelText}</label>
        {list && <datalist className='custom-datalist' id={list}>
          {options?.map((opcion) => (
            <option value={opcion.value} label={opcion.label} />
          ))}
        </datalist>}
        {errorMessage && <div className="error-message" style={{ color: 'red', fontSize: '9px', paddingTop: '1.4px' }}>{errorMessage}</div>}
      </div>
    </>
  )
}

export default Inputs;