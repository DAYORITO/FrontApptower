import { React, useState, useRef, useEffect } from 'react'
import './Inputs.css'

function InputsSelect({ id, options, name, onChange, value }) {
  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  useEffect(() => {
    if (inputRef.current.value !== '') {
      labelRef.current.classList.add('lleno');
    }
    inputRef.current.addEventListener('focus', () => {
      labelRef.current.classList.add('active');
    });
    inputRef.current.addEventListener('blur', () => {
      if (inputRef.current.value !== '') {
        labelRef.current.classList.add('lleno');
      } else {
        labelRef.current.classList.remove('lleno');
      }
      labelRef.current.classList.remove('active');
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

  return (
    <>
      <div className='inputContainer mb-3'>
        <span className='inputSpan'>
          <select
            id={id}
            // value={valorSeleccionado}
            value={value}
            className='selectComponent'
            ref={inputRef}
            onChange={onChange}
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
        <label htmlFor={name} className='form-label ' ref={labelRef}>{name}</label>
      </div>
    </>
  )
}

export default InputsSelect