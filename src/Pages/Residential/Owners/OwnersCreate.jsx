import React, { useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { useNavigate } from 'react-router'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { useFetchget, useFetchpostFile } from '../../../Hooks/useFetch'
import Swal from 'sweetalert2'
import { docTypes } from '../../../Hooks/consts.hooks'

export const OwnersCreate = () => {


  const [pdf, setPdf] = useState("");
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("Inactive");


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://apptowerbackend.onrender.com/api/owners';
    // const url = 'http://localhost:3000/api/owners';
    const data = {
      pdf,
      docType,
      docNumber,
      name,
      lastName,
      // sex,
      birthday,
      email,
      phoneNumber,
      status

    };

    console.log('Data:', data);

    const { response, error } = await useFetchpostFile(url, data);

    if (response) {
      console.log('Response:', response);
      Swal.fire({
        title: 'Éxito',
        text: 'Propietario creado exitosamente',
        icon: 'success',
      }).then(() => {

        navigate('/admin/owners');
      });
    }

    if (error) {
      console.log('Hubo un error');
      Swal.fire({
        title: 'Error',
        text: 'Error al crear propietario',
        icon: 'error',
      });
    }
  };

 


  const sexs = [

    {
      value: "M",
      label: "Masculino"
    },
    {
      value: "F",
      label: "Femenino"
    },

  ]

  const { data, load, error } = useFetchget('https://apptowerbackend.onrender.com/api/apartments')

  const apartmentList = data && data.apartments
  ? data.apartments
    .filter(apartment => apartment.status === 'Active') 
    .map(apartment => ({
      value: apartment.idApartment,
      label: apartment.apartmentName
    }))
  : [];

  console.log(apartmentList)

  

  return (
    <>

      <FormContainer name='Crear propietario' buttons={<FormButton name='Crear propietario' backButton='Regresar' to='/admin/owners/' onClick={handleSubmit} />}>
        {/* <FormColumn> */}

        <Uploader name='pdf' label='Documento de identidad' formatos='.pdf'
          onChange={e => setPdf(e.target.files[0])} />

        <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"}
          value={docType} onChange={e => setDocType(e.target.value)}></InputsSelect>

        <Inputs name="Numero de documento" placeholder="1000000007"
          value={docNumber} onChange={e => setDocNumber(e.target.value)}></Inputs>

        <Inputs name="Nombre"
          value={name} onChange={e => setName(e.target.value)}></Inputs>

        <Inputs name="Apellido"
          value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>

        {/* <InputsSelect id={"select"} options={sexs} name={"Sexo"}
          value={sex} onChange={e => setSex(e.target.value)}></InputsSelect> */}

        <Inputs name="Fecha de nacimiento" type="Date"
          value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>

        <Inputs name="Correo" type="email"
          value={email} onChange={e => setEmail(e.target.value)}></Inputs>

        <Inputs name="Numero de telefono"
          value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></Inputs>

        <InputsSelect id={"select"} options={apartmentList} name={"Apartamento "}></InputsSelect>


      </FormContainer>
    </>
  )
}
