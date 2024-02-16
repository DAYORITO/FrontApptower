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
import { format } from 'date-fns';
import { SmalSpinner, Spinner } from '../../../Components/Spinner/Spinner'
import { createPortal } from 'react-dom'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { postRequest } from '../../../Helpers/Helpers'
import { Table, ThInfo } from '../../../Components/Table/Table'
import { Thead } from '../../../Components/Thead/Thead'
const token = Cookies.get('token');

export const WatchmanDetails = () => {

    // API URL

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"


    // watchman information

    const { id } = useParams();

    const [idWatchman, setidWatchman] = useState(id)
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




    // Watchman relations

    const { data: watchmans, get: getWatchmans, loading: loadingWatchmans } = useFetch(url)
    const { data: watchman, get: getWatchman, loading: loadingWatchman } = useFetch(url)
    const { data: user, get: getUser, loading: loadingUser } = useFetchUserInformation(token);

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

            getWatchman(`watchman/${idWatchman}`)


        } catch (error) {

            console.error('Error al obtener datos del vigilante', error);

        }



    }, [])


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

    // // List watchman

    // const watchmanList = Array.isArray(watchman?.data?.watchman)
    //     ? watchman?.data?.watchman.map(watchman => ({
    //         value: watchman.idwatchman,
    //         label: `${watchman.user.name} ${watchman.user.lastName} - ${watchman.user.document}`
    //     }))
    //     : [];



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
        window.location.reload();

    }

    const [modalChangePassword, setModalChangePassword] = useState(false)

    const openModalChangePassword = () => {

        setIdUser(idUser)

        setModalChangePassword(true)

    }


    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index)
    };



    const [guardshifts, setGuardshifts] = useState([]); // Define guardshifts utilizando useState

    const fetchGuardshifsforwatchman = async () => {
        const response = await fetch(`https://apptowerbackend.onrender.com/api/guardshifts/${idWatchman}`);
        const data = await response.json();
        setGuardshifts(data.shifts); // Utiliza setGuardshifts para actualizar guardshifts con los datos recibidos
        console.log(data.shifts, "guardshifts");
    };



    useEffect(() => {
        fetchGuardshifsforwatchman();
    }
        , []);


    const [searchDate, setSearchDate] = useState(null);

    const [filteredShifts, setFilteredShifts] = useState([]);

    const handleSearch = (event) => {
        const date = event.target.value;
        setSearchDate(date);
    };


    useEffect(() => {
        if (searchDate) {
            const filtered = guardshifts.filter(shift => {
                const shiftDate = new Date(shift.start);
                const searchDateObj = new Date(searchDate);
                searchDateObj.setUTCHours(0, 0, 0, 0);

                return shiftDate.getUTCFullYear() === searchDateObj.getUTCFullYear() &&
                    shiftDate.getUTCMonth() === searchDateObj.getUTCMonth() &&
                    shiftDate.getUTCDate() === searchDateObj.getUTCDate();
            });
            setFilteredShifts(filtered);
        } else {
            setFilteredShifts(guardshifts);
        }
    }, [searchDate, guardshifts]);




    const EqualUser = user?.user?.document === docNumber;


    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')

    const FindNameEnterprice = dataEnterprice?.enterpriseSecurity?.find(enterprices => enterprices.idEnterpriseSecurity === enterprice);
    const nameEnterpriseSecurity = FindNameEnterprice ? FindNameEnterprice.nameEnterprice : 'Empresa no encontrada';

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
                                <li>Empresa Aliada: {nameEnterpriseSecurity}</li>
                                <li>edad: {age} años</li>
                                {/* <li>Genero: {sex == 'M' ? 'Mascualino' : 'Femenino'}</li> */}
                                {/* <li>{email}</li>
              <li>{phone}</li> */}


                            </ul>

                        </DropdownInfo>

                        {/* Poner los turnos aquiiiiiiiiii */}

                        <DropdownInfo
                            name={'Turnos'}
                            initiallyOpen={false}>



                            <input
                                type="date"
                                name="searchDate"
                                className='dateShifts'
                                value={searchDate || ""}
                                onChange={handleSearch}
                            />

                            <TablePerson id={'tableguards'} >


                                <ThInfo />
                                <ThInfo name='Fecha' />
                                <ThInfo name='Hora inicio' />
                                <ThInfo name='Hora fin' />

                                {filteredShifts.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">No se encontraron turnos</td>
                                    </tr>
                                ) : (
                                    filteredShifts.map(shift => {
                                        const startDate = new Date(shift.start);
                                        const endDate = new Date(shift.end);
                                        const date = startDate.toLocaleDateString(undefined, { timeZone: 'UTC' });
                                        const startTime = startDate.toLocaleTimeString();
                                        const endTime = endDate.toLocaleTimeString();
                                        return (
                                            <Table
                                                key={shift.id}
                                                opc1={date}
                                                opc2={startTime}
                                                opc3={endTime}
                                                status={userStatus}
                                            />
                                        );
                                    })
                                )}

                            </TablePerson>




                        </DropdownInfo>

                    </Acordions>

                </InfoDetails>

            </Details >

            {modalPersonalInfoWatchman &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setModalPersonalInfoWatchman}>
                            <Modal
                                // onClick={handleUpdateApartmentresident}
                                showModal={setModalPersonalInfoWatchman}
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
