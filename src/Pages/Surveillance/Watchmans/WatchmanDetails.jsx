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
import './Watchman.css'
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import { format, set } from 'date-fns';
import { SmalSpinner, Spinner } from '../../../Components/Spinner/Spinner'
import { createPortal } from 'react-dom'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { postRequest } from '../../../Helpers/Helpers'
import { Table, ThInfo } from '../../../Components/Table/Table'
import { Thead } from '../../../Components/Thead/Thead'
import Swal from 'sweetalert2'
import { Th } from '../../../Components/Th/Th'
const token = Cookies.get('token');

export const WatchmanDetails = () => {

    // API URL

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"


    // watchman information

    const [idWatchman, setIdWatchman] = useState("")
    const { id } = useParams();
    const [idUser, setIdUser] = useState("")
    const [userImg, setUserImg] = useState("")
    const [docType, setDocType] = useState("")
    const [docNumber, setDocNumber] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [userStatus, setUserStatus] = useState("")
    const [enterprice, setEnterprice] = useState("")
    const [age, setAge] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [pdfNew, setPdfNew] = useState(null);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])

    // Watchman relations

    const { data: watchmans, get: getWatchmans, loading: loadingWatchmans } = useFetch(url)
    const { data: watchman, get: getWatchman, loading: loadingWatchman } = useFetch(url)
    const { data: user, get: getUser, loading: loadingUser } = useFetchUserInformation(token);
    const { data: shifts, get: getShifts, loading: loadingShifts } = useFetch(url)

    useEffect(() => {
        setIdWatchman(watchman?.data?.watchman?.idwatchman);

        if (watchman?.data?.watchman?.idwatchman) {
            getShifts(`guardshifts/${watchman.data.watchman.idwatchman}`);
        }
    }, [watchman?.data?.watchman]);

    useEffect(() => {

        // watchman information
        setIdUser(watchman?.data?.watchman?.iduser)
        setEnterprice(watchman?.data?.watchman?.idEnterpriseSecurity)

        setUserImg(watchman?.data?.watchman?.user?.userImg)
        setPdf(watchman?.data?.watchman?.user?.pdf)
        setDocType(watchman?.data?.watchman?.user?.docType)
        setPdf(watchman?.data?.watchman?.user?.pdf)
        setDocNumber(watchman?.data?.watchman?.user?.document)
        setName(watchman?.data?.watchman?.user?.name)
        setLastName(watchman?.data?.watchman?.user?.lastName)
        setBirthday(watchman?.data?.watchman?.user?.birthday)
        // setSex(watchman?.data?.watchman?.user?.sex)
        setEmail(watchman?.data?.watchman?.user?.email)
        setPhone(watchman?.data?.watchman?.user?.phone)
        setUserStatus(watchman?.data?.watchman?.user.status)

        getWatchmans("watchman")

        if (watchman?.data?.watchman?.user?.birthday) {
            const birthDate = new Date(watchman.data.watchman.user.birthday);
            const currentDate = new Date();
            const difference = currentDate - birthDate;
            const ageInMilliseconds = new Date(difference);
            const calculatedAge = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);

            setAge(calculatedAge);
        }

    }, [watchman?.data?.watchman])


    useEffect(() => {

        try {

            getWatchman(`watchman/${Number(id)}`)


        } catch (error) {

            console.error('Error al obtener datos del vigilante', error);

        }

    }, [id])


    // Edit personal information watchman

    const [modalPersonalInfoWatchman, setModalPersonalInfoWatchman] = useState(false);

    const openModalEdit = (data) => {

        console.log(data)
        setModalPersonalInfoWatchman(true)

        setIdUser(data.iduser)
        setDocType(data.user.docType)
        setDocNumber(data.user.document)
        setName(data.user.name)
        setLastName(data.user.lastName)
        setBirthday(format(new Date(data.user.birthday), 'yyyy-MM-dd'))
        // setSex(data.user.sex)
        setEmail(data.user.email)
        setPhone(data.user.phone)
        setUserStatus(data.user.status)

    }




    const [modalEditImg, setModalEditImg] = useState(false)


    const openModalEditImg = () => {

        console.log('Hola')
        setModalEditImg(true)

    }

    const updateUserImg = async (event) => {

        console.log(idUser)
        const data = {

            iduser: idUser,
            userImg: userImg

        }

        console.log("edit data", data)

        await postRequest(event, 'users/img', 'PUT', {}, data, url);
        setModalEditImg(false)
        getWatchman(`watchman/${Number(id)}`)
        window.location.reload()

    }



    const updatePersonalInfo = async (event) => {

        const data = {

            iduser: Number(id),
            docType: docType,
            document: docNumber,
            name: name,
            lastName: lastName,
            birthday: birthday,
            email: email,
            phone: phone,
            pdf: pdf,
            newFile: pdfNew

        }

        console.log("edit data", data)

        await postRequest(event, 'users/personalInfo', 'PUT', setModalPersonalInfoWatchman, data, url, setErrors, null, null);
        getWatchman(`watchman/${Number(id)}`)

    }



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

        console.log("edit data", data)

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden',
            })
            return
        }

        await postRequest(event, 'users/password', 'PUT', setModalChangePassword, data, url, setErrors, null, null);
        setModalChangePassword(false)
        getWatchman(`watchman/${Number(id)}`)

    }


    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index)
    };


    const EqualUser = user?.user?.document === docNumber;


    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')

    const FindNameEnterprice = dataEnterprice?.enterpriseSecurity?.find(enterprices => enterprices.idEnterpriseSecurity === enterprice);
    const nameEnterpriseSecurity = FindNameEnterprice ? FindNameEnterprice.nameEnterprice : 'Empresa no encontrada';


    const [searchDate, setSearchDate] = useState(null);

    const handleSearch = (event) => {
        if (event.target.value) {
            setSearchDate(new Date(event.target.value));
        } else {
            setSearchDate(null);
        }
    };

    return (
        <>
            <Details>

                {


                    loadingWatchman ? <Spinner /> :
                        <ContainerModule
                            onClick={EqualUser ? openModalEditImg : null}
                            img={userImg}
                            to={EqualUser ? null : '/admin/watchman/'}
                            icon='user'
                            A1={`Vigilante ${name}`}
                            A2={`${lastName}`}
                            A5={`Correo electronico: ${email}`}
                            A6={`Telefono: ${phone}`}
                            A7={pdf}
                            status={userStatus}
                            onClick2={EqualUser ? openModalChangePassword : null}
                        // showBackButton={EqualUser ? false : true}
                        // onClickEdit={setShowModalEditApartment}
                        />

                }



                <InfoDetails>

                    <Acordions>

                        <DropdownInfo
                            name={`Informacion personal`}
                            action1={'Editar informacion personal'}
                            onClickAction1={EqualUser ? openModalEdit : null}
                            toAction1={!EqualUser ? `/admin/users/edit/${id}` : null}
                        >

                            <ul className='list-unstyled'>
                                <li>Nombre: {name}</li>
                                <li>Apellidos: {lastName}</li>
                                <li>Tipo de documento: {docType}</li>
                                <li>Numero de documento: {docNumber}</li>
                                <li>Empresa Aliada: {nameEnterpriseSecurity}</li>
                                <li>edad: {age} años</li>
                                {/* <li>Genero: {sex == 'M' ? 'Mascualino' : 'Femenino'}</li> */}
                                {/* <li>{email}</li>
              <li>{phone}</li> */}
                            </ul>

                        </DropdownInfo>

                        {/* Poner los turnos aquiiiiiiiiii */}

                        {<DropdownInfo
                            name={'Turnos'}>



                            {!EqualUser ? <input
                                type="date"
                                name="searchDate"
                                className='dateShifts'
                                onChange={handleSearch}
                            /> : null}

                            <TablePerson id={'tableguards'} >


                                <ThInfo />
                                <ThInfo name='Dias de la semana' />
                                <ThInfo name='Fecha' />
                                <ThInfo name='Hora inicio' />
                                <ThInfo name='Hora fin' />

                                {(shifts.data.shifts || []).length === 0 ? (
                                    <tr>
                                        <td colSpan="4">No se encontraron turnos</td>
                                    </tr>
                                ) : (
                                    (shifts.data.shifts || [])
                                        .filter(shift => {
                                            if (!searchDate) return true;
                                            const shiftDate = new Date(shift.date);
                                            return shiftDate.toDateString() === searchDate.toDateString();
                                        })
                                        .slice(0, 7)
                                        .map(shift => {
                                            if (shift.date && shift.start && shift.end) {
                                                const startDate = new Date(`${shift.date}T${shift.start}`);
                                                const endDate = new Date(`${shift.date}T${shift.end}`);
                                                const date = startDate.toLocaleDateString();
                                                const startTime = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                                                const endTime = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                                                const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                                                const dayOfWeek = days[startDate.getDay()];

                                                return (
                                                    <Table
                                                        key={shift.idshifts}
                                                        opc1={dayOfWeek}
                                                        opc2={date}
                                                        opc3={startTime}
                                                        opc4={endTime}
                                                        status={userStatus}
                                                    />
                                                );
                                            }
                                        })
                                )}

                            </TablePerson>




                        </DropdownInfo>}

                    </Acordions>

                </InfoDetails>

            </Details >

            {modalPersonalInfoWatchman &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setModalPersonalInfoWatchman}>
                            <Modal
                                onClick={updatePersonalInfo}
                                showModal={setModalPersonalInfoWatchman}
                                title={"Editar informacion "}

                            >
                                {<Uploader name="img" formatos='.pdf' label="Documento de identidad" onChange={e => setPdfNew(e.target.files[0])} />}

                                <InputsSelect id={"select"} options={docTypes} name={"Tipo de documento"}
                                    value={docType} onChange={e => setDocType(e.target.value)}
                                    errors={errors}
                                    identifier={"docType"}
                                ></InputsSelect>

                                <Inputs name="Numero de documento" type={"text"}
                                    value={docNumber} onChange={e => setDocNumber(e.target.value)}
                                    errors={errors}
                                    identifier={"document"}
                                ></Inputs>

                                <Inputs name="Nombres" type={"text"}
                                    value={name} onChange={e => setName(e.target.value)}
                                    errors={errors}
                                    identifier={"name"}
                                ></Inputs>

                                <Inputs name="Apellidos" type={"text"}
                                    value={lastName} onChange={e => setLastName(e.target.value)}
                                    errors={errors}
                                    identifier={"lastName"}
                                ></Inputs>

                                <Inputs name="Fecha de Nacimiento" type={"date"}
                                    value={birthday ? new Date(birthday).toISOString().split('T')[0] : ''} onChange={e => setBirthday(e.target.value)}
                                    errors={errors}
                                    identifier={"birthday"}
                                ></Inputs>

                                {/* <InputsSelect id={"select"} options={sexs} name={"Sexo"}
                                    value={sex} onChange={e => setSex(e.target.value)}
                                ></InputsSelect> */}

                                <Inputs name="Correo electronico" type={"text"}
                                    value={email} onChange={e => setEmail(e.target.value)}
                                    errors={errors}
                                    identifier={"email"}
                                ></Inputs>

                                <Inputs name="Numero de telefono" type={"text"}
                                    value={phone} onChange={e => setPhone(e.target.value)}
                                    errors={errors}
                                    identifier={"phone"}
                                ></Inputs>

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
                                    onChange={e => setPassword(e.target.value)}
                                    errors={errors}
                                    identifier={"password"}
                                ></Inputs>

                                <Inputs name="Confirmar contraseña" type={"password"}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    errors={errors}
                                    identifier={"passwordConfirm"}
                                ></Inputs>

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
