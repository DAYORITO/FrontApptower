import React, { useContext, useEffect, useState } from 'react'

import { Details } from "../../../Components/Details/details"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { idToPermissionName } from '../../../Hooks/permissionRols'
import { useAllowedPermissions, useFetch } from "../../../Hooks/useFetch"
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { ModalContainer, Modal, ModalImg } from "../../../Components/Modals/ModalTwo"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import Select2 from '../../../Components/Inputs/Select2'
import { SmalSpinner, Spinner } from '../../../Components/Spinner/Spinner'
import { createPortal } from 'react-dom'
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/es';
import { SocketContext } from '../../../Context/SocketContext'
import { postRequest, useUserLogged } from '../../../Helpers/Helpers'
import Inputs from '../../../Components/Inputs/Inputs'
import InputsSelect from '../../../Components/Inputs/InputsSelect'

moment.updateLocale('es', {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_')
});

export const BookingDetails = () => {
    // API URL

    const url = import.meta.env.VITE_API_URL;

    // Socket

    const { socket } = useContext(SocketContext)

    // watchman information

    const { id } = useParams();

    const { idUserLogged, idRolLogged } = useUserLogged()


    const [idBooking, setIdBooking] = useState(Number(id))
    const [StartDateBooking, setStartDateBooking] = useState('')
    const [StartTimeBooking, setStartTimeBooking] = useState('')
    const [EndDateBooking, setEndDateBooking] = useState('')
    const [EndTimeBooking, setEndTimeBooking] = useState('')
    const [amountPeople, setAmountPeople] = useState('')
    const [status, setStatus] = useState('')
    const [idResident, setIdResident] = useState('')
    const [idSpace, setIdSpace] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [hourStart, setHourStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [hourEnd, setHourEnd] = useState('')
    const [errorList, setErrorList] = useState([])

    const [Resident, setResident] = useState({})
    const [Space, setSpace] = useState({})

    const [spaceImg, setSpaceImg] = useState('')

    console.log(idSpace, 'idSpace')


    // Booking data

    const { data: booking, get: getBooking, loading: loadingBooking } = useFetch(url)
    const { data: spaces, get: getSpaces, loading } = useFetch(url)
    const { data: rols, get: getRols } = useFetch(url)

    console.log(booking, 'booking')

    let nameRole = rols?.data?.rols?.find(rol => rol.idrole === idRolLogged)?.namerole

    if (nameRole) {
        nameRole = nameRole.toLowerCase()
    }

    const nameSpace = spaces?.data?.spaces?.find(space => space.idSpace === Number(idSpace))?.spaceName


    //Consulta Permisos

    const allowedPermissions = useAllowedPermissions
        (idToPermissionName);

    useEffect(() => {

        // Booking information

        setIdBooking(booking?.data?.booking?.idBooking)
        setStartDateBooking(booking?.data?.booking?.StartDateBooking)
        setStartTimeBooking(booking?.data?.booking?.StartTimeBooking)
        setEndDateBooking(booking?.data?.booking?.EndDateBooking)
        setEndTimeBooking(booking?.data?.booking?.EndTimeBooking)
        setAmountPeople(booking?.data?.booking?.amountPeople)
        setStatus(booking?.data?.booking?.status)
        setIdResident(booking?.data?.booking?.idResident)
        setIdSpace(booking?.data?.booking?.idSpace)
        setResident(booking?.data?.booking?.Resident)
        setSpace(booking?.data?.booking?.Space)


    }, [booking?.data?.booking])

    useEffect(() => {
        getSpaces('spaces')
    }, [idSpace])

    useEffect(() => {
        getRols('rols')
    }, [idRolLogged])


    useEffect(() => {

        try {

            getBooking(`booking/one/${idBooking}`)


        } catch (error) {

            console.error('Error al obtener datos de reserva.', error);

        }

    }, [])

    // Modal img

    const [modalImg, setModalImg] = useState(false)

    const openModalImg = (data) => {

        console.log('data: ', data)
        setSpaceImg(data)
        setModalImg(true)

    }


    const [showModal, setShowModal] = useState(false);

    const openModalEdit = (data) => {



        if (data) {

            setIdBooking(data.idbooking)
            setIdResident(data.idResident)
            setIdSpace(data.idSpace)
            setDateStart(data.StartDateBooking)
            setHourStart(data.StartTimeBooking)
            setDateEnd(data.EndDateBooking)
            setHourEnd(data.EndTimeBooking)
            setAmountPeople(data.amountPeople)
            setStatus(data.status)
        }

        setShowModal(true)
    }

    console.log('idSpace: ', idSpace)
    console.log(idResident, 'idResident')
    const updateBooking = async (event) => {

        const data = {

            // User logged

            idUserLogged: idUserLogged,
            idSpace: idSpace,
            idResident: idResident,
            idbooking: id,
            StartDateBooking: StartDateBooking,
            StartTimeBooking: StartTimeBooking,
            EndTimeBooking: hourEnd,
            amountPeople: amountPeople



        }


        await postRequest(event, 'booking', 'PUT', setShowModal, data, url, setErrorList, null, null);
        getBooking(`booking/one/${id}`)


    }

    const [isBookingProcessed, setIsBookingProcessed] = useState(false);

    const approveBooking = async (event) => {
        const data = {
            idUserLogged: idUserLogged,
            status: 'Aprobado',
            idbooking: id
        }

        await postRequest(event, 'booking/status', 'PUT', null, data, url, setErrorList, null, socket);
        getBooking(`booking/one/${id}`)
        setIsBookingProcessed(true);
    }

    const cancelBooking = async (event) => {
        const data = {
            idUserLogged: idUserLogged,
            status: 'Cancelado',
            idbooking: id
        }

        await postRequest(event, 'booking/status', 'PUT', null, data, url, setErrorList, null, socket);
        getBooking(`booking/one/${id}`)
        setIsBookingProcessed(true);
    }



    return (
        <>
            <Details>

                {


                    loadingBooking ? <Spinner /> :
                        <ContainerModule
                            // onClick={EqualUser ? openModalEditImg : null}
                            to={`/admin/booking/calendar/${Space?.idSpace}`}
                            icon='calendar'

                            A1={`Reserva de `}
                            A2={`${Space?.spaceName}`}
                            A5={`Estado de reserva: ${status}`}
                            A6={`Contacto residente: ${Resident?.user?.email} | ${Resident?.user?.phone}`}
                            status={status}

                            onClick3={isBookingProcessed ? null : approveBooking}
                            actionOnClick3={nameRole && nameRole.includes('residente') ? null : `Aprobar`}

                            onClick2={isBookingProcessed ? null : cancelBooking}
                            actionOnClick2={nameRole && nameRole.includes('residente') ? null : `Cancelar`}
                        // onClick2={EqualUser ? openModalChangePassword : null}
                        // showBackButton={EqualUser && allowedPermissions.includes('Usuarios') ? true : false}
                        // onClickEdit={setShowModalEditApartment}
                        />

                }



                <InfoDetails>

                    <Acordions>

                        <DropdownInfo
                            name={`Detalle de reserva`}
                        // action1={'Editar reserva'}
                        // onClickAction1={openModalEdit}
                        >

                            <ul className='list-unstyled'>

                                <li>Reserva para: {amountPeople} personas</li>
                                <br />
                                <li>Fecha de reserva: {moment.utc(StartDateBooking).locale('es').format('LL')}</li>
                                <li>De: {moment(StartTimeBooking, "HH:mm:ss").format('h:mm A')} a {moment(EndTimeBooking, "HH:mm:ss").format('h:mm A')}</li>
                                <br />
                                <li>Reserva de: {`${Space?.spaceName}`} </li>
                                <li>Reservado por: <Link to={`/admin/resident/details/${Resident?.user?.iduser}`}>{`${Resident?.user?.name} ${Resident?.user?.lastName}`}</Link> </li>
                                <br />

                                <li className='text-dark'>Estado: {status}</li>

                                {/* <li>Genero: {sex == 'M' ? 'Mascualino' : 'Femenino'}</li> */}
                                {/* <li>{email}</li>
              <li>{phone}</li> */}


                            </ul>

                        </DropdownInfo>

                    </Acordions>
                    {
                        Space ?

                            <Acordions>
                                <DropdownInfo
                                    name={'Espacio reservado'}
                                // action1={'Agregar comporbante de pago'}
                                // onClickAction1={openProofFilesModal}
                                >
                                    {loadingBooking ? <SmalSpinner /> : Space ? (
                                        <>
                                            <RowNotificactions
                                                // Information
                                                onclick={() => openModalImg(Space?.image)}
                                                img={Space?.image}
                                                name={`${Space.spaceType}:`}
                                                lastName={Space.spaceName}
                                                msg={`Capacidad maxima: ${Space.capacity} | Reservado para ${amountPeople} personas.`}
                                                icon="file-plus"
                                            />

                                        </>
                                    ) : null}
                                </DropdownInfo>
                            </Acordions> : null
                    }


                </InfoDetails>

            </Details >

            {showModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowModal}>
                            <Modal
                                onClick={updateBooking}
                                showModal={setShowModal}
                                title={"Editar reserva"}
                            >


                                <Inputs
                                    name="Fecha de inicio"
                                    type="date"
                                    identifier={"StartDateBooking"}
                                    value={StartDateBooking ? new Date(StartDateBooking).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setStartDateBooking(e.target.value)}
                                ></Inputs>
                                <Inputs
                                    name="Hora de inicio"
                                    type="time"
                                    identifier={"StartTimeBooking"}
                                    value={StartTimeBooking}
                                    onChange={(e) => setStartTimeBooking(e.target.value)}
                                ></Inputs>
                                <Inputs
                                    name="Hora de fin"
                                    type="time"
                                    identifier={"EndTimeBooking"}
                                    value={EndTimeBooking}
                                    onChange={(e) => setEndTimeBooking(e.target.value)}
                                ></Inputs>
                                <Inputs
                                    name="Cantidad de personas"
                                    type="number"
                                    identifier={"amountPeople"}
                                    value={booking?.data?.booking?.amountPeople}
                                    onChange={(e) => setAmountPeople(e.target.value)}
                                ></Inputs>
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )

            }

            {modalImg &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setModalImg}>
                            <ModalImg
                                img={spaceImg}
                                showModal={setModalImg}
                                onClick={() => alert('Aqui funciona algo')}
                                title={"Espacio reservado."}
                            // showSave={showevidences ? false : true}
                            >

                            </ModalImg>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )

            }



        </>
    )
}
