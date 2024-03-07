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

  const [errorList, setErrorList] = useState([]);

  const navigate = useNavigate();

  const createParking = async (event) => {

    const data = {

      floor: floor,
      parkingPerFloor: parseInt(parkingPerFloor),
      parkingType: parkingType,


    };


    await postRequest(event, 'parkingSpaces', 'POST', null, data, url, setErrorList, navigate, null);


  };




  return (
    <FormContainer name='Crear parqueadero'
      buttons={<FormButton onClick={createParking} name='Crear parqueaderos' backButton='Regresar' />}>
      {/* <FormColumn> */}

      <InputsSelect id={"select"}
        options={parkingTypes} name={"Tipo de parqueaderos"} identifier={"parkingType"} errors={errorList}
        value={parkingType} onChange={e => setParkingType(e.target.value)}></InputsSelect>

      <Inputs name="Nombre del piso" identifier={"floor"} errors={errorList} type={"text"} placeholder={"S1"}
        value={floor} onChange={e => setFloor(e.target.value)}
      ></Inputs>

      <Inputs name="Parqueaderos por piso" type={"text"} identifier={"parkingPerFloor"} errors={errorList}
        value={parkingPerFloor} onChange={e => setParkingPerFloor(e.target.value)}
      ></Inputs>




      {/* </FormColumn> */}


    </FormContainer >)
}
