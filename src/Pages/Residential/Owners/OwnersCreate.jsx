import React, {useState} from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'

export const OwnersCreate = () => {
  return (
    <>

      <FormContainer name='Crear propietario' buttons={<FormButton name='Crear propietario' backButton='Regresar' />}>
        {/* <FormColumn> */}

        <Uploader label='Documento de indentidad' formatos='.pdf' />

        <Inputs name="Tipo de documento" placeholder="Ejemplo: CC"></Inputs>

        <Inputs name="Numero de documento" placeholder="1000000007"></Inputs>
        <Inputs name="Apellido"></Inputs>
        <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
        <Inputs name="Correo" type="email"></Inputs>
        <Inputs name="Numero de telefono"></Inputs>
        <Inputs name="Estado"></Inputs>
      </FormContainer>
    </>
  )
}
