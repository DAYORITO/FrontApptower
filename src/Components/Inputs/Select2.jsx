import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import 'select2'; // Importa Select2
// import './Inputs.css';
import './Select2.css';
function Select2({ id, options, name, onChange, value, validate }) {
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [selectError, setSelectError] = useState(null);


  useLayoutEffect(() => {
    // Inicializa Select2 en el elemento select
    $(inputRef.current).select2();

    // Asegúrate de destruir Select2 al desmontar el componente
    return () => {
      $(inputRef.current).select2('destroy');
    };
  }, []);


  useEffect(() => {
    // Si el select ya tiene un valor al cargar el componente, agrega la clase 'active' a la etiqueta
    if ($(inputRef.current).val()) {
      labelRef.current.classList.add('active');
    }

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

  useEffect(() => {
    if ($(inputRef.current).val()) {
      labelRef.current.classList.add('active');
    }

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

  useEffect(() => {
    $(inputRef.current).on('change', (event) => {
      const newValue = event.target.value;
      setSelectedValue(newValue);

      // Llama a la función onChange del componente padre y pasa el nuevo valor seleccionado
      if (onChange) {
        onChange(newValue);
      }
    });

    return () => {
      $(inputRef.current).off('change');
    };
  }, [onChange]);

  useEffect(() => {
    if (validate && !selectedValue) {
      setSelectError("Seleccione una opción*");
    } else {
      setSelectError(null);
    }
  }, [selectedValue, validate]);

  return (
    <>
      <div className='selectContainer mb-3'>
        <span className='inputSpan'>
          <select
            id={id}
            value={selectedValue}
            className='selectComponent select2 form-control'
            ref={inputRef}

          >
            <option value='' disabled>
              Seleccione una opción
            </option>
            {/* <option value='' selected disabled></option> */}
            {options && options.map((opcion) => (
              <option className='' key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </span>
        <label htmlFor={name} className='form-label ' ref={labelRef}>
          {name}
        </label>
        {selectError && <div className="error-message" style={{ color: 'red', fontSize: '9px', paddingBottom: '1.4px' }}>{selectError}</div>}

      </div>
    </>
  );
}

export default Select2;
