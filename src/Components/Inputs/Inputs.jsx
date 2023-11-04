import React from 'react'

function Inputs({ name, value, onChange, placeholder, type, id }) {
  return (
    <>
      <div className='form-group mb-3 col-sm-12 col-md-12'>
        <label htmlFor={name} className='form-label'>{name}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='form-control'
          id={id}
        />
      </div>
    </>
  )
}

export default Inputs;