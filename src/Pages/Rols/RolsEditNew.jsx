import React, { useState, useEffect } from 'react';
import FormContainer from '../../Components/Forms/FormContainer';
import FormColumn from '../../Components/Forms/FormColumn';
import Inputs from '../../Components/Inputs/Inputs';
import FormButton from '../../Components/Forms/FormButton';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Rols.css';
import { Accordion } from '../../Components/Accordion/Accordion';
import { Checkboxs } from '../../Components/Checkbox/Checkboxs';
import { useParams } from 'react-router-dom';
import InputsSelect from "../../Components/Inputs/InputsSelect";
import { useAuth } from '../../Context/AuthContext';


export const RolsEditNew = () => {
    const { idrole } = useParams();
    console.log(idrole, 'idrole')
    const navigate = useNavigate();
    const { isLoggedIn, user, isLoading } = useAuth();
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
        const permisos = permissionsList.map(permission => ({
            label: permission.permission,
            options: privileges.map(privilege => privilege.privilege),
        }));

        setPermisos(permisos);
    }, [permissionsList, privileges]);




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
    const handleSaveChanges = async (event) => {
        event.preventDefault();
        console.log('Guardando cambios:', editedRols);
        if (editedRols) {
            try {
                const formattedData = {
                    namerole: editedRols?.namerole || '',
                    description: editedRols?.description || '',
                    state: editedRols?.state || '',
                    detailsRols: Object.keys(selectedPermissions).reduce((acc, permiso) => {
                        return [
                            ...acc,
                            ...selectedPermissions[permiso].map(privilege => ({
                                permiso,
                                privilege,
                            })),
                        ];
                    }, []),
                };

                console.log(formattedData, 'formattedData');

                const response = await fetch(`https://apptowerbackend.onrender.com/api/rols/${idrole}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedData),
                });

                if (response.ok) {
                    const updatedRoleResponse = await response.json();
                    setEditedRols(updatedRoleResponse);
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Rol modificado exitosamente',
                        icon: 'success',
                    });
                    navigate('/admin/rols');
                } else {
                    const errorResponse = await response.json();
                    console.error('Error al guardar los cambios:', response.status, errorResponse);
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al modificar el rol',
                        icon: 'error',
                    });
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }
    };



    const [selectedPermissions, setSelectedPermissions] = useState({});

    useEffect(() => {
        if (editedRols) {
            const permissions = {};
            editedRols?.permissionRols?.forEach(pr => {
                const permissionName = permissionsList.find(permission => permission.idpermission === pr.idpermission)?.permission;
                const privilegeName = privileges.find(privilege => privilege.idprivilege === pr.idprivilege)?.privilege;

                if (permissionName && privilegeName) {
                    if (!permissions[permissionName]) {
                        permissions[permissionName] = [];
                    }
                    permissions[permissionName].push(privilegeName);
                }
            });
            setSelectedPermissions(permissions);
        }
    }, [editedRols, permissionsList, privileges]);

    console.log(selectedPermissions, 'selectedPermissions')




    const handleCheckboxChange = (event, permiso, opcion) => {
        const isChecked = event.target.checked;

        setSelectedPermissions(prevPermissions => {
            const updatedPermissions = { ...prevPermissions };

            if (!updatedPermissions[permiso]) {
                updatedPermissions[permiso] = [];
            }

            if (isChecked && !updatedPermissions[permiso].includes(opcion)) {
                updatedPermissions[permiso].push(opcion);
            } else if (!isChecked) {
                updatedPermissions[permiso] = updatedPermissions[permiso].filter(item => item !== opcion);
            }

            return updatedPermissions;
        });
    };




    return (
        <>
            <FormContainer name='Editar Rol' onSubmit={handleSaveChanges} buttons={<FormButton name='Editar' backButton='Cancelar' to='/admin/rols' />}>
                <FormColumn>
                    <Inputs
                        name="Nombre"
                        placeholder='Nombre'
                        value={editedRols?.namerole || ''}
                        onChange={(e) => setEditedRols({ ...editedRols, namerole: e.target.value })}
                    />

                    <InputsSelect
                        id={"select"}
                        options={estado}
                        name={"Estado"}
                        value={editedRols?.state || ''}
                        onChange={(e) => setEditedRols({ ...editedRols, state: e.target.value })} ></InputsSelect>

                </FormColumn>

                <FormColumn>
                    <Inputs
                        name='Descripción'
                        placeholder='Descripción'
                        value={editedRols?.description || ''}
                        onChange={(e) => setEditedRols({ ...editedRols, description: e.target.value })}
                        type='text'
                    />
                </FormColumn>


                <div className='container-accordion'>
                    {permisos?.map((permiso, index) => (
                        <div className='accordion-item' key={index}>
                            <Accordion title={permiso.label}>
                                {permiso.options.map((opcion, optionIndex) => (
                                    <Checkboxs
                                        key={optionIndex}
                                        label={opcion}
                                        onChange={(event) => handleCheckboxChange(event, permiso.label, opcion)}
                                        value={selectedPermissions[permiso.label]?.includes(opcion)}
                                    />
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>


            </FormContainer>
        </>
    )

}