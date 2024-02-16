import { React, useState, useRef, useEffect } from 'react'
import './Inputs.css'

function InputsSelect({ id, disabled = false, options, name, onChange, value, errorMessage: externalErrorMessage, validate = false, required = false, inputStyle }) {


  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const [internalErrorMessage, setInternalErrorMessage] = useState(null);
  const [labelText, setLabelText] = useState(name);
  const inputRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (value !== '') {
      labelRef.current.classList.add('lleno');
    } else {
      labelRef.current.classList.remove('lleno');
    }
  }, [value]);


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

  return (
    <>
      <div className='inputContainer mb-3'>
        <span className='inputSpan ' style={inputStyle}>
          <select
            id={id}
            // value={valorSeleccionado}
            value={value}
            className='selectComponent'
            ref={inputRef}
            onChange={onChange}
            disabled={disabled}
          // onChange={(event) => setValorSeleccionado(event.target.value)}
          >
            <option value='' selected disabled></option>
            {options.map((opcion) => (

              <option
                className='' key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </span>
        <label htmlFor={name} className='form-label' ref={labelRef}>{labelText}</label>
        {errorMessage && <div className="error-message" style={{ color: 'red', fontSize: '9px', paddingTop: '1.4px' }}>{errorMessage}</div>}

      </div>
    </>
  )
}

export default InputsSelect