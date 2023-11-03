import React from 'react'
import './inputsLogIn.css';


export const InputsLogIn = () => {
  return (
    <form className="form">
      <label>
        <i className={className}></i>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          id={id} />
      </label>
    </form>
  );
}

