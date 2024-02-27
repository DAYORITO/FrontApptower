import React, { useEffect, useState } from 'react'

function InputTextArea({name, id, value, onChange, identifier, errors, className}) {
  const [errorMessageToShow, setErrorMessageToShow] = useState(null);

  const organizarErrores = ()=>{
    if (errors){
      return errors?.errors?.reduce((a,b)=>{
        a[b.field] = b.message;
        return a;
      }, {})
    }
  }

  useEffect(() => {
    if (errors) {
      setErrorMessageToShow(organizarErrores());
    }
  }, [errors]);

  return (
    <>
        <div className={`form-group mb-3 ${className} ${errorMessageToShow != null && errorMessageToShow[identifier] != null ? "border-danger" : ""}`} style={{width: '100%'}}>
            <label>{name}</label>
            <textarea id={id} value={value} onChange={onChange} className={`form-control ${errorMessageToShow != null && errorMessageToShow[identifier] != null ? "border-danger" : ""}`}  rows="5"></textarea>
            {errors && errorMessageToShow != null  &&
         <div className="error-message text-right" style={{ color: 'red', fontSize: '9px', paddingTop: '1.4px' }}>{errorMessageToShow[identifier]}</div>}
        </div>
    </>
  )
}

export default InputTextArea