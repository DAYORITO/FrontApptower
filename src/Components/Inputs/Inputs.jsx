import React from 'react'
import { useEffect, useRef } from 'react';
import './Inputs.css'

function Inputs({ name, value, onChange, placeholder, type, list, options, id, readonly = false }) {
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  // console.log(inputRef.current);
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
                if(inputRef.current.value === ''){
                    labelRef.current.classList.remove('active');
                }
            });
            
        }
    }, [])

  return (
    <>

      <div className='form-group mb-3  inputContainer'>
        <span className='inputSpan'>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className=''
            ref={inputRef}
            id={id}
            readOnly = {readonly}
            list={list}
            {...readonly && 'disabled'}
            
            
          />
          
        </span>
        <label htmlFor={name} className='form-label' ref={labelRef}>{name}</label>
        {list && <datalist  className='custom-datalist' id={list}>
          {options?.map((opcion) => (
            <option  value={opcion.value} label={opcion.label} />
          ))}
        </datalist>}
      </div>
    </>
  )
}

export default Inputs;