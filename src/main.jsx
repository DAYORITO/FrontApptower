import React from "react";
import ReactDOM from "react-dom/client";
import { ContainerTable } from "./Components/ContainerTable";
import { PageLayout } from "./Components/PageLayout";
import VisitorsCreate from "./Pages/Visitors/VisitorsCreate";
ReactDOM.createRoot(document.getElementById('main')).render(

    <React.StrictMode>
        {/* PageLayout es la propuesta para componetizar todo el nav y el navuser pero aun no se tiene */}
        {/* <PageLayout>
        </PageLayout> */}

        {/* Vista de residentes, tabla */}
        {/* <ContainerTable></ContainerTable> */}
        <VisitorsCreate />

    </React.StrictMode>
)