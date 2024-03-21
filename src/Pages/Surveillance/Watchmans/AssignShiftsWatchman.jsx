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


    const handleSelectSlot = ({ start }) => {
        if (dayjs(start).isAfter(dayjs().subtract(1, 'day'))) {
            setSelectedDate(start);
            setShowModal(true);
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
            start: `${startHour}:00`,
            end: `${endHour}:00`
        };

        try {
            await postRequest(event, 'guardshifts', 'POST', setShowModal, data, url, 'Turno asignado exitosamente.');
            getshifts('guardshifts');
        } catch (error) {
            console.error("Error creating guardshifts: ", error);
        }
    };

    // useEffect(() => {
    //     const elements = document.querySelectorAll('');
    //     elements.forEach(element => {
    //         element.style.marginLeft = '-100px';
    //     });
    // }, []);


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
                    <Modal onClick={createShifts} showModal={handleSelectSlot} title={`Asignar turno día ${dayjs(selectedDate).format('dddd')}`}>
                        <Inputs name="Vigilante" value={`${nameWatchan} ${lastNameWatchman}`} readonly={true} />
                        <Inputs name="Fecha Turno" type="date" value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''} onChange={e => setSelectedDate(e.target.value)} readonly={true} />
                        <Inputs name="Hora Inicio" type="time" value={startHour} onChange={e => setStartHour(e.target.value)} />
                        <Inputs name="Hora Fin" type="time" value={endHour} onChange={e => setEndHour(e.target.value)} />
                    </Modal>
                </ModalContainer>,
                document.getElementById('modalRender')
            )}
        </>
    );
};
