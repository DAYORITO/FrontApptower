import React, {useState} from 'react'
import FormContainer from '../../Components/Forms/FormContainer'
import FormColumn from '../../Components/Forms/FormColumn'
import Inputs from '../../Components/Inputs/Inputs'
import FormButton from '../../Components/Forms/FormButton'
import InputsSelect from '../../Components/Inputs/InputsSelect'


function VisitorsCreate() {
  // const opciones = ['Hola', 'Adios']
  return (
    <>

      <FormContainer name='Crear visitante' buttons={<FormButton name='Crear'  backButton='Cancelar'/>}>
        {/* <FormColumn> */}
        <Inputs name="Tipo Documento" placeholder="Ingresa tu nombre"></Inputs>
        <Inputs name="Numero Documento"></Inputs>
        <Inputs name="Nombre"></Inputs>
        {/* <Inputs name="" type="Date"></Inputs> */}
        {/* <InputsSelect opciones1={opciones} /> */}
        {/* </FormColumn> */}
        {/* <FormColumn> */}
        <Inputs name="Apellido" type="Text"></Inputs>
        <Inputs name="Genero" type="Text"></Inputs>
        <Inputs name="Acceso" type="Text"></Inputs>
        {/* </FormColumn> */}
        
      </FormContainer>
    </>
  )
}

export default VisitorsCreate;