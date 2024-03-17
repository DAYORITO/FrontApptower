import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import { docTypes, residentsTypes, sexs } from '../../../Hooks/consts.hooks'
import FormColumn from "../../../Components/Forms/FormColumn";
import { useFetch } from '../../../Hooks/useFetch'
import { postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../../../Context/SocketContext'

export const ResidentCreate = (props) => {


  // API URL

  const url = import.meta.env.VITE_API_URL;
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
  const [residentType, setResidentType] = useState("tenant");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [idRol, setIdRol] = useState(2)

  const [errorList, setErrorList] = useState([])

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
      residentType: residentType,
      password: password,
      passwordConfirm: passwordConfirm,


      idrole: parseInt(idRol),
      idApartment: parseInt(idApartment),
      residentStartDate: residentStartDate
      // status: status,

    }

    await postRequest(event, 'residents', 'POST', null, data, url, setErrorList, navigate, socket)


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

        <InputsSelect disabled id={"select"} options={rolList} name={"Rol"}
          value={idRol} onChange={e => setIdRol(e.target.value)}
          StyleInput={{ width: '100%', marginRight: '3.8rem' }}
          containerStyle={{ width: '97%', marginLeft: '0.9rem' }}
          required={false}
        ></InputsSelect>


        {/* <h6 className='mb-4 text-muted'>Informacion personal</h6> */}
        <h6 className='mb-4 w-100 ml-2 text-muted'>Informacion personal</h6>

        <FormColumn>
          <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"}
            identifier={'docType'} errors={errorList}
            value={docType} onChange={e => setDocType(e.target.value)}></InputsSelect>
        </FormColumn>

        <FormColumn>
          <Inputs name="Numero de documento" placeholder="1000000007"
            identifier={'document'} errors={errorList}
            value={document} onChange={e => setDocument(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <Inputs name="Nombre"
            identifier={'name'} errors={errorList}
            value={name} onChange={e => setName(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <Inputs name="Apellido"
            identifier={'lastName'} errors={errorList}
            value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>
        </FormColumn>

        <FormColumn>
          <Inputs name="Correo" type="email"
            identifier={'email'} errors={errorList}
            value={email} onChange={e => setEmail(e.target.value)}></Inputs>

          <Uploader name='pdf' label='Carga de documento' formatos='.pdf'
            onChange={e => setPdf(e.target.files[0])} />


        </FormColumn>

        <FormColumn>
          <Inputs name="Numero de telefono"
            identifier={'phone'} errors={errorList}
            value={phone} onChange={e => setPhone(e.target.value)}></Inputs>

          <InputsSelect disabled id={"select"} options={residentsTypes} name={"Tipo de residente"}
            identifier={'residentType'} errors={errorList}
            value={residentType} onChange={e => setResidentType(e.target.value)}></InputsSelect>

          <InputsSelect
            id={"select"}
            identifier={'idApartment'} errors={errorList}
            options={apartmentList}
            name={"Apartamento"}
            value={idApartment}
            onChange={e => setIdApartment(e.target.value)}
            disabled={id ? idApartment : ''}
          ></InputsSelect>

          <Inputs name="Fecha de nacimiento" type="Date"
            identifier={'birthday'} errors={errorList}
            value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>
          <InputsSelect id={"select"} options={sexs} name={"Sexo"}
            identifier={'sex'} errors={errorList}
            value={sex} onChange={e => setSex(e.target.value)}></InputsSelect>
        </FormColumn>

        <FormColumn>
          {idApartment && (
            <>
              <Inputs
                name="Fecha de inicio de residencia"
                identifier={'residentStartDate'} errors={errorList}
                type={"date"}
                value={residentStartDate}
                onChange={e => setResidentStartDate(e.target.value)}
              ></Inputs>

            </>
          )}

          {/* <h6 className='mb-4 text-muted'>Datos de acceso</h6>

          <Inputs name="Contraseña"
            identifier={'password'} errors={errorList} type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <Inputs name="Confirmar Contraseña"
            identifier={'passwordConfirm'} errors={errorList} type='password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} /> */}

        </FormColumn>


        <FormColumn>





        </FormColumn>

        <FormColumn>

        </FormColumn>

        <FormColumn>





        </FormColumn>










      </>

    </FormContainer>
  )
}


