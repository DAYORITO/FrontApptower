import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useFetchget, useFetchpostFile } from '../../../Hooks/useFetch'
import { docTypes, residentsTypes, sexs } from '../../../Hooks/consts.hooks'

import Swal from 'sweetalert2'

import FormColumn from "../../../Components/Forms/FormColumn";

export const ResidentCreate = () => {

  const [pdf, setPdf] = useState("");
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [residentType, setResidentType] = useState("");
  const [idApartment, setIdApartment] = useState("");

  const [residentStartDate, setResidentStartDate] = useState("");
  const [residentEndDate, setResidentEndDate] = useState("");

  const [status, setStatus] = useState("Inactive");


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const url = 'https://apptowerbackend.onrender.com/api/residents';
    const url = 'http://localhost:3000/api/residents';
    const data = {
      pdf,
      docType,
      docNumber,
      name,
      lastName,
      sex,
      birthday,
      email,
      phoneNumber,
      residentType,
      status,
      idApartment,
      residentStartDate,
      residentEndDate
    };

    console.log('Data:', data);

    const { response, error } = await useFetchpostFile(url, data);

    if (response) {
      console.log('Response:', response);
      Swal.fire({
        title: 'Éxito',
        text: 'Residente creado exitosamente',
        icon: 'success',
      }).then(() => {

        navigate('/admin/residents');
      });
    }

    if (error) {
      console.log('Hubo un error');
      Swal.fire({
        title: 'Error',
        text: 'Error al crear residente',
        icon: 'error',
      });
    }
  };


  const { data, load, error } = useFetchget('apartments')

  const apartmentList = data && data.apartments
    ? data.apartments
      .filter(apartment => apartment.status === 'Active')
      .map(apartment => ({
        value: apartment.idApartment,
        label: apartment.apartmentName
      }))
    : [];



  return (

    <FormContainer name='Crea residente' buttons={<FormButton name='Crear residente' backButton='Regresar' to='/admin/residents/' onClick={handleSubmit} />}>

      <FormColumn>
        <h6 className='mb-4 text-muted'>Autentificacion</h6>

        <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"}
          value={docType} onChange={e => setDocType(e.target.value)}></InputsSelect>

        <Inputs name="Numero de documento" placeholder="1000000007"
          value={docNumber} onChange={e => setDocNumber(e.target.value)}></Inputs>
        <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
          onChange={e => setPdf(e.target.files[0])} />
      </FormColumn>

      <FormColumn>
        <h6 className='mb-4 text-muted'>Informacion personal</h6>

        <Inputs name="Nombre"
          value={name} onChange={e => setName(e.target.value)}></Inputs>
        <Inputs name="Apellido"
          value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>
        <InputsSelect id={"select"} options={sexs} name={"Sexo"}
          value={sex} onChange={e => setSex(e.target.value)}></InputsSelect>

        <Inputs name="Fecha de nacimiento" type="Date"
          value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>

        <Inputs name="Correo" type="email"
          value={email} onChange={e => setEmail(e.target.value)}></Inputs>

        <Inputs name="Numero de telefono"
          value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></Inputs>
        <InputsSelect id={"select"} options={residentsTypes} name={"Tipo residente"}
          value={residentType} onChange={e => setResidentType(e.target.value)}></InputsSelect>
      </FormColumn>


      <FormColumn>
        <h6 className='mb-4 text-muted'>Agregar un apartamento</h6>
        <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
          value={idApartment} onChange={e => setIdApartment(e.target.value)}
        ></InputsSelect>
        <Inputs name="Fecha de inicio de residencia" type={"date"}
          value={residentStartDate} onChange={e => setResidentStartDate(e.target.value)}></Inputs>
        <Inputs name="Fecha de fin de residencia" type={"date"}
          value={residentEndDate} onChange={e => setResidentEndDate(e.target.value)}></Inputs>

      </FormColumn>





    </FormContainer>
  )
}


