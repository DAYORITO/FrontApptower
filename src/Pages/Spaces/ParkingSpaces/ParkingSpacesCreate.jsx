import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { useState } from 'react';
import { parkingTypes } from '../../../Hooks/consts.hooks';
import { useNavigate } from 'react-router'
import { postRequest } from '../../../Helpers/Helpers';

export const ParkingSpacesCreate = () => {

  // const url = 'https://apptowerbackend.onrender.com/api/';
  const url = 'http://localhost:3000/api/';

  const [floor, setFloor] = useState("");
  const [parkingPerFloor, setParkingPerFloor] = useState("");
  const [parkingType, setParkingType] = useState("");

  const navigate = useNavigate();

  const createParking = async (event) => {

    const data = {

      floor: floor,
      parkingPerFloor: parseInt(parkingPerFloor) ,
      parkingType: parkingType,


    };

    console.log(data, "data pa crear")

    await postRequest(event, 'parkingSpaces', 'POST', {}, data, url);

    navigate(-1)

  };




  return (
    <FormContainer name='Crear parqueadero'
      buttons={<FormButton onClick={createParking} name='Crear parqueaderos' backButton='Regresar' />}>
      {/* <FormColumn> */}

      <InputsSelect id={"select"} options={parkingTypes} name={"Tipo de parqueaderos"}
        value={parkingType} onChange={e => setParkingType(e.target.value)}></InputsSelect>

      <Inputs name="Nombre del piso" type={"text"} placeholder={"S1"}
        value={floor} onChange={e => setFloor(e.target.value)}
      ></Inputs>

      <Inputs name="Parqueaderos por piso" type={"text"}
        value={parkingPerFloor} onChange={e => setParkingPerFloor(e.target.value)}
      ></Inputs>




      {/* </FormColumn> */}


    </FormContainer >)
}
