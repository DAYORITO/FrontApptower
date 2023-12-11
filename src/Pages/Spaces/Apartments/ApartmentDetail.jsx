import React, { useEffect, useState } from 'react'

import Inputs from '../../../Components/Inputs/Inputs'
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { Details } from "../../../Components/Details/details"
import { statusList } from "../../../Hooks/consts.hooks"
import { TablePerson } from '../../../Components/Tables/Tables'
import { TableDetails } from "../../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons"
import { DetailsActions } from "../../../Components/DetailsActions/DetailsActions"
import { useFetch, useFetchpostFile } from "../../../Hooks/useFetch"
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
import { format } from 'date-fns';
import Swal from 'sweetalert2'


import { filterGuestIncomes, handleRequest, showConfirmationDialog } from '../../../Helpers/Helpers'



export const ApartmentDetails = (props) => {


    // API URL

    // const url = "http://localhost:3000/api/"
    const url = "https://apptowerbackend.onrender.com/api/"

    // Apartment information

    const { id } = useParams();
    const [area, setArea] = useState('');
    const [tower, setTower] = useState('');
    const [status, setStatus] = useState('');
    const [idApartment, setIdApartment] = useState("");
    const [apartmentName, setapartmentName] = useState('');

    // Apartment residents

    const [idResident, setIdResident] = useState("");
    const [residentStartDate, setResidentStartDate] = useState("");
    const [residentEndDate, setResidentEndDate] = useState("");
    const [statusApartmentResident, setStateApartmentResident] = useState("");


    // Apartments relations

    const { data: apartment, put, get: getApartment } = useFetch(url)
    const { data: apartmentResidents, get: getApartmentResidents, del: delApartmentResidents } = useFetch(url)
    const { data: apartmentOwners, get: getApartmentOwners, del: delApartmentOwners } = useFetch(url)
    const { data: assignedParkingSpaces, post, get: getAssignedParkingSpaces, del: delAssignedParkingSpaces } = useFetch(url)
    const { data: guestIncomes, get: getGuestIncomes } = useFetch(url)

    // Parking spaces

    const [idParkingSpace, setIdParkingSpace] = useState("");


    // List

    const { data: apartments, get: getApartments } = useFetch(url)
    const { data: residents, get: getResidents } = useFetch(url)
    const { data: owners, get: getOwners } = useFetch(url)
    const { data: parkingSpaces, get: getParkingSpaces } = useFetch(url)



    // Modals

    const [showModalEditApartment, setShowModalEditApartment] = useState(false);
    const [showParkingSpacesModal, setShowParkingSpacesModal] = useState(false);
    const [showApartmentResidentsModal, setShowApartmentResidentsModal] = useState(false);

    const [showApartmentOwnermODAL, setShowApartmentOwnermODAL] = useState(false);
    const [showApartmentResidentEditModal, setShowApartmentResidentEditModal] = useState(false);

    const [editingParkingSpace, setEditingParkingSpace] = useState(null);


    // Apartment owners

    const [idOwner, setIdOwner] = useState("");
    const [OwnershipStartDate, setOwnershipStartDate] = useState("");
    const [OwnershipEndDate, setOwnershipEndDate] = useState("");
    const [statusApartmentOwner, setStatusApartmentOwner] = useState("");


    // Searcher

    const [search, setSearch] = useState('');
    let guestIncomesbyApartment = filterGuestIncomes(search, guestIncomes); // Don't drop


    useEffect(() => {

        // Apartment information

        setIdApartment(apartment?.data?.spartment?.idApartment);
        setTower(apartment?.data?.spartment?.tower);
        setapartmentName(apartment?.data?.spartment?.apartmentName);
        setArea(apartment?.data?.spartment?.area);
        setStatus(apartment?.data?.spartment?.status);

        // Apartments relations

        getApartment(`apartments/${id}`)
        getApartmentResidents(`aparmentResidents/${id}`)
        getApartmentOwners(`apartmentOwners/${id}`)
        getAssignedParkingSpaces(`assignedParkingSpaces/${id}`)
        getGuestIncomes(`guestIncome/byApartment/${id}`)

        // List

        getApartments('apartments')
        getResidents('residents')
        getOwners('owners')

        getParkingSpaces("parkingSpaces")

    }, [apartment?.data?.spartment])


    // Funtion searcher

    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    // Modal edit apartment owner

    const handleModalEditApartmentResident = (data) => {


        console.log(data)

        setIdResident(data.idResident)
        setResidentStartDate(data.residentStartDate)
        setResidentEndDate(data.residentEndDate)
        setStateApartmentResident(data.status)
        console.log(residentStartDate)
        // setIdOwner(data.idOwner)
        // setOwnershipStartDate(data.OwnershipStartDate)
        // setOwnershipEndDate(data.OwnershipEndDate)
        // setStatusApartmentOwner(data.status)


        setShowApartmentResidentEditModal(true)


    }
    // Modal edit apartment owner

    const handleModalEditApartmentOwner = (data) => {


        console.log(data)

        setIdOwner(data.idOwner)
        setOwnershipStartDate(data.OwnershipStartDate)
        setOwnershipEndDate(data.OwnershipEndDate)
        setStatusApartmentOwner(data.status)

        console.log(OwnershipStartDate)

        setShowApartmentOwnermODAL(true)


    }

    // Modal edit apartment

    const handleModalEditApartment = () => {

        setShowModalEditApartment(true)

    }

    // Modal create parkingspace

    const handleParkingSpacesModal = () => {

        setShowParkingSpacesModal(true)

    }

    const handleEditParkingSpaceModal = (data) => {

        console.log(data)
        setIdParkingSpace(data.idParkingSpace)
        console.log(idParkingSpace)
        console.log(data.idParkingSpace)

        setShowParkingSpacesModal(true);
    };


    // Modal create apartmentresident
    const handleApartmentResidentsModal = () => {
        setShowApartmentResidentsModal(true)

    }


    // List apartments

    const apartmentList = apartments?.data && apartments?.data?.apartments

        ? apartments.data.apartments
            .map(apartment => ({
                value: apartment.idApartment,
                label: `${apartment.apartmentName} - ${apartment.tower}`
            }))
        : [];

    // List residents

    const residentsList = residents && residents?.data?.residents
        ? residents?.data?.residents
            .map(resident => ({
                value: resident.idResident,
                label: ` ${resident.name} ${resident.lastName} - ${resident.docNumber}`
            }))
        : [];

    // List owners

    const OwnersList = owners && owners?.data?.owners
        ? owners?.data?.owners
            .map(owner => ({
                value: owner.idOwner,
                label: ` ${owner.name} ${owner.lastName} - ${owner.docNumber}`
            }))
        : [];


    // List ParkingSpaces


    const parkingSpacesList = parkingSpaces.data && parkingSpaces.data.parkingSpaces
        ? parkingSpaces.data.parkingSpaces
            .filter(parking => parking.parkingType === 'Private')
            .map(parking => ({
                value: parking.idParkingSpace,
                label: `${parking.parkingName} - ${parking.parkingType}`
            }))
        : [];






    // Create ApartmentResidents 

    const handleCreateApartmentPerResidentExist = (event) => {

        const data = {

            idApartment,
            idResident,
            residentStartDate,
            // Add other properties as needed for different requests
        };

        handleRequest(event, 'aparmentResidents', `Agregaste un residente al apartamento ${apartmentName} exitosamente`, setShowApartmentResidentsModal, data);

    };

    // create assignedparkingspace 

    const handleCreateAssignedParking = (event) => {

        const data = {

            idApartment,
            idParkingSpace

        };
        handleRequest(event, 'assignedParkingSpaces', `Agregaste un parqueadero al apartamento ${apartmentName} exitosamente`, setShowParkingSpacesModal, data);
    };






    // Delete apartmentresident

    const deleteResidentApartment = async (id) => {
        const deleteFunction = async () => {
            await delApartmentResidents('aparmentResidents', { idApartmentResident: id });
        };

        showConfirmationDialog('¿Estas seguro?', 'Esta acción no es reversible', 'Eliminar', deleteFunction);
    };

    // Delete apartmentowner


    const deleteApartmentOwner = async (id, idApartment) => {
        const deleteFunction = async () => {
            await delApartmentOwners('apartmentOwners', { idApartmentOwner: id });
        };

        showConfirmationDialog('¿Estas seguro?', 'Esta acción no es reversible', 'Eliminar', deleteFunction);
    };

    // delete assigned parking space

    const deleteParkingSpace = async (id) => {
        const deleteFunction = async () => {
            await delAssignedParkingSpaces('assignedParkingSpaces', { idAssignedParking: id });
        };

        showConfirmationDialog('¿Estas seguro?', 'Esta acción no es reversible', 'Eliminar', deleteFunction);
    };


    // const handleEditSubmit = async (event) => {
    //     event.preventDefault();
    //     // const url = 'https://apptowerbackend.onrender.com/api/apartments';
    //     const url = 'http://localhost:3000/api/apartments';
    //     const data = {
    //         tower,
    //         floorNumber,
    //         apartmentsFloor,
    //         area,
    //         status
    //     };

    //     console.log('Data:', data);

    //     put("apartments", data)
    //     // const { response, error } = await useFetchpostFile(url, data);

    //     if (response) {
    //         console.log('Response:', response);
    //         Swal.fire({
    //             title: 'Éxito',
    //             text: 'Apartamento creado creado exitosamente',
    //             icon: 'success',
    //         }).then(() => {

    //             navigate('/admin/apartments');
    //         });
    //     }

    //     if (error) {
    //         console.log('Hubo un error');
    //         Swal.fire({
    //             title: 'Error',
    //             text: 'Error al crear apartamento',
    //             icon: 'error',
    //         });
    //     }
    // };



    // 6. Funtionality Tabs

    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index)
    };


    return (
        <>
            <Details>

                <InfoDetails>


                    <ContainerModule name={`Apartamento ${apartmentName}`} date1={`Torre: ${tower}`} date2={`Area: ${area} m²`} status={status} >

                        <Dropdownanchor2 name={"Editar apartamento"} icon={"edit"} onClick={(e) => {
                            e.preventDefault();
                            handleModalEditApartment();
                        }} />


                    </ContainerModule>

                    <Acordions>

                        <DropdownInfo name={"Propietarios"} to1={`/admin/owners/create/${id}`}>
                            {Array.isArray(apartmentOwners?.data?.apartmentOwners) && apartmentOwners?.data?.apartmentOwners?.length > 0 ? (
                                apartmentOwners?.data?.apartmentOwners?.map((owner, index) => (
                                    <>
                                        <Dropdownanchor

                                            // Information
                                            key={index}
                                            icon={"user-check"}
                                            name={owner.owner.name + " " + owner.owner.lastName}

                                            // Details

                                            to={`/admin/owners/details/${owner.idOwner}`}

                                            // Funtions

                                            onClick={() => {
                                                console.log('Eliminar propietario con ID:', owner.idApartmentOwner);
                                                deleteApartmentOwner(owner.idApartmentOwner)
                                            }}

                                            onClickModal={() => handleModalEditApartmentOwner(owner)}
                                        >

                                        </Dropdownanchor>
                                    </>

                                ))
                            ) : (
                                <NotificationsAlert to={`/admin/owners/create/${id}`} msg={` para agregar un Propietario.`} />

                            )}
                        </DropdownInfo>

                        <DropdownInfo

                            name={"Residentes"}
                            to1={`/admin/residents/create/${id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleApartmentResidentsModal();

                            }}>

                            {apartmentResidents.data?.apartmentResidents?.length > 0 ? (
                                apartmentResidents?.data?.apartmentResidents?.map((resident, index) => (
                                    <Dropdownanchor

                                        // Information
                                        key={index}
                                        icon={"user-check"}
                                        name={resident.resident.name + " " + resident.resident.lastName}

                                        // Details
                                        to={`/admin/residents/details/${resident.idResident}`}

                                        // Funtions

                                        onClick={() => {
                                            console.log('Eliminar residente con ID:', { key: resident.idApartmentResident });
                                            deleteResidentApartment(resident.idApartmentResident)
                                        }}

                                        onClickModal={() => handleModalEditApartmentResident(resident)}

                                    ></Dropdownanchor>

                                ))
                            ) : (
                                <NotificationsAlert to={`/admin/residents/create/${id}`} msg={` para agregar un residente.`} />
                            )}

                        </DropdownInfo>

                        <DropdownInfo

                            name={"Parqueaderos"}
                            onClick={(e) => {
                                e.preventDefault();
                                handleParkingSpacesModal();

                            }}>

                            {assignedParkingSpaces?.data?.assignedParking?.length > 0 ? (
                                assignedParkingSpaces?.data?.assignedParking?.map((parking, index) => (

                                    <Dropdownanchor

                                        // Information

                                        key={index}
                                        icon={"user-check"}
                                        name={parking.parkingSpace.parkingName}

                                        // Details
                                        to={`/admin/parkingSpace/details/${parking.idParkingSpace}`}

                                        // Funtions
                                        onClick={() => {
                                            console.log('id', { idAssignedParking: parking.idAssignedParking });
                                            deleteParkingSpace(parking.idAssignedParking)

                                        }}

                                        onClickModal={() => handleEditParkingSpaceModal(parking)}

                                    ></Dropdownanchor>
                                ))
                            ) : (
                                <NotificationsAlert to={`/admin/residents/create/${id}`} msg={` para agregar un residente.`} />
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
                        <NavListDetails index={3} name={"Multas"} toggleState={toggleState} onClick={() => toggleTab(3)} />

                    </NavDetails>

                    <TableDetails index={1} toggleState={toggleState} >

                        <TablePerson>
                            {/* <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo notificacion" href={"notificaciones/"} />
                            </DetailsActions> */}

                            <RowNotificactions date='2023/12/10' name='Bill' lastName='Gates' msg='Va llegar a las 3:00PM, por favor dejelo pasar' />



                        </TablePerson>
                    </TableDetails>

                    <TableDetails index={2} toggleState={toggleState} >
                        <TablePerson>
                            <DetailsActions>
                                <SearchButton value={search} onChange={searcher} />
                                <ButtonGoTo value="Nuevo ingreso" href={'/admin/guest_income/create'} />
                            </DetailsActions>

                            {
                                guestIncomesbyApartment && guestIncomesbyApartment.length > 0 ? (
                                    guestIncomesbyApartment.map((income, index) => (

                                        <div className='mt-2'>
                                            <RowNotificactions

                                                // Information
                                                icon="arrow-up-right"
                                                name={`${income.asociatedVisitor.name}`}
                                                lastName={` ${income.asociatedVisitor.lastname}`}
                                                date={format(new Date(income.createdAt), 'dd MMMM yyyy HH:mm:ss')}
                                                msg={`Se dirije al apartamento ${apartmentName} ${income.observations}`}

                                                status="Active"

                                            ></RowNotificactions>
                                        </div>

                                    ))
                                ) : (
                                    <div className='mt-4 ml-2'>
                                        <NotificationsAlert to={`/admin/guest_income/create/${id}`} msg={` para agregar un ingreso.`} />

                                    </div>
                                )}

                        </TablePerson>

                    </TableDetails>


                </ListsDetails>
            </Details >

            {showModalEditApartment &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowModalEditApartment}>
                            <Modal
                                onClick={handleEditSubmit}
                                showModal={setShowModalEditApartment}
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
                                onClick={handleCreateApartmentPerResidentExist}
                                showModal={setShowApartmentResidentsModal}
                                title={"Agregar residente existente"}


                            >
                                <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <InputsSelect id={"select"} options={residentsList} name={"Residente"}
                                    value={idResident} onChange={e => setIdResident(e.target.value)}></InputsSelect>


                                <Inputs name="Fecha de inicio de residencia" type={"date"}
                                    value={residentStartDate} onChange={e => setResidentStartDate(e.target.value)}></Inputs>
                                {/* <Inputs name="Fecha de fin de residencia" type={"date"}
                                    value={residentEndDate} onChange={e => setResidentEndDate(e.target.value)}></Inputs> */}
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

            {showParkingSpacesModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowParkingSpacesModal}>
                            <Modal
                                onClick={handleCreateAssignedParking}
                                showModal={setShowParkingSpacesModal}
                                title={editingParkingSpace ? "Editar parqueadero" : "Asignar parqueadero"}

                            >
                                <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <InputsSelect id={"select"} options={parkingSpacesList} name={"Parqueaderos"}
                                    value={idParkingSpace} onChange={e => setIdParkingSpace(e.target.value)}></InputsSelect>



                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

            {showApartmentOwnermODAL &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowApartmentOwnermODAL}>
                            <Modal
                                // onClick={handleCreateAssignedParking}
                                showModal={setShowApartmentOwnermODAL}
                                title={"Editar propietario por apartamento"}

                            >
                                <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>
                                <InputsSelect id={"select"} options={OwnersList} name={"Propietario"}
                                    value={idOwner} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <Inputs name="Fecha de propiedad" type={"date"} readonly
                                    value={OwnershipStartDate} onChange={e => setOwnershipStartDate(e.target.value)}></Inputs>

                                <Inputs name="Fecha finalizacion de propiedad" type={"date"}
                                    value={OwnershipEndDate} onChange={e => setOwnershipEndDate(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                    value={statusApartmentOwner} onChange={e => setStatusApartmentOwner(e.target.value)}></InputsSelect>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

            {showApartmentResidentEditModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowApartmentResidentEditModal}>
                            <Modal
                                // onClick={handleCreateAssignedParking}
                                showModal={setShowApartmentResidentEditModal}
                                title={"Editar residente por apartamento"}

                            >
                                <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>
                                <InputsSelect id={"select"} options={residentsList} name={"Residentes"}
                                    value={idResident} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <Inputs name="Fecha de inicio de residencia" type={"date"} readonly
                                    value={residentStartDate} onChange={e => setOwnershipStartDate(e.target.value)}></Inputs>

                                <Inputs name="Fecha finalizacion de residencia" type={"date"}
                                    value={residentEndDate} onChange={e => setOwnershipEndDate(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                    value={statusApartmentResident} onChange={e => setStatusApartmentOwner(e.target.value)}></InputsSelect>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}
        </>
    )
}
