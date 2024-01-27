import React, { useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { useNavigate } from 'react-router'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { spacesTypes } from '../../../Hooks/consts.hooks'
import { postRequest } from '../../../Helpers/Helpers'


// import InputsSelect from '../../../Components/Inputs/InputsSelect'

export const SpacesCreate = () => {

  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"

  const [spaceType, setSpaceType] = useState("");
  const [image, setImage] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [area, setArea] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Active");

  const navigate = useNavigate();

  const createSpace = async (event) => {

    console.log(image)
    const data = {

      spaceName: spaceName,
      image: image,
      area: area,
      capacity: capacity,
      status: status

    }

    console.log("edit data", data)

    await postRequest(event, 'spaces', 'POST', {}, data, url)

    navigate(-1)

  };

  return (
    <>

      <FormContainer name='Crear zona comun'
        buttons={<FormButton name='Crear espacio'
          backButton='Regresar' to='/admin/spaces/' onClick={createSpace} />}>
        {/* <FormColumn> */}

        <Uploader name="img" onChange={e => setImage(e.target.files[0])} />

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
