import React from 'react'

function InputTextArea({name, id, value, onChange}) {
  return (
    <>
        <div className="form-group mb-3" style={{width: '100%'}}>
            <label>{name}</label>
            <textarea id={id} value={value} onChange={onChange} className='form-control'  rows="5"></textarea>
        </div>
    </>
  )
}

export default InputTextArea