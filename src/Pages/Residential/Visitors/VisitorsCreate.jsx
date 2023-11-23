import React, { useState } from "react";
import {docTypes, sexs} from "../../../Hooks/consts.hooks"
import Inputs from "../../../Components/Inputs/Inputs";
import FormButton from "../../../Components/Forms/FormButton";
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import { createPortal } from "react-dom";
import { ModalContainer, Modal } from "../../../Components/Modals/ModalTwo";
import ModalButton from "../../../Components/Modals/ModalButton";
import FormContainer from "../../../Components/Forms/FormContainer";
import FormColumn from "../../../Components/Forms/FormColumn";

function VisitorsCreate() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <FormContainer
        name="Crear visitante"
         
      //   modalButton={
      //   <ModalButton name={"Agregar visitante"} onClick={() => setShowModal(true)} />
      // }
      >
        
        <FormColumn>
        <InputsSelect name="Tipo de documento" options={docTypes}/>
        <Inputs name="Numero Documento" />
        <Inputs name="Nombre" />
        <Inputs name="Apellido" type="Text"/>
        <InputsSelect name="Sexo" options={sexs}/>
        <FormButton name={"Crear"} backButton={"regresar"}/>
        </FormColumn>
        <FormColumn>
        <Inputs name="Fecha de nacimiento" type="date"/>
        </FormColumn>
        

      </FormContainer>

      
      {showModal &&
        createPortal(
          <>
            <ModalContainer ShowModal={setShowModal}>
              <Modal
                showModal={setShowModal}
                title={"Crear residentes"}
              >
                <Inputs name="Nombre" placeholder="Ingresa tu nombre" />
                <Inputs name="Apellido" />
                <Inputs name="Genero" />
                <Inputs name="Acceso" />

                <Inputs name="Tipo Documento" placeholder="Ingresa tu nombre" />
                <Inputs name="Numero Documento" />



              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )}
    </>
  );
}

export default VisitorsCreate;
