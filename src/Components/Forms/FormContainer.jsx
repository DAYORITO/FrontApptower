import React from 'react'
import './FormContainer.css'

function FormContainer({name, children, botones}) {
  return (
    <>
        <h1 className="h3 mb-3 text-gray-800">{name}</h1>
        <div className="card shadow mb-4 rojo">
            <div className="card-header">
                <strong className="card-title">{name}</strong>
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