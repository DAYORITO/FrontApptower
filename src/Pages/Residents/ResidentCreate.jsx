import React from 'react'
import FormContainer from '../../Components/FormContainer/FormContainer'
import FormColumn from '../../Components/FormContainer/FormColumn'
import Inputs from '../../Components/Inputs/Inputs'

export const ResidentCreate = () => {
    return (

        <FormContainer name='Crear residente'>
            <Inputs name="Nombre" placeholder="Ingresa tu nombre"></Inputs>
            <Inputs name="Apellido"></Inputs>
            <Inputs name="Edad"></Inputs>
            <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
            <Inputs name="Email" type="Email"></Inputs>

            <Inputs name="Password" type="Password"></Inputs>
            <Inputs name="Cabello" type="Password"></Inputs>
            <Inputs name="Ojos" type="Password"></Inputs>
        </FormContainer>
    )
}


