import React, { useEffect, useState } from 'react'
import { useFetchget, useFetchput } from '../../../Hooks/useFetch'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { createPortal } from "react-dom";
import { ModalContainer, Modal } from "../../../Components/Modals/ModalTwo";
import Inputs from "../../../Components/Inputs/Inputs";
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import Swal from 'sweetalert2';
import { idToPrivilegesName, idToPermissionName } from '../../../Hooks/permissionRols'
import Cookies from 'js-cookie';


export const Watchman = () => {
    const [showModal, setShowModal] = useState(false);
    const [editedWatchman, setEditedWatchman] = useState(null);
    const [watchmanData, setWatchmanData] = useState([]);
    const [allowedPermissions, setAllowedPermissions] = useState([]);
    const token = Cookies.get('token');

    console.log(allowedPermissions, 'allowedPermissions Aleja')
    // console.log(allowedPermissions['Vigilantes'], 'allowedPermissions Vigilante');
    // console.log(allowedPermissions['Vigilantes']?.includes('Crear'), 'allowedPermissions Vigilante Crear');



    const { data, load, error } = useFetchget('watchman')
    const { error: putError, load: putLoad, } = useFetchput('watchman', editedWatchman);
    console.log(data.watchman)


    useEffect(() => {
        if (token) {
            fetchUserPrivilegeAndPermission(token);
        }
    }, [token]);


    //Consulta privilegios 
    const fetchUserPrivilegeAndPermission = async (token) => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/privilegefromrole', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user privileges');
            }

            const data = await response.json();
            console.log(data, 'data');
            console.log('Allowed Permissions hi:', data.privileges);

            if (data && data.privileges && Array.isArray(data.privileges)) {
                const allowed = {};
                data.privileges.forEach(({ idpermission, idprivilege }) => {
                    const permissionName = idToPermissionName[idpermission];
                    const privilegeName = idToPrivilegesName[idprivilege];

                    if (!allowed[permissionName]) {
                        allowed[permissionName] = [];
                    }
                    allowed[permissionName].push(privilegeName);
                });

                setAllowedPermissions(allowed);
            }
        } catch (error) {
            console.error('Error fetching user permissions:', error);
        }
    };



    const handleModal = (watchman) => {
        setEditedWatchman(watchman);
        console.log(watchman, 'row')
        setShowModal(true)

    }

    useEffect(() => {
        if (data && data.watchman) {
            setWatchmanData(data.watchman);
        }
    }, [data]);

    useEffect(() => {
        if (!putLoad && !putError) {
            setShowModal(false);
        }
    }, [putLoad, putError]);

    const handleSaveChanges = async () => {
        console.log('Guardando cambios:', editedWatchman);

        if (editedWatchman) {
            try {

                const formattedWatchman = {
                    ...editedWatchman,
                    dateOfbirth: editedWatchman.dateOfbirth ? new Date(editedWatchman.dateOfbirth).toISOString() : null
                };

                const response = await fetch('http://localhost:3000/api/watchman', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedWatchman),
                });

                if (response.ok) {
                    const updatedWatchman = watchmanData.map(watchman => {
                        if (watchman.idwatchman === editedWatchman.idwatchman) {
                            return editedWatchman;
                        }
                        return watchman;
                    });
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Vigilante modificado exitosamente',
                        icon: 'success',
                    })
                    setWatchmanData(updatedWatchman);
                    setEditedWatchman(null);
                    setShowModal(false);
                } else {
                    const errorResponse = await response.json();
                    console.error('Error al guardar los cambios:', response.status, errorResponse);
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al modificar vigilante',
                        icon: 'error',
                    });
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }
    };

    const opciones = [
        {
            value: "CC",
            label: "CC"
        },
        {
            value: "TI",
            label: "TI"
        },
        {
            value: "CE",
            label: "CE"
        }
    ];


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


    const [search, setSearch] = useState('');
    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)
    }
    let filterData = [];

    if (!search) {
        filterData = watchmanData;
    } else {
        filterData = watchmanData.filter((dato) =>
            (dato.name && dato.name.toLowerCase().includes(search.toLowerCase())) ||
            (dato.lastname && dato.lastname.toLowerCase().includes(search.toLowerCase())) ||
            (dato.document && dato.document.toLowerCase().includes(search.toLowerCase())) ||
            (dato.email && dato.email.toLowerCase().includes(search.toLowerCase())) ||
            (dato.phone && dato.phone.toLowerCase().includes(search.toLowerCase()))
        );
    }

    return (
        <>
            <ContainerTable title='Vigilantes'>
                <DropdownExcel />
                <SearchButton value={search} onChange={searcher} />

                {allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Crear') && (
                    <ButtonGoTo
                        value='Crear Vigilante'
                        href='/admin/users/create'
                    />
                )}


                <TablePerson>
                    <Thead>
                        <Th name={'Información Vigilante'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th></Th>


                    </Thead>
                    <Tbody>

                        {filterData?.map(watchman => (
                            <Row
                                key={watchman.idwatchman}
                                docType={watchman.documentType}
                                docNumber={watchman.document}
                                name={watchman.namewatchman}
                                lastName={watchman.lastnamewatchman}
                                phone={watchman.phone}
                                email={watchman.email}
                                status={watchman.state}


                                to={`details/${watchman.idwatchman}`}
                            >
                                {allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Editar') && (
                                    <Actions accion='Editar' onClick={(e) => {
                                        e.preventDefault();
                                        handleModal(watchman);
                                    }} />
                                )}

                            </Row>
                        ))}
                    </Tbody>
                </TablePerson>
            </ContainerTable>

            {showModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowModal}>
                            <Modal
                                onClick={handleSaveChanges}
                                showModal={setShowModal}
                                title={"Editar Vigilante"}
                            >

                                <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedWatchman?.documentType || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, documentType: e.target.value })} ></InputsSelect>
                                <Inputs name="Documento" value={editedWatchman?.document || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, document: e.target.value })} readonly={true} inputStyle={{ color: '#E3E3E3' }} />
                                <Inputs name="Nombre" value={editedWatchman?.namewatchman || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, namewatchman: e.target.value })} />
                                <Inputs name="Apellido" value={editedWatchman?.lastnamewatchman || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, lastnamewatchman: e.target.value })} />
                                <Inputs name="Correo" value={editedWatchman?.email || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, email: e.target.value })} />
                                <Inputs name="Teléfono" value={editedWatchman?.phone || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, phone: e.target.value })} />

                                <Inputs
                                    type='date'
                                    name="Fecha Nacimiento"
                                    value={editedWatchman?.dateOfbirth ? new Date(editedWatchman.dateOfbirth).toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        const selectedDate = e.target.value;
                                        setEditedWatchman({ ...editedWatchman, dateOfbirth: selectedDate });
                                    }}
                                />

                                <InputsSelect id={"select"} options={estado} name={"Estado"} value={editedWatchman?.state || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, state: e.target.value })}></InputsSelect>


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}
        </>


    )
}
