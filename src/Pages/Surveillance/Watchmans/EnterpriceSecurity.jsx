import React, { useEffect, useState, useRef } from 'react'
import { useFetchget, useFetchpost, useFetchput } from '../../../Hooks/useFetch'
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
// import { idToPrivilegesName, idToPermissionName } from '../../../Hooks/permissionRols'
// import Cookies from 'js-cookie';


export const EnterpriceSecurity = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [editedEnterprice, seteditedEnterprice] = useState(null);
    const [EnterpriceData, setEnterpriceData] = useState([]);
    // const [allowedPermissions, setAllowedPermissions] = useState([]);
    // const token = Cookies.get('token');

    const [nameEnterprice, setNameEnterprice] = useState("");
    const [email, setEmail] = useState("");
    const [NIT, setNIT] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    const { data, load, error } = useFetchget('enterpricesecurity')
    const { error: putError, load: putLoad, } = useFetchput('enterpricesecurity', editedEnterprice);



    const getEnterpriceData = async () => {
        const { data, load, error } = await useFetchget('enterpricesecurity');
        if (data && data.enterpriseSecurity) {
            setEnterpriceData(data.enterpriseSecurity);
        }
    };

    useEffect(() => {
        // Llamar a la función al montar el componente
        getEnterpriceData();
    }, []);


    const [isDocumentTaken, setIsDocumentTaken] = useState(false);
    const [isEmailTaken, setIsEmailTaken] = useState(false);

    const originalDocument = useRef('');
    const originalEmail = useRef('');

    useEffect(() => {
        if (editedEnterprice?.NIT && originalDocument.current === '') {
            originalDocument.current = editedEnterprice?.NIT;
        }
        if (editedEnterprice?.email && originalEmail.current === '') {
            originalEmail.current = editedEnterprice?.email;
        }
    }, [editedEnterprice?.NIT, editedEnterprice?.email]);



    useEffect(() => {
        fetch(`http://localhost:3000/api/enterpricesecurity/NIT/${editedEnterprice?.NIT ? editedEnterprice?.NIT : NIT}`)
            .then(response => response.json())
            .then(data => {
                setIsDocumentTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [editedEnterprice?.NIT ? editedEnterprice?.NIT : NIT]);


    useEffect(() => {
        fetch(`http://localhost:3000/api/enterpricesecurity/email/${editedEnterprice?.email ? editedEnterprice?.email : email}`)
            .then(response => response.json())
            .then(data => {
                setIsEmailTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [editedEnterprice?.email ? editedEnterprice?.email : email]);


    const handleModal = (enterpriseSecurity) => {
        seteditedEnterprice(enterpriseSecurity);
        console.log(enterpriseSecurity, 'row')
        setShowModal(true)

    }

    const handleModalCreate = (enterpriseSecurity) => {
        console.log('Abriendo modal de creación');
        setShowModalCreate(true);
    }

    // useEffect(() => {
    //     if (data && data.enterpriseSecurity) {
    //         setEnterpriceData(prevData => [...prevData, ...data.enterpriseSecurity]);
    //     }
    // }, [data]);

    useEffect(() => {
        if (data && data.enterpriseSecurity) {
            setEnterpriceData(data.enterpriseSecurity);
        }
    }, [data]);



    useEffect(() => {
        if (!putLoad && !putError) {
            setShowModal(false);
        }
    }, [putLoad, putError]);

    const [shouldValidate, setShouldValidate] = useState(false);
    const handleSaveChanges = async () => {
        console.log('Guardando cambios:', editedEnterprice);

        if (editedEnterprice) {
            try {

                const response = await fetch(`http://localhost:3000/api/enterpricesecurity/${editedEnterprice.idEnterpriseSecurity}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedEnterprice),
                });

                if (!editedEnterprice.NIT || !editedEnterprice.nameEnterprice || !editedEnterprice.email || !editedEnterprice.address || !editedEnterprice.phone) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Por favor, rellene todos los campos requeridos',
                        icon: 'error',
                    });
                    //Activa la validacion de los campos cuando se envia el formulario
                    setShouldValidate(true);
                    return;
                }

                if (editedEnterprice?.NIT !== originalDocument.current && isDocumentTaken) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Este documento se encuentra registrado',
                        icon: 'error',
                    });
                    return;
                }

                if (editedEnterprice?.email !== originalEmail.current && isEmailTaken) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Este correo se encuentra registrado',
                        icon: 'error',
                    });
                    return;
                }

                if (response.ok) {
                    const updatedEnterpriceData = EnterpriceData.map(enterprice => {
                        return enterprice.idEnterpriseSecurity === editedEnterprice.idEnterpriseSecurity ? editedEnterprice : enterprice;
                    });

                    Swal.fire({
                        title: 'Éxito',
                        text: 'Empresa modificada exitosamente',
                        icon: 'success',
                    });

                    setEnterpriceData(updatedEnterpriceData);
                    seteditedEnterprice(null);
                    setShowModal(false);
                } else {
                    const errorResponse = await response.json();
                    console.error('Error al guardar los cambios:', response.status, errorResponse);
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al modificar la empresa',
                        icon: 'error',
                    });
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }
    };



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

    const [filterData, setFilterData] = useState([]);


    useEffect(() => {
        if (!search) {
            setFilterData(EnterpriceData);
        } else {
            setFilterData(EnterpriceData.filter((dato) =>
                (dato.nameEnterprice && dato.nameEnterprice.toLowerCase().includes(search.toLowerCase())) ||
                (dato.NIT && dato.NIT.toLowerCase().includes(search.toLowerCase())) ||
                (dato.email && dato.email.toLowerCase().includes(search.toLowerCase())) ||
                (dato.phone && dato.phone.toLowerCase().includes(search.toLowerCase()))
            ));
        }
    }, [EnterpriceData, search]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nameEnterprice || !NIT || !email || !address || !phone) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, rellene todos los campos requeridos',
                icon: 'error',
            });
            //Activa la validacion de los campos cuando se envia el formulario
            setShouldValidate(true);
            return;
        }

        if (isDocumentTaken) {
            Swal.fire({
                title: 'Error',
                text: 'Este documento se encuentra registrado',
                icon: 'error',
            });
            return;
        }

        if (isEmailTaken) {
            Swal.fire({
                title: 'Error',
                text: 'Este correo se encuentra registrado',
                icon: 'error',
            });
            return;
        }

        const url = 'enterpricesecurity';
        const data = {
            nameEnterprice,
            NIT,
            email,
            address,
            phone,
        };

        try {
            const { response, error } = await useFetchpost(url, data);

            if (response) {
                console.log('Response:', response);

                setEnterpriceData(prevEnterpriceData => [...prevEnterpriceData, response]);


                Swal.fire({
                    title: 'Éxito',
                    text: 'Empresa creada exitosamente',
                    icon: 'success',
                });

                seteditedEnterprice(null);
                setShowModalCreate(false);
            }

            if (error) {
                console.error('Error al crear la empresa:', error);

                Swal.fire({
                    title: 'Error',
                    text: 'Error al crear la empresa',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
        }
    };




    const totalPages = Math.ceil(filterData?.length / 10);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const [currentPage, setCurrentPage] = useState(0);
    const filteredDataSecurity = () => {
        return filterData?.slice(currentPage, currentPage + 10)
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
                title='Empresas de Seguridad'
                dropdown={<DropdownExcel />}
                search={<SearchButton value={search} onChange={searcher} />}

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


                buttonToGo={
                    <ButtonGoTo value='Nueva Empresa' onClick={(e) => {
                        e.preventDefault();
                        handleModalCreate(EnterpriceData);
                    }} />

                }

            >

                <TablePerson>
                    <Thead>
                        <Th name={'Información Empresa'}></Th>
                        <Th name={'Dirección'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th name={'Correo'}></Th>


                        <Th></Th>


                    </Thead>
                    <Tbody>

                        {filteredDataSecurity().map(enterprise => (
                            <Row
                                icon='command'
                                key={enterprise.idEnterpriseSecurity}
                                A3={'NIT'}
                                A4={enterprise.NIT}
                                A1={enterprise.nameEnterprice}
                                status={enterprise.state}
                                A2={''}
                                description={enterprise.address}
                                A7={enterprise.phone}
                                A8={enterprise.email}



                            >
                                {/* {allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Editar') && (
                                    <Actions accion='Editar' onClick={(e) => {
                                        e.preventDefault();
                                        handleModal(watchman);
                                    }} />
                                )} */}


                                <Actions accion='Editar' onClick={(e) => {
                                    e.preventDefault();
                                    handleModal(enterprise);

                                }}
                                />

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
                                title={"Editar Empresa"}
                            >

                                <Inputs name="NIT" value={editedEnterprice?.NIT || ''} onChange={(e) => seteditedEnterprice({ ...editedEnterprice, NIT: e.target.value })}
                                    inputStyle={editedEnterprice?.NIT !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                    errorMessage={editedEnterprice?.NIT !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}
                                    validate={shouldValidate} required={true} />
                                <Inputs name="Nombre Empresa" value={editedEnterprice?.nameEnterprice || ''} onChange={(e) => seteditedEnterprice({ ...editedEnterprice, nameEnterprice: e.target.value })}
                                    validate={shouldValidate} required={true} />
                                <Inputs name="Dirección" value={editedEnterprice?.address || ''} onChange={(e) => seteditedEnterprice({ ...editedEnterprice, address: e.target.value })} validate={shouldValidate} required={true} />
                                <Inputs name="Correo" value={editedEnterprice?.email || ''} onChange={(e) => seteditedEnterprice({ ...editedEnterprice, email: e.target.value })}
                                    validate={shouldValidate} required={true}
                                    inputStyle={editedEnterprice?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                    errorMessage={editedEnterprice?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}

                                />
                                <Inputs name="Teléfono" value={editedEnterprice?.phone || ''} onChange={(e) => seteditedEnterprice({ ...editedEnterprice, phone: e.target.value })} validate={shouldValidate} required={true} />
                                <InputsSelect id={"select"} options={estado} name={"Estado"} value={editedEnterprice?.state || ''} onChange={(e) => seteditedEnterprice({ ...editedEnterprice, state: e.target.value })}></InputsSelect>


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}


            {showModalCreate &&
                createPortal(
                    <>
                        <ModalContainer showModal={setShowModalCreate}>
                            <Modal
                                onClick={handleSubmit}
                                showModal={setShowModalCreate}
                                title={"Nueva Empresa"}
                            >
                                <Inputs name="NIT" type='number' value={NIT} onChange={e => setNIT(e.target.value)} validate={shouldValidate} required={true}
                                    inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                    errorMessage={isDocumentTaken ? "El documento ya existe" : null} ></Inputs>
                                <Inputs name="Nombre Empresa" type='text' value={nameEnterprice} onChange={e => setNameEnterprice(e.target.value)} validate={shouldValidate} required={true}></Inputs>
                                <Inputs name="Dirección" type='text' value={address} onChange={e => setAddress(e.target.value)} validate={shouldValidate} required={true}></Inputs>
                                <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} validate={shouldValidate} required={true}
                                    inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                    errorMessage={isEmailTaken ? "El correo ya existe" : null}></Inputs>
                                <Inputs name="Teléfono" type='number' value={phone} onChange={e => setPhone(e.target.value)} validate={shouldValidate} required={true}></Inputs>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}
        </>


    )
}
