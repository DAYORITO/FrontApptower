import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import 'select2'; // Importa Select2
// import './Inputs.css';
import './Select2.css';
function Select2({ id, options, name, onChange, value }) {
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  

  useLayoutEffect(() => {
    // Inicializa Select2 en el elemento select
    $(inputRef.current).select2();

    // Asegúrate de destruir Select2 al desmontar el componente
    return () => {
      $(inputRef.current).select2('destroy');
    };
  }, []);
  useEffect(() => {
    $(inputRef.current).on('select2:open', () => {
      labelRef.current.classList.add('active');
    });

    $(inputRef.current).on('select2:close', () => {
      if (!$(inputRef.current).val()) {
        labelRef.current.classList.remove('active');
        
      }
    });

    return () => {
      $(inputRef.current).off('select2:open');
      $(inputRef.current).off('select2:close');
    };
  }, []);

  
    $('.select2').select2(
      {
        theme: 'bootstrap4',
        width: '100%',
      });

      // useEffect(() => {
      //   $(inputRef.current).on('change', (e) => {
      //     onChange({ target: { value: e.target.value } });
      //   });
    
      //   return () => {
      //     $(inputRef.current).off('change');
      //   };
      // }, [onChange]);
  return (
    <>
      <div className='selectContainer mb-3'>
        <span className='inputSpan'>
          <select
            id={id}
            value={value}
            className='selectComponent select2 form-control' 
            ref={inputRef}
            
          >
            <option value='' disabled></option>
            { options && options.map((opcion) => (
              <option className='' key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </span>
        <label htmlFor={name} className='form-label ' ref={labelRef}>
          {name}
        </label>
      </div>
    </>
  );
}

export default Select2;
