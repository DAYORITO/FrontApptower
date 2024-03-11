import { createContext, useEffect, useState } from "react";
import { useSocket } from "../Hooks/useSockets";
import { useUserLogged } from "../Helpers/Helpers";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online } = useSocket()

    const [notifications, setNotifications] = useState([]);
    const [dashboarsdData, setDashboardData] = useState([]);

    const { idUserLogged, idRolLogged } = useUserLogged()

    console.log(idRolLogged, 'idRolLogged')

    // Notifications

    useEffect(() => {

        if (idRolLogged === 3) {

            socket.on('watchman-notifications', (notifications) => {

                setNotifications(notifications)

            })
        } else if (idRolLogged === 2) {

            // socket.on('watchman-notifications', (notifications) => {

            //     setNotifications(notifications)

            // })

            socket.on('resident-notifications', (notifications) => {

                setNotifications(notifications)

            })

        }
        else if (idRolLogged === 1) {

            socket.on('all-notifications', (notifications) => {

                setNotifications(notifications)
            })

        }

    }, [socket, idRolLogged]);


    // Dashboard iformation


    useEffect(() => {

        socket.on('dashboard-information', (dashboarsdData) => {

            setDashboardData(dashboarsdData)
        });


    }, [socket]);



    return (
        <SocketContext.Provider value={{ socket, online, notifications, setNotifications , dashboarsdData}} >

            {children}

        </SocketContext.Provider>
    )
}

