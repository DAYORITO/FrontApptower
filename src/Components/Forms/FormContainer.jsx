import React from 'react';
import './FormContainer.css';

function FormContainer({ name, children, buttons, modalButton, onSubmit }) {
  return (
    <>
      <div id='formContainer' className="card shadow mb-4 pl-5 pr-5">
        <div className="card-header mt-2 d-flex justify-content-between">
          <strong className="card-title"><h4>{name}</h4></strong>
          <div>{modalButton}</div>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row">
              {children}
              {buttons}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormContainer;
