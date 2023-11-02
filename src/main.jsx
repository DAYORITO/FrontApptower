import React from "react";
import ReactDOM from "react-dom/client";
import { Owners } from "./Pages/Owners/owners";
import { Residents } from "./Pages/Residents/Residents";
import { PageLayout } from "./Components/PageLayout";
import VisitorsCreate from "./Pages/Visitors/VisitorsCreate";
import LogIn from "./Pages/LogIn/LogIn";
ReactDOM.createRoot(document.getElementById('main')).render(
    <React.StrictMode>

        <Residents/>

    </React.StrictMode>
);
