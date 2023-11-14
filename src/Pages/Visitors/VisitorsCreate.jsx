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
  const opciones = ["Tipo Documento", "Numero Documento", "Nombre", "Apellido", "Genero", "Acceso"];

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
        {/* <InputsSelect opciones1={opciones}></InputsSelect> */}
        {/* </FormColumn> */}
        {/* <button onClick={() => setShowModal(true)}>Abrir Modal</button> */}
        {/* {showModal
          && <ReactDom.createPortal>
              <ModalContainer/>
            </ReactDom.createPortal>
          
        } */}
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
                {/* <FormButton name={"Prueba"}></FormButton>
                <form>
                  <div>
                    <label className="form-label">Nombre</label>
                    <input name="nombre" className="form-control" placeholder="Ingresa tu aleja"/>
                  </div>
                  
                </form> */}
                
                
              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )}
    </>
  );
}

export default VisitorsCreate;
