import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { useState } from 'react';
import { parkingTypes } from '../../../Hooks/consts.hooks';
import { useFetchpost, useFetchpostFile } from '../../../Hooks/useFetch';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router'

export const ParkingSpacesCreate = () => {

  const [floor, setFloor] = useState("");
  const [parkingPerFloor, setParkingPerFloor] = useState("");
  const [parkingType, setParkingType] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://apptowerbackend.onrender.com/api/apartments';
    // const url = 'http://localhost:3000/api/parkingSpaces';
    const data = {
      floor,
      parkingPerFloor,
      parkingType,
    };

    console.log('Data:', data);

    const { response, error } = await useFetchpostFile(url, data);

    if (response) {
      console.log('Response:', response);
      Swal.fire({
        title: 'Éxito',
        text: 'Parqueadero creado creado exitosamente',
        icon: 'success',
      }).then(() => {

        navigate(-1);
      });
    }

    if (error) {
      console.log('Hubo un error');
      Swal.fire({
        title: 'Error',
        text: 'Error al crear parqueadero',
        icon: 'error',
      });
    }
  };


  return (
    <FormContainer name='Crear parqueadero'  buttons={<FormButton  onClick={handleSubmit} name='Crear parqueadero' backButton='Regresar' />}>
      {/* <FormColumn> */}

      <Inputs name="Piso" type={"text"}
        value={floor} onChange={e => setFloor(e.target.value)}
      ></Inputs>

      <Inputs name="Parqueaderos por piso" type={"text"}
        value={parkingPerFloor} onChange={e => setParkingPerFloor(e.target.value)}
      ></Inputs>

      <InputsSelect id={"select"} options={parkingTypes} name={"Tipo de parqueadero"}
        value={parkingType} onChange={e => setParkingType(e.target.value)}></InputsSelect>


      {/* </FormColumn> */}


    </FormContainer >)
}
