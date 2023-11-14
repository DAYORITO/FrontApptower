import {React, useState} from 'react'

function InputsSelect({opciones1}) {
    const {opciones} = opciones1;
  return (
    <>
    <select>
        <option selected disabled>"Selecciona una opcion"</option>
        {opciones.map((opcion) => {
            return <option value={opcion}>{opcion}</option>
        })}
    </select>
    </>
  )
}

export default InputsSelect