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
      <div className='d-flex justify-content-end' style={{width: '100%', position:'sticky', top:0, backgroundColor: 'white'}}>
        <div className="form-group mr-2">
          <input type="submit" value={name}  className="btn btn-primary" onClick={onClick} />
        </div>
        <div className="form-group">
          <Link to={to} className="btn btn-light ">{backButton}</Link>
        </div>
      </div>
    </>
  );
}

export default FormButton;


