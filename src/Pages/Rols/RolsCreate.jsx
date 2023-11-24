import React, { useState, useEffect } from 'react';
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

    const [privileges, setPrivileges] = useState([]);
    const [permissionsList, setPermissionsList] = useState([]);
    const [permisos, setPermisos] = useState([]);

    useEffect(() => {
        async function fetchPrivileges() {
            const response = await fetch('https://apptowerbackend.onrender.com/api/privileges');
            const data = await response.json();
            setPrivileges(data.privileges);
        }

        async function fetchPermissions() {
            const response = await fetch('https://apptowerbackend.onrender.com/api/permissions');
            const data = await response.json();
            setPermissionsList(data.permission);
        }

        fetchPrivileges();
        fetchPermissions();
    }, []);


    useEffect(() => {
        const permisos = permissionsList.map(permission => ({
            label: permission.permission,
            options: privileges.map(privilege => privilege.privilege),
        }));

        setPermisos(permisos);
    }, [permissionsList, privileges]);

    const [idrole, setIdrole] = useState(null);

    // Fetch permissions and privileges
    useEffect(() => {
        if (idrole) {
            const fetchPermissionsAndPrivileges = async () => {
                const permissionsResponse = await fetch(`https://apptowerbackend.onrender.com/api/permissions`);
                const privilegesResponse = await fetch(`https://apptowerbackend.onrender.com/api/privileges`);

                const permissionsData = await permissionsResponse.json();
                const privilegesData = await privilegesResponse.json();

                const permissions = permissionsData.permission;
                const privileges = privilegesData.privileges;

                // Fetch role-specific permissions and privileges
                const rolePermissionsResponse = await fetch(`https://apptowerbackend.onrender.com/api/rols/${idrole}/permissions`);
                const rolePermissionsData = await rolePermissionsResponse.json();

                const rolePermissions = rolePermissionsData.permissionRols;

                const permissionsList = rolePermissions.map((rolePermission) => {
                    const permission = permissions.find((permission) => permission.idpermission === rolePermission.idpermission);
                    const privilege = privileges.find((privilege) => privilege.idprivilege === rolePermission.idprivilege);

                    return {
                        permiso: permission.permission,
                        privilege: privilege.privilege,
                    };
                });

                setPermisos(permissionsList);
            };

            fetchPermissionsAndPrivileges();
        }
    }, [idrole]);

    // ... rest of the component ...



    const [testRoles, setTestRoles] = useState([]);


    const navigate = useNavigate();

    const handlesomething = (option, permissions, hola) => {
        console.log(option, 'option')
        console.log(permissions, 'permissions')
        console.log(hola, 'hola')

        const permissionArrive = option;

        const newPermissionToAdd = permissions.map((permiso) => ({
            permiso: option,
            privilege: permiso,
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