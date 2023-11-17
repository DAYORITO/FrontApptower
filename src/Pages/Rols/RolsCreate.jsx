import React, { useState } from 'react';
import FormContainer from '../../Components/Forms/FormContainer';
import FormColumn from '../../Components/Forms/FormColumn';
import Inputs from '../../Components/Inputs/Inputs';
import FormButton from '../../Components/Forms/FormButton';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import { useFetchpost } from '../../Hooks/useFetch';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Rols.css';

export const RolsCreate = () => {
    const [testRoles, setTestRoles] = useState([]);

    const permisos = [
        {
            label: 'Usuarios',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Espacios',
            options: ['Listar', 'Registrar', 'Editar'],
        },

        {
            label: 'Vigilantes',
            options: ['Listar', 'Registrar', 'Editar'],
        },

        {
            label: 'Residentes',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Propietarios',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Apartamentos',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Ingresos',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Visitantes',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Vehiculos',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Parqueaderos',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Reservas',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Multas',
            options: ['Listar', 'Registrar', 'Editar'],
        },
        {
            label: 'Notificaciones',
            options: ['Listar', 'Registrar', 'Editar'],
        }
    ]

    const navigate = useNavigate();

    const handlesomething = (option, permissions, hola) => {
        console.log(option, 'option')
        console.log(permissions, 'permissions')
        console.log(hola, 'hola')
        const permissionArrive = option == 'Vigilantes' ? 'watchman' : option == 'Espacios' ? 'spaces' : 'Residentes';
        const newPermissionToAdd = permissions.map((permiso) => ({
            permiso: option == 'Vigilantes' ? 'watchman' : option == 'Espacios' ? 'spaces' : 'Residentes',
            privilege: permiso == 'Listar' ? 'get' : permiso == 'Registrar' ? 'post' : 'put',
        }));
        console.log(newPermissionToAdd, 'newPermissionToAdd')
        const newPermisosFilter = testRoles.filter((permiso) => permiso.permiso !== permissionArrive);
        const newPermissions = [...newPermisosFilter, ...newPermissionToAdd];
        console.log(newPermissions, 'newPermissions')
        setTestRoles(newPermissions);
        console.log(testRoles, 'testRoles')
    }
    const [namerole, setNamerole] = useState('');
    const [description, setDescrption] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        // const url = 'http://localhost:3000/api/rols';
        const url = 'https://apptowerbackend.onrender.com/api/rols';

        const data = {
            namerole,
            description,
            detailsRols: testRoles,

        };

        console.log('Data:', data);
        console.log('This is a test: ', testRoles)

        const { response, error } = await useFetchpost(url, data);

        if (response) {
            console.log('Response:', response);
            Swal.fire({
                title: 'Éxito',
                text: 'Rol creado exitosamente',
                icon: 'success',
            }).then(() => {
                navigate('/admin/rols');
            });
        }

        if (error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error al crear rol',
                icon: 'error',
            });
        }
    };

    return (
        <>
            <FormContainer
                name='Crear Rol'
                onSubmit={handleSubmit}
                buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/rols' />}
            >
                <FormColumn>
                    <Inputs name='Nombre Rol' type='text' value={namerole} onChange={(e) => setNamerole(e.target.value)} />
                    <Inputs
                        name='Descripción'
                        id='description'
                        value={description}
                        onChange={(e) => setDescrption(e.target.value)}
                        type='text'
                    />
                </FormColumn>

                <FormColumn>
                    <div className='moduls'>

                        {
                            permisos.map((permiso, index) => {
                                return (
                                    <Checkbox
                                        key={index}
                                        label={permiso.label}
                                        options={permiso.options}
                                        onCheckboxChange={(hola, optionsSelected) => {
                                            handlesomething(permiso.label, optionsSelected, hola)
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                </FormColumn>
            </FormContainer>
        </>
    );
};