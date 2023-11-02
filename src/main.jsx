import React from "react";
import ReactDOM from "react-dom/client";
import { Owners } from "./Pages/Owners/owners";
import { Residents } from "./Pages/Residents/Residents";

ReactDOM.createRoot(document.getElementById('main')).render(
    <React.StrictMode>

        <Residents/>

    </React.StrictMode>
);
