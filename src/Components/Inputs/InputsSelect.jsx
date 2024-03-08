import { React, useState, useRef, useEffect } from 'react'
import './Inputs.css'

function InputsSelect({ id, disabled = false, options, name, voidmessage = "No hay datos", onChange, value, errorMessage: externalErrorMessage, validate = false, required = true, inputStyle, StyleInput, containerStyle, errors, identifier, className }) {


  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const [internalErrorMessage, setInternalErrorMessage] = useState(null);
  const [labelText, setLabelText] = useState(name);
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  const [errorMessageToShow, setErrorMessageToShow] = useState(null);

  useEffect(() => {
    if (value !== '') {
      labelRef.current.classList.add('lleno');
    } else {
      labelRef.current.classList.add('lleno');
      required && setLabelText(`${name} <span style="color: red; margin-left: 2px;">*</span>`);
    }
  }, [value]);


  useEffect(() => {
    if (inputRef.current.value !== '') {
      labelRef.current.classList.add('lleno');
    }
    inputRef.current.addEventListener('focus', () => {
      labelRef.current.classList.add('active');
      if (required) {
        setLabelText(`${name}<span style="margin-left: 2px;">*</span>`)
      }
    });


    inputRef.current.addEventListener('blur', () => {
      if (inputRef.current.value !== '') {
        labelRef.current.classList.add('lleno');
      } else {
        labelRef.current.classList.add('lleno');
        required && setLabelText(`${name}<span style="color: red; margin-left: 2px;">*</span>`);
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

  const organizarErrores = () => {
    if (errors) {
      return errors?.errors?.reduce((a, b) => {
        a[b.field] = b.message;
        if (b.field === identifier) {
          className = "border boder-danger";
        }
        return a;
      }, {})
    }
  }

  useEffect(() => {
    setValorSeleccionado(value);
  }, []);

  useEffect(() => {
    if (errors) {
      setErrorMessageToShow(organizarErrores());
    }
    console.log("errors en el input:", errors)

  }, [errors])


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
      <div className='inputContainer mb-3' style={containerStyle}>
        <span className='inputSpan ' style={inputStyle}>
          <select
            id={id}
            // value={valorSeleccionado}
            value={value}
            className={`selectComponent ${className} ${errorMessageToShow != null && errorMessageToShow[identifier] != null ? "border-danger" : ""}`}
            ref={inputRef}
            onChange={onChange}
            disabled={disabled}
            style={StyleInput}

          // onChange={(event) => setValorSeleccionado(event.target.value)}
          >
            {options?.length > 0 ? <option value='' selected disabled></option>
              :
              (<><option value='' selected disabled></option><option value='' disabled>{voidmessage}</option></>)}

            {options.map((opcion) => (

              <option
                className='' key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </span>
        <label htmlFor={name} className='form-label' ref={labelRef} dangerouslySetInnerHTML={{ __html: labelText }}></label>
        {errorMessage && <div className="error-message" style={{ color: 'red', fontSize: '9px', paddingTop: '1.4px' }}>{errorMessage}</div>}
        {errors && errorMessageToShow != null &&
          <div className="error-message text-right" style={{ color: 'red', fontSize: '9px', paddingTop: '1.4px' }}>{errorMessageToShow[identifier]}</div>}

      </div>
    </>
  )
}

export default InputsSelect