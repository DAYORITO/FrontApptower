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


export const Watchman = () => {
    const [showModal, setShowModal] = useState(false);
    const [editedWatchman, setEditedWatchman] = useState(null);
    const [watchmanData, setWatchmanData] = useState([]);

    const { data, load, error } = useFetchget('watchman')
    const { error: putError, load: putLoad, } = useFetchput('watchman', editedWatchman);
    console.log(data.watchman)



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

                const response = await fetch('https://apptowerbackend.onrender.com/api/watchman', {
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


    return (
        <>
            <ContainerTable title='Vigilantes'>
                <DropdownExcel />
                <SearchButton />

                <ButtonGoTo value='Crear Vigilante' href='/admin/watchman/create' />
                <TablePerson>
                    <Thead>
                        <Th name={'Información Vigilante'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th></Th>


                    </Thead>
                    <Tbody>

                        {watchmanData?.map(watchman => (
                            <Row
                                docType={watchman.documentType}
                                docNumber={watchman.document}
                                name={watchman.namewatchman}
                                lastName={watchman.lastnamewatchman}
                                phone={watchman.phone}
                                email={watchman.email}
                                status={watchman.state}
                            >
                                <Actions accion='Editar' onClick={(e) => {
                                    e.preventDefault();
                                    handleModal(watchman);
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
                                title={"Editar Vigilante"}
                            >

                                <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedWatchman?.documentType || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, documentType: e.target.value })} ></InputsSelect>
                                <Inputs name="Documento" value={editedWatchman?.document || ''} onChange={(e) => setEditedWatchman({ ...editedWatchman, document: e.target.value })} />
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
