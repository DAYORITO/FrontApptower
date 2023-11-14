import React, { useState, useEffect } from 'react';
import FormContainer from '../../Components/Forms/FormContainer';
import FormColumn from '../../Components/Forms/FormColumn';
import Inputs from '../../Components/Inputs/Inputs';
import FormButton from '../../Components/Forms/FormButton';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import './Rols.css';
import { useFetchpost } from '../../Hooks/useFetch';

export const RolsCreate = () => {
    const [namerole, setNamerole] = useState('');
    const [description, setDescrption] = useState('');
    const [selectedOptionsPermission, setSelectedOptionsPermission] = useState({});
    const [selectedOptionsPrivilege, setSelectedOptionsPrivilege] = useState({});
    const [permissions, setPermission] = useState([]);
    const [privileges, setPrivileges] = useState([]);

    const frontendPermissionMap = {
        'Usuarios': 1,
        'Espacios': 2,
        'Residentes': 3,
    };

    const frontendPrivilegesMap = {
        'Listar': 1,
        'Registrar': 2,
        'Editar': 3,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://apptowerbackend.onrender.com/api/rols';

        const permissions = [];
        const privileges = [];

        for (const [label, isChecked] of Object.entries(selectedOptionsPermission)) {
            const backendValue = frontendPermissionMap[label];
            const privilegeValue = frontendPrivilegesMap[label];

            if (isChecked) {
                if (backendValue) {
                    permissions.push(backendValue);
                }
                if (privilegeValue !== undefined) {
                    privileges.push(privilegeValue);
                }
            }
        }

        const data = {
            namerole,
            description,
            permissions,
            privileges,
            state: 'Activo',
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

    const handleCheckboxChange = (label, isChecked) => {
        console.log('Before setSelectedOptions:', selectedOptionsPermission);
        setSelectedOptionsPermission((prevOptions) => ({
            ...prevOptions,
            [label]: isChecked,
        }));
    };

    useEffect(() => {
        const newPermissions = [];
        for (const [label, isChecked] of Object.entries(selectedOptionsPermission)) {
            if (isChecked) {
                const backendValue = frontendPermissionMap[label];
                if (backendValue) {
                    newPermissions.push(backendValue);
                }
            }
        }
        console.log('New Permissions:', newPermissions);
        setPermission(newPermissions);
    }, [selectedOptionsPermission]);


    const handleCheckboxChangeP = (label, isChecked) => {
        console.log('Before setSelectedOptions:', selectedOptionsPrivilege);
        setSelectedOptionsPrivilege((prevOptions) => ({
            ...prevOptions,
            [label]: isChecked,
        }));
    };

    useEffect(() => {
        const newPrivileges = [];
        for (const [label, isChecked] of Object.entries(selectedOptionsPermission)) {
            if (isChecked) {
                const backendValue = frontendPermissionMap[label];
                if (backendValue) {
                    newPermissions.push(backendValue);
                } else {
                    const privilegeValue = frontendPrivilegesMap[label];
                    if (privilegeValue !== undefined) {
                        newPrivileges.push(privilegeValue);
                    }
                }
            }
        }
        console.log('New Permissions:', newPermissions);
        console.log('New Privileges:', newPrivileges);
        setPermission(newPermissions);
        setPrivileges(newPrivileges);
    }, [selectedOptionsPermission]);
    return (
        <>
            <FormContainer
                name='Crear Rol'
                onSubmit={handleSubmit}
                buttons={<FormButton name='Crear' backButton='Cancelar' />}
            >
                <FormColumn>
                    <Inputs name='Nombre Rol' type='text' value={namerole} onChange={(e) => setNamerole(e.target.value)} />
                    <Inputs name='Descripción' value={description} onChange={(e) => setDescrption(e.target.value)} type='text' />
                </FormColumn>

                <FormColumn>
                    <div className='moduls'>
                        <Checkbox
                            label='Usuarios'
                            options={['Listar', 'Registrar', 'Editar']}
                            onCheckboxChange={(isChecked) => handleCheckboxChange('Usuarios', isChecked)}
                        />

                        <Checkbox
                            label='Espacios'
                            options={['Listar', 'Registrar', 'Editar']}
                            onCheckboxChange={(isChecked) => handleCheckboxChange('Espacios', isChecked)}
                        />

                        <Checkbox
                            label='Residentes'
                            options={['Listar', 'Registrar', 'Editar']}
                            onCheckboxChange={(isChecked) => handleCheckboxChange('Residentes', isChecked)}
                        />
                    </div>
                </FormColumn>
            </FormContainer>
        </>
    );
};
