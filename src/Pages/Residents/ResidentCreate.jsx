import React, {useState} from 'react'
import FormContainer from '../../Components/Forms/FormContainer'
import Inputs from '../../Components/Inputs/Inputs'
import FormButton from '../../Components/Forms/FormButton'

export const ResidentCreate = () => {
    return (

        <FormContainer name='Crear residente' buttons={<FormButton name='Crear residente' backButton='Regresar' />}>
        {/* <FormColumn> */}
        <Inputs name="Tipo de documento" placeholder="Ejemplo: CC"></Inputs>

        <Inputs name="Numero de documento" placeholder="1000000007"></Inputs>
        <Inputs name="Apellido"></Inputs>
        <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
        <Inputs name="Correo" type="email"></Inputs>
        <Inputs name="Numero de telefono"></Inputs>
        <Inputs name="Tipo de residente"></Inputs>
        <Inputs name="Estado"></Inputs>
      </FormContainer>
    )
}


