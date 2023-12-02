import React, { useEffect, useState } from 'react'

import { Details } from "../../../Components/Details/details"
import Inputs from '../../../Components/Inputs/Inputs'
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { statusList } from "../../../Hooks/consts.hooks"
import { TablePerson } from '../../../Components/Tables/Tables'
import { TableDetails } from "../../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons"
import { DetailsActions } from "../../../Components/DetailsActions/DetailsActions"
import { useFetchget, useFetchgetById } from "../../../Hooks/useFetch"
import { Dropdownanchor, Dropdownanchor2 } from "../../../Components/DropDownAnchor/Dropdownanchor"
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { NotificationsAlert } from "../../../Components/NotificationsAlert/NotificationsAlert"
import { ModalContainer, Modal } from "../../../Components/Modals/ModalTwo"

import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router"


export const ApartmentDetails = (props) => {






    // 1. Start Get apartment information by id

    const { id } = useParams();
    const { data: apartment, error, load } = useFetchgetById('apartments', id);
    const [idApartment, setIdApartment] = useState("");
    const [tower, setTower] = useState('');
    const [apartmentName, setapartmentName] = useState('');
    const [area, setArea] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {

        if (
            apartment && apartment.spartment) {
            setIdApartment(apartment.spartment.idApartment);
            setTower(apartment.spartment.tower);
            setapartmentName(apartment.spartment.apartmentName);
            setArea(apartment.spartment.area);
            setStatus(apartment.spartment.status);
        }
    }, [apartment])


    // 1.1 Start Show modal edit apartment

    const [showModal, setShowModal] = useState(false);

    const handleModal = (data) => {
        // setEdit(data);
        console.log(data, 'row')
        setShowModal(true)

    }

    // 1.1 end Show modal edit apartment

    // 1. End Get apartment information by id





    // 2. Start modal resident per resident

    const [idResident, setIdResident] = useState("");
    const [residentStartDate, setResidentStartDate] = useState("");
    const [residentEndDate, setResidentEndDate] = useState("");


    const { data } = useFetchget('apartments')

    const apartmentList = data && data.apartments
        ? data.apartments
            .filter(apartment => apartment.status === 'Active')
            .map(apartment => ({
                value: apartment.idApartment,
                label: apartment.apartmentName
            }))
        : [];

    const { data: residentsExis } = useFetchget('residents')


    const residentsExistList = residentsExis && residentsExis.residents
        ? residentsExis.residents
            // .filter(residents => residents.status === 'Active')
            .map(resident => ({
                value: resident.idResident,
                label: ` ${resident.name} ${resident.lastName} - ${resident.docNumber}`
            }))
        : [];

    console.log(residentsExistList)

    const [showApartmentResidentsModal, setShowApartmentResidentsModal] = useState(false);
    // const [editedUser, setEdit] = useState(null);

    const handleApartmentResidentsModal = (data) => {
        // setEdit(data);
        console.log(data, 'row')
        setShowApartmentResidentsModal(true)

    }

    // 2. end modal resident per resident






    // 3. Start Get parking of apartment by apartment id

    const { data: parkingSpace } = useFetchgetById('assignedParkingSpaces', id)
    const [assignedParkingList, setAssignedParkingList] = useState([])

    useEffect(() => {
        if (parkingSpace && parkingSpace.assignedParking) {
            setAssignedParkingList(parkingSpace.assignedParking);
        }
    }, [parkingSpace]);

    // 3. End Get parking of apartment by apartment id





    // 4. Start Get apartment of owners by apartment id

    const { data: owners } = useFetchgetById('apartmentOwners', id)
    const [apartmentOwnersList, setApartmentOwnersList] = useState([])

    useEffect(() => {


        if (owners && owners.apartmentOwners) {

            setApartmentOwnersList(owners.apartmentOwners);

        }
    }, [owners])

    // 4. End Get apartment of owners by apartment id





    // 5. Start Get apartment of residents by apartment id

    const { data: residents } = useFetchgetById('aparmentResidents', id)
    const [apartmentResidentsList, setApartmentResidentsList] = useState([])

    useEffect(() => {

        if (residents && residents.apartmentResidents) {

            setApartmentResidentsList(residents.apartmentResidents);

        }
    }, [residents])

    // 5. End Get apartment of residents by apartment id





    // 6. Start Funtionality Tabs

    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index)
    };

    // 6. End Funtionality Tabs




    


    return (
        <>
            <Details>

                <InfoDetails>


                    <ContainerModule name={`Apartamento ${apartmentName}`} date1={`Torre: ${tower}`} date2={`Area: ${area} m²`} status={status} >

                        <Dropdownanchor2 name={"Editar apartamento"} icon={"edit"} onClick={(e) => {
                            e.preventDefault();
                            handleModal(apartment);
                        }} />



                    </ContainerModule>

                    <Acordions>

                        <DropdownInfo name={"Propietarios"} to1="/admin/owners/create">
                            {apartmentOwnersList.length > 0 ? (
                                apartmentOwnersList.map((owner, index) => (
                                    <Dropdownanchor
                                        onClick={() => {
                                            console.log('Eliminar propietario con ID:', owner.idApartmentOwner);
                                            // del('/aparmentResidents', id);
                                        }}
                                        key={index}
                                        name={owner.owner.name + " " + owner.owner.lastName}
                                        icon={"user-check"}
                                        to={`/admin/owners/details/${owner.idOwner}`}

                                    />
                                ))
                            ) : (
                                <NotificationsAlert msg="No hay propietarios asignados" />
                            )}
                        </DropdownInfo>

                        <DropdownInfo name={"Residentes"} to1="/admin/residents/create" onClick={(e) => {
                            e.preventDefault();
                            handleApartmentResidentsModal(apartment);
                        }}>
                            {apartmentResidentsList.length > 0 ? (
                                apartmentResidentsList.map((resident, index) => (
                                    <Dropdownanchor
                                        onClick={() => {
                                            console.log('Eliminar residente con ID:', { key: resident.idApartmentResident });
                                            del('aparmentResidents', { idApartmentResident: resident.idApartmentResident });
                                        }}
                                        key={index}
                                        name={resident.resident.name + " " + resident.resident.lastName}
                                        icon={"user-check"}
                                        to={`/admin/residents/details/${resident.idResident}`}
                                    />
                                ))
                            ) : (
                                <NotificationsAlert msg="No hay residentes asignados" />
                            )}
                        </DropdownInfo>

                        <DropdownInfo name={"Parqueaderos"} to1="/admin/parkingSpaces/create">

                            {assignedParkingList.length > 0 ? (
                                assignedParkingList.map((parking, index) => (
                                    <Dropdownanchor
                                        key={index}
                                        name={parking.parkingSpace.parkingName}
                                        icon={"layers"}
                                        to={`/admin/parkingSpaces/details/${parking.idParkingSpace}`}
                                    />
                                ))
                            ) : (
                                <NotificationsAlert msg="No hay parqueaderos asignados" />
                            )}

                        </DropdownInfo>
                        <DropdownInfo name={"Vehiculos"}>
                            <Dropdownanchor name={"ABL33F"} to="/admin/vehicles/details" />
                            <Dropdownanchor name={"AME31G"} to="/admin/vehicles/details" />

                        </DropdownInfo>

                    </Acordions>
                    <div class="col-auto back" >
                        <Link to={"/admin/apartments/"} type="button" class="btn btn-sm btn-secondary">Regresar</Link>
                    </div>





                </InfoDetails>

                <ListsDetails>
                    <NavDetails>

                        <NavListDetails index={1} name={"Mensajes"} toggleState={toggleState} onClick={() => toggleTab(1)} />
                        <NavListDetails index={2} name={"Ingresos"} toggleState={toggleState} onClick={() => toggleTab(2)} />

                    </NavDetails>

                    <TableDetails index={1} toggleState={toggleState} >

                        <TablePerson>
                            {/* <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo notificacion" href={"notificaciones/"} />
                            </DetailsActions> */}

                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions />


                        </TablePerson>
                    </TableDetails>

                    <TableDetails index={2} toggleState={toggleState} >
                        <TablePerson>
                            <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo ingreso" />
                            </DetailsActions>
                            <RowNotificactions status="Active" name="Ingreso" lastName="" icon="user" fecha="Fecha 22-11-2023" mensaje="Ingreso Juan Camilo" />
                            <RowNotificactions status="Inactive" name="Ingreso" lastName="" icon="user" fecha="Fecha 22-11-2023" mensaje="Ingreso Juan Camilo" />
                            <RowNotificactions status="Inactive" name="Ingreso" lastName="" icon="user" fecha="Fecha 22-11-2023" mensaje="Ingreso Juan Camilo" />

                        </TablePerson>

                    </TableDetails>


                </ListsDetails>
            </Details >

            {showModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowModal}>
                            <Modal
                                // onClick={handleSaveChanges}
                                showModal={setShowModal}
                                title={"Editar apartamento"}
                            >
                                <Inputs name="Torre " type={"text"}
                                    value={tower} onChange={e => setTower(e.target.value)}></Inputs>
                                <Inputs name="Numero apartamento " type={"text"}
                                    value={apartmentName} onChange={e => setApartmentName(e.target.value)}></Inputs>

                                <Inputs name="Area del apartamento " type={"text"}
                                    value={area} onChange={e => setArea(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                    value={status} onChange={e => setStatus(e.target.value)}
                                ></InputsSelect>
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

            {showApartmentResidentsModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowApartmentResidentsModal}>
                            <Modal
                                // onClick={handleSaveChanges}
                                showModal={setShowApartmentResidentsModal}
                                title={"Agregar residente existente"}


                            >
                                <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <InputsSelect id={"select"} options={residentsExistList} name={"Residente"}
                                    value={idResident} onChange={e => setIdResident(e.target.value)}></InputsSelect>


                                <Inputs name="Fecha de inicio de residencia" type={"date"}
                                    value={residentStartDate} onChange={e => setResidentStartDate(e.target.value)}></Inputs>
                                <Inputs name="Fecha de fin de residencia" type={"date"}
                                    value={residentEndDate} onChange={e => setResidentEndDate(e.target.value)}></Inputs>
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}
        </>
    )
}
