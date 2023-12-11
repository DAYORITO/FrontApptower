import React from "react";
import "./FormContainer.css";

function FormContainer({ name, children, buttons, modalButton, onSubmit, onClickButtonOne }) {
  return (
    <>
      <div div id="formContainer" className="card shadow">
        <div className="d-flex justify-content-between mb-2 pr-4" >
          <strong>
            <h3 className="mb-2">{name}</h3>
          </strong>
          {/* <p>Buenos diasBuenos diasBuenos diasBuenos diasBuenos diasBuenos dias</p> */}
          {modalButton}
        </div>
        <div className="card-body" id='form'>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="row" style={{minHeigh: '200px', maxHeight: '430px', overflow: 'hidden', overflowY: 'auto', padding: '0.7rem 0'}}>
              {children}
            </div>
            
            {buttons}
          </form>
        </div>
      </div>

    </>
  );
}

export default FormContainer;
