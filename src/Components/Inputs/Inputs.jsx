import React from "react";
import { useEffect, useRef, useState } from "react";
import "./Inputs.css";

function Inputs({
  name,
  value,
  onChange,
  placeholder,
  identifier,
  type,
  list,
  options,
  id,
  readonly = false,
  inputStyle,
  errorMessage: externalErrorMessage,
  className,
  validateData,
  validate = false,
  required = true,
  errors,
  min,
  max,
  disabled
}) {
  const [internalErrorMessage, setInternalErrorMessage] = useState(null);
  const [labelText, setLabelText] = useState(name);
  const [passwordShown, setPasswordShown] = useState(false);
  const eyeIconRef = useRef(null);
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  const [errorMessageToShow, setErrorMessageToShow] = useState(null);
  // const [errorStyle, setErrorStyle] = useState(null);

  useEffect(() => {
    if (type !== "hidden") {
      if (value !== "") {
        labelRef.current.classList.add("lleno");
      } else {
        labelRef.current.classList.add("lleno");
      }
      if (required) {
        setLabelText(
          `${name} <span style="color: red; margin-left: 2px;">*</span>`
        );
      } else {
        setLabelText(name);
      }
    }
  }, [value, required, type]);

  //Aqui esta utilizando el prop required para agregar un * al label si el campo es requerido
  useEffect(() => {
    if (inputRef.current.value !== "") {
      labelRef.current.classList.add("lleno");
    }
    inputRef.current.addEventListener("focus", () => {
      labelRef.current.classList.add("active");
      if (required) {
        setLabelText(`${name}<span style="margin-left: 2px;">*</span>`);
      }
    });

    inputRef.current.addEventListener("blur", () => {
      if (inputRef.current.value !== "") {
        labelRef.current.classList.add("lleno");
      } else {
        labelRef.current.classList.add("lleno");
      }
      labelRef.current.classList.remove("active");
      if (required) {
        setLabelText(
          `${name}<span style="color: red; margin-left: 2px;">*</span>`
        );
      }
    });

    return () => {
      inputRef.current?.removeEventListener("focus", () => {
        labelRef.current.classList.add("active");
      });
      inputRef.current?.removeEventListener("blur", () => {
        if (inputRef.current.value === "") {
          labelRef.current.classList.remove("active");
        }
      });
    };
  }, []);



  const organizarErrores = () => {
    if (errors) {
      return errors?.errors?.reduce((a, b) => {
        a[b.field] = b.message;
        // if (b.field === identifier){
        //   setErrorStyle("boder-danger");
        // }
        return a;
      }, {});
    }
  };

  //Aqui esta utilizando el prop validate para validar si el campo esta vacio y mostrar un mensaje de error
  // useEffect(() => {
  //   if (validate && value === "") {
  //     setInternalErrorMessage("Este campo es requerido*");
  //   } else {
  //     setInternalErrorMessage(null);

  //   }
  // }, [value, validate]);

  function removeError(errors, fieldToRemove) {
    return errors.errors.filter(error => error.field !== fieldToRemove);
  }

  const handleBlur = (event) => {
    let errors2 = removeError(errors, identifier);
    console.log("errors2:", errors2);
    errors = errors2;
    const inputValue = event.target.value;


    if (inputValue === "") {
      setInternalErrorMessage("Este campo es requerido*");
    }else{
      setInternalErrorMessage(null);
    }
    

    if (inputValue !== "" && validateData !== undefined) {
      const recordExists = validateData?.find(
        (record) => record[identifier] == inputValue
      );
      console.log("recordExists:", recordExists);
      if (recordExists) {
        setInternalErrorMessage("Ya existe un registro con este valor.");
      } else {
        setInternalErrorMessage(null);
      }
    }
  };

  const errorMessage = externalErrorMessage || internalErrorMessage;

  useEffect(() => {
    if (errors) {
      setErrorMessageToShow(organizarErrores());
    }
    console.log("errors en el input:", errors);
  }, [errors]);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const inputType = type === "password" && passwordShown ? "text" : type;

  return (
    <>
      <div className="form-group mb-3  inputContainer">
        <span className="inputSpan">
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={required ? handleBlur : null}
            placeholder={placeholder}
            className={`${className} ${
              errorMessageToShow != null &&
              errorMessageToShow[identifier] != null
                ? "border-danger"
                : internalErrorMessage != null
                ? "border-danger"
                : ""
            }`}
            ref={inputRef}
            id={id}
            readOnly={readonly}
            list={list}
            disabled={disabled}
            style={inputStyle}
            min={type === "number" ? 0 : min}
            max={max}
            step={type == 'time' ? "3600" : false}
          />
          {type === "password" && (
            <span
              className={`eye-icon ${passwordShown ? "show" : ""}`}
              onClick={togglePasswordVisibility}
              ref={eyeIconRef}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {passwordShown ? (
                <i className="fe fe-eye fe-16"></i>
              ) : (
                <i className="fe fe-eye-off fe-16"></i>
              )}
            </span>
          )}
        </span>
        <label
          htmlFor={name}
          className="form-label"
          ref={labelRef}
          dangerouslySetInnerHTML={{ __html: labelText }}
        />
        {list && (
          <datalist className="custom-datalist" id={list}>
            {options?.map((opcion) => (
              <option value={opcion.value} label={opcion.label} />
            ))}
          </datalist>
        )}
        {errorMessage && (
          <div
            className="error-message text-right"
            style={{ color: "red", fontSize: "9px", paddingTop: "1.4px" }}
          >
            {errorMessage}
          </div>
        )}
        {errors && errorMessageToShow != null && (
          <div
            className="error-message text-right"
            style={{ color: "red", fontSize: "9px", paddingTop: "1.4px" }}
          >
            {errorMessageToShow[identifier]}
          </div>
        )}
      </div>
    </>
  );
}

export default Inputs;
