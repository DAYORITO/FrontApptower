import React from 'react'

function FormContainer({name, children}) {
  return (
    <>
        <div className="card shadow mb-4">
            <div className="card-header">
                <strong className="card-title">{name}</strong>
            </div>
            <div className="card-body">
                <div className="row">
                    {children}
                </div>
            </div>
        </div>
    </>
  )
}

export default FormContainer