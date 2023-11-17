import React from 'react';
import './FormContainer.css';

function FormContainer({ name, children, buttons, modalButton, onSubmit }) {
  return (
    <>
      <div div id='formContainer' className="card shadow" >
        <div className="justify-content-between">
          <strong ><h4>{name}</h4></strong>
          <div>{modalButton}</div>
        </div>
        <div className="card-body" id='form'>
          <form>
            <div className="row">
              {children}
              {buttons}
            </div>
          </form>
        </div>
      </div >
      
    </>




  )
}

export default FormContainer;
