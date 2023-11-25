import React, { useState, useEffect } from 'react';
import FormContainer from '../../Components/Forms/FormContainer';
import FormColumn from '../../Components/Forms/FormColumn';
import Inputs from '../../Components/Inputs/Inputs';
import FormButton from '../../Components/Forms/FormButton';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Rols.css';
import { useParams } from 'react-router-dom';
import InputsSelect from "../../Components/Inputs/InputsSelect";

export const RolsEdit = () => {
    const { idrole } = useParams();
    const [editedRols, setEditedRols] = useState(null);

    useEffect(() => {
        if (idrole) {
            const fetchEditedRole = async () => {
                const response = await fetch(`https://apptowerbackend.onrender.com/api/rols/${idrole}`);
                const data = await response.json();
                setEditedRols(data.rols);
            };

            fetchEditedRole();
        }
    }, [idrole]);


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
        if (permissionsList.length > 0 && privileges.length > 0) {
            const permisos = permissionsList.map(permission => ({
                idPermiso: permission.idpermission,
                label: permission.permission,
                options: privileges.map(privilege => ({
                    idprivilege: privilege.idprivilege,
                    label: privilege.privilege,
                })),
            }));
            setPermisos(permisos);
        }
    }, [permissionsList, privileges]);


    const handleUpdate = async (url, data) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error data:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    };


    const navigate = useNavigate();


    const namerole = editedRols ? editedRols.namerole : '';
    const description = editedRols ? editedRols.description : '';
    const state = editedRols ? editedRols.state : '';

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://apptowerbackend.onrender.com/api/rols';

        const data = {
            namerole,
            description,
            state,

        };


        if (editedRols) {
            const updateUrl = 'https://apptowerbackend.onrender.com/api/rols/'

            try {
                const responseData = await handleUpdate(updateUrl, data);

                Swal.fire({
                    title: 'Éxito',
                    text: 'Rol actualizado exitosamente',
                    icon: 'success',
                }).then(() => {
                    navigate('/admin/rols');
                });
            } catch (error) {
                console.error('Error al actualizar el rol:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error al actualizar el rol',
                    icon: 'error',
                });
            }
        }
    };

    const [selectedPermissions, setSelectedPermissions] = useState({});

    useEffect(() => {
        if (editedRols) {
            const permissions = {};
            editedRols?.permissionRols.forEach(pr => {
                permissions[pr.idpermission] = pr.idprivilege;
            });
            setSelectedPermissions(permissions);
        }
    }, [editedRols]);

    const estado = [
        {
            value: "Activo",
            label: "Activo"
        },
        {
            value: "Inactivo",
            label: "Inactivo"
        }
    ];

    const handleIsChecked = (label) => {
        if (editedRols.permissionRols.find(permission => permission.idpermission === label.idPermiso)) {
            return true
        }
        return false
    }

    const handleOptionMarked = (label) => {
        console.log(label, 'Label marked')
        console.log(editedRols, 'Edited Rols')
        if (label) {
            const permission = editedRols?.permissionRols.map(permission => {
                const { options } = label;
                const { idprivilege } = permission;
                const idpermission = permission.idpermission;
                console.log(idpermission, 'Id Permission')
                const option = options.findIndex(option => option.idprivilege === idprivilege);

                console.log(option, 'Option')
                console.log(options, 'Options Hola')
                return options[option]?.label
            });
            console.log(permission, 'Permission hi')
            return permission
        }
    }

    console.log(selectedPermissions, 'Selected Permissions')

    return (
        <>
            <FormContainer
                name='Editar Rol'
                onSubmit={handleSubmit}
                buttons={<FormButton name='Editar' backButton='Cancelar' to='/admin/rols' />}
            >
                <FormColumn>
                    <Inputs
                        name="Nombre"
                        value={namerole}
                        onChange={(e) => setEditedRols({ ...editedRols, namerole: e.target.value })}
                    />
                    <Inputs
                        name='Descripción'
                        value={description}
                        onChange={(e) => setEditedRols({ ...editedRols, description: e.target.value })}
                        type='text'
                    />
                    <InputsSelect id={"select"} options={estado} name={"Estado"} value={editedRols?.state || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, state: e.target.value })}></InputsSelect>
                </FormColumn>

                <FormColumn>
                    <div className='moduls'>

                        {permisos?.map(permiso => (
                            <Checkbox
                                key={permiso.label}
                                label={permiso.label}
                                options={permiso.options.map(option => option.label)}
                                value={selectedPermissions[permiso.label]}
                                isCheckedAny={() => handleIsChecked(permiso)}
                                isOptionMarked={() => handleOptionMarked(permiso)}
                                onCheckboxChange={value => {
                                    setSelectedPermissions(prev => ({
                                        ...prev,
                                        [permiso.label]: value
                                    }));
                                }}
                            />
                        ))}


                    </div>
                </FormColumn>
            </FormContainer>
        </>
    );
};