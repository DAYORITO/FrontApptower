import React, {useState} from 'react'
import FormContainer from '../../Components/Forms/FormContainer'
import FormColumn from '../../Components/Forms/FormColumn'
import Inputs from '../../Components/Inputs/Inputs'
<<<<<<< HEAD
import FormButton from '../../Components/Forms/FormButton'
import ModalContainer from '../../Components/Modals/Modal'
import ModalButton from '../../Components/Modals/ModalButton'
import ModalInputs from '../../Components/Modals/ModalInputs'


=======
import { ContainerHeader } from '../../Components/ContainerHeader/containerHeader'
import { Nav } from '../../Components/Nav/Nav'
import { Aside } from '../../Components/Aside/Aside'
>>>>>>> Daniel

function VisitorsCreate() {
  const [show, setShow] = useState(false);


  const handleClose = () => {setShow(false); };
  const handleShow = () => {setShow(true); };


  return (
    <>
<<<<<<< HEAD
         <FormContainer 
          name='Crear visitante' 
          botones={
            <FormButton 
              backButton={"Regresar"}
            />} 
          botonModal={
            <ModalButton 
              name={"Crear Cosas"}
              onClick={handleShow}
            />}
          >
              <FormColumn>
                <Inputs name="Nombre" placeholder="Ingresa tu nombre"></Inputs>
                <Inputs name="Apellido"></Inputs>
                <Inputs name="Edad"></Inputs>
                <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
              </FormColumn>
              <FormColumn>
                <Inputs name="Email" type="Email"></Inputs>
                <Inputs name="Password" type="Password"></Inputs>
                <Inputs name="Cabello" type="Password"></Inputs>
                <Inputs name="Ojos" type="Password"></Inputs>
              </FormColumn> 
              <ModalContainer
          show={show} handleClose={handleClose}
        >
          <ModalInputs name="Nombre" placeholder="Ingresa tu nombre"></ModalInputs>
        </ModalContainer>

          </FormContainer>
        
=======

      <FormContainer name='Crear visitante'>
        <Inputs name="Nombre" placeholder="Ingresa tu nombre"></Inputs>
        <Inputs name="Apellido"></Inputs>
        <Inputs name="Edad"></Inputs>
        <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
        <Inputs name="Email" type="Email"></Inputs>

        <Inputs name="Password" type="Password"></Inputs>
        <Inputs name="Cabello" type="Password"></Inputs>
        <Inputs name="Ojos" type="Password"></Inputs>
      </FormContainer>
>>>>>>> Daniel
    </>
  )
}

export default VisitorsCreate