import React from "react";
import "./FormContainer.css";

function FormContainer({ name, children, buttons, modalButton, onSubmit }) {
  return (
    <>
      <div div id="formContainer" className="card shadow mb-4 pl-5 pr-5">
        <div className=" mt-5 ml-1 d-flex justify-content-between">
          <strong>
            <h4>{name}</h4>
          </strong>
          <div>{modalButton}</div>
        </div>
        <div className="card-body" id='form'>
          <form onSubmit={onSubmit}>
            <div className="row">
              {children}
              {buttons}
            </div>
          </form>
        </div>
      </div >

    </>
  );
}

export default FormContainer;
