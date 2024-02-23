import { Children, createContext } from "react";
import { useSocket } from "../Hooks/useSockets";

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online } = useSocket()

    console.log(socket)
    return (
        <SocketContext.Provider value={{ socket, online}} >

            {children}

        </SocketContext.Provider>
    )
}

