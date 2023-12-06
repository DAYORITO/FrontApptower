/* eslint-disable react/prop-types */

import { ContainerTable } from '../../Components/ContainerTable/ContainerTable';
import { useEffect, useState } from 'react';
import { RowNotificactions } from '../../Components/RowNotificacions/RowNotificactions';
import { TablePerson } from '../../Components/Tables/Tables';
import { DivRow } from '../../Components/DivRow/DivRow';
import { Tbody } from '../../Components/Tbody/Tbody';
import { Thead } from '../../Components/Thead/Thead';
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons';

export const Notifications = (props) => {
    const socket = props.socket;
    const [messages, setMessages] = useState([]);

    const addMessage = (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    };

    useEffect(() => {
        // Listen for 'chat message' events
        const onChatMessage = (msg) => {
            addMessage(msg);
        };

        // Register the event listener
        socket.on('message', onChatMessage);

        // Cleanup function to remove the listener when the component is unmounted
        return () => {
            socket.off('message', onChatMessage);
        };
    }, [socket]);

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    return (
        <>
            <ContainerTable title='Notificaciones'>

                <DivRow>
                    .
                    
                    
                </DivRow>

                <TablePerson>
                    <Thead>

                    </Thead>
                    <Tbody>
                        <RowNotificactions></RowNotificactions>
                        {messages.map((msg, index) => (
                            <RowNotificactions key={index} mensaje={msg} >
                                    
                            </RowNotificactions>
                        ))}



                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>
    );
};
