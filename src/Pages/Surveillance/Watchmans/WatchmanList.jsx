import React, { useEffect, useState, useRef } from 'react'
import { useAllowedPermissionsAndPrivileges, useFetchget, useFetchput } from '../../../Hooks/useFetch'
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
import Select2 from '../../../Components/Inputs/Select2';
import { usePaginator, filter, postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Paginator } from '../../../Components/Paginator/Paginator'
import { Spinner } from 'react-bootstrap'
import dataNotFoundImg from "../../../assets/dataNotFound.jpg"




export const Watchman = () => {
    const [showModal, setShowModal] = useState(false);
    const [editedWatchman, setEditedWatchman] = useState(null);
    const [watchmanData, setWatchmanData] = useState([]);
    const { data, load: loading, error } = useFetchget('watchman')
    const { error: putError, load: putLoad, } = useFetchput('watchman', editedWatchman);
    const [errors, setErrors] = useState([{}]);

    const birthDate = new Date(editedWatchman?.user?.birthday);


    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }


    //Consulta Privilegios

    const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);

    const { data: { enterpriseSecurity } = {} } = useFetchget('enterpricesecurity');

    useEffect(() => {
        if (data && data.watchman) {
            setWatchmanData(data.watchman);
        }
    }, [data]);

    const handleModal = async (watchman) => {
        if (watchman.idEnterpriseSecurity) {
            setEditedWatchman({
                idrole: watchman.user.idrole,
                ...watchman,
                idEnterpriseSecurity: watchman.idEnterpriseSecurity
            });
            setShowModal(true);
        } else {
            console.error('ID de Empresa no encontrado en el vigilante:', watchman);
        }
    }


    const [isDocumentTaken, setIsDocumentTaken] = useState(false);
    const [isEmailTaken, setIsEmailTaken] = useState(false);

    const originalDocument = useRef('');
    const originalEmail = useRef('');




    useEffect(() => {
        if (editedWatchman?.user?.document && originalDocument.current === '') {
            originalDocument.current = editedWatchman?.user?.document;
        }
    }, [editedWatchman?.user?.document]);

    useEffect(() => {
        if (editedWatchman?.user?.email && originalEmail.current === '') {
            originalEmail.current = editedWatchman?.user?.email;
        }
    }, [editedWatchman?.user?.email]);



    useEffect(() => {
        fetch(`https://apptowerbackend.onrender.com/api/users/document/${editedWatchman?.user?.document}`)
            .then(response => response.json())
            .then(data => {
                setIsDocumentTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [editedWatchman?.user?.document]);


    useEffect(() => {
        fetch(`https://apptowerbackend.onrender.com/api/users/email/${editedWatchman?.user?.email}`)
            .then(response => response.json())
            .then(data => {
                setIsEmailTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [editedWatchman?.user?.email]);



    const [shouldValidate, setShouldValidate] = useState(false);

    const handleSaveChanges = async () => {
        console.log('Guardando cambios:', editedWatchman);

        if (editedWatchman) {
            try {

                const formattedWatchman = {
                    ...editedWatchman,
                    dateOfbirth: editedWatchman.dateOfbirth ? new Date(editedWatchman.dateOfbirth).toISOString() : null
                };


                if (age < 18) {
                    Swal.fire({
                        title: 'Error',
                        text: 'El vigilante debe ser mayor de edad',
                        icon: 'error',
                    });
                    return;
                }


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
                    console.error('Error al procesar la solicitud:', errorResponse);
                    setErrors(errorResponse);
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


    // Buscador
    const [search, setSearch] = useState('');
    const searcher = (e) => {
        setSearch(e.target.value)
    }
    let filterData = [];

    if (!search) {
        filterData = watchmanData;
    } else {
        filterData = watchmanData.filter((dato) => {
            const searchTrimmed = search.trim().toLowerCase();
            const fullName = `${dato?.user?.name} ${dato?.user?.lastName}`.toLowerCase();
            return fullName.includes(searchTrimmed) ||
                (dato?.user?.document && dato.user.document.toLowerCase().includes(searchTrimmed)) ||
                (dato?.user?.email && dato.user.email.toLowerCase().includes(searchTrimmed)) ||
                (dato?.user?.phone && dato.user.phone.toLowerCase().includes(searchTrimmed));
        });
    }




    // Traer empresas de seguridad
    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')
    const [selectedEnterprice, setSelectedEnterprice] = useState(null);


    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity
        ? dataEnterprice.enterpriseSecurity
            .filter(enterprice => enterprice.state === "Activo")
            .map(enterprice => ({
                value: enterprice.idEnterpriseSecurity,
                label: enterprice.nameEnterprice
            }))
        : [];




    const selectedEnterpriceOption = selectedEnterprice || enterpriceOptions.find(option => option.value === editedWatchman?.idEnterpriseSecurity);


    useEffect(() => {
        if (editedWatchman) {
            const initialEnterprice = enterpriceOptions.find(option => option.value === editedWatchman.idEnterpriseSecurity);
            setSelectedEnterprice(initialEnterprice);
        }
    }, [editedWatchman, enterpriceOptions]);

    const handleEnterpriceSecurity = (selectedEnterprice) => {
        setSelectedEnterprice(selectedEnterprice);
        setEditedWatchman({ ...editedWatchman, idEnterpriseSecurity: selectedEnterprice.value });
        setErrors([])
    };


    //paginator

    const { totalPages, currentPage, nextPage, previousPage, filteredData: WatchmanInfo } = usePaginator(filterData, 5);

    return (
        <>

            <ContainerTable
                title='Vigilantes'
                dropdown={<DropdownExcel table='guardShiftters' />}
                search={<SearchButton value={search} onChange={searcher} />}
                buttonToGo={
                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Crear')
                        ? <ButtonGoTo value='Crear Vigilante' href='/admin/watchman/create' />
                        : null
                }
                showPaginator={
                    watchmanData && watchmanData.length > 0 ?
                        <Paginator
                            totalPages={totalPages}
                            currentPage={currentPage}
                            nextPage={nextPage}
                            previousPage={previousPage}
                        /> : null
                }
            >

                <TablePerson>
                    <Thead>
                        <Th name={'Información Vigilante'}></Th>
                        <Th name={'Empresa Aliada'}></Th>
                        <Th name={'Teléfono'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th name={'Acciones'}></Th>

                    </Thead>
                    <Tbody>

                        {
                            loading ?
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', position: 'fixed', left: '59%', top: '45%', transform: 'translate(-50%, -24%)' }}>
                                    <Spinner style={{ color: 'blue' }} />
                                </div>
                                : watchmanData.length == 0 || currentPage >= totalPages ?

                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', marginLeft: '10vw' }}>
                                        <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" />
                                    </div>
                                    :

                                    WatchmanInfo().map(watchman => {
                                        const enterprice = enterpriseSecurity?.find(enterprice => enterprice.idEnterpriseSecurity === watchman.idEnterpriseSecurity);
                                        const enterpriceName = enterprice ? enterprice.nameEnterprice : 'Empresa no encontrada';

                                        return (
                                            <Row
                                                icon='shield'
                                                key={watchman.idwatchman}
                                                A3={watchman.user ? watchman.user.docType : 'Desconocido'}
                                                A4={watchman.user ? watchman.user.document : 'Desconocido'}
                                                A1={watchman.user ? watchman.user.name : 'Desconocido'}
                                                A2={watchman.user ? watchman.user.lastName : 'Desconocido'}
                                                description={enterpriceName}
                                                A7={watchman.user && watchman.user.phone ? watchman.user.phone : 'Desconocido'}
                                                A17={watchman.user ? watchman.user.email : 'Desconocido'}
                                                status={watchman.state}
                                                to={`details/${watchman.iduser}`}
                                            >
                                                {allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Editar') && (
                                                    <Actions accion='Editar' onClick={(e) => {
                                                        e.preventDefault();
                                                        handleModal(watchman);
                                                    }} />
                                                )}

                                                <Actions accion='Asignar Turno' href={`/admin/watchman/assignshift/${watchman?.user?.iduser}`} />
                                            </Row>
                                        );
                                    })}
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

                                <Select2
                                    placeholder={'Empresa de Seguridad'}
                                    onChange={handleEnterpriceSecurity}
                                    options={enterpriceOptions}
                                    value={selectedEnterprice}

                                    errors={errors}
                                    identifier={"idEnterpriseSecurity"}
                                />

                                <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedWatchman?.user.docType || ''} onChange={(e) => { setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, docType: e.target.value } }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"docType"}

                                ></InputsSelect>
                                <Inputs name="Documento"
                                    value={editedWatchman?.user.document || ''}
                                    onChange={(e) => { setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, document: e.target.value } }); setErrors([]) }}
                                    // inputStyle={editedWatchman?.user.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                    // errorMessage={editedWatchman?.user.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}
                                    identifier={'document'}
                                    errors={errors}
                                />

                                <Inputs name="Nombre" value={editedWatchman?.user.name || ''} onChange={(e) => { setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, name: e.target.value } }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"name"}
                                />
                                <Inputs name="Apellido" value={editedWatchman?.user.lastName || ''} onChange={(e) => { setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, lastName: e.target.value } }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"lastName"}
                                />


                                <Inputs name="Correo"
                                    value={editedWatchman?.user.email || ''}
                                    onChange={(e) => { setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, email: e.target.value } }); setErrors([]) }}
                                    // inputStyle={editedWatchman?.user.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                    // errorMessage={editedWatchman?.user.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}
                                    errors={errors}
                                    identifier={"email"}
                                />

                                <Inputs name="Teléfono" value={editedWatchman?.user.phone || ''} onChange={(e) => { setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, phone: e.target.value } }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"phone"}
                                />
                                <Inputs
                                    type='date'
                                    name="Fecha Nacimiento"
                                    value={editedWatchman?.user.birthday ? new Date(editedWatchman.user.birthday).toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        const selectedDate = e.target.value;
                                        setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, birthday: e.target.value } }); setErrors([])
                                    }}

                                    inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                    errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}
                                    errors={errors}
                                    identifier={"birthday"}
                                />

                                <InputsSelect id={"select"} options={estado} name={"Estado"} value={editedWatchman?.state || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, state: e.target.value })}
                                    errors={errors}
                                    identifier={"status"}

                                ></InputsSelect>


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}
        </>


    )
}
