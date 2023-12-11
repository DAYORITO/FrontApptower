import React, { useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
// import InputsSelect from '../../../Components/Inputs/InputsSelect'
import Swal from 'sweetalert2'
import { useFetchpostFile } from '../../../Hooks/useFetch'
import { useNavigate } from 'react-router'
import FormColumn from "../../../Components/Forms/FormColumn";


export const ApartmentCreate = () => {


  const [tower, setTower] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [apartmentsFloor, setApartmentsFloor] = useState("");

  const [area, setArea] = useState("");
  const [status, setStatus] = useState("Active");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://apptowerbackend.onrender.com/api/apartments';
    // const url = 'http://localhost:3000/api/apartments';
    const data = {
      tower,
      floorNumber,
      apartmentsFloor,
      area,
      status
    };

    console.log('Data:', data);

    const { response, error } = await useFetchpostFile(url, data);

    if (response) {
      console.log('Response:', response);
      Swal.fire({
        title: 'Éxito',
        text: 'Apartamento creado creado exitosamente',
        icon: 'success',
      }).then(() => {

        navigate('/admin/apartments');
      });
    }

    if (error) {
      console.log('Hubo un error');
      Swal.fire({
        title: 'Error',
        text: 'Error al crear apartamento',
        icon: 'error',
      });
    }
  };

  return (
    <>

      <FormContainer name='Crear apartamento' buttons={<FormButton name='Crear apartamento' backButton='Regresar' to='/admin/apartaments/' onClick={handleSubmit} />}>

        {/* <FormColumn> */}
          <Inputs name="Torre " type={"text"}
            value={tower} onChange={e => setTower(e.target.value)}></Inputs>
          <Inputs name="Numero de pisos " type={"number"}
            value={floorNumber} onChange={e => setFloorNumber(e.target.value)}></Inputs>
        {/* </FormColumn> */}
        {/* <FormColumn> */}
          <Inputs name="Apartamentos por piso " type={"number"}
            value={apartmentsFloor} onChange={e => setApartmentsFloor(e.target.value)}></Inputs>
          <Inputs name="Area" type="number"
            value={area} onChange={e => setArea(e.target.value)}></Inputs>
        {/* </FormColumn> */}

      </FormContainer>
    </>)
}
