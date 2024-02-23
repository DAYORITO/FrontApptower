import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketProvider } from "./Context/SocketContext";


ReactDOM.createRoot(document.getElementById('main')).render(
    <React.StrictMode>

        <SocketProvider>
            
            <App />

        </SocketProvider>

    </React.StrictMode>
);
