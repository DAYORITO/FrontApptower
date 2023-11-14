import React, { useState } from 'react'
import FormContainer from '../../Components/Forms/FormContainer'
import FormColumn from '../../Components/Forms/FormColumn'
import Inputs from '../../Components/Inputs/Inputs'
import { ContainerHeader } from '../../Components/ContainerHeader/containerHeader'
import FormButton from '../../Components/Forms/FormButton'
import { useFetchpost } from '../../Hooks/useFetch'

export const WatchmanCreate = () => {
    const [documentType, setDocumentType] = useState("");
    const [namewatchman, setNamewatchman] = useState("");
    const [email, setEmail] = useState("");
    const [document, setDocument] = useState("");
    const [lastnamewatchman, setLastnamewatchman] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://apptowerbackend.onrender.com/api/watchman';
        const data = {
            documentType,
            namewatchman,
            email,
            document,
            lastnamewatchman,
            phone,
            state: 'Activo',
            dateOfBirth
        };

        console.log('Data:', data);

        const { response, error } = await useFetchpost(url, data);

        if (response) {
            console.log('Response:', response);
        }

        if (error) {
            console.log('Hubo un error');
        }
    };

    return (
        <>

            <FormContainer name='Crear Vigilante' buttons={<FormButton name='Crear' backButton='Cancelar' onClick={handleSubmit} />}>
                <FormColumn>
                    <Inputs name="Tipo Documento" type='text' value={documentType} onChange={e => setDocumentType(e.target.value)}></Inputs>
                    <Inputs name="Nombre" type='text' value={namewatchman} onChange={e => setNamewatchman(e.target.value)}></Inputs>
                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} ></Inputs>
                    <Inputs name="Fecha Nacimiento" type="text" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}></Inputs>

                </FormColumn>

                <FormColumn>
                    <Inputs name="Documento" type='number' value={document} onChange={e => setDocument(e.target.value)} ></Inputs>
                    <Inputs name="Apellido" type='text' value={lastnamewatchman} onChange={e => setLastnamewatchman(e.target.value)}></Inputs>
                    <Inputs name="Teléfono" type='number' value={phone} onChange={e => setPhone(e.target.value)}></Inputs>

                </FormColumn>


            </FormContainer>
        </>
    )
}

