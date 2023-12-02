import React from 'react';
import './FormContainer.css';
import { Link, useNavigate } from 'react-router-dom';

function FormButton({ name, funcion, backButton, to, onClick }) {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className='botones'>
        <div className="form-group">
          <input type="submit" value={name} className="btn btn-primary btn-block" onClick={onClick} />
        </div>
        <div className="form-group">
          {/* Utiliza la función handleBackButtonClick para el botón de retroceso */}
          <button className="btn btn-light btn-block" onClick={handleBackButtonClick}>
            {backButton}
          </button>
        </div>
      </div>
    </>
  );
}

export default FormButton;


