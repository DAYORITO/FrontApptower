import React from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import FormButton from '../../../Components/Forms/FormButton'
import Inputs from '../../../Components/Inputs/Inputs'

function GuestIncomeCreate() {
  return (
    <>
    <FormContainer name='Crear Ingreso' buttons={<FormButton name='Crear'  backButton='Cancelar'/>}>
        <Inputs name="Apartamento" type="text"></Inputs>
        <Inputs name="Cedula Visitante" type="text"></Inputs>
        <Inputs name="Persona que permite el acceso" type="text"></Inputs>
        <Inputs name="Observaciones" type="text"></Inputs>
    </FormContainer>

    </>
  )
}

export default GuestIncomeCreate