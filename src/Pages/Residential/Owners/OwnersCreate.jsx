import React, { useContext, useEffect, useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { useNavigate, useParams } from 'react-router'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import FormColumn from '../../../Components/Forms/FormColumn'
import { useFetch } from '../../../Hooks/useFetch'
import { bools, docTypes, sexs } from '../../../Hooks/consts.hooks'
import { postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { SocketContext } from '../../../Context/SocketContext'

export const OwnersCreate = () => {



  // API URL

  const url = import.meta.env.VITE_API_URL;
  // const url = "https://apptowerbackend.onrender.com/api/"

  const { id } = useParams()

  // Socket

  const { socket } = useContext(SocketContext)

  // User logged

  const { idUserLogged } = useUserLogged()


  // const [userImg, setUserImg] = useState("");
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
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isResident, setIsResident] = useState(false)

  // const [status, setStatus] = useState("");

  const [idApartment, setIdApartment] = useState(id ? id : "");
  const [ownershipStartDate, setOwnershipStartDate] = useState("");


  // Error list

  const [errorList, setErrorList] = useState([]);

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



  // create owner

  const createOwner = async (event) => {

    const data = {

      // User logged

      idUserLogged: idUserLogged,

      // userImg: userImg,
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
      passwordConfirm: passwordConfirm,

      idApartment: parseInt(idApartment),
      OwnershipStartDate: ownershipStartDate,

      isResident: Boolean(isResident)
      // status: status,

    }

    console.log(data)

    await postRequest(event, 'owners', 'POST', null, data, url, setErrorList, navigate, socket)

  };



  return (

    <FormContainer name='Agregar un nuevo propietario'

      buttons={
        <FormButton
          name='Crear propietario'
          backButton='Regresar'
          to='/admin/owners/'
          onClick={createOwner}
        />}
    >

      <>


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

          <InputsSelect id={"select"} options={sexs} name={"Sexo"}
            identifier={'sex'} errors={errorList}
            value={sex} onChange={e => setSex(e.target.value)}></InputsSelect>

        </FormColumn>

        <FormColumn>

          <Inputs name="Fecha de nacimiento" type="Date"
            identifier={'birthday'} errors={errorList}
            value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>

        </FormColumn>

        <FormColumn>

          <Inputs name="Correo" type="email"
            identifier={'email'} errors={errorList}
            value={email} onChange={e => setEmail(e.target.value)}></Inputs>

        </FormColumn>

        <FormColumn>

          <Inputs name="Numero de telefono"
            identifier={'phone'} errors={errorList}
            value={phone} onChange={e => setPhone(e.target.value)}></Inputs>

        </FormColumn>

        <FormColumn>

          {/* <h6 className='mb-4 text-muted'>Propiedad</h6> */}

          <InputsSelect
            id={"select"}
            identifier={'idApartment'} errors={errorList}
            options={apartmentList}
            name={"Apartamento"}
            value={idApartment}
            disabled={id ? idApartment : ''}
            onChange={e => setIdApartment(e.target.value)}
          ></InputsSelect>

          {idApartment && (
            <>
              <Inputs
                name="Fecha de inicio de residencia"
                identifier={'OwnershipStartDate'} errors={errorList}
                type={"date"}
                value={ownershipStartDate}
                onChange={e => setOwnershipStartDate(e.target.value)}
              ></Inputs>
              <h6 className='mb-4 w-100 ml-2 text-muted'>¿Va vivir en el apartamento?</h6>

              <InputsSelect

                id={"select"}
                identifier={'isResident'} errors={errorList}
                options={bools}
                name={"¿Va vivir en el conjunto?"}
                value={isResident}
                onChange={e => setIsResident(e.target.value)}

              ></InputsSelect>

            </>
          )}

          {/* <h6 className='mb-4 text-muted'>Datos de acceso</h6>

          <Inputs name="Contraseña"
            identifier={'password'} errors={errorList}
            type='password' value={password} onChange={e => setPassword(e.target.value)} />
          <Inputs name="Confirmar Contraseña"
            identifier={'passwordConfirm'} errors={errorList}
            type='password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} /> */}

        </FormColumn>

        <FormColumn>



          <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
            onChange={e => setPdf(e.target.files[0])} />

        </FormColumn>

        <FormColumn>



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
