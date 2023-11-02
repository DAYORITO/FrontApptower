import React from 'react'
import './FormContainer.css'

function FormButton({value, accionar, regresar}) {
  return (
    <>
        <div className='botones'>
            <div class="form-group">
                <input type="submit" value="Registrar" class="btn btn-primary btn-block" />
            </div>
            <div class="form-group">
                <a class="btn btn-light btn-block">Regresar</a>
            </div>
        </div>
    </>
  )
}

export default FormButton