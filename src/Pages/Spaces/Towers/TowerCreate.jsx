import React, { useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { useNavigate } from 'react-router'

import { postRequest } from '../../../Helpers/Helpers'


// import InputsSelect from '../../../Components/Inputs/InputsSelect'

export const TowerCreate = () => {

  // const url = 'https://apptowerbackend.onrender.com/api/';
  const url = 'http://localhost:3000/api/';


  const [towerName, setTowerName] = useState("");
  const [towerImg, setTowerImg] = useState("");

  const navigate = useNavigate();

  const handleCreateTower = async (event) => {

    const data = {

      towerName,
      towerImg: towerImg !== ""? towerImg: ""

    };

    console.log(data, "data pa crear")

    await postRequest(event, 'towers', "POST", {}, data, url);

    navigate(-1)

  };

  console.log(typeof towerImg)


  return (
    <>

      <FormContainer name='Crear torre' buttons={<FormButton name='Crear apartamento' backButton='Regresar' onClick={handleCreateTower} />}>
        {/* <FormColumn> */}
        <Inputs name="Nombre de la torre" placeholder="Ejemplo: Torre 1 o torre sur"
          value={towerName} onChange={e => setTowerName(e.target.value)}></Inputs>
        <Uploader name="img" onChange={e => setTowerImg(e.target.files[0])} />

        
        
      </FormContainer>
    </>)
}
