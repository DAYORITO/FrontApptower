import React from "react";
import ReactDOM from "react-dom/client";
import { ContainerTable } from "./Components/ContainerTable";
import Inputs from "./Components/Inputs/Inputs";
import { PageLayout } from "./Components/PageLayout";
import FormContainer from "./Components/FormContainer/FormContainer";
import FormColumn from "./Components/FormContainer/FormColumn";

ReactDOM.createRoot(document.getElementById('main')).render(
    
    <React.StrictMode>
        {/* <PageLayout>
        </PageLayout> */}
        <FormContainer name='Formulario'>
            
            <FormColumn>
                <Inputs name="Nombre" placeholder="Ingresa tu nombre"></Inputs>
                <Inputs name="Apellido"></Inputs>
                <Inputs name="Edad"></Inputs>
                <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
                <Inputs name="Email" type="Email"></Inputs>
            
                <Inputs name="Password" type="Password"></Inputs>
                <Inputs name="Cabello" type="Password"></Inputs>
                <Inputs name="Ojos" type="Password"></Inputs>
            </FormColumn>
            
        </FormContainer>
        {/* Vista de residentes, tabla */}
        {/* <ContainerTable></ContainerTable> */}

    </React.StrictMode>
)