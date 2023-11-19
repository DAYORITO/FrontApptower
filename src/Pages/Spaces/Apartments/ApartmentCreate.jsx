import React, { useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
// import InputsSelect from '../../../Components/Inputs/InputsSelect'

export const ApartmentCreate = () => {
  return (
    <>

      <FormContainer name='Crear apartamento' buttons={<FormButton name='Crear apartamento' backButton='Regresar' />}>
        {/* <FormColumn> */}

        <Inputs name="Nombre apartamento" placeholder="Ejemplo: 101"></Inputs>
        <Inputs name="Area" type="number"></Inputs>
        <Inputs name="Capacidad" type="number"></Inputs>
        

      </FormContainer>
    </>)
}
