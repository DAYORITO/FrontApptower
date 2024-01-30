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
import { useFetch } from "../../../Hooks/useFetch"
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


import { filterFines, filterGuestIncomes, putRequest, postRequest, showConfirmationDialog } from '../../../Helpers/Helpers'



export const ApartmentDetails = (props) => {


    // API URL

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Apartment information

    const { id } = useParams();
    const [area, setArea] = useState('');
    const [tower, setTower] = useState('');
    const [status, setStatus] = useState('');
    const [idApartment, setIdApartment] = useState("");
    const [apartmentName, setapartmentName] = useState('');

    // Apartment residents

    const [idApartmentResident, setIdApartmentResident] = useState("");
    const [idResident, setIdResident] = useState("");
    const [residentStartDate, setResidentStartDate] = useState("");
    const [residentEndDate, setResidentEndDate] = useState("");
    const [statusApartmentResident, setStateApartmentResident] = useState("");


    // Apartments relations

    const { data: apartment, put: putApartment, get: getApartment } = useFetch(url)
    const { data: apartmentResidents, put: putApartmentResidents, get: getApartmentResidents, del: delApartmentResidents } = useFetch(url)
    const { data: apartmentOwners, put: putApartmentOwner, get: getApartmentOwners, del: delApartmentOwners } = useFetch(url)
    const { data: assignedParkingSpaces, put: putAssignedParkingSpaces, get: getAssignedParkingSpaces, del: delAssignedParkingSpaces } = useFetch(url)
    const { data: guestIncomes, get: getGuestIncomes } = useFetch(url)
    const { data: fines, get: getFines } = useFetch(url)
    const { data: vehicles, get: getVehicles } = useFetch(url)


    // Parking spaces

    const [idParkingSpace, setIdParkingSpace] = useState("");
    const [idAssignedParking, setIdAssignedParking] = useState("");


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

    const [editingParkingSpace, setEditingParkingSpace] = useState(false);


    // Apartment owners

    const [idApartmentOwner, setIdApartmentOwner] = useState("");
    const [idOwner, setIdOwner] = useState("");
    const [OwnershipStartDate, setOwnershipStartDate] = useState("");
    const [OwnershipEndDate, setOwnershipEndDate] = useState("");
    const [statusApartmentOwner, setStatusApartmentOwner] = useState("");


    // Searcher icnomes

    const [search, setSearch] = useState('');
    let guestIncomesbyApartment = filterGuestIncomes(search, guestIncomes); // Don't drop

    // Seacher fines

    const [searchFine, setSearchFine] = useState('');
    let fineByApartment = filterFines(searchFine, fines);

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
        getFines(`fines/byApartment/${id}`)
        getVehicles(`vehicle/${id}`)


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

    const searcherFines = (e) => {
        setSearchFine(e.target.value);
        console.log(e.target.value);
    }


    // Modal edit apartment owner

    const handleModalEditApartmentResident = (data) => {


        console.log(data)
        setIdApartmentResident(data.idApartmentResident)
        setIdResident(data.idResident)
        setResidentStartDate(format(new Date(data.residentStartDate), 'yyyy-MM-dd'))
        setResidentEndDate(format(new Date(data.residentEndDate), 'yyyy-MM-dd'))
        setStateApartmentResident(data.status)
        setShowApartmentResidentEditModal(true)

    }
    // Modal edit apartment owner

    const handleModalEditApartmentOwner = (data) => {


        setIdApartmentOwner(data)
        setIdOwner(data.idOwner)
        setOwnershipStartDate(format(new Date(data.OwnershipStartDate), 'yyyy-MM-dd'))
        setOwnershipEndDate(format(new Date(data.OwnershipEndDate), 'yyyy-MM-dd'))
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
        setEditingParkingSpace(false)


    }


    const handleEditParkingSpaceModal = (data) => {

        console.log(data)
        setIdParkingSpace(data.idParkingSpace)
        setIdAssignedParking(data.idAssignedParking)
        console.log(data.idParkingSpace)
        setEditingParkingSpace(true)
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

    // List apartmentsOwners

    const apartmentOwnersList = apartmentOwners?.data && Array.isArray(apartmentOwners?.data?.apartmentOwners)
        ? apartmentOwners.data.apartmentOwners
            // .filter(apartmentOwner => apartmentOwner.status === 'Active')
            .map(apartmentOwner => ({
                ...apartmentOwner,
            }))
        : [];

    // List apartmentsResidents

    const apartmentResidentsList = apartmentResidents?.data && Array.isArray(apartmentResidents?.data?.apartmentResidents)
        ? apartmentResidents.data.apartmentResidents
            .filter(resident => resident.status === 'Active')
            .map(resident => ({
                ...resident,
            }))
        : [];

    // List apartmentsResidents

    const assignedParkingSpacesList = assignedParkingSpaces?.data && Array.isArray(assignedParkingSpaces?.data?.assignedParking)
        ? assignedParkingSpaces.data.assignedParking
            .map(assignedParking => ({
                ...assignedParking,
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


    // List ParkingSpaces

    const vehiclesList = vehicles?.data && Array.isArray(vehicles?.data?.vehicle)
        ? vehicles?.data?.vehicle
            .map(vehicle => ({
                ...vehicle,
            }))
        : [];

    console.log(vehiclesList)




    // Create ApartmentResidents 

    const handleCreateApartmentPerResidentExist = (event) => {

        const data = {

            idApartment,
            idResident,
            residentStartDate,
            // Add other properties as needed for different requests
        };

        postRequest(event, 'aparmentResidents', `Agregaste un residente al apartamento ${apartmentName} exitosamente`, setShowApartmentResidentsModal, data, url);

    };

    // create assignedparkingspace 

    const handleCreateAssignedParking = (event) => {

        const data = {

            idApartment,
            idParkingSpace

        };
        postRequest(event, 'assignedParkingSpaces', `Agregaste un parqueadero al apartamento ${apartmentName} exitosamente`, setShowParkingSpacesModal, data, url);
    };



    // Edit apartment

    const handleUpdateResident = (event) => {

        const data = {

            idApartment: idApartment,
            tower: tower,
            apartmentName: apartmentName,
            area: area,
            status: status

        }

        console.log("edit data", data)

        putRequest(event, 'apartments', `Modificaste apartamento ${apartmentName}`, data, setShowModalEditApartment, putApartment, getApartment);

    };

    // Edit apartmentowner

    const handleUpdateApartmentOwner = (event) => {

        const data = {

            idApartmentOwner: idApartmentOwner,
            idOwner: idOwner,
            OwnershipStartDate: OwnershipStartDate,
            OwnershipEndDate: OwnershipEndDate,
            status: statusApartmentOwner

        }

        console.log("edit data", data)

        putRequest(event, 'apartmentOwners', `Modificaste al propietario del apto ${apartmentName}`, data, setShowApartmentOwnermODAL, putApartmentOwner, getApartmentOwners);

    };

    // Edit apartmentresident

    const handleUpdateApartmentResident = (event) => {



        const data = {

            idApartmentResident: idApartmentResident,
            idResident: idResident,
            idApartment: idApartment,
            residentStartDate: residentStartDate,
            residentEndDate: residentEndDate,
            status: statusApartmentResident


        }

        console.log("edit data", data)

        putRequest(event, 'aparmentResidents', `Modificaste un residente del apto ${apartmentName}`, data, setShowApartmentResidentEditModal, putApartmentResidents, getApartmentResidents);

    };


    // Edit assignedparkingspace

    const handleUpdateAssignedParking = (event) => {

        const data = {

            idAssignedParking: idAssignedParking,
            idParkingSpace: parseInt(idParkingSpace),
            idApartment: idApartment

        }

        // console.log("edit data", data)

        putRequest(event, 'assignedParkingSpaces', `Re asignaste el parqueadero`, data, setShowParkingSpacesModal, putAssignedParkingSpaces, getAssignedParkingSpaces);

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


    // 6. Funtionality Tabs

    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index)
    };


    return (
        <>
            <Details>

                
                <ContainerModule name={`Apartamento ${apartmentName}`} date1={`Torre: ${tower} `} date2={`Area: ${area} m²`} status={status} >

                    <Dropdownanchor2 name={"Editar apartamento"} icon={"edit"} onClick={(e) => {
                        e.preventDefault();
                        handleModalEditApartment();
                    }} />


                </ContainerModule>
                <InfoDetails>




                    <Acordions>

                        <DropdownInfo name={`${apartmentOwnersList.length} Propietarios `} to1={`/admin/owners/create/${id}`}>
                            {apartmentOwnersList.length > 0 ? (
                                apartmentOwnersList.map((owner, index) => (
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
                                            deleteApartmentOwner(owner.idApartmentOwner);
                                        }}
                                        onClickModal={() => handleModalEditApartmentOwner(owner)}
                                    >
                                    </Dropdownanchor>
                                ))
                            ) : (
                                <NotificationsAlert to={`/admin/owners/create/${id}`} msg={` para agregar un Propietario.`} />
                            )}
                        </DropdownInfo>


                        <DropdownInfo
                            name={`${apartmentResidentsList.length} Residentes `}
                            to1={`/admin/residents/create/${id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleApartmentResidentsModal();
                            }}
                        >
                            {apartmentResidentsList.length > 0 ? (
                                apartmentResidentsList.map((resident, index) => (
                                    <Dropdownanchor

                                        // Information

                                        key={index}
                                        icon={"user-check"}
                                        name={resident.resident.name + " " + resident.resident.lastName}

                                        // Details

                                        to={`/admin/residents/details/${resident.idResident}`}

                                        // Functions

                                        onClick={() => {
                                            console.log('Eliminar residente con ID:', { key: resident.idApartmentResident });
                                            deleteResidentApartment(resident.idApartmentResident);
                                        }}

                                        onClickModal={() => handleModalEditApartmentResident(resident)}

                                    ></Dropdownanchor>
                                ))
                            ) : (
                                <NotificationsAlert to={`/admin/residents/create/${id}`} msg={` para agregar un residente.`} />
                            )}
                        </DropdownInfo>

                        <DropdownInfo

                            name={`${assignedParkingSpacesList.length} Parqueaderos `}
                            onClick={(e) => {
                                e.preventDefault();
                                handleParkingSpacesModal();

                            }}>


                            {assignedParkingSpacesList?.length > 0 ? (
                                assignedParkingSpacesList?.map((parking, index) => (

                                    <Dropdownanchor

                                        // Information

                                        key={index}
                                        icon={"user-check"}
                                        name={"Plaza " + parking.parkingSpace.parkingName}

                                        // Details
                                        to={`/ admin / parkingSpace / details / ${parking.idParkingSpace} `}

                                        // Funtions
                                        // onClick={() => {
                                        //     console.log('id', { idAssignedParking: parking.idAssignedParking });
                                        //     deleteParkingSpace(parking.idAssignedParking)

                                        // }}

                                        onClickModal={() => handleEditParkingSpaceModal(parking)}

                                    ></Dropdownanchor>
                                ))
                            ) : (
                                <NotificationsAlert to={`/ admin / residents / create / ${id} `} msg={` para agregar un residente.`} />
                            )}

                        </DropdownInfo>



                        <DropdownInfo name={`${vehiclesList.length} Parqueaderos `} to1={`/admin/vehicle/create`}>
                            {vehiclesList.length > 0 ? (
                                vehiclesList.map((vehicle, index) => (
                                    <Dropdownanchor
                                        // Information
                                        key={index}
                                        name={vehicle.licenseplate != null ? vehicle.licenseplate : vehicle.idvehicle}

                                        // Details
                                        to={`/admin/vehicle/details/${vehicle.idvehicle}`}

                                    // Funtions

                                    >
                                    </Dropdownanchor>
                                ))
                            ) : (
                                <NotificationsAlert to={`/admin/vehicle/create`} msg={` para agregar un vehiculo.`} />
                            )}
                        </DropdownInfo>
                        <div class="col-auto back mt-5 mb-5" >
                            <Link to={"/admin/apartments/"} type="button" class="btn btn-sm btn-secondary">Regresar</Link>
                        </div>
                    </Acordions>


                    <Acordions>
                        <DropdownInfo name={"Notificaciones"} to1={`/admin/notifications/create/${id}`}>

                            {/* <DetailsActions>
                            <SearchButton />
                            <ButtonGoTo value="Nuevo notificacion" href={"notificaciones/"} />
                        </DetailsActions> */}

                            <RowNotificactions date='2023/12/10' name='Bill' lastName='Gates' msg='Va llegar a las 3:00PM, por favor dejelo pasar' />

                        </DropdownInfo>

                        <DropdownInfo name={`${guestIncomesbyApartment?.length} Ingresos `}
                         to1={`/admin/owners/create/${id}`}>

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
                                                name={`${income.asociatedVisitor.name} `}
                                                lastName={` ${income.asociatedVisitor.lastname} `}
                                                date={format(new Date(income.createdAt), 'yyyy-MM-dd')}
                                                msg={`Se dirije al apartamento ${apartmentName} ${income.observations} `}

                                                status="Active"

                                            ></RowNotificactions>
                                        </div>

                                    ))
                                ) : (
                                    <div className='mt-4 ml-2'>
                                        <NotificationsAlert to={`/ admin / guest_income / create / ${id} `} msg={` para agregar un ingreso.`} />

                                    </div>
                                )}
                        </DropdownInfo>

                        <DropdownInfo name={` Multas `} to1={`/admin/owners/create/${id}`}>

                            <DetailsActions>
                                <SearchButton value={searchFine} onChange={searcherFines} />
                                <ButtonGoTo value="Nueva multa" href={'/admin/fines/create'} />
                            </DetailsActions>

                            {
                                fineByApartment && fineByApartment.length > 0 ? (
                                    fineByApartment.map((fine, index) => (

                                        <div className='mt-2'>
                                            <RowNotificactions

                                                // Information
                                                icon="x-square"
                                                name={`${fine.fineType} `}
                                                lastName={``}
                                                date={format(new Date(fine.createdAt), 'yyyy-MM-dd')}
                                                msg={`${fine.details} `}

                                            // status="Active"

                                            ></RowNotificactions>
                                        </div>

                                    ))
                                ) : (
                                    <div className='mt-4 ml-2'>
                                        <NotificationsAlert to={`/ admin / fines / create / ${id} `} msg={` para agregar un multa.`} />

                                    </div>
                                )}
                        </DropdownInfo>




                    </Acordions>



                </InfoDetails>


            </Details >

            {showModalEditApartment &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowModalEditApartment}>
                            <Modal
                                onClick={handleUpdateResident}
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

                                <Inputs type={"hidden"}
                                    value={idApartment} onChange={e => setIdApartmentOwner(e.target.value)}></Inputs>

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
                                onClick={editingParkingSpace ? handleUpdateAssignedParking : handleCreateAssignedParking}
                                showModal={setShowParkingSpacesModal}
                                title={editingParkingSpace ? "Editar parqueadero" : "Asignar parqueadero"}

                            >
                                <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <InputsSelect id={"select"} options={parkingSpacesList} name={"Parqueaderos"}
                                    value={idParkingSpace} onChange={e => setIdParkingSpace(e.target.value)}></InputsSelect>

                                <Inputs type={"hidden"}
                                    value={idAssignedParking} onChange={e => setIdAssignedParking(e.target.value)}></Inputs>


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
                                onClick={handleUpdateApartmentOwner}
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
                                onClick={handleUpdateApartmentResident}
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

                                <Inputs type={"hidden"}
                                    value={idApartmentResident} onChange={e => setIdApartmentResident(e.target.value)}></Inputs>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}
        </>
    )
}
