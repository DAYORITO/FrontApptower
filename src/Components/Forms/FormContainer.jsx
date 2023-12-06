import React from "react";
import "./FormContainer.css";

function FormContainer({ name, children, buttons, modalButton, onSubmit, onClickButtonOne }) {
  return (
    <>
      <div div id="formContainer" className="card shadow">
        <div className="d-flex justify-content-between">
          <strong>
            <h3 className="mb-2">{name}</h3>
          </strong>
          {/* <p>Buenos diasBuenos diasBuenos diasBuenos diasBuenos diasBuenos dias</p> */}
          {modalButton}
        </div>
        <div className="card-body" id='form'>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="col cosa">
              <div className="row">
                {children}
              </div>
              <div className="row">
                {buttons}
              </div>
            </div>

          </form>
        </div>
      </div>

    </>
  );
}

export default FormContainer;
