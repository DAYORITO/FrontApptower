import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
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

dayjs.locale('es');

export const BookingCalendar = () => {


    const localizer = dayjsLocalizer(dayjs);

    const { id } = useParams();
    const idUserLogged = useUserLogged();

    //information Booking

    const [idSpace, setIdSpace] = useState(Number(id));
    const [idResident, setIdResident] = useState(null);
    const [dateStart, setDateStart] = useState(null);
    const [hourStart, setHourStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null);
    const [hourEnd, setHourEnd] = useState(null);
    const [amountPeople, setAmountPeople] = useState(null);
    const [status, setStatus] = useState(null);

    const [IsEditedBooking, setIsEditedBooking] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    console.log("selectedDate", selectedDate)
    const [residentSelected, setResidentSelected] = useState(null);


    const openBookingModal = (data) => {

        console.log(data)

        if (data == null) {

            setIsEditedBooking(false)
            setIdSpace(Number(id))
            setIdResident(Number(residentSelected))
            setDateStart(selectedDate)
            setHourStart('')
            setDateEnd('')
            setHourEnd('')
            setAmountPeople('')


        } else {

            setIsEditedBooking(true)
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

    console.log(BookingData, "BookingData")



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


    const [events, setEvents] = useState([]);

    console.log(events, "Events")

    useEffect(() => {
        if (BookingData && BookingData.data && Array.isArray(BookingData.data.booking)) {
            const bookings = BookingData.data.booking;
            const events = bookings.map(booking => ({
                start: new Date(booking.StartDateBooking),
                end: new Date(booking.EndDateBooking),
                title: `Reserva para ${booking.amountPeople} personas`
            }));
            setEvents(events);
        }
    }, [BookingData]);


    const nameSpace = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(id))?.spaceName;
    const nameRole = typeof RolsData?.data?.rols?.namerole === 'string' ? RolsData.data.rols.namerole.toLowerCase() : undefined;


    const handleSelectSlot = ({ start }) => {
        if (dayjs(start).isAfter(dayjs().subtract(1, 'day'))) {
            setSelectedDate(start);
            setShowModal(true);
            openBookingModal(null)
        }
    };

    const dayPropGetter = (date) => {
        if (dayjs(date).isBefore(dayjs(), 'day')) {
            return {
                style: {
                    backgroundColor: '#e9e9e9',
                    opacity: 0.6
                }
            };
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const hadleResidente = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        console.log("Selected Value:", selectedValueAsNumber);
        setResidentSelected(selectedValueAsNumber);

    };

    const residentsOptions = ResidentData && ResidentData?.data?.residents
        ? ResidentData?.data?.residents
            .filter(resident => resident?.user?.status === "Activo")
            .map(resident => ({
                value: resident.idResident,
                label: resident?.user?.name
            }))
        : [];

    const createBooking = async (event) => {

        const data = {

            idSpace: idSpace,
            idResident: idResident,
            StartDateBooking: dateStart,
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

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <FormContainer name={`Reserva de ${nameSpace ? nameSpace.toLowerCase() : ''}`}
                modalButton={true}

            >
                <Calendar
                    style={{ height: '61vh', width: '100%' }}
                    localizer={localizer}
                    events={events}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    views={['month', 'day', 'agenda']}
                    dayPropGetter={dayPropGetter}
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
                    }}
                />
            </FormContainer>
            {showModal && selectedDate &&
                createPortal(
                    <ModalContainer ShowModal={showModal} >
                        <Modal showModal={() => console.log('Modal closed')} title={'Crear reserva'} onClickClose={handleCloseModal}
                            onClick={IsEditedBooking ? null : createBooking}>
                            <Inputs name="Zona común" value={nameSpace} />

                            {nameRole?.includes('residente') ? <Inputs
                                name={'Reservado por'}
                                value={`${userData?.data?.user?.name || ''} ${userData?.data?.user?.lastName || ''}`}
                            /> :

                                <div className="mr-1" style={{ width: '100%' }}>

                                    <Select2 name={'Reservado a'} onChange={hadleResidente} options={residentsOptions}></Select2>
                                </div>
                            }

                            <Inputs name="Fecha de inicio"
                                type="date"
                                value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''}
                                onChange={e => setSelectedDate(e.target.value)}
                                readonly={true}
                            ></Inputs>
                            <Inputs name="Hora de inicio" type="time" value={hourStart} onChange={e => setHourStart(e.target.value)} />
                            <Inputs name="Fecha de fin" type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
                            <Inputs name="Hora de fin" type="time" value={hourEnd} onChange={e => setHourEnd(e.target.value)} />
                            <Inputs name={'Cantidad de personas'} type={'number'} value={amountPeople} onChange={e => setAmountPeople(e.target.value)} />
                        </Modal>
                    </ModalContainer>,
                    document.getElementById('modalRender')
                )}
        </div>
    );
};
