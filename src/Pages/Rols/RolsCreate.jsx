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

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const url = 'http://localhost:3000/api/rols';
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


    return (
        <>
            <FormContainer name='Crear Rol' onSubmit={handleSubmit} buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/rols' />}>
                <FormColumn>
                    <Inputs name='Nombre Rol' value={namerole} onChange={(e) => setNamerole(e.target.value)} type='text' ></Inputs>
                </FormColumn>

                <FormColumn>
                    <Inputs name='Descripción' value={description}
                        onChange={(e) => setDescrption(e.target.value)} type='text' ></Inputs>
                </FormColumn>


                <div className='container-accordion'>
                    {permisos.map((permiso, index) => (
                        console.log(permiso, 'permiso'),
                        <div className='accordion-item' key={index}>
                            <Accordion title={permiso.label}>
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