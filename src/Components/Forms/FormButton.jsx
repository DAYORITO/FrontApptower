import React from 'react'
import './FormContainer.css'

function FormButton({ name, funcion, backButton, ref, onClick }) {
  return (
    <>
      <div className='botones'>
        <div class="form-group">
          <input type="submit" value={name} class="btn btn-primary btn-block" onClick={onClick} />
        </div>
        <div class="form-group">
          <a href={ref} class="btn btn-light btn-block">{backButton}</a>
        </div>
      </div>
    </>
  )
}

export default FormButton