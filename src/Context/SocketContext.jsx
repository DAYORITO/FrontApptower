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


    }, [notifications]);


    console.log(idUserLogged, )


    console.log(notifications)

    console.log(socket)
    return (
        <SocketContext.Provider value={{ socket, online, notifications}} >

            {children}

        </SocketContext.Provider>
    )
}

