import React, { useState, useEffect } from 'react'
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


export const Users = () => {
    const [showModal, setShowModal] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [usersData, setUsersData] = useState([]);


    const { data, load, error } = useFetchget('users')
    console.log(data.user)
    
    // const { error: putError, load: putLoad, } = useFetchput('users', editedUser);

    const handleModal = (user) => {
        setEditedUser(user);
        console.log(user, 'row')
        setShowModal(true)

    }

    useEffect(() => {
        if (data && data.user) {
            setUsersData(data.user);
        }
    }, [data]);

    // useEffect(() => {
    //     if (!putLoad && !putError) {
    //         setShowModal(false);
    //     }
    // }, [putLoad, putError]);

    const handleSaveChanges = async () => {
        console.log('Guardando cambios:', editedUser);
        if (editedUser) {
            try {
                const response = await fetch('https://apptowerbackend.onrender.com/api/users', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedUser),
                });

                if (response.ok) {
                    const updatedUsers = usersData.map(user => {
                        if (user.iduser === editedUser.iduser) {
                            return editedUser;
                        }
                        return user;
                    });
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Usuario modificado exitosamente',
                        icon: 'success',
                    })
                    setUsersData(updatedUsers);
                    setEditedUser(null);
                    setShowModal(false);
                } else {
                    const errorResponse = await response.json();
                    console.error('Error al guardar los cambios:', response.status, errorResponse);
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al modificar usuario',
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

    const opcionesRols = [
        {
            value: "1",
            label: "Administador"
        },
        {
            value: "2",
            label: "Residente"
        },
        {
            value: "3",
            label: "Vigilante"
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
    return (
        <>
            <ContainerTable title='Usuarios'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Usuario' href='/admin/users/create' />
                <TablePerson>
                    <Thead>
                        <Th name={'Información Usuario'}></Th>
                        <Th name={'Rol'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th></Th> 



                    </Thead>
                    <Tbody>

                        {usersData?.map(user => (
                            <Row
                                docType={user.documentType}
                                docNumber={user.document}
                                name={user.name}
                                lastName={user.lastname}
                                rol={
                                    user.idrole === 1 ? 'Administrador' :
                                        user.idrole === 2 ? 'Residente' :
                                            user.idrole === 3 ? 'Vigilante' : 'Desconocido'
                                }
                                email={user.email}
                                phone={user.phone}
                                status={user.state}
                            >
                                <Actions accion='Editar' onClick={(e) => {
                                    e.preventDefault();
                                    handleModal(user);
                                }} />

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
                                title={"Editar Usuario"}
                            >
                                <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.documentType || ''} onChange={(e) => setEditedUser({ ...editedUser, documentType: e.target.value })} ></InputsSelect>
                                <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} />
                                <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />
                                <Inputs name="Apellido" value={editedUser?.lastname || ''} onChange={(e) => setEditedUser({ ...editedUser, lastname: e.target.value })} />
                                <InputsSelect id={"select"} options={opcionesRols} name={"Rol"} value={editedUser?.idrole || ''} onChange={(e) => setEditedUser({ ...editedUser, idrol: e.target.value })}></InputsSelect>
                                <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
                                <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} />
                                <InputsSelect id={"select"} options={estado} name={"Estado"} value={editedUser?.state || ''} onChange={(e) => setEditedUser({ ...editedUser, state: e.target.value })}></InputsSelect>


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

        </>

    )
}
