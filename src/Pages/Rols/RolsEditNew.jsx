import React, { useState, useEffect, useRef } from 'react';
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
import { regexName } from '../../Hooks/regex';


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

    const [isNameRoleTaken, setIsNameRoleTaken] = useState(false);
    const originalRoleName = useRef('');


    useEffect(() => {
        if (editedRols?.namerole && originalRoleName.current === '') {
            originalRoleName.current = editedRols.namerole;
        }
    }, [editedRols?.namerole]);


    useEffect(() => {
        fetch(`http://localhost:3000/api/rols/namerole/${editedRols?.namerole}`)
            .then(response => response.json())
            .then(data => {
                setIsNameRoleTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [editedRols?.namerole]);

    const [shouldValidate, setShouldValidate] = useState(false);

    const handleSaveChanges = async (event) => {
        event.preventDefault();

        if (!editedRols?.namerole || !editedRols?.description) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, Ingrese todos los campos requeridos',
                icon: 'error',
            });
            setShouldValidate(true);
            return;
        }

        if (editedRols?.namerole !== originalRoleName.current && isNameRoleTaken) {
            Swal.fire({
                title: 'Error',
                text: 'Este nombre de rol se encuentra registrado',
                icon: 'error',
            });
            return;
        }


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



                const response = await fetch(`http://localhost:3000/api/rols/${idrole}`, {
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

    const handleDescriptionChange = (e) => {
        if (e.target.value.length <= 30) {
            setEditedRols({ ...editedRols, description: e.target.value });
        }
    };

    const [isNameRoleInvalid, setIsNameRoleInvalid] = useState(false);

    const handleNameRole = (e) => {
        const value = e.target.value;
        if (regexName.test(value) && value.length <= 20) {
            setEditedRols({ ...editedRols, namerole: value });
            setIsNameRoleInvalid(false);
        } else {
            setIsNameRoleInvalid(true);
        }
    };


    return (
        <>
            <FormContainer name='Editar Rol' onSubmit={handleSaveChanges} buttons={<FormButton name='Editar' backButton='Cancelar' to='/admin/rols' />}>
                <FormColumn>
                    <Inputs
                        name="Nombre Rol"
                        placeholder='Nombre Rol'
                        value={editedRols?.namerole || ''}
                        onChange={handleNameRole}
                        validate={shouldValidate}
                        required={true}
                        // editedRols?.namerole !== originalRoleName.current && isNameRoleTaken ? "Este rol ya esta registrado" :
                        errorMessage={isNameRoleInvalid ? "El nombre no puede contener números ni caracteres especiales" : null}
                        inputStyle={editedRols?.namerole !== originalRoleName.current && isNameRoleTaken ? { borderColor: 'red' } : null}
                    />

                    <InputsSelect
                        inputStyle={{ marginBottom: '20px' }}
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
                        onChange={handleDescriptionChange}
                        type='text'
                        validate={shouldValidate}
                        required={true}
                    />
                </FormColumn>


                <div className='container-accordion'>
                    {permisos?.map((permiso, index) => (
                        <div className='accordion-item' key={index}>
                            <Accordion title={permiso.label} isOpen={selectedPermissions[permiso.label]?.length > 0} >
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