import React, { useState } from "react";
import { docTypes, sexs } from "../../../Hooks/consts.hooks";
import Inputs from "../../../Components/Inputs/Inputs";
import FormButton from "../../../Components/Forms/FormButton";
import InputsSelect from "../../../Components/Inputs/InputsSelect";

import FormContainer from "../../../Components/Forms/FormContainer";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFetchpost } from "../../../Hooks/useFetch";

function VisitorsCreate() {
  const [showModal, setShowModal] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState([]);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { response, error } = await useFetchpost('visitors', {
      "name": name,
      "lastname": lastname,
      "documentType": documentType,
      "documentNumber": document,
      "genre": genre,
      "access": true
    });
    console.log("Respuesta:", response, "Error:", error)

    // Manejar la respuesta o el error según sea necesario
    if (response) {
      // Manejar la respuesta exitosa
      console.log('Respuesta exitosa:', response);
            Swal.fire({
                title: 'Éxito',
                text: 'Visitante creado exitosamente',
                icon: 'success',
            }).then(() => {

        navigate('/admin/visitors');
      });
    }

    if (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error al crear el visitante',
                icon: 'error',
            });
            const errorData = error.errorData;
            setErrors(errorData);
    }
  };

  return (
    <>
      <FormContainer
        name="Crear visitante"

        //   modalButton={
        //   <ModalButton name={"Agregar visitante"} onClick={() => setShowModal(true)} />
        // }
        buttons={<FormButton name={"Crear"} backButton={"regresar"} onClick={handleSubmit} />}
      >
        <InputsSelect name="Tipo de documento" identifier={"documentType"} value={documentType} errors={errors} options={docTypes} onChange={(e) => setDocumentType(e.target.value)} />
        <Inputs name="Numero Documento" identifier={"documentNumber"} value={document} errors={errors} onChange={(e) => setDocument(e.target.value)} />
        <Inputs name="Nombre" identifier={"name"} value={name} errors={errors} onChange={(e) => setName(e.target.value)} />
        <Inputs name="Apellido" identifier={"lastname"} value={lastname} errors={errors} type="text" onChange={(e) => setLastName(e.target.value)} />
        <InputsSelect name="Genero" identifier={"genre"} value={genre} errors={errors} options={sexs} onChange={(e) => setGenre(e.target.value)} />


      </FormContainer>
    </>
  );
}

export default VisitorsCreate;

// {showModal &&
//   createPortal(
//     <>
//       <ModalContainer ShowModal={setShowModal}>
//         <Modal
//           showModal={setShowModal}
//           title={"Crear residentes"}
//         >
//           <Inputs name="Nombre" placeholder="Ingresa tu nombre" />
//           <Inputs name="Apellido" />
//           <Inputs name="Genero" />
//           <Inputs name="Tipo Documento" placeholder="Ingresa tu nombre" />
//           <Inputs name="Numero Documento" />



//         </Modal>
//       </ModalContainer>
//     </>,
//     document.getElementById("modalRender")
//   )}
