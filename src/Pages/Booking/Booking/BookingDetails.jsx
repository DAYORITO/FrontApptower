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
import { SmalSpinner, Spinner } from '../../../Components/Spinner/Spinner'
import { createPortal } from 'react-dom'
const token = Cookies.get('token');
import Cookies from 'js-cookie';
import moment from 'moment';
import { SocketContext } from '../../../Context/SocketContext'
import { useUserLogged } from '../../../Helpers/Helpers'


export const BookingDetails = () => {
    const token = Cookies.get('token');
    // API URL

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Socket

    const { socket } = useContext(SocketContext)

    // watchman information

    const { id } = useParams();

    const { idUserLogged } = useUserLogged()


    const [idBooking, setIdBooking] = useState(id)
    const [StartDateBooking, setStartDateBooking] = useState('')
    const [StartTimeBooking, setStartTimeBooking] = useState('')
    const [EndDateBooking, setEndDateBooking] = useState('')
    const [EndTimeBooking, setEndTimeBooking] = useState('')
    const [amountPeople, setAmountPeople] = useState('')
    const [status, setStatus] = useState('')

    const [Resident, setResident] = useState({})
    const [Space, setSpace] = useState({})

    const [spaceImg, setSpaceImg] = useState('')


    // Booking data

    const { data: booking, get: getBooking, loading: loadingBooking } = useFetch(url)

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

        setResident(booking?.data?.booking?.Resident)
        setSpace(booking?.data?.booking?.Space)


    }, [booking?.data?.booking])


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

                            onClick3={() => alert('Aqui va una funcion.')}
                            actionOnClick3={`Aprobar`}

                            onClick2={() => alert('Aqui va una funcion.')}
                            actionOnClick2={`Cancelar`}
                        // onClick2={EqualUser ? openModalChangePassword : null}
                        // showBackButton={EqualUser && allowedPermissions.includes('Usuarios') ? true : false}
                        // onClickEdit={setShowModalEditApartment}
                        />

                }



                <InfoDetails>

                    <Acordions>

                        <DropdownInfo
                            name={`Detalle de reserva`}
                            action1={'Editar reserva.'}
                        // onClickAction1={openModalEdit}
                        >

                            <ul className='list-unstyled'>

                                <li>Reserva para: {amountPeople} personas</li>
                                <br />
                                <li>Fecha de reserva: {moment(StartDateBooking).format('MMMM Do')}</li>
                                <li>De: {StartTimeBooking} a {EndTimeBooking}</li>
                                <br />
                                <li>Reserva de: <Link to={`/admin/spaces/`}>{`${Space?.spaceName}`}</Link> </li>
                                <li>Reservado por: <Link to={`/admin/residents/details/${Resident?.user?.iduser}`}>{`${Resident?.user?.name} ${Resident?.user?.lastName}`}</Link> </li>
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
