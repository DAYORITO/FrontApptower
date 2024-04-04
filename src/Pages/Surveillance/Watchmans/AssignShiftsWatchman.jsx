import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { createPortal } from 'react-dom';
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo';
import { useParams } from 'react-router';
import { postRequest } from '../../../Helpers/Helpers';
import { useFetch } from '../../../Hooks/useFetch';
import FormContainer from '../../../Components/Forms/FormContainer';
import Inputs from '../../../Components/Inputs/Inputs';
import './Watchman.css'
import { ContainerCalendar } from '../../../Components/ContainerCalendar/ContainerCalendar';

dayjs.locale('es');

export const AssignShiftsWatchman = () => {
    const { id } = useParams();
    const localizer = dayjsLocalizer(dayjs);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [nameWatchan, setNameWatchan] = useState('');
    const [lastNameWatchman, setLastNameWatchman] = useState('');
    const [idWatch, setIdWatch] = useState('');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState([]);
    const [IsEditedShifs, setIsEditedShifs] = useState(false);

    console.log("idwatchman", idWatch)

    const url = import.meta.env.VITE_API_URL;
    const { data: watchman, get: getWatchman } = useFetch(url);
    const { data: ShiftsData, get: getshifts } = useFetch(url);

    useEffect(() => {
        getshifts('guardshifts');
        getWatchman(`watchman/${id}`);
    }, []);

    useEffect(() => {
        if (watchman?.data?.watchman) {
            const { user, idwatchman } = watchman.data.watchman;
            setNameWatchan(user?.name);
            setLastNameWatchman(user?.lastName);
            setIdWatch(idwatchman);
        }
    }, [watchman]);

    useEffect(() => {
        if (ShiftsData?.data?.shifts) {
            const shifts = ShiftsData.data.shifts;
            const events = shifts
                .filter(shift => shift.idwatchman === Number(idWatch))
                .map(shift => ({
                    ...shift,
                    id: shift.idshifts,
                    start: new Date(`${shift.date}T${shift.start}`),
                    end: new Date(`${shift.date}T${shift.end}`),
                    title: ` ${nameWatchan} ${lastNameWatchman}\n Turno día ${dayjs(shift.date).format('dddd')} `,

                }));
            setEvents(events);
        }
    }, [ShiftsData, idWatch]);

    const [currentView, setCurrentView] = useState('week');
    const [idShifts, setIdShifts] = useState('');

    const hadleSelectEvent = (event) => {
        if (currentView === 'week') {
            setIsEditedShifs(true);
            setSelectedDate(event.start);
            setShowModal(true);
            setStartHour(dayjs(event.start).format('HH:mm'));
            setEndHour(dayjs(event.end).format('HH:mm'));
            const selectedEvent = events.find(e => e.start === event.start && e.end === event.end);
            if (selectedEvent) {
                const { idshifts } = selectedEvent;
                setIdShifts(idshifts);
                console.log("idshifts holaaaaaa:", idshifts);
            }
        }
    };



    const handleSelectSlot = ({ start }) => {
        console.log(`handleSelectSlot: startHour=${startHour}, endHour=${endHour}`);
        const isExistingShift = events.some(event => dayjs(event.start).isSame(start, 'hour'));
        if (isExistingShift) {
            setSelectedDate(start);
            setShowModal(true);
            setIsEditedShifs(true);
            setStartHour(dayjs(start).format('HH:mm'));
            setEndHour(dayjs(start).add(1, 'hour').format('HH:mm'));
        } else {
            setSelectedDate(start);
            setShowModal(true);
            setIsEditedShifs(false);
            setStartHour('');
            setEndHour('');
        }
    };


    const dayPropGetter = date => {
        if (dayjs(date).isBefore(dayjs(), 'day')) {
            return {
                style: {
                    backgroundColor: 'fffff',
                    opacity: 0.6
                }
            };
        }
    };

    const createShifts = async (event) => {
        const data = {
            idwatchman: Number(idWatch),
            date: dayjs(selectedDate).format('YYYY-MM-DD'),

        };

        if (startHour) {
            data.start = `${startHour}:00`;
        }

        if (endHour) {
            data.end = `${endHour}:00`;
        }


        try {
            await postRequest(event, 'guardshifts', 'POST', setShowModal, data, url, setError);
            getshifts('guardshifts');
        } catch (error) {
            console.error("Error creating guardshifts: ", error);
        }
    };


    const updateShifts = async (event) => {

        console.log("idshifs", events)

        const data = {
            idwatchman: Number(idWatch),
            date: dayjs(selectedDate).format('YYYY-MM-DD'),
            idshifts: Number(idShifts)

        };

        if (startHour) {
            data.start = `${startHour}:00`;
        }

        if (endHour) {
            data.end = `${endHour}:00`;
        }

        try {
            await postRequest(event, `guardshifts/${idShifts}`, 'PUT', setShowModal, data, url, setError);
            getshifts('guardshifts');
        } catch (error) {
            console.error("Error creating guardshifts: ", error);
        }

    };




    const Label = (date) => {
        const labelBooking = document.querySelector('.rbc-toolbar-label');
        if (labelBooking) {
            labelBooking.classList.add('shifts-label');

            const monthYear = dayjs(date).format('MMMM YYYY');
            labelBooking.innerHTML = `Asignación de turnos / ${monthYear}`;
            labelBooking.style.setProperty('margin-left', '-250px', 'important');

        }
    }

    Label(new Date());


    return (
        <>
            <ContainerCalendar>
                <Calendar
                    style={{ height: '74vh', width: '96%' }}
                    localizer={localizer}
                    events={events}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={hadleSelectEvent}
                    onView={setCurrentView}
                    views={['week']}
                    view='week'
                    dayPropGetter={dayPropGetter}
                    onNavigate={(date) => {
                        setTimeout(() => Label(date), 0)
                    }}
                    messages={{
                        next: 'Siguiente',
                        previous: 'Anterior',
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semana',
                        date: 'Fecha',
                        time: 'Hora',
                        event: 'Evento',
                        noEventsInRange: 'No hay turnos en este rango',
                        showMore: total => `+ Ver más (${total})`

                    }}
                // onView={handleView}

                />
            </ContainerCalendar>
            {showModal && selectedDate && createPortal(
                <ModalContainer ShowModal={showModal}>
                    <Modal onClick={IsEditedShifs ? updateShifts : createShifts} showModal={handleSelectSlot}
                        title={IsEditedShifs ? `Editar turno día ${dayjs(selectedDate).format('dddd')}` : `Asignar turno día ${dayjs(selectedDate).format('dddd')}`}
                    >
                        <Inputs name="Vigilante" value={`${nameWatchan} ${lastNameWatchman}`} readonly={true} />
                        <Inputs name="Fecha Turno" type="date" value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''} onChange={e => setSelectedDate(e.target.value)} readonly={true} />
                        <Inputs name="Hora Inicio" type="time" value={startHour} onChange={e => setStartHour(e.target.value)} errors={error} identifier={'start'} />
                        <Inputs name="Hora Fin" type="time" value={endHour} onChange={e => setEndHour(e.target.value)} errors={error} identifier={'end'} />
                    </Modal>
                </ModalContainer>,
                document.getElementById('modalRender')
            )}
        </>
    );
};
