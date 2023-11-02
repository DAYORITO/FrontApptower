import React from 'react'
import FormContainer from '../../Components/Forms/FormContainer'
import FormColumn from '../../Components/Forms/FormColumn'
import Inputs from '../../Components/Inputs/Inputs'
import FormButton from '../../Components/Forms/FormButton'

function VisitorsCreate() {
  return (
    <>
         <FormContainer name='Crear visitante' botones={<FormButton/>}>
                <Inputs name="Nombre" placeholder="Ingresa tu nombre"></Inputs>
                <Inputs name="Apellido"></Inputs>
                <Inputs name="Edad"></Inputs>
                <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
                <Inputs name="Email" type="Email"></Inputs>
            
                <Inputs name="Password" type="Password"></Inputs>
                <Inputs name="Cabello" type="Password"></Inputs>
                <Inputs name="Ojos" type="Password"></Inputs>
                
        </FormContainer>
    </>
  )
}

export default VisitorsCreate