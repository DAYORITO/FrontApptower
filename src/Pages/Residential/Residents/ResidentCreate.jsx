import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import { docTypes, sexs } from '../../../Hooks/consts.hooks'
import FormColumn from "../../../Components/Forms/FormColumn";
import { useFetch } from '../../../Hooks/useFetch'
import { postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../../../Context/SocketContext'

export const ResidentCreate = (props) => {


  // API URL

  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"

  const { id } = useParams()


  // Socket

  const { socket } = useContext(SocketContext)

  // User logged

  const { idUserLogged } = useUserLogged()

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
  const [idRol, setIdRol] = useState(2)

  // const [status, setStatus] = useState("");

  const [idApartment, setIdApartment] = useState(id != undefined ? id : "");
  const [residentStartDate, setResidentStartDate] = useState("");
  // const [residentEndDate, setResidentEndDate] = useState("");

  const navigate = useNavigate();

  const { data: apartments, get: getApartment } = useFetch(url)
  const { data: rols, get: getRols } = useFetch(url)

  useEffect(() => {

    getApartment("apartments")
    getRols('rols')

  }, [])


  // List

  const rolList = rols && rols?.data?.rols
    ? rols?.data?.rols
      // .filter(rol => rol.namerol === 'Residente')
      .map(rol => ({
        value: rol.idrole,
        label: `${rol.namerole}`
      }))
    : [];

  console.log(rolList)


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

      // User logged

      idUserLogged: idUserLogged,

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

      idrole: parseInt(idRol),
      idApartment: parseInt(idApartment),
      residentStartDate: residentStartDate
      // status: status,

    }

    await postRequest(event, 'residents', 'POST', null, data, url, null, navigate, socket)


  };



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




        {/* <h6 className='mb-4 text-muted'>Informacion personal</h6> */}
        <h6 className='mb-4 w-100 ml-2 text-muted'>Informacion personal</h6>

        <FormColumn>
          <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"}
            value={docType} onChange={e => setDocType(e.target.value)}></InputsSelect>
        </FormColumn>

        <FormColumn>
          <Inputs name="Numero de documento" placeholder="1000000007"
            value={document} onChange={e => setDocument(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <Inputs name="Nombre"
            value={name} onChange={e => setName(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <Inputs name="Apellido"
            value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <InputsSelect id={"select"} options={sexs} name={"Sexo"}
            value={sex} onChange={e => setSex(e.target.value)}></InputsSelect>
        </FormColumn>

        <FormColumn>
          <Inputs name="Fecha de nacimiento" type="Date"
            value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <Inputs name="Correo" type="email"
            value={email} onChange={e => setEmail(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <Inputs name="Numero de telefono"
            value={phone} onChange={e => setPhone(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <InputsSelect
            id={"select"}
            options={apartmentList}
            name={"Apartamento"}
            value={idApartment}
            onChange={e => setIdApartment(e.target.value)}
            disabled={id ? idApartment : ''}
          ></InputsSelect>

        </FormColumn>

        <FormColumn>
          {idApartment && (
            <>
              <Inputs
                name="Fecha de inicio de residencia"
                type={"date"}
                value={residentStartDate}
                onChange={e => setResidentStartDate(e.target.value)}
              ></Inputs>

            </>
          )}
        </FormColumn>


        <FormColumn>

          <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
            onChange={e => setPdf(e.target.files[0])} />

          <InputsSelect disabled id={"select"} options={rolList} name={"Rol"}
            value={idRol} onChange={e => setIdRol(e.target.value)}></InputsSelect>

        </FormColumn>

        <FormColumn>
          <h6 className='mb-4 text-muted'>Datos de acceso</h6>

          <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

        </FormColumn>

        <FormColumn>





        </FormColumn>










      </>

    </FormContainer>
  )
}


