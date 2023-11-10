import React, { useState } from 'react'
import FormContainer from '../../Components/Forms/FormContainer'
import Inputs from '../../Components/Inputs/Inputs'
import FormButton from '../../Components/Forms/FormButton'
import {Uploader} from '../../Components/Uploader/Uploader'


export const SpacesCreate = () => {
  return (
    <>

      <FormContainer name='Crear espacio' buttons={<FormButton name='Crear espacio' backButton='Regresar' />}>
        {/* <FormColumn> */}
      
        <Uploader/>
        <Inputs name="Tipo de espacio" placeholder="Ejemplo: 101"></Inputs>
        <Inputs name="Nombre espacio" placeholder="Ejemplo: 101"></Inputs>
        <Inputs name="Area" type="number"></Inputs>
        <Inputs name="Capacidad" type="number"></Inputs>
        <Inputs name="Estado"></Inputs>

        {/* </FormColumn> */}


      </FormContainer>
    </>)
}
