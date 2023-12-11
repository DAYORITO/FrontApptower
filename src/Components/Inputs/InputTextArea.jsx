import React from 'react'

function InputTextArea({name, id, value}) {
  return (
    <>
        <div className="form-group mb-3" style={{width: '100%'}}>
            <label>{name}</label>
            <textarea id={id} value={value} className='form-control'  rows="5"></textarea>
        </div>
    </>
  )
}

export default InputTextArea