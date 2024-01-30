import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import { docTypes, sexs } from '../../../Hooks/consts.hooks'
import FormColumn from "../../../Components/Forms/FormColumn";
import { useFetch } from '../../../Hooks/useFetch'
import { postRequest } from '../../../Helpers/Helpers'

export const ResidentCreate = (props) => {


  // API URL

  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"

  const { id } = useParams()

  const [userImg, setUserImg] = useState("");
  const [pdf, setPdf] = useState("");
  const [docType, setDocType] = useState("");
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [status, setStatus] = useState("");

  const [idApartment, setIdApartment] = useState(id != undefined ? id : "");
  const [residentStartDate, setResidentStartDate] = useState("");
  // const [residentEndDate, setResidentEndDate] = useState("");

  const navigate = useNavigate();

  const { data: apartments, get: getApartment } = useFetch(url)

  useEffect(() => {

    getApartment("apartments")

  }, [])


  const apartmentList = apartments && apartments?.data?.apartments
    ? apartments?.data?.apartments
      .filter(apartment => apartment.status === 'Active')
      .map(apartment => ({
        value: apartment.idApartment,
        label: `${apartment.apartmentName} ${apartment.Tower.towerName}`
      }))
    : [];

  // Edit resident

  const createResident = async (event) => {

    const data = {

      userImg: userImg,
      pdf: pdf,
      docType: docType,
      document: document,
      name: name,
      lastName: lastName,
      birthday: birthday,
      sex: sex,
      email: email,
      phone: phone,
      password: password,

      idApartment: parseInt(idApartment),
      residentStartDate: residentStartDate
      // status: status,

    }

    console.log(data)

    await postRequest(event, 'residents', 'POST', {}, data, url)

    navigate(-1)

  };

  console.log(apartmentList)



  return (

    <FormContainer name='Agregar un nuevo residente'

      buttons={
        <FormButton
          name='Crear residente'
          backButton='Regresar'
          to='/admin/residents/'
          onClick={createResident}
        />}
    >

      <>



        <FormColumn>

          <h6 className='mb-4 text-muted'>Informacion personal</h6>

          <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"}
            value={docType} onChange={e => setDocType(e.target.value)}></InputsSelect>

          <Inputs name="Numero de documento" placeholder="1000000007"
            value={document} onChange={e => setDocument(e.target.value)}></Inputs>


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
            value={phone} onChange={e => setPhone(e.target.value)}></Inputs>


          <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

        </FormColumn>

        <FormColumn>

          <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
            onChange={e => setPdf(e.target.files[0])} />

          <Uploader name='pdf' label='Foto de perfil'
            onChange={e => setUserImg(e.target.files[0])} />

          <h6 className='mb-4 text-muted'>¿Apartamento en el que vas a vivir?</h6>


          <InputsSelect
            id={"select"}
            options={apartmentList}
            name={"Apartamento"}
            value={idApartment}
            onChange={e => setIdApartment(e.target.value)}
          ></InputsSelect>

          {idApartment && (
            <>
              <Inputs
                name="Fecha de inicio de residencia"
                type={"date"}
                value={residentStartDate}
                onChange={e => setResidentStartDate(e.target.value)}
              ></Inputs>
              {/* <Inputs
name="Fecha de fin de residencia"
type={"date"}
value={residentEndDate}
onChange={e => setResidentEndDate(e.target.value)}
></Inputs> */}
            </>
          )}



        </FormColumn>

      </>








      {/* 
      <FormButton name='Crear residente' backButton='Regresar' to='/admin/residents/' onClick={handleSubmit} /> */}
    </FormContainer>
  )
}


