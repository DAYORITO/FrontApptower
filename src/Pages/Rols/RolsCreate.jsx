import React, { useState, useEffect } from 'react';
import FormContainer from '../../Components/Forms/FormContainer';
import FormColumn from '../../Components/Forms/FormColumn';
import Inputs from '../../Components/Inputs/Inputs';
import FormButton from '../../Components/Forms/FormButton';
import { useFetchpost } from '../../Hooks/useFetch';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Rols.css';
import { Accordion } from '../../Components/Accordion/Accordion';
import { Checkboxs } from '../../Components/Checkbox/Checkboxs';
import { regexName } from '../../Hooks/regex';


export const RolsCreate = () => {
    const [privileges, setPrivileges] = useState([]);
    const [permissionsList, setPermissionsList] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

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


    const navigate = useNavigate();



    const [namerole, setNamerole] = useState('');
    const [description, setDescrption] = useState('');

    const handleCheckboxChange = (event, permiso, opcion) => {
        if (event.target.checked) {
            setSelectedCheckboxes(prev => [...prev, { permiso, opcion }]);
            console.log(selectedCheckboxes, 'selectedCheckboxes')
        } else {
            setSelectedCheckboxes(prev => prev.filter(item => item.permiso !== permiso || item.opcion !== opcion));
            console.log(selectedCheckboxes, 'selectedCheckboxes')
        }
    };

    const [isNameRoleTaken, setIsNameRoleTaken] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/api/rols/namerole/${namerole}`)
            .then(response => response.json())
            .then(data => {
                setIsNameRoleTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [namerole]);



    const [shouldValidate, setShouldValidate] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!namerole || !description) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, rellene todos los campos requeridos',
                icon: 'error',
            });
            //Activa la validacion de los campos cuando se envia el formulario
            setShouldValidate(true);
            return;
        }

        if (selectedCheckboxes.length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, seleccione al menos un permiso',
                icon: 'error',
            });
            return;
        }

        if (isNameRoleTaken) {
            Swal.fire({
                title: 'Error',
                text: 'Este nombre de rol se encuentra registrado',
                icon: 'error',
            });
            return;
        }
        const url = 'rols';

        const data = {
            namerole,
            description,
            detailsRols: selectedCheckboxes.map(({ permiso, opcion }) => ({ permiso: permiso, privilege: opcion })),
        };
        console.log('Data:', data);

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

    const handleDescriptionChange = (e) => {
        if (e.target.value.length <= 30) {
            setDescrption(e.target.value);
        }
    };

    const [isNameRoleInvalid, setIsNameRoleInvalid] = useState(false);

    const handleNameRole = (e) => {
        const value = e.target.value;
        if (regexName.test(value) && value.length <= 20) {
            setNamerole(value);
            setIsNameRoleInvalid(false);
        } else {
            setIsNameRoleInvalid(true);
        }
    };


    return (
        <>
            <FormContainer name='Crear Rol' onSubmit={handleSubmit} buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/rols' />}>
                <FormColumn>
                    <Inputs
                        name='Nombre Rol'
                        value={namerole}
                        onChange={handleNameRole}
                        type='text'
                        required={true}
                        validate={shouldValidate}
                        errorMessage={isNameRoleTaken ? "Este rol ya esta registrado" : isNameRoleInvalid ? "No puede contener números ni caracteres especiales" : null}
                    />
                </FormColumn>

                <FormColumn>
                    <Inputs
                        name='Descripción'
                        value={description}
                        onChange={handleDescriptionChange}
                        type='text'
                        validate={shouldValidate}
                        required={true}
                        inputStyle={description.length > 30 ? { borderColor: 'red' } : null}

                    />
                </FormColumn>


                <div className='container-accordion'>
                    {permisos.map((permiso, index) => (
                        console.log(permiso, 'permiso'),
                        <div className='accordion-item' key={index}>
                            <Accordion title={permiso.label}  >
                                {permiso.options.map((opcion, optionIndex) => (
                                    console.log(opcion, 'opcion'),
                                    <Checkboxs
                                        key={optionIndex}
                                        label={opcion}
                                        onChange={(event) => handleCheckboxChange(event, permiso.label, opcion)}
                                        value={selectedCheckboxes.some(item => item.permiso === permiso.label && item.opcion === opcion)}
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