import React from 'react'
import FormContainer from '../../Components/FormContainer/FormContainer'
import FormColumn from '../../Components/FormContainer/FormColumn'
import Inputs from '../../Components/Inputs/Inputs'

export const ResidentCreate = () => {
    return (

        <FormContainer name='Residents create'>
            <Inputs name="Nombre" placeholder="Ingresa tu nombre"></Inputs>
            <Inputs name="Apellido"></Inputs>
        </FormContainer>
    )
}


