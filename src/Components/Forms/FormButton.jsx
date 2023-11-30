import React from 'react';
import './FormContainer.css';
import { Link } from 'react-router-dom';

function FormButton({ name, funcion, backButton, to, onClick }) {
  return (
    <div className='botoness'>
      <div className="form-group">
        <Link to={to} className="btn btn-light custom-btn">{backButton}</Link>
      </div>
      <div className="form-group">
        <button type='submit' className='btn btn-primary custom-btn-primary' onClick={onClick}>{name}</button>
      </div>
    </div>
  );
}

export default FormButton;
