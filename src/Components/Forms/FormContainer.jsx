import React from 'react';
import './FormContainer.css'; 

function FormContainer({name, children, buttons, modalButton}) {
  return (
    <>
        <div id='formContainer' className="card shadow mb-4 pl-5 pr-5">
            <div className="card-header mt-2 d-flex justify-content-between">
                <strong className="card-title"><h4>{name}</h4></strong>
                <div>{modalButton}</div>
            </div>
            <div className="card-body">
                <form>
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
