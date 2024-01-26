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

    const handleSaveChanges = async () => {
        console.log('Guardando cambios:', editedWatchman);

        if (editedWatchman) {
            try {

                const formattedWatchman = {
                    ...editedWatchman,
                    dateOfbirth: editedWatchman.dateOfbirth ? new Date(editedWatchman.dateOfbirth).toISOString() : null
                };

                const response = await fetch('https://apptowerbackend.onrender.com/api/watchman', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedWatchman),
                });

                const responseUser = await fetch(`https://apptowerbackend.onrender.com/api/users/edited`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formattedWatchman.namewatchman,
                        lastname: formattedWatchman.lastnamewatchman,
                        email: formattedWatchman.email,
                        phone: formattedWatchman.phone,
                        document: formattedWatchman.document,
                        documentType: formattedWatchman.documentType,
                        state: formattedWatchman.state,

                    }),
                });

                if (response.ok && responseUser.ok) {
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





    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')



    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity ? dataEnterprice.enterpriseSecurity.map(enterprice => ({
        value: enterprice.idEnterpriseSecurity,
        label: enterprice.nameEnterprice
    })) : [];


    const handleEnterpriceSecurity = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        console.log("Selected Value:", selectedValueAsNumber);
        setEnterprice(selectedValueAsNumber);

        setSelectedEnterprice(selectedValueAsNumber);
    };



    console.log('enterpriceOptions', enterpriceOptions);


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
                                    A3={watchman.documentType}
                                    A4={watchman.document}
                                    A1={watchman.namewatchman}
                                    A2={watchman.lastnamewatchman}
                                    A7={enterpriceName}
                                    A8={watchman.phone ? watchman.phone : 'Desconocido'}
                                    A6={watchman.email}
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

                                    <Select2 name={'Empresa de Seguridad'} onChange={handleEnterpriceSecurity} options={enterpriceOptions}></Select2>
                                </div>
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
