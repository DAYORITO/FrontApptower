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

dayjs.locale('es');

export const BookingCalendar = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);


    const localizer = dayjsLocalizer(dayjs);


    const { id } = useParams();

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Get Data

    const { data: spaces, get: getSpaces, loading } = useFetch(url)

    useEffect(() => {

        getSpaces('spaces')


    }, [])

    const nameSpace = spaces?.data?.spaces?.find(space => space.idSpace === parseInt(id))?.spaceName;

    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <FormContainer name={`Reserva de ${nameSpace ? nameSpace.toLowerCase() : ''}`} style={{ marginBottom: '-20px' }}
                modalButton={true}

            >
                <Calendar
                    style={{ height: '61vh', width: '100%' }}
                    localizer={localizer}
                    events={[]}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    views={['month', 'day', 'agenda']}
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
                        <Modal showModal={showModal} title={'Crear reserva'} onClickClose={handleCloseModal}>
                            <Inputs name="Zona común" value={nameSpace} />
                            <Inputs name={'Reservado por'} />
                            <Inputs name="Fecha de inicio"
                                type="date"
                                value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''}
                                onChange={e => setSelectedDate(e.target.value)}
                                readonly={true}
                            ></Inputs>
                            <Inputs name="Hora de inicio" type="time" />
                            <Inputs name="Fecha de fin" type="date" />
                            <Inputs name="Hora de fin" type="time" />
                            <Inputs name={'Cantidad de personas'} type={'number'} />
                        </Modal>
                    </ModalContainer>,
                    document.getElementById('modalRender')
                )}
        </div>
    );
};
