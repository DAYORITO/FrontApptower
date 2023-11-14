import React, { useState } from 'react'
import FormContainer from '../../Components/Forms/FormContainer'
import FormColumn from '../../Components/Forms/FormColumn'
import Inputs from '../../Components/Inputs/Inputs'
import { ContainerHeader } from '../../Components/ContainerHeader/containerHeader'
import FormButton from '../../Components/Forms/FormButton'
import { useFetchpost } from '../../Hooks/useFetch'

export const UsersCreate = () => {
    const [documentType, setDocumentType] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idrole, setRole] = useState("");
    const [document, setDocument] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://apptowerbackend.onrender.com/api/users';
        const data = {
            documentType,
            name,
            email,
            password,
            idrole,
            document,
            lastname,
            phone,
            state: 'Activo'
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
            <FormContainer name='Crear Usuario' buttons={<FormButton name='Crear' backButton='Cancelar' onClick={handleSubmit} />}>
                <FormColumn>
                    <Inputs name="Tipo Documento" value={documentType} onChange={e => setDocumentType(e.target.value)} />
                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} />
                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <Inputs name="Rol" type='number' value={idrole} onChange={e => setRole(e.target.value)} />
                </FormColumn>

                <FormColumn>
                    <Inputs name="Documento" type='number' value={document} onChange={e => setDocument(e.target.value)} />
                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} />
                    <Inputs name="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} />
                </FormColumn>
            </FormContainer>
        </>
    )
}