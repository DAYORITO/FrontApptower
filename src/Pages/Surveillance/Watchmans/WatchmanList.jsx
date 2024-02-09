import React, { useEffect, useState, useRef } from 'react'
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
import Select2 from '../../../Components/Inputs/Select2';


export const Watchman = () => {
    const [showModal, setShowModal] = useState(false);
    const [editedWatchman, setEditedWatchman] = useState(null);
    const [watchmanData, setWatchmanData] = useState([]);
    const [allowedPermissions, setAllowedPermissions] = useState([]);
    const token = Cookies.get('token');
    const [enterprice, setEnterprice] = useState(null)

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




    const [companies, setCompanies] = useState([]);
    const { data: { enterpriseSecurity } = {} } = useFetchget('enterpricesecurity');


    useEffect(() => {
        if (enterpriseSecurity) {
            setCompanies(enterpriseSecurity);
        }
    }, [enterpriseSecurity]);

    useEffect(() => {
        if (data && data.watchman) {
            setWatchmanData(data.watchman);
        }
    }, [data]);

    const handleModal = async (watchman) => {
        if (watchman.idEnterpriseSecurity) {
            setEditedWatchman({
                ...watchman,
                idEnterpriseSecurity: watchman.idEnterpriseSecurity
            });
            setShowModal(true);
        } else {
            console.error('ID de Empresa no encontrado en el vigilante:', watchman);
        }
    };

    useEffect(() => {
        if (!putLoad && !putError) {
            setShowModal(false);
        }
    }, [putLoad, putError]);


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
        fetch(`http://localhost:3000/api/users/document/${editedWatchman?.user?.document}`)
            .then(response => response.json())
            .then(data => {
                setIsDocumentTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [editedWatchman?.user?.document]);


    useEffect(() => {
        fetch(`http://localhost:3000/api/users/email/${editedWatchman?.user?.email}`)
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

                if (!editedWatchman.user.docType || !editedWatchman.user.name || !editedWatchman.user.email || !editedWatchman.user.document || !editedWatchman.user.lastName) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Por favor, rellene todos los campos requeridos',
                        icon: 'error',
                    });
                    //Activa la validacion de los campos cuando se envia el formulario
                    setShouldValidate(true);
                    return;
                }

                if (editedWatchman?.user.document !== originalDocument.current && isDocumentTaken) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Este documento se encuentra registrado',
                        icon: 'error',
                    });
                    return;
                }

                if (editedWatchman?.user.email !== originalEmail.current && isEmailTaken) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Este correo se encuentra registrado',
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


    // Traer empresas de seguridad
    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')
    const [selectedEnterprice, setSelectedEnterprice] = useState(null);

    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity ? dataEnterprice.enterpriseSecurity.map(enterprice => ({
        value: enterprice.idEnterpriseSecurity,
        label: enterprice.nameEnterprice
    })) : [];

    const selectedEnterpriceOption = editedWatchman && enterpriceOptions.find(option => option.value === editedWatchman.idEnterpriseSecurity)?.value;

    const handleEnterpriceSecurity = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        console.log("Selected Value:", selectedValueAsNumber);
        setSelectedEnterprice(selectedValueAsNumber);
        setEditedWatchman({ ...editedWatchman, idEnterpriseSecurity: selectedValueAsNumber });
    };


    //paginador
    const totalPages = Math.ceil(filterData.length / 10);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const [currentPage, setCurrentPage] = useState(0);
    const filteredDataWatchman = () => {
        return filterData.slice(currentPage, currentPage + 10)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 10)
    }


    const PreviousPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 10)
    }

    return (
        <>

            <ContainerTable
                title='Vigilantes'
                dropdown={<DropdownExcel />}
                search={<SearchButton value={search} onChange={searcher} />}
                buttonToGo={
                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Crear')
                        ? <ButtonGoTo value='Crear Vigilante' href='/admin/watchman/create' />
                        : null
                }
                showPaginator={
                    <nav aria-label="Table Paging" className="mb- text-muted my-4">
                        <ul className="pagination justify-content-center mb-0">
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); PreviousPage(); }}>Anterior</a>
                            </li>
                            {pageNumbers.map((pageNumber) => (
                                <li key={pageNumber} className={`page-item ${currentPage + 1 === pageNumber ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); setCurrentPage((pageNumber - 1) * 10); }}>{pageNumber}</a>
                                </li>
                            ))}


                            <li className="page-item">
                                <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); nextPage(); }}>Siguiente</a>
                            </li>
                        </ul>
                    </nav >
                }
            >

                <TablePerson>
                    <Thead>
                        <Th name={'Información Vigilante'}></Th>
                        <Th name={'Empresa Aliada'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th ></Th>

                    </Thead>
                    <Tbody>

                        {filteredDataWatchman().map(watchman => {
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
                                    A8={watchman.user ? watchman.user.email : 'Desconocido'}
                                    status={watchman.state}
                                    to={`details/${watchman.idwatchman}`}
                                >
                                    {allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Editar') && (
                                        <Actions accion='Editar' onClick={(e) => {
                                            e.preventDefault();
                                            handleModal(watchman);
                                        }} />
                                    )}

                                    <Actions accion='Asignar Turno' href={`/admin/watchman/shift/${watchman.idwatchman}`} />
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
                                <div className="mr-1" style={{ width: '100%' }}>
                                    <Select2
                                        name={'Empresa de Seguridad'}
                                        onChange={(newValue) => {
                                            const setSelectedEnterprice = enterpriceOptions.find(option => option.value === Number(newValue));
                                            const newNameEnterprice = setSelectedEnterprice ? setSelectedEnterprice.label : '';
                                            handleEnterpriceSecurity(newValue);
                                        }}
                                        options={enterpriceOptions}
                                        value={selectedEnterpriceOption}
                                        validate={shouldValidate}
                                    />
                                </div>
                                <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedWatchman?.user.docType || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, docType: e.target.value } })}
                                    validate={shouldValidate} required={true}></InputsSelect>
                                <Inputs name="Documento" value={editedWatchman?.user.document || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, document: e.target.value } })}
                                    inputStyle={editedWatchman?.user.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                    errorMessage={editedWatchman?.user.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}
                                    validate={shouldValidate} required={true}
                                />
                                <Inputs name="Nombre" value={editedWatchman?.user.name || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, name: e.target.value } })}
                                    validate={shouldValidate} required={true} />
                                <Inputs name="Apellido" value={editedWatchman?.user.lastName || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, lastName: e.target.value } })}
                                    validate={shouldValidate} required={true} />

                                <Inputs name="Correo" value={editedWatchman?.user.email || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, email: e.target.value } })}
                                    inputStyle={editedWatchman?.user.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                    errorMessage={editedWatchman?.user.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}
                                    validate={shouldValidate} required={true} />

                                <Inputs name="Teléfono" value={editedWatchman?.user.phone || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, phone: e.target.value } })} validate={shouldValidate} required={true} />
                                <Inputs
                                    type='date'
                                    name="Fecha Nacimiento"
                                    value={editedWatchman?.user.birthday ? new Date(editedWatchman.user.birthday).toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        const selectedDate = e.target.value;
                                        setEditedWatchman({ ...editedWatchman, user: { ...editedWatchman.user, birthday: e.target.value } });
                                    }}
                                    validate={shouldValidate} required={true}
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
