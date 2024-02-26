import { createContext, useEffect, useState } from "react";
import { useSocket } from "../Hooks/useSockets";
import { useUserLogged } from "../Helpers/Helpers";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online } = useSocket()

    const [notifications, setNotifications] = useState([]);

    const idUserLogged = useUserLogged()

    useEffect(() => {

        socket.on('notifications-user', (notifications) => {
            setNotifications(notifications);
        })


    }, [socket, notifications]);

    return (
        <SocketContext.Provider value={{ socket, online, notifications}} >

            {children}

        </SocketContext.Provider>
    )
}

