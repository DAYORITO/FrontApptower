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
import { Table, ThInfo } from '../../../Components/Table/Table'
import { Thead } from '../../../Components/Thead/Thead'
const token = Cookies.get('token');

export const UsersDetails = () => {

    // API URL

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"


    // watchman information

    const { id } = useParams();

    const [idUser, setIdUser] = useState(id)
    const [userImg, setUserImg] = useState("")
    const [docType, setDocType] = useState("")
    const [docNumber, setDocNumber] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [userStatus, setUserStatus] = useState("")
    const [age, setAge] = useState(null)

    const [pdf, setPdf] = useState(null);




    // Watchman relations

    const { data: userAll, get: getusers, loading: loadingWatchmans } = useFetch(url)
    const { data: users, get: getuser, loading: loadingusers } = useFetch(url)
    const { data: userInfo, get: getUserInfo, loading: loadingUser } = useFetchUserInformation(token);
    const EqualUser = userInfo?.user?.document === docNumber;



    console.log('User info:', userInfo);


    useEffect(() => {

        // users information
        setIdUser(users?.data.user?.iduser)

        setUserImg(users?.data.user?.userImg)
        setPdf(users?.data.user?.pdf)
        setDocType(users?.data.user?.docType)
        setDocNumber(users?.data.user?.document)
        setName(users?.data.user?.name)
        setLastName(users?.data.user?.lastName)
        setBirthday(users?.data.user?.birthday)
        // setSex(users?.data?.users?.user?.sex)
        setEmail(users?.data.user?.email)
        setPhone(users?.data.user?.phone)
        setUserStatus(users?.data.user?.status)

        getusers("users")

        if (users?.data?.user?.birthday) {
            const birthDate = new Date(users.data.user.birthday);
            const currentDate = new Date();
            const difference = currentDate - birthDate;
            const ageInMilliseconds = new Date(difference);
            const calculatedAge = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);

            setAge(calculatedAge);
        }

    }, [users?.data.user])


    useEffect(() => {

        try {

            getuser(`users/${idUser}`)


        } catch (error) {

            console.error('Error al obtener datos del usuarios', error);

        }



    }, [])


    // Edit personal information watchman

    const [modalPersonalInfoUsers, setModalPersonalInfoUsers] = useState(false);

    const openModalEdit = (data) => {

        console.log(data)
        setModalPersonalInfoUsers(true)

        setIdUser(data.iduser)
        setDocType(data.docType)
        setDocNumber(data.document)
        setName(data.name)
        setLastName(data.lastName)
        setBirthday(format(new Date(data.birthday), 'yyyy-MM-dd'))
        // setSex(data.user.sex)
        setEmail(data.email)
        setPhone(data.phone)
        setUserStatus(data.status)

    }



    const [modalEditImg, setModalEditImg] = useState(false)


    const openModalEditImg = () => {

        console.log('Hola')
        setModalEditImg(true)

    }

    const updateUserImg = async (event) => {

        const data = {

            iduser: idUser,
            userImg: userImg

        }

        console.log("edit data", data)

        await postRequest(event, 'users/img', 'PUT', {}, data, url);
        getuser(`users/${id}`)
        setModalEditImg(false)

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


                    loadingUser ? <Spinner /> :
                        <ContainerModule
                            onClick={EqualUser ? openModalEditImg : null}
                            img={userImg}
                            to={EqualUser ? null : '/admin/users/'}
                            icon='user'

                            A1={`${name}`}
                            A2={`${lastName}`}
                            A5={`Correo electronico: ${email}`}
                            A6={`Telefono: ${phone}`}
                            // A7={pdf}
                            status={userStatus}
                            onClick2={EqualUser ? openModalChangePassword : null}
                            showBackButton={EqualUser ? false : true}
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
                                {/* <li>Genero: {sex == 'M' ? 'Mascualino' : 'Femenino'}</li> */}
                                {/* <li>{email}</li>
              <li>{phone}</li> */}


                            </ul>

                        </DropdownInfo>

                    </Acordions>

                </InfoDetails>

            </Details >

            {modalPersonalInfoUsers &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setModalPersonalInfoUsers}>
                            <Modal
                                // onClick={handleUpdateApartmentresident}
                                showModal={setModalPersonalInfoUsers}
                                title={"Editar informacion "}

                            >
                                {EqualUser ? null : <Uploader name="img" formatos='.pdf' label="Documento de Identidad" onChange={e => setPdf(e.target.files[0])} />}

                                <InputsSelect id={"select"} options={docTypes} name={"Tipo de documento"}
                                    value={docType} onChange={e => setDocType(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Numero de documento" type={"text"}
                                    value={docNumber} onChange={e => setDocNumber(e.target.value)}></Inputs>

                                <Inputs name="Nombres" type={"text"}
                                    value={name} onChange={e => setName(e.target.value)}></Inputs>

                                <Inputs name="Apellidos" type={"text"}
                                    value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>

                                <Inputs name="Fecha de Nacimiento" type={"date"}
                                    value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>

                                {/* <InputsSelect id={"select"} options={sexs} name={"Sexo"}
                                    value={sex} onChange={e => setSex(e.target.value)}
                                ></InputsSelect> */}

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
                                onClick={updateUserImg}
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
