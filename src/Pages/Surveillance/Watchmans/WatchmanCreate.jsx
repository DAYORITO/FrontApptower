import React, { useState } from 'react'
import { useFetchpost } from '../../../Hooks/useFetch'
import FormContainer from '../../../Components/Forms/FormContainer'
import FormColumn from '../../../Components/Forms/FormColumn'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import InputsSelect from "../../../Components/Inputs/InputsSelect";

export const WatchmanCreate = () => {
    const [documentType, setDocumentType] = useState("");
    const [namewatchman, setNamewatchman] = useState("");
    const [email, setEmail] = useState("");
    const [document, setDocument] = useState("");
    const [lastnamewatchman, setLastnamewatchman] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const navigate = useNavigate();

    const opciones = [
        {
            value: "CC",
            label: "CC"
        },
        {
            value: "TI",
            label: "TI"
        },
        {
            value: "CE",
            label: "CE"
        }
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://apptowerbackend.onrender.com/api/watchman';
        // const url = 'http://localhost:3000/api/watchman';
        const data = {
            documentType,
            namewatchman,
            email,
            document,
            lastnamewatchman,
            phone,
            dateOfBirth
        };

        console.log('Data:', data);

        const { response, error } = await useFetchpost(url, data);



        if (response) {
            console.log('Response:', response);
            Swal.fire({
                title: 'Éxito',
                text: 'Vigilante creado exitosamente',
                icon: 'success',
            }).then(() => {

                navigate('/admin/watchman');
            });
        }

        if (error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error al crear vigilante',
                icon: 'error',
            });
        }
    };

    return (
        <>

            <FormContainer name='Crear Vigilante' buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/watchman/' onClick={handleSubmit} />}>
                <FormColumn>
                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={documentType} onChange={e => setDocumentType(e.target.value)}></InputsSelect>
                    <Inputs name="Nombre" type='text' value={namewatchman} onChange={e => setNamewatchman(e.target.value)}></Inputs>
                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} ></Inputs>
                    <Inputs name="Fecha Nacimiento" type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}></Inputs>

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

