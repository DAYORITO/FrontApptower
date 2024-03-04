import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer, Views, Navigate } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import FormContainer from '../../../Components/Forms/FormContainer';
import 'dayjs/locale/es';
import './BookingCalendar.css';
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo';
import Inputs from '../../../Components/Inputs/Inputs';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../Hooks/useFetch';
import { postRequest, useUserLogged } from '../../../Helpers/Helpers';
import Select2 from '../../../Components/Inputs/Select2'
import { useNavigate } from 'react-router-dom';
import { Accions } from '../../../Components/DropdownInfo/DropdownInfo';
import { BookingTypes } from '../../../Hooks/consts.hooks';
import { Actions } from '../../../Components/Actions/Actions';
import InputsSelect from '../../../Components/Inputs/InputsSelect';

dayjs.locale('es');

export const BookingCalendar = () => {

    // Configuración del calendario 
    const localizer = dayjsLocalizer(dayjs);

    const { id } = useParams();
    const {idUserLogged} = useUserLogged();
    const navigate = useNavigate();

    //information Booking

    const [idSpace, setIdSpace] = useState(Number(id));
    const [idResident, setIdResident] = useState(null);
    const [dateStart, setDateStart] = useState(null);
    const [hourStart, setHourStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null);
    const [hourEnd, setHourEnd] = useState(null);
    const [amountPeople, setAmountPeople] = useState(null);
    const [status, setStatus] = useState(null);
    const [idbooking, setIdBooking] = useState(null);


    const [IsEditedBooking, setIsEditedBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);


    const openBookingModal = (data) => {

        console.log(data)

        if (data == null) {

            setIsEditedBooking(false)
            setIdSpace(Number(id))
            setIdResident(null)
            setDateStart(selectedDate)
            setHourStart('')
            setDateEnd('')
            setHourEnd('')
            setAmountPeople('')


        } else {

            setIsEditedBooking(true)
            setIdBooking(data.idbooking)
            setIdSpace(data.idSpace)
            setIdResident(data.idResident)
            setDateStart(data.StartDateBooking)
            setHourStart(data.StartTimeBooking)
            setDateEnd(data.EndDateBooking)
            setHourEnd(data.EndTimeBooking)
            setAmountPeople(data.amountPeople)
            setStatus(data.status)


        }
        setShowModal(true)

    }


    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Get Data

    const { data: spaces, get: getSpaces, loading } = useFetch(url)
    const { data: userData, get: getUserData } = useFetch(url)
    const { data: RolsData, get: getRols } = useFetch(url)
    const { data: ResidentData, get: getResident } = useFetch(url)
    const { data: BookingData, get: getBooking } = useFetch(url)

    useEffect(() => {
        getSpaces('spaces')
        getResident('residents')
        getBooking('booking')

        if (Number(idUserLogged)) {
            getUserData(`users/${Number(idUserLogged)}`)
        }
    }, [idUserLogged])

    useEffect(() => {
        if (userData) {
            const idRole = userData?.data?.user?.idrole;
            if (Number(idRole)) {
                getRols(`rols/${Number(idRole)}`)
            }
        }
    }, [userData])



    const nameSpace = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(id))?.spaceName;
    const nameRole = typeof RolsData?.data?.rols?.namerole === 'string' ? RolsData.data.rols.namerole.toLowerCase() : undefined;

    const selectedSpace = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(idSpace));

    console.log("Selected Space", selectedSpace)



    const [events, setEvents] = useState([]);

    // se encarga de actualizar el calendario con las reservas y conversión de fechas
    useEffect(() => {
        if (BookingData && BookingData.data && Array.isArray(BookingData.data.booking)) {
            const bookings = BookingData.data.booking;
            const events = bookings
                .filter(booking => booking.Space.idSpace === idSpace)
                .map(booking => {

                    const startDate = new Date(`${booking.StartDateBooking.split('T')[0]}T${booking.StartTimeBooking}`);
                    const endDate = new Date(`${booking.EndDateBooking.split('T')[0]}T${booking.EndTimeBooking}`);

                    // const startHour = startDate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
                    // const endHour = endDate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

                    return {
                        ...booking,
                        id: booking.idbooking,
                        start: startDate,
                        end: endDate,
                        title: `Reserva de ${(booking?.Space?.spaceName).toLowerCase()} para ${booking.amountPeople} personas `,
                        status: `Estado: ${booking.status}`,
                    };
                });
            setEvents(events);
        }
    }, [BookingData, idSpace]);




    const handleSelectSlot = ({ start, data }) => {
        console.log("Data", data)
        if (dayjs(start).isAfter(dayjs().subtract(1, 'day'))) {
            setSelectedDate(start);
            setShowModal(true);


        }
    };

    const dayPropGetter = (date) => {
        if (dayjs(date).isBefore(dayjs(), 'day')) {
            return {
                style: {
                    backgroundColor: '#e0e0e0',
                    opacity: 0.6
                }
            };
        }
    };

    const hadleResidente = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        console.log("Selected Value:", selectedValueAsNumber);
        setIdResident(selectedValueAsNumber);

    };


    console.log(ResidentData?.data?.residents, "Resident Data")

    const residentsOptions = ResidentData && ResidentData?.data?.residents
        ? ResidentData?.data?.residents
            .filter(resident => resident?.status === "Active")
            .map(resident => ({
                value: resident.idResident,
                label: resident?.user?.name
            }))
        : [];

    const createBooking = async (event) => {

        const data = {

            idSpace: idSpace,
            idResident: Number(idResident),
            StartDateBooking: selectedDate,
            StartTimeBooking: hourStart,
            EndDateBooking: dateEnd,
            EndTimeBooking: hourEnd,
            amountPeople: amountPeople,
        }

        console.log("Create data", data)

        try {
            await postRequest(event, 'booking', 'POST', setShowModal, data, url, 'Reserva creada correctamente.')

            getBooking('booking')
        } catch (error) {
            console.error("Error creating booking: ", error);

        }

    };



    const updateBooking = async (event) => {

        const data = {

            idbooking: idbooking,
            idResident: idResident,
            StartDateBooking: dateStart,
            StartTimeBooking: hourStart,
            EndDateBooking: dateEnd,
            EndTimeBooking: hourEnd,
            amountPeople: amountPeople,
            status: status

        }

        console.log("edit data", data)

        await postRequest(event, `booking`, 'PUT', setShowModal, data, url, 'Reserva actualizada correctamente.')
        getBooking('booking')

    };

    const [currentView, setCurrentView] = useState('month');

    ///Aqui redirige a detalles de reservas 
    const hadleSelectEvent = (event) => {
        if (currentView === 'agenda') {
            navigate(`/admin/booking/details/${event.id}`)
        }

    }




    return (
        <div style={{ width: '100%', height: '100%' }}>
            <FormContainer name={`Reserva de ${nameSpace ? nameSpace.toLowerCase() : ''}`}
                ButtonBack={true}

            >
                <Calendar
                    style={{ height: '58vh', width: '100%' }}
                    localizer={localizer}
                    events={events}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    views={['month', 'day', 'agenda']}
                    dayPropGetter={dayPropGetter}
                    onSelectEvent={hadleSelectEvent}
                    onView={setCurrentView}
                    components={{
                        agenda: {
                            event: ({ event }) => (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{event.title}</strong>
                                        <p>{event.status}</p>
                                    </div>
                                    <Accions action1={'Editar'} onClickAction1={(e) => {
                                        e.preventDefault();
                                        const booking = BookingData.data.booking.find(booking => booking.idbooking === event.id);
                                        handleSelectSlot(event);
                                        openBookingModal(booking);
                                    }} />
                                </div>
                            ),
                        },
                    }}
                    messages={{
                        next: 'Siguiente',
                        previous: 'Anterior',
                        today: 'Hoy',
                        month: 'Mes',
                        day: 'Día',
                        agenda: 'Agenda',
                        date: 'Fecha',
                        time: 'Hora',
                        event: 'Evento',
                        noEventsInRange: 'No hay reservas en este rango',

                    }}
                />
            </FormContainer>
            {showModal && selectedDate &&
                createPortal(
                    <ModalContainer ShowModal={showModal} >
                        <Modal onClick={IsEditedBooking ? updateBooking : createBooking}
                            showModal={handleSelectSlot}
                            title={IsEditedBooking ? `Editar reserva` : 'Crear nueva reserva'}>
                            <Inputs name="Zona común" value={nameSpace} />

                            {nameRole?.includes('residente') ? <Inputs
                                name={'Reservado por'}
                                value={`${userData?.data?.user?.name || ''} ${userData?.data?.user?.lastName || ''}`}
                            /> :

                                <div className="mr-1" style={{ width: '100%' }}>

                                    <Select2 name={'Reservado a'} onChange={hadleResidente} options={residentsOptions} value={idResident ? idResident : ''} defaultOption={true}></Select2>
                                </div>
                            }

                            <Inputs name="Fecha de inicio"
                                type="date"
                                value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''}
                                onChange={e => setSelectedDate(e.target.value)}
                                readonly={true}
                            ></Inputs>
                            <Inputs
                                name="Hora de inicio"
                                type="time"
                                value={hourStart}
                                onChange={e => setHourStart(e.target.value)}
                            />

                            <Inputs
                                name="Fecha de fin"
                                type="date"
                                value={dateEnd ? new Date(dateEnd).toISOString().split('T')[0] : ''}
                                onChange={e => setDateEnd(e.target.value)}
                            />

                            <Inputs
                                name="Hora de fin"
                                type="time"
                                value={hourEnd}
                                onChange={e => setHourEnd(e.target.value)}
                                min={selectedSpace ? selectedSpace.schedule.startHour : ""}
                                max={selectedSpace ? selectedSpace.schedule.endHour : ''}
                            />

                            <Inputs
                                name={'Cantidad de personas'}
                                type={'number'}
                                value={amountPeople}
                                onChange={e => setAmountPeople(e.target.value)}
                                min={0}
                            />


                            {

                                IsEditedBooking ?
                                    <>
                                        <InputsSelect id={"select"} options={BookingTypes} name={"Estado"}
                                            value={status} onChange={e => setStatus(e.target.value)}
                                        ></InputsSelect>

                                        <Inputs type={"hidden"}
                                            value={idbooking} onChange={e => setIdBooking(e.target.value)}></Inputs>
                                    </>
                                    : null
                            }
                        </Modal>
                    </ModalContainer>,
                    document.getElementById('modalRender')
                )}
        </div>
    );
};
