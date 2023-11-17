import React from 'react'
import './FormContainer.css'
import { Link } from 'react-router-dom';

function FormButton({ name, funcion, backButton, to, onClick }) {
  return (
    <>
      <div className='botones'>
        <div className="form-group">
          <input type="submit" value={name} className="btn btn-primary btn-block" onClick={onClick} />
        </div>
        <div className="form-group">
          <Link to={to} className="btn btn-light btn-block">{backButton}</Link>
        </div>
      </div>
    </>
  )
}



export default FormButton