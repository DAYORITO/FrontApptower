import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { Navigate } from 'react-big-calendar';
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
import { da } from 'date-fns/locale';
import { ContainerCalendar } from '../../../Components/ContainerCalendar/ContainerCalendar';
import { min, set } from 'date-fns';

dayjs.locale('es');


export const BookingCalendar = () => {

    const url = import.meta.env.VITE_API_URL

    const { data: spacesToBook, get: getSpacesToBook } = useFetch(url)

    useEffect(() => {

        getSpacesToBook(`spaces/${id}`)

    }, [])


    // Configuración del calendario 
    const localizer = dayjsLocalizer(dayjs);

    const { id } = useParams();
    const { idUserLogged } = useUserLogged();
    const navigate = useNavigate();

    //information Booking

    const [idSpace, setIdSpace] = useState(Number(id) || null);
    const [idResident, setIdResident] = useState(null);
    const [dateStart, setDateStart] = useState(null);
    const [hourStart, setHourStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null);
    const [hourEnd, setHourEnd] = useState(null);
    const [amountPeople, setAmountPeople] = useState(null);
    const [status, setStatus] = useState(null);
    const [idbooking, setIdBooking] = useState(null);
    const [errors, setErrors] = useState([]);
    const [maxTime, setMaxTime] = useState(null);
    const [minTime, setMinTime] = useState(null);

    console.log(minTime, maxTime, 'minTime, maxTime')


    const [IsEditedBooking, setIsEditedBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);


    useEffect(() => {

        setHourStart(spacesToBook?.data?.space?.openingTime)
        setHourEnd(spacesToBook?.data?.space?.closingTime)
        setMaxTime(spacesToBook?.data?.space?.maxTime)
        setMinTime(spacesToBook?.data?.space?.minTime)
    }, [spacesToBook])

    const openBookingModal = (data) => {

        setErrors('')



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


    // Get Data

    const { data: spaces, get: getSpaces, loading } = useFetch(url)
    const { data: userData, get: getUserData } = useFetch(url)
    const { data: RolsData, get: getRols } = useFetch(url)
    const { data: ResidentData, get: getResident } = useFetch(url)
    const { data: BookingData, get: getBooking } = useFetch(url)

    useEffect(() => {

        getSpacesToBook(`spaces/${id}`)
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


    const userResident = ResidentData?.data?.residents?.find(resident => resident.iduser === Number(idUserLogged))?.idResident;

    const nameRole = typeof RolsData?.data?.rols?.namerole === 'string' ? RolsData.data.rols?.namerole?.toLowerCase() : undefined;

    const selectedSpace = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(idSpace));

    const colors = [
        'hsl(210, 70%, 60%)', // darker light blue
        'hsl(150, 50%, 55%)', // darker teal
        'hsl(300, 80%, 67%)', // darker magenta
        'hsl(270, 60%, 60%)', // darker purple
        'hsl(240, 50%, 45%)', // darker blue
        'hsl(330, 50%, 45%)'  // darker rose
    ];

    const spaceColorMap = {};

    function getColorForSpace(idSpace) {
        if (spaceColorMap[idSpace]) {
            return spaceColorMap[idSpace];
        }

        // Asigna un color del array de colores de forma rotativa
        const color = colors[Object.keys(spaceColorMap).length % colors.length];

        spaceColorMap[idSpace] = color;

        return color;
    }


    const [events, setEvents] = useState([]);





    // se encarga de actualizar el calendario con las reservas y conversión de fechas
    useEffect(() => {
        if (nameRole && BookingData && BookingData.data && Array.isArray(BookingData.data.booking)) {
            const bookings = BookingData.data.booking;
            const events = bookings
                .filter(booking =>
                    nameRole.includes('residente')
                        ? booking.idResident === userResident
                        : idSpace
                            ? booking.Space.idSpace === idSpace
                            : true
                )
                .map(booking => {
                    const startDate = new Date(`${booking.StartDateBooking.split('T')[0]}T${booking.StartTimeBooking}`);
                    const endDate = new Date(`${booking.StartDateBooking.split('T')[0]}T${booking.EndTimeBooking}`);
                    return {
                        ...booking,
                        id: booking.idbooking,
                        start: startDate,
                        end: endDate,
                        title: `Reserva de ${(booking?.Space?.spaceName).toLowerCase()} para ${booking.amountPeople} personas `,
                        status: `Estado: ${booking.status}`,
                        color: getColorForSpace(booking.Space.idSpace),
                    };
                });
            setEvents(events);
        }
    }, [BookingData, idSpace, userResident, nameRole]);


    const handleSelectSlot = ({ start, data }) => {
        if (dayjs(start).isAfter(dayjs().subtract(1, 'day'))) {
            setSelectedDate(start);
            setShowModal(true);


        }
    };

    const dayPropGetter = (date) => {
        if (dayjs(date).isBefore(dayjs(), 'day')) {
            return {
                style: {
                    backgroundColor: '#ececec',
                    opacity: 0.6
                }
            };
        }
    };


    const hadleResidente = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue.value);
        setIdResident(selectedValueAsNumber);

    };

    const hadleSpace = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue.value);
        setIdSpace(selectedValueAsNumber);

    };


    const residentsOptions = ResidentData && ResidentData?.data?.residents
        ? ResidentData?.data?.residents
            .filter(resident => resident?.status === "Active")
            .map(resident => ({
                value: resident.idResident,
                label: resident?.user?.name + ' ' + resident?.user?.lastName
            }))
        : [];

    const selectedResident = residentsOptions.find(option => option.value === idResident);

    const spacesOptions = spaces && spaces?.data?.spaces
        ? spaces?.data?.spaces
            .filter(space => space?.status === "Active")
            .map(space => ({
                value: space.idSpace,
                label: space.spaceName
            }))
        : [];

    const selectedSpaceCreate = spacesOptions.find(option => option.value === Number(idSpace));


    const createBooking = async (event) => {

        const data = {

            idSpace: idSpace,
            idResident: idResident ? idResident : Number(userResident),
            StartDateBooking: selectedDate,
            StartTimeBooking: hourStart,
            EndDateBooking: Date('0000-00-00T00:00:00.000Z'),
            EndTimeBooking: hourEnd,
            amountPeople: amountPeople,
        }


        try {
            await postRequest(event, 'booking', 'POST', setShowModal, data, url, setErrors, 'Reserva creada correctamente.')

            getBooking('booking')
        } catch (error) {
            console.error("Error creating booking: ", error);

        }

        if (showModal === false) {


        }

    };



    const updateBooking = async (event) => {

        const data = {

            idbooking: idbooking,
            idResident: idResident,
            idSpace: idSpace,
            StartDateBooking: selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            StartTimeBooking: hourStart,
            EndDateBooking: new Date().toISOString().split('T')[0],
            EndTimeBooking: hourEnd,
            amountPeople: amountPeople,
            status: status

        }


        await postRequest(event, `booking`, 'PUT', setShowModal, data, url, setErrors, null, null)
        getBooking('booking')




    };

    const [currentView, setCurrentView] = useState('month');

    ///Aqui redirige a detalles de reservas 
    const hadleSelectEvent = (event) => {
        if (currentView) {
            navigate(`/admin/booking/details/${event.id}`)
        }

    }

    function convertTo12HourFormat(time) {
        if (time) {
            const [hour, minute] = time.split(':');
            return ((hour % 12) || 12) + ':' + minute + ' ' + (hour >= 12 ? 'PM' : 'AM');
        }
        return time;
    }

    const maxCapacity = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(idSpace))?.capacity;
    const isOverCapacity = amountPeople > maxCapacity;

    const HourStartSpace = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(idSpace))?.openingTime;

    const HourEndSpace = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(idSpace))?.closingTime;

    const HourMin = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(idSpace))?.minTime;

    const HourMax = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(idSpace))?.maxTime;


    const [nameSpace, setNameSpace] = useState('');


    useEffect(() => {
        const space = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(idSpace));
        if (space) {
            setNameSpace(space.spaceName);
        }
        Label(new Date(), currentView);
    }, [idSpace, spaces, currentView]);


    const Label = (date, view) => {
        const labelBooking = document.querySelector('.rbc-toolbar-label');
        if (labelBooking) {
            labelBooking.classList.add('booking');
            let formattedDate;
            if (view === 'month') {
                formattedDate = dayjs(date).format('MMMM YYYY');
            } else if (view === 'day') {
                return;
            } else if (view === 'agenda') {
                return;
            }
            if (id) {
                labelBooking.innerHTML = nameSpace ? `${nameSpace}  / ${formattedDate}` : 'Reservas';
            } else {
                labelBooking.innerHTML = `Reservas / ${formattedDate}`;
            }
        }
    }

    Label(new Date(), currentView);

    const InformationBooking = `Información sobre ${nameSpace}: \n
    Para realizar una reserva, es necesario hacerlo con al menos 3 días de antelación y como máximo 30 días antes.
    \n Recuerde que la duración mínima de la reserva es de ${HourMin} horas.
    \n Asi mismo, la duración máxima permitida es de ${HourMax} horas.
    \n
    Máximo de personas permitidas en la zona común:
     ${maxCapacity} personas.
     \n Horario de apertura: ${convertTo12HourFormat(HourStartSpace)}.
     \n Horario de cierre: ${convertTo12HourFormat(HourEndSpace)}. 
`;



    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ContainerCalendar>
                <Calendar
                    style={{ height: '75vh', width: '96%' }}
                    localizer={localizer}
                    events={events}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    views={['month', 'day', 'agenda']}
                    dayPropGetter={dayPropGetter}
                    onSelectEvent={hadleSelectEvent}
                    onView={setCurrentView}
                    onNavigate={(date) => {
                        setTimeout(() => Label(date, currentView), 0)
                    }}
                    popup
                    eventPropGetter={(event, start, end, isSelected) => {
                        return {
                            style: {
                                backgroundColor: event.color,
                            }
                        }
                    }}
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
                        showMore: total => `+${total} más`,

                    }}
                />


            </ContainerCalendar>
            {showModal && selectedDate &&
                createPortal(
                    <ModalContainer ShowModal={showModal}  >
                        <Modal onClick={IsEditedBooking ? updateBooking : createBooking}
                            showModal={handleSelectSlot}
                            hoursAvailable={InformationBooking}
                            toolTip={HourStartSpace ? true : false}
                            title={IsEditedBooking ? `Editar reserva` : 'Crear nueva reserva'}>
                            {id ? <Inputs name="Zona común" value={nameSpace} disabled /> :
                                <Select2
                                    placeholder={'Zona común'}
                                    onChange={hadleSpace}
                                    options={spacesOptions}
                                    value={selectedSpaceCreate ? selectedSpaceCreate : ''}
                                    defaultOption={true}
                                    errors={errors}
                                    identifier={'idSpace'}

                                />
                            }

                            {nameRole?.includes('residente') ? <Inputs
                                name={'Reservado por'}
                                value={`${userData?.data?.user?.name || ''} ${userData?.data?.user?.lastName || ''}`}
                            /> :

                                <Select2
                                    placeholder={'Reservado a'}
                                    onChange={hadleResidente}
                                    options={residentsOptions}
                                    value={selectedResident ? selectedResident : ''}
                                    defaultOption={true}
                                    errors={errors}
                                    identifier={'idResident'}
                                />
                            }

                            {IsEditedBooking ? <Inputs name="Fecha de inicio"
                                type="date"
                                value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''}
                                onChange={e => setSelectedDate(e.target.value)}
                                errors={errors}
                                identifier={'StartDateBooking'}

                            ></Inputs> :
                                <Inputs name="Fecha de inicio"
                                    type="date"
                                    value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''}
                                    onChange={e => selectedDate(e.target.value)}
                                    readonly={true}
                                    disabled
                                ></Inputs>}



                            <Inputs
                                name="Hora de inicio"
                                type="time"
                                value={hourStart ? hourStart : ''}
                                onChange={e => setHourStart(e.target.value)}
                                errors={errors}
                                identifier={'StartTimeBooking'}
                            // errorMessage={hourStart < HourStartSpace ? `La hora de inicio debe ser mayor a ${HourStartSpace}` : null}
                            // inputStyle={hourStart < HourStartSpace ? { borderColor: 'red' } : null}
                            />


                            <Inputs
                                name="Hora de fin"
                                type="time"
                                value={hourEnd ? hourEnd : ''}
                                onChange={e => setHourEnd(e.target.value)}
                                min={HourStartSpace}
                                max={HourEndSpace}
                                errors={errors}
                                identifier={'EndTimeBooking'}

                            />

                            <Inputs
                                name={'Cantidad de personas'}
                                type={'number'}
                                value={amountPeople ? amountPeople : ''}
                                onChange={e => { setAmountPeople(e.target.value); setErrors([]) }}
                                errors={isOverCapacity ? isOverCapacity : errors}
                                identifier={'amountPeople'}
                                inputStyle={isOverCapacity ? { borderColor: 'red' } : null}
                                errorMessage={isOverCapacity ? `La cantidad máxima de personas permitidas es ${maxCapacity}` : null}
                            />

                            {

                                IsEditedBooking ?
                                    <>
                                        {nameRole.toLowerCase().includes('residente') ? null : <InputsSelect id={"select"} options={BookingTypes} name={"Estado"}
                                            value={status ? status : null} onChange={e => setStatus(e.target.value)}
                                            errors={errors} identifier={'status'}
                                        ></InputsSelect>}

                                        <Inputs type={"hidden"}
                                            value={idbooking || null} onChange={e => setIdBooking(e.target.value)}></Inputs>
                                    </>
                                    : null
                            }
                        </Modal>
                    </ModalContainer>,
                    document.getElementById('modalRender')
                )
            }
        </div >
    );
};
