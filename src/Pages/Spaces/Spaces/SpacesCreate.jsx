import React, { useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
// import { useFetchForFile } from '../../../Hooks/useFetch'
import FormColumn from "../../../Components/Forms/FormColumn";
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { spacesTypes } from '../../../Hooks/consts.hooks'


// import InputsSelect from '../../../Components/Inputs/InputsSelect'

export const SpacesCreate = () => {

  const [spaceType, setSpaceType] = useState("");
  const [image, setImage] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [area, setArea] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Active");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://apptowerbackend.onrender.com/api/spaces';
    // const url = 'http://localhost:3000/api/spaces';
    const data = {
      spaceType,
      image,
      spaceName,
      area,
      capacity,
      status,
    };

    console.log('Data:', data);

    // const { response, error } = await useFetchForFile(url, data);

    if (response) {
      console.log('Response:', response);
      Swal.fire({
        title: 'Éxito',
        text: 'Espacio creado exitosamente',
        icon: 'success',
      }).then(() => {

        navigate('/admin/spaces');
      });
    }

    if (error) {
      console.log('Hubo un error');
      Swal.fire({
        title: 'Error',
        text: 'Error al crear espacio',
        icon: 'error',
      });
    }
  };
  return (
    <>

      <FormContainer name='Crear espacio' buttons={<FormButton name='Crear espacio' backButton='Regresar' to='/admin/spaces/' onClick={handleSubmit} />}>
        {/* <FormColumn> */}

        <Uploader name="img"  onChange={e => setImage(e.target.files[0])} />
        
        <InputsSelect name={"Tipo de espacio"} options={spacesTypes}
         value={spaceType} onChange={e => setSpaceType(e.target.value)}> </InputsSelect>

        <Inputs name="Nombre espacio" placeholder="Ejemplo: 101"
          value={spaceName} onChange={e => setSpaceName(e.target.value)}></Inputs>
        <Inputs name="Area" type="number"
          value={area} onChange={e => setArea(e.target.value)}></Inputs>
        <Inputs name="Capacidad" type="number"
          value={capacity} onChange={e => setCapacity(e.target.value)}></Inputs>
        {/* <Inputs name="Estado"
          value={status} onChange={e => setStatus(e.target.value)}></Inputs> */}
      </FormContainer>
    </>)
}
