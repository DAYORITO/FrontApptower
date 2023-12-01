import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchpost } from '../../../Hooks/useFetch';
import FormContainer from '../../../Components/Forms/FormContainer';
import FormColumn from '../../../Components/Forms/FormColumn';
import Inputs from '../../../Components/Inputs/Inputs';
import FormButton from '../../../Components/Forms/FormButton';
import Swal from 'sweetalert2';
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import { docTypes, residentsTypes, sexs } from '../../../Hooks/consts.hooks'
import { Uploader } from '../../../Components/Uploader/Uploader'

export const UsersCreate = () => {
    const [documentType, setDocumentType] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idrole, setIdRole] = useState("");
    console.log(idrole, 'Hola soy id');


    const [namerole, setRole] = useState("");
    console.log(namerole, 'Hola soy name');
    const [document, setDocument] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showForm, setShowForm] = useState(false);

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
            idrole,
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
    }
    return (
        <>
            <FormContainer
                name='Crear Usuario'
                buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/users/' onClick={handleSubmit} />}
            >

                <InputsSelect
                    id="select"
                    options={opcionesRols}
                    value={idrole}
                    name="Rol"
                    onChange={(e) => {
                        setIdRole(e.target.value);
                        const selectedRole = roles.find(rol => rol.idrole === Number(e.target.value));
                        setRole(selectedRole ? selectedRole.namerole : "");
                        setShowForm(true);
                    }}
                ></InputsSelect>

                {showForm && (
                    <>
                        {namerole === 'Residente' || namerole === 'Residentes' ? (
                            <>
                                <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf' />

                                <FormColumn>
                                    <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"}
                                    ></InputsSelect>
                                    <Inputs name="Nombre" type='text'></Inputs>
                                    <Inputs name="Correo" type="email" ></Inputs>
                                    <InputsSelect id={"select"} options={residentsTypes} name={"Tipo residente"}></InputsSelect>
                                    <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                                </FormColumn>


                                <FormColumn>
                                    <Inputs name="Numero de documento" placeholder="1000000007"></Inputs>
                                    <Inputs name="Apellido" type='text'></Inputs>
                                    <Inputs name="Numero de telefono" type='number'></Inputs>
                                    <InputsSelect id={"select"} ></InputsSelect>
                                    <InputsSelect id={"select"} options={sexs} name={"Sexo"} onChange={e => setSex(e.target.value)}></InputsSelect>
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />


                                </FormColumn>
                            </>
                        ) : namerole === 'Vigilante' || namerole === 'Vigilantes' || namerole === 'Seguridad' ? (
                            <>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={documentType} onChange={e => setDocumentType(e.target.value)}></InputsSelect>
                                    <Inputs name="Nombre" type='text'></Inputs>
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} ></Inputs>

                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />


                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Documento" type='number' value={document} onChange={e => setDocument(e.target.value)} ></Inputs>
                                    <Inputs name="Apellido" type='text'></Inputs>
                                    <Inputs name="Teléfono" type='number' value={phone} onChange={e => setPhone(e.target.value)}></Inputs>
                                    <Inputs name="Fecha Nacimiento" type="date"></Inputs>
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                </FormColumn>

                            </>
                        ) : namerole === 'Admin' || namerole === 'Administrador' || namerole === 'Super Administrador' ? (

                            <>

                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} onChange={e => setDocumentType(e.target.value)} value={documentType}></InputsSelect>
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} />
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Documento" type='number' value={document} onChange={e => setDocument(e.target.value)} />
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} />
                                    <Inputs name="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} />
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                </FormColumn>
                            </>
                        ) : null}
                    </>
                )}

            </FormContainer>
        </>
    );
};