import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchpost } from '../../../Hooks/useFetch';
import FormContainer from '../../../Components/Forms/FormContainer';
import FormColumn from '../../../Components/Forms/FormColumn';
import Inputs from '../../../Components/Inputs/Inputs';
import FormButton from '../../../Components/Forms/FormButton';
import Swal from 'sweetalert2';
import InputsSelect from "../../../Components/Inputs/InputsSelect";

export const UsersCreate = () => {
    const [documentType, setDocumentType] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [namerole, setRole] = useState("");
    const [document, setDocument] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fetchRoles = async () => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/rols');
            if (!response.ok) {
                throw new Error('Error al obtener los roles');
            }
            const data = await response.json();
            const rolesData = data.rols || [];
            return rolesData;
        } catch (error) {
            console.error('Error al obtener los roles:', error);
            return [];
        }
    };


    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRolesData = async () => {
            const rolesData = await fetchRoles();
            setRoles(rolesData);
        };
        fetchRolesData();
    }, []);



    const navigate = useNavigate();

    const opciones = [
        {
            value: "CC",
            label: "CC"
        },
        {
            value: "CE",
            label: "CE"
        }
    ];

    const opcionesRols = roles.map(rol => ({
        value: rol.idrole.toString(),
        label: rol.namerole
    }));


    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'users';
        const data = {
            documentType,
            name,
            email,
            password,
            idrole: namerole,
            document,
            lastname,
            phone
        };

        console.log('Data:', data);

        const { response, error } = await useFetchpost(url, data);

        if (response) {
            console.log('Response:', response);
            Swal.fire({
                title: 'Éxito',
                text: 'Usuario creado exitosamente',
                icon: 'success',
            }).then(() => {

                navigate('/admin/users');
            });
        }

        if (error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error al crear usuario',
                icon: 'error',
            });
        }
        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
            });
            return;
        }
    };
    return (
        <>
            <FormContainer name='Crear Usuario' buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/users/' onClick={handleSubmit} />}>
                <FormColumn>
                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} onChange={e => setDocumentType(e.target.value)} value={documentType}></InputsSelect>
                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} />
                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <InputsSelect
                        id="select"
                        options={opcionesRols}
                        value={namerole}
                        name="Rol"
                        onChange={e => setRole(e.target.value)}
                    ></InputsSelect>

                </FormColumn>

                <FormColumn>
                    <Inputs name="Documento" type='number' value={document} onChange={e => setDocument(e.target.value)} />
                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} />
                    <Inputs name="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} />
                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />


                </FormColumn>
            </FormContainer>
        </>
    );
};
