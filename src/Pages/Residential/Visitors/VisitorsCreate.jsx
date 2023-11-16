import React, { useState } from "react";
import FormContainer from "../../Components/Forms/FormContainer";
import FormColumn from "../../Components/Forms/FormColumn";
import Inputs from "../../Components/Inputs/Inputs";
import FormButton from "../../Components/Forms/FormButton";
import InputsSelect from "../../Components/Inputs/InputsSelect";
// import ModalContainer from '../../Components/Modals/Modal';
import { createPortal } from "react-dom";
import { ModalContainer, Modal } from "../../Components/Modals/ModalTwo";
import ModalButton from "../../Components/Modals/ModalButton";

function VisitorsCreate() {
  const [showModal, setShowModal] = useState(false);
  const opciones = [
    {
      value: "CC",
      label: "CC"
    },
    {
      value: "TI",
      label: "TI"
    },
    {
      value: "CE",
      label: "CE"
    }
  ];

  return (
    <>
      <FormContainer
        name="Crear visitante"
        buttons={<FormButton name="Crear" backButton="Cancelar" />}
        modalButton={<ModalButton name={"Agregar visitante"} onClick={() => setShowModal(true)}/>}
      >
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
        <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"}></InputsSelect>
        
      </FormContainer>
      {showModal &&
        createPortal(
          <>
            <ModalContainer ShowModal={setShowModal}>
              <Modal
                showModal={setShowModal}
                title={"Crear residentes"}
              >
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
