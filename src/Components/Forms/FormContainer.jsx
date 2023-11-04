import React from 'react'
import './FormContainer.css'

function FormContainer({name, children, botones, botonModal}) {
  return (
    <>
        <div className="card shadow mb-4 rojo">
            <div className="card-header mt-2 d-flex justify-content-between">
                <strong className="card-tittle"><h4>{name}</h4></strong>
                <div>{botonModal}</div>
            </div>
            <div className="card-body" style={{
                maxHeight: '65vh',
                overflow: 'hidden',
                overflowY: 'scroll',
            }}>
                <div className="row">
                    {children}
                </div>
                {botones}
            </div>
        </div>
    </>
  )
}

export default FormContainer