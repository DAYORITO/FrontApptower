import React from 'react'
import './FormContainer.css'

function FormContainer({name, children}) {
  return (
    <>
        <div className="card shadow mb-4 rojo">
            <div className="card-header">
                <strong className="card-title">{name}</strong>
            </div>
            <div className="card-body" style={{
                maxHeight: '60vh',
                overflow: 'hidden',
                overflowY: 'scroll',
            }}>
                <div className="row">
                    {children}
                </div>
            </div>
        </div>
    </>
  )
}

export default FormContainer