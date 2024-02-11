import React, { useEffect, useState } from 'react'

import { Details } from "../../../Components/Details/details"
import Inputs from '../../../Components/Inputs/Inputs'
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { docTypes, sexs, statusList } from "../../../Hooks/consts.hooks"
import { TablePerson } from '../../../Components/Tables/Tables'
import { TableDetails } from "../../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons"
import { DetailsActions } from "../../../Components/DetailsActions/DetailsActions"
import { useFetch, useFetchUserInformation, useFetchget, useFetchgetById } from "../../../Hooks/useFetch"
import { Dropdownanchor, Dropdownanchor2 } from "../../../Components/DropDownAnchor/Dropdownanchor"
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { NotificationsAlert } from "../../../Components/NotificationsAlert/NotificationsAlert"
import { ModalContainer, Modal } from "../../../Components/Modals/ModalTwo"
import Cookies from 'js-cookie';

import { Link } from "react-router-dom"
import { useParams } from "react-router"
import { format } from 'date-fns';
import { SmalSpinner, Spinner } from '../../../Components/Spinner/Spinner'
import { createPortal } from 'react-dom'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { postRequest } from '../../../Helpers/Helpers'
const token = Cookies.get('token');

export const ResidentDetail = () => {

    // API URL

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"


    // resident information

    const { id } = useParams();

    const [idResident, setIdResident] = useState(id)
    const [idUser, setIdUser] = useState("")
    const [idApartment, setIdApartment] = useState("")

    const [residentStartDate, setResidentStartDate] = useState("")

    const [statusResident, setStatusResident] = useState("")
    const [residentCreateAt, setResidentCreateAt] = useState("")
    const [residentUpdatedAt, setResidentUpdatedAt] = useState("")

    const [userImg, setUserImg] = useState("")

    const [residentPdf, setResidentPdf] = useState("")
    const [docType, setDocType] = useState("")
    const [residentType, setResidentType] = useState("")
    const [pdf, setPdf] = useState("")
    const [docNumber, setDocNumber] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [sex, setSex] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [userStatus, setUserStatus] = useState("")

    const [apartments, setApartments] = useState([])


    const [age, setAge] = useState(null);






    // Resident relations

    const { data: resident, get: getResident, loading: loadingResident } = useFetch(url)
    const { data: residents, get: getResidents, loading } = useFetch(url)
    const { data: apartmentss, get: getApartments, loading: loadingApartments } = useFetch(url)
    const { data: user, get: getUser, loading: loadingUser } = useFetchUserInformation(token);

    const EqualUser = user?.user?.document === docNumber;

    // console.log(user.user?.document)
    console.log(user, 'user')
    console.log(resident.data)
    useEffect(() => {

        // resident information

        // setIdResident(resident?.data?.resident?.idResident)
        setIdUser(resident?.data?.resident?.iduser)
        setStatusResident(resident?.data?.resident?.status)
        setResidentCreateAt(resident?.data?.resident?.createAt)
        setResidentUpdatedAt(resident?.data?.resident?.updateAt)

        setUserImg(resident?.data?.resident?.user?.userImg)
        setResidentPdf(resident?.data?.resident?.user?.pdf)
        setResidentType(resident?.data?.resident?.residentType)
        setDocType(resident?.data?.resident?.user?.docType)
        setPdf(resident?.data?.resident?.user?.pdf)
        setDocNumber(resident?.data?.resident?.user?.document)
        setName(resident?.data?.resident?.user?.name)
        setLastName(resident?.data?.resident?.user?.lastName)
        setBirthday(resident?.data?.resident?.user?.birthday)
        setSex(resident?.data?.resident?.user?.sex)
        setEmail(resident?.data?.resident?.user?.email)
        setPhone(resident?.data?.resident?.user?.phone)
        setUserStatus(resident?.data?.resident?.user?.status)

        getResidents("residents")
        getApartments("apartments")

        setApartments(resident?.data?.apartments)

        if (resident?.data?.resident?.user?.birthday) {
            const birthDate = new Date(resident.data.resident.user.birthday);
            const currentDate = new Date();
            const difference = currentDate - birthDate;
            const ageInMilliseconds = new Date(difference);
            const calculatedAge = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);

            setAge(calculatedAge);
        }

    }, [resident?.data?.resident])


    useEffect(() => {

        try {

            getResident(`residents/${id}`)


        } catch (error) {

            console.error('Error al obtener datos del apartamento', error);

        }



    }, [])


    // Edit personal information resident

    const [modalPersonalInforesident, setModalPersonalInforesident] = useState(false);

    const openModalEdit = (data) => {

        console.log(data)
        setModalPersonalInforesident(true)

        setIdUser(data.iduser)
        setDocType(data.user.docType)
        setDocNumber(data.user.document)
        setName(data.user.name)
        setLastName(data.user.lastName)
        setBirthday(format(new Date(data.user.birthday), 'yyyy-MM-dd'))
        setSex(data.user.sex)
        setEmail(data.user.email)
        setPhone(data.user.phone)

    }

    // Assigned apartment to resident

    const [modalAssigApartmentToresident, setModalAssigApartmentToresident] = useState(false);

    const openModalAssingApartmentToresident = () => {

        setIdResident(id)
        setModalAssigApartmentToresident(true)

    }

    const CreateApartmentresident = async (event) => {

        const data = {

            idApartment: parseInt(idApartment),
            idResident: parseInt(idResident),
            residentStartDate: residentStartDate,
            // status: "active"

        }

        console.log(data)

        await postRequest(event, 'aparmentResidents', 'POST', {}, data, url)

        setModalAssigApartmentToresident(false)
        getResident(`residents/${id}`)

    };


    // List residents

    const residentsList = residents && residents?.data?.residents
        ? residents?.data?.residents
            .map(resident => ({
                value: resident.idResident,
                label: ` ${resident.user.name} ${resident.user.lastName} - ${resident.user.document}`
            }))
        : [];

    // List apartments

    const apartmentList = apartmentss?.data && apartmentss?.data?.apartments

        ? apartmentss.data.apartments
            .map(apartment => ({
                value: apartment.idApartment,
                label: `${apartment.apartmentName} - ${apartment.Tower.towerName}`
            }))
        : [];

    // Edit residents

    // const handleUpdateApartmentResident = async (event) => {



    //   const data = {

    //     idApartmentResident: idApartmentResident,
    //     idResident: idResident,
    //     idApartment: idApartment,
    //     residentStartDate: residentStartDate,
    //     residentEndDate: residentEndDate,
    //     status: statusApartmentResident


    //   }

    //   console.log("edit data", data)

    //   await postRequest(event, 'aparmentResidents', 'PUT', {}, data, url);
    //   setShowApartmentResidentEditModal(false)


    // };

    const [modalEditImg, setModalEditImg] = useState(false)

    const openModalEditImg = () => {

        console.log('Hola')
        setModalEditImg(true)

    }

    const [modalChangePassword, setModalChangePassword] = useState(false)

    const openModalChangePassword = () => {

        setIdUser(idUser)

        setModalChangePassword(true)

    }



    return (
        <>
            <Details>

                {

                    loadingResident ? <Spinner /> :
                        <ContainerModule
                            onClick={EqualUser ? openModalEditImg : null}
                            img={userImg}
                            to={EqualUser ? null : '/admin/residents/'}
                            icon='user'

                            A1={`${residentType == 'owner' ? 'Propietario' : 'Arrendatario'} ${name}`}
                            A2={`${lastName}`}
                            // A3={`${docType} ${document}`}
                            A5={`Correo electronico: ${email}`}
                            A6={`Telefono: ${phone}`}
                            // A7={pdf}
                            status={statusResident}
                            onClick2={EqualUser ? openModalChangePassword : null}
                        // onClickEdit={setShowModalEditApartment}
                        />

                }



                <InfoDetails>

                    <Acordions>

                        <DropdownInfo
                            name={`Informacion personal`}
                            action1={'Editar informacion personal'}
                            onClickAction1={openModalEdit}
                        >

                            <ul className='list-unstyled'>
                                <li>Nombre: {name}</li>
                                <li>Apellidos: {lastName}</li>
                                <li>Tipo de documento: {docType}</li>
                                <li>Numero de documento: {docNumber}</li>
                                <li>edad: {age} años</li>
                                <li>Genero: {sex == 'M' ? 'Mascualino' : 'Femenino'}</li>
                                {/* <li>{email}</li>
              <li>{phone}</li> */}


                            </ul>

                        </DropdownInfo>

                        <DropdownInfo
                            name={`Apartamento`}
                            action1={!EqualUser ? 'Asignar apartamento' : null}
                            onClickAction1={openModalAssingApartmentToresident}
                        >

                            {
                                loadingResident ? <SmalSpinner /> : (
                                    apartments && apartments.length > 0 ? (
                                        apartments.map((apartment, index) => (
                                            <Dropdownanchor
                                                key={index}
                                                name={`Apartamento ${apartment.apartment.apartmentName}`}
                                                to={`/admin/apartments/details/${apartment.apartment.idApartment}`}
                                                status={apartment.status}
                                            />
                                        ))
                                    ) : (
                                        <NotificationsAlert msg={`Sin Apartamento`} />
                                    )
                                )
                            }

                        </DropdownInfo>


                    </Acordions>

                </InfoDetails>

            </Details >

            {modalAssigApartmentToresident &&
                createPortal(
                    <>
                        <ModalContainer showModal={setModalAssigApartmentToresident}>
                            <Modal
                                onClick={CreateApartmentresident}
                                showModal={setModalAssigApartmentToresident}
                                title={`Asignar propiedad`}

                            >

                                <InputsSelect id={"select"} options={residentsList} name={"Propietario"}
                                    value={idResident} onChange={e => setIdResidnet(e.target.value)}
                                ></InputsSelect>

                                <InputsSelect id={"select"} options={apartmentList} name={"Propiedad"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Fecha desde cuando es propietario" type={"date"}
                                    value={residentStartDate} onChange={e => setResidentStartDate(e.target.value)}></Inputs>


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )
            }

            {modalPersonalInforesident &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setModalPersonalInforesident}>
                            <Modal
                                // onClick={handleUpdateApartmentresident}
                                showModal={setModalPersonalInforesident}
                                title={"Editar informacion "}

                            >
                                {EqualUser ? null : <Uploader name="img" formatos='.pdf' label="Documento de identidad" onChange={e => setPdf(e.target.files[0])} />}

                                <InputsSelect id={"select"} options={docTypes} name={"Tipo de documento"}
                                    value={docType} onChange={e => setDocType(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Numero de documento" type={"text"}
                                    value={docNumber} onChange={e => setDocNumber(e.target.value)}></Inputs>

                                <Inputs name="Nombres" type={"text"}
                                    value={name} onChange={e => setName(e.target.value)}></Inputs>

                                <Inputs name="Apellidor" type={"text"}
                                    value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>

                                <Inputs name="Fecha de cumpleaños" type={"date"}
                                    value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={sexs} name={"Sexo"}
                                    value={sex} onChange={e => setSex(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Correo electronico" type={"text"}
                                    value={email} onChange={e => setEmail(e.target.value)}></Inputs>

                                <Inputs name="Numero de telefono" type={"text"}
                                    value={phone} onChange={e => setPhone(e.target.value)}></Inputs>

                                <Inputs type={"hidden"}
                                    value={idUser} onChange={e => setIdUser(e.target.value)}></Inputs>
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

            {modalEditImg &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setModalEditImg}>
                            <Modal
                                // onClick={handleUpdateApartmentresident}
                                showModal={setModalEditImg}
                                title={"Cambiar imagen de perfil"}

                            >
                                <Uploader formatos={['.jpg']} name="img" label="Foto de perfil" onChange={e => setUserImg(e.target.files[0])} />


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

            {modalChangePassword &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setModalChangePassword}>
                            <Modal
                                // onClick={handleUpdateApartmentresident}
                                showModal={setModalChangePassword}
                                title={"Cambiar contraseña"}

                            >
                                <Inputs name="Nueva contraseña" type={"password"}
                                    value={email} onChange={e => setEmail(e.target.value)}></Inputs>

                                <Inputs name="Confirmar contraseña" type={"password"}
                                    value={phone} onChange={e => setPhone(e.target.value)}></Inputs>

                                <Inputs type={"hidden"}
                                    value={idUser} onChange={e => setIdUser(e.target.value)}></Inputs>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

        </>
    )
}
