import React from "react";
import "./FormContainer.css";
import { useNavigate } from "react-router";


function FormContainer({ name, children, buttons, modalButton, ButtonBack, onSubmit, onClickButtonOne }) {

  const navigate = useNavigate();
  return (
    <>
      <div div id="formContainer" className="card shadow">
        <div className="d-flex justify-content-between mb-2 pr-4" >
          <strong>
            <h3 className="mb-2">{name}</h3>
          </strong>
          {modalButton}
          {/* <p>Buenos diasBuenos diasBuenos diasBuenos diasBuenos diasBuenos dias</p> */}
          {ButtonBack ? <button className="btn btn-light botonregresso " style={{ marginRight: '50px', width: '110px', }} onClick={() => navigate(-1)} >Regresar</button> : null}
        </div>
        <div className="card-body" id='form'>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="row" style={{ marginBottom: "1rem", minHeigh: '200px', maxHeight: '380px', overflow: 'hidden', overflowY: 'auto', padding: '0.7rem 0' }}>
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
