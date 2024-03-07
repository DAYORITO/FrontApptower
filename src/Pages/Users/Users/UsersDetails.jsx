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
import { idToPermissionName } from '../../../Hooks/permissionRols'
import { useAllowedPermissions, useFetch, useFetchUserInformation } from "../../../Hooks/useFetch"
import { Dropdownanchor, Dropdownanchor2 } from "../../../Components/DropDownAnchor/Dropdownanchor"
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { NotificationsAlert } from "../../../Components/NotificationsAlert/NotificationsAlert"
import { ModalContainer, Modal } from "../../../Components/Modals/ModalTwo"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import { format } from 'date-fns';
import { SmalSpinner, Spinner } from '../../../Components/Spinner/Spinner'
import { createPortal } from 'react-dom'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Table, ThInfo } from '../../../Components/Table/Table'
import { Thead } from '../../../Components/Thead/Thead'
const token = Cookies.get('token');
import Cookies from 'js-cookie';
import { da } from 'date-fns/locale'
import Swal from 'sweetalert2'

export const UsersDetails = () => {
    const token = Cookies.get('token');
    // API URL

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"


    // watchman information

    const { id } = useParams();

    const { idUserLogged } = useUserLogged()

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
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [pdf, setPdf] = useState(null);




    // Watchman relations

    const { data: userAll, get: getusers, loading: loadingWatchmans } = useFetch(url)
    const { data: users, get: getuser, loading: loadingusers } = useFetch(url)
    const { data: userInfo, get: getUserInfo, loading: loadingUser } = useFetchUserInformation(token);
    const EqualUser = userInfo?.user?.document === docNumber;

    //Consulta Permisos

    const allowedPermissions = useAllowedPermissions
        (idToPermissionName);

    useEffect(() => {

        // users information
        setIdUser(users?.data.user?.iduser)

        setUserImg(users?.data?.user?.userImg)
        setPdf(users?.data.user?.pdf)
        setDocType(users?.data?.user?.docType)
        setDocNumber(users?.data?.user?.document)
        setName(users?.data.user?.name)
        setLastName(users?.data?.user?.lastName)
        setBirthday(users?.data?.user?.birthday)
        // setSex(users?.data?.users?.user?.sex)
        setEmail(users?.data?.user?.email)
        setPhone(users?.data?.user?.phone)
        setUserStatus(users?.data?.user?.status)

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
        setModalPersonalInfoUsers(true);


        if (data && data.user) {
            setDocType(data.user.docType || docType);
            setDocNumber(data.user.document || docNumber);
            setName(data.user.name || name);
            setLastName(data.user.lastName || lastName);
            setBirthday(data.user.birthday ? new Date(data.user.birthday).toISOString().split('T')[0] : '');
            setEmail(data.user.email || email);
            setPhone(data.user.phone || phone);
            setUserStatus(data.user.status || userStatus);
        }
    }


    const updatePersonalInfo = async (event) => {

        const data = {

            // User logged

            idUserLogged: idUserLogged,

            iduser: idUser,
            docType: docType,
            document: docNumber,
            name: name,
            lastName: lastName,
            birthday: birthday,
            email: email,
            phone: phone,
            status: userStatus

        }


        await postRequest(event, 'users/personalInfo', 'PUT', setModalPersonalInfoUsers, data, url, 'Informacion actualizada correctamente');
        getuser(`users/${id}`)


    }



    const [modalEditImg, setModalEditImg] = useState(false)


    const openModalEditImg = () => {

        setModalEditImg(true)

    }

    const updateUserImg = async (event) => {

        const data = {

            iduser: idUser,
            userImg: userImg

        }


        await postRequest(event, 'users/img', 'PUT', setModalEditImg, data, url,);
        getuser(`users/${id}`)

    }

    // Change Password

    const [modalChangePassword, setModalChangePassword] = useState(false)

    const openModalChangePassword = () => {

        setIdUser(idUser)

        setModalChangePassword(true)

    }


    const updateUserPassword = async (event) => {

        const data = {

            iduser: idUser,
            password: password

        }


        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden',
            })
            return
        }

        await postRequest(event, 'users/password', 'PUT', {}, data, url, 'Contraseña actualizada correctamente');
        setModalChangePassword(false)
        getuser(`users/${id}`)

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
                            A5={`Correo electrónico: ${email}`}
                            A6={`Teléfono: ${phone}`}
                            // A7={pdf}
                            status={userStatus}
                            onClick2={EqualUser ? openModalChangePassword : null}
                        // showBackButton={EqualUser && allowedPermissions.includes('Usuarios') ? true : false}
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
                                onClick={updatePersonalInfo}
                                showModal={setModalPersonalInfoUsers}
                                title={"Editar informacion "}

                            >
                                {EqualUser ? null : <Uploader name="img" formatos='.pdf' label="Documento de Identidad" onChange={e => setPdf(e.target.files[0])} />}

                                <InputsSelect id={"select"} options={docTypes} name={"Tipo de documento"}
                                    value={docType} onChange={e => setDocType(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Numero de documento" type={"text"}
                                    value={docNumber} onChange={e => setDocNumber(e.target.value)}></Inputs>

                                <Inputs name="Nombres" type="text" value={name} onChange={e => setName(e.target.value)} />

                                <Inputs name="Apellidos" type={"text"}
                                    value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>

                                <Inputs name="Fecha de Nacimiento" type={"date"}
                                    value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>

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
                                onClick={updateUserPassword}
                                showModal={setModalChangePassword}
                                title={"Cambiar contraseña"}

                            >
                                <Inputs name="Nueva contraseña" type={"password"}
                                    onChange={e => setPassword(e.target.value)}></Inputs>

                                <Inputs name="Confirmar contraseña" type={"password"}
                                    onChange={e => setConfirmPassword(e.target.value)}></Inputs>

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
