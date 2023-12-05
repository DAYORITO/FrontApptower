/* eslint-disable react/prop-types */

import { ContainerTable } from '../../Components/ContainerTable/ContainerTable';
import { useEffect, useState } from 'react';

export const Notifications = (props) => {
    const socket = props.socket;
    const [messages, setMessages] = useState([]);
    const [notificacion, setNotificacion] = useState([]);

    socket.on('notificacion', (data) => {
        const item = { data }
        setMessages.insertAdjacentHTML('beforeend', item);
        console.log('Notificacion recibida');
    });

    useEffect(() => {
        
    }, []);
    console.log(messages);
    return (
        <>
            <ContainerTable
                title='Notificaciones'>

            </ContainerTable>
        </>
    );
};
