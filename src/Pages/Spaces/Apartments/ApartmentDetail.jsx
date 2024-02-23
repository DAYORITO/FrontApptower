import React, { useEffect, useState } from 'react'

import Inputs from '../../../Components/Inputs/Inputs'
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { Details } from "../../../Components/Details/details"
import { statusList } from "../../../Hooks/consts.hooks"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons"
import { DetailsActions } from "../../../Components/DetailsActions/DetailsActions"
import { useFetch } from "../../../Hooks/useFetch"
import { Dropdownanchor } from "../../../Components/DropDownAnchor/Dropdownanchor"
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { NotificationsAlert } from "../../../Components/NotificationsAlert/NotificationsAlert"
import { ModalContainer, Modal } from "../../../Components/Modals/ModalTwo"

import { createPortal } from "react-dom"
import { useParams } from "react-router"
import { format } from 'date-fns';


import { putRequest, postRequest, showConfirmationDialog, filter } from '../../../Helpers/Helpers'
import { SmalSpinner, Spinner } from '../../../Components/Spinner/Spinner'



export const ApartmentDetails = (props) => {


    // API URL

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Apartment information

    const { id } = useParams();
    const [area, setArea] = useState('');
    const [idTower, setIdTower] = useState('');
    const [towerName, setTowerName] = useState('');
    const [status, setStatus] = useState('');
    const [idApartment, setIdApartment] = useState("");
    const [apartmentName, setApartmentName] = useState('');

    // Apartment residents

    const [idApartmentResident, setIdApartmentResident] = useState("");
    const [idResident, setIdResident] = useState("");
    const [residentStartDate, setResidentStartDate] = useState("");
    const [residentEndDate, setResidentEndDate] = useState("");
    const [statusApartmentResident, setStateApartmentResident] = useState("");


    // Apartments relations

    const { data: apartment, put: putApartment, get: getApartment, loading: loadingApartment } = useFetch(url)
    const { data: apartmentResidents, put: putApartmentResidents, get: getApartmentResidents, del: delApartmentResidents, loading: loadingApartmentResidents } = useFetch(url)
    const { data: apartmentOwners, put: putApartmentOwner, get: getApartmentOwners, del: delApartmentOwners, loading: loadingApartmentOwners } = useFetch(url)
    const { data: assignedParkingSpaces, put: putAssignedParkingSpaces, get: getAssignedParkingSpaces, del: delAssignedParkingSpaces, loading: loadingAssignedParkingSpaces } = useFetch(url)
    const { data: guestIncomes, get: getGuestIncomes, loading: loadingGuestIncomes } = useFetch(url)
    const { data: fines, get: getFines, loading: loadingFines } = useFetch(url)
    const { data: vehicles, get: getVehicles, loading: loadingVehicles } = useFetch(url)


    // Parking spaces

    const [idParkingSpace, setIdParkingSpace] = useState("");
    const [idAssignedParking, setIdAssignedParking] = useState("");


    // List

    const { data: apartments, get: getApartments } = useFetch(url)
    const { data: residents, get: getResidents } = useFetch(url)
    const { data: owners, get: getOwners } = useFetch(url)
    const { data: parkingSpaces, get: getParkingSpaces } = useFetch(url)
    const { data: towers, get: getTowers } = useFetch(url)


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

    let guestIncomesbyApartment = filter(search, guestIncomes?.data?.guestIncome, 'asociatedVisitor');

    // Seacher fines

    const [searchFine, setSearchFine] = useState('');

    let fineByApartment = filter(searchFine, fines?.data?.fines, 'fineType');


    useEffect(() => {

        // Apartment information

        setIdApartment(apartment?.data?.spartment?.idApartment);
        setIdTower(apartment?.data?.spartment?.idTower);
        setTowerName(apartment?.data?.spartment?.Tower?.towerName)
        setApartmentName(apartment?.data?.spartment?.apartmentName);
        setArea(apartment?.data?.spartment?.area);
        setStatus(apartment?.data?.spartment?.status);

    }, [apartment?.data?.spartment])

    useEffect(() => {

        try {

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
            getTowers('towers')

            getParkingSpaces("parkingSpaces")

        } catch (error) {

            console.error('Error al obtener datos del apartamento', error);

        }



    }, [])


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
        setIdApartment(data.idApartment)
        setResidentStartDate(format(new Date(data.residentStartDate), 'yyyy-MM-dd'))
        setResidentEndDate(data.residentEndDate ? format(new Date(data.residentEndDate), 'yyyy-MM-dd') : "")
        setStateApartmentResident(data.status)
        setShowApartmentResidentEditModal(true)

    }
    // Modal edit apartment owner

    const handleModalEditApartmentOwner = (data) => {

        console.log(data, "datica")
        setIdApartmentOwner(data.idApartmentOwner)
        setIdOwner(data.idOwner)
        setOwnershipStartDate(format(new Date(data.OwnershipStartDate), 'yyyy-MM-dd'))
        setOwnershipEndDate(format(new Date(data.OwnershipEndDate), 'yyyy-MM-dd'))
        setStatusApartmentOwner(data.status)

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
                label: `${apartment.apartmentName} - ${apartment.Tower.towerName}`
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
            // .filter(resident => resident.status === 'Active')
            .map(resident => ({
                ...resident,
            }))
        : [];

    // List assigned parking spaces

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
                label: ` ${resident.user.name} ${resident.user.lastName} - ${resident.user.document}`
            }))
        : [];

    // List owners

    const OwnersList = owners && owners?.data?.owners
        ? owners?.data?.owners
            .map(owner => ({
                value: owner.idOwner,
                label: ` ${owner.user.name} ${owner.user.lastName} - ${owner.user.document}`
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

    const towerList = towers?.data?.towers
        ? towers.data.towers
            .map((tower) => ({
                value: tower.idTower,
                label: `${tower.towerName}`
            }))
            .sort((a, b) => a.value - b.value) // Ordenar por idTower
        : [];


    // Create ApartmentResidents 

    const handleCreateApartmentPerResidentExist = async (event) => {

        const data = {

            idApartment,
            idResident,
            residentStartDate,
            // Add other properties as needed for different requests
        };

        await postRequest(event, 'aparmentResidents', 'POST', {}, data, url);

        getApartmentResidents(`aparmentResidents/${id}`)
        setShowApartmentResidentsModal(false)
    };

    // create assignedparkingspace 

    const handleCreateAssignedParking = async (event) => {

        const data = {

            idApartment,
            idParkingSpace

        };

        await postRequest(event, 'assignedParkingSpaces', 'POST', {}, data, url);

        getAssignedParkingSpaces(`assignedParkingSpaces/${id}`)
        setShowParkingSpacesModal(false)

    };



    // Edit apartment

    const handleUpdateResident = async (event) => {

        const data = {

            idApartment: idApartment,
            tower: idTower,
            apartmentName: apartmentName,
            area: area,
            status: status

        }

        console.log("edit data", data)

        await postRequest(event, 'apartments', 'PUT', {}, data, url);

        setShowModalEditApartment(false)


    };

    // Edit apartmentowner

    const handleUpdateApartmentOwner = async (event) => {

        const data = {

            idApartmentOwner: idApartmentOwner,
            idOwner: idOwner,
            OwnershipStartDate: OwnershipStartDate,
            OwnershipEndDate: OwnershipEndDate,
            status: statusApartmentOwner

        }

        console.log(idApartmentOwner, "idÑaña")

        console.log("edit data", data)

        await postRequest(event, 'apartmentOwners', 'PUT', {}, data, url);
        setShowApartmentOwnermODAL(false)
        getApartmentOwners(`apartmentOwners/${id}`)

    };

    // Edit apartmentresident

    const handleUpdateApartmentResident = async (event) => {

        const data = {

            idApartmentResident: idApartmentResident,
            idResident: idResident,
            idApartment: idApartment,
            residentStartDate: residentStartDate,
            residentEndDate: residentEndDate,
            status: statusApartmentResident


        }

        console.log("edit data", data)

        await postRequest(event, 'aparmentResidents', 'PUT', {}, data, url);
        getApartmentResidents(`aparmentResidents/${id}`)

        setShowApartmentResidentEditModal(false)


    };


    // Edit assignedparkingspace

    const handleUpdateAssignedParking = async (event) => {

        const data = {

            idAssignedParking: idAssignedParking,
            idParkingSpace: parseInt(idParkingSpace),
            idApartment: idApartment

        }

        // console.log("edit data", data)

        await postRequest(event, 'assignedParkingSpaces', `PUT`, {}, data, url);
        getAssignedParkingSpaces(`assignedParkingSpaces/${id}`)

        setShowParkingSpacesModal(false)
    };

    // Delete apartmentresident

    const deleteResidentApartment = async (id) => {
        const deleteFunction = async () => {
            await delApartmentResidents('aparmentResidents', { idApartmentResident: id });
        };

        showConfirmationDialog('¿Estas seguro?', 'Esta acción no es reversible', 'Eliminar', deleteFunction);

        getApartmentResidents(`aparmentResidents/${id}`)

    };

    // Delete apartmentowner


    const deleteApartmentOwner = async (id, idApartment) => {
        const deleteFunction = async () => {
            await delApartmentOwners('apartmentOwners', { idApartmentOwner: id });
        };

        showConfirmationDialog('¿Estas seguro?', 'Esta acción no es reversible', 'Eliminar', deleteFunction);

        getApartmentOwners(`apartmentOwners/${id}`)

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

    console.log(guestIncomesbyApartment)

    return (
        <>
            <Details>

                {

                    loadingApartment ? <Spinner /> :

                        <>
                            <ContainerModule
                                to='/admin/apartments/'
                                A1={`Apartamento ${apartmentName}`}
                                A5={`Bloque: ${towerName} `}
                                A6={`Area: ${area} m²`}

                                onClick2={setShowModalEditApartment}
                                actionOnClick2='Editar apartamento'
                                status={status}
                            />
                            <InfoDetails>

                                <Acordions>

                                    <DropdownInfo
                                        name={`${apartmentOwnersList.length} Propietarios `}
                                        action1={apartmentOwnersList.length > 0 ? null : "Asignar propietario"}
                                        toAction1={`/admin/owners/create/${id}`}>

                                        {
                                            loadingApartmentOwners ? <SmalSpinner /> :
                                                apartmentOwnersList.length > 0 ? (
                                                    apartmentOwnersList.map((owner, index) => (
                                                        <Dropdownanchor
                                                            // Information
                                                            key={index}
                                                            icon={"user-check"}
                                                            name={owner.owner.user.name + " " + owner.owner.user.lastName}
                                                            // Details
                                                            to={`/admin/owners/details/${owner.idOwner}`}
                                                            status={owner.status}
                                                            // // Funtions
                                                            // onClick={() => {
                                                            //     console.log('Eliminar propietario con ID:', owner.idApartmentOwner);
                                                            //     deleteApartmentOwner(owner.idApartmentOwner);
                                                            // }}
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
                                        action1={"Agregar residente existente"}
                                        onClickAction1={(e) => {
                                            e.preventDefault();
                                            handleApartmentResidentsModal();
                                        }}

                                        action2={"Agregar nuevo residente"}
                                        toAction2={`/admin/residents/create/${id}`}
                                    >
                                        {loadingApartmentResidents ? <SmalSpinner /> :
                                            apartmentResidentsList.length > 0 ? (
                                                apartmentResidentsList.map((resident, index) => (
                                                    <Dropdownanchor

                                                        // Information

                                                        key={index}
                                                        icon={"user-check"}
                                                        name={resident.resident.user.name + " " + resident.resident.user.lastName}

                                                        // Details

                                                        to={`/admin/resident/details/${resident.resident.iduser}`}
                                                        status={resident.status}
                                                        // Functions

                                                        // onClick={() => {
                                                        //     console.log('Eliminar residente con ID:', { key: resident.idApartmentResident });
                                                        //     deleteResidentApartment(resident.idApartmentResident);
                                                        // }}

                                                        onClickModal={() => handleModalEditApartmentResident(resident)}

                                                    ></Dropdownanchor>
                                                ))
                                            ) : (
                                                <NotificationsAlert to={`/admin/residents/create/${id}`} msg={` para agregar un residente.`} />
                                            )}
                                    </DropdownInfo>

                                    <DropdownInfo

                                        name={`${assignedParkingSpacesList.length} Parqueaderos `}
                                        action1={'Asignar parqueadero'}
                                        onClickAction1={(e) => {
                                            e.preventDefault();
                                            handleParkingSpacesModal();
                                        }} >



                                        {loadingAssignedParkingSpaces ? <SmalSpinner /> :
                                            assignedParkingSpacesList?.length > 0 ? (
                                                assignedParkingSpacesList?.map((parking, index) => (

                                                    <Dropdownanchor

                                                        // Information

                                                        key={index}
                                                        icon={"user-check"}
                                                        name={"Plaza " + parking.parkingSpace.parkingName}

                                                        // Details
                                                        to={`/admin/parkingSpaces/${parking.parkingSpace.parkingName}`}

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



                                    <DropdownInfo
                                        name={`${vehiclesList.length} Vehiculos `}
                                        action1={`Agregar nuevo vehiculo`}
                                        toAction1={`/admin/vehicle/create/${idApartment}`}>

                                        {loadingVehicles ? <SmalSpinner /> :
                                            vehiclesList.length > 0 ? (
                                                vehiclesList.map((vehicle, index) => (
                                                    <Dropdownanchor
                                                        // Information
                                                        key={index}
                                                        name={vehicle.licenseplate != null ? vehicle.licenseplate : vehicle.idvehicle}

                                                        // Details
                                                        to={`/admin/vehicle/details/${vehicle.idvehicle}`}
                                                        status={vehicle.state}
                                                    // Funtions

                                                    >
                                                    </Dropdownanchor>
                                                ))
                                            ) : (
                                                <NotificationsAlert to={`/admin/vehicle/create`} msg={` para agregar un vehiculo.`} />
                                            )}
                                    </DropdownInfo>

                                </Acordions>


                                <Acordions>


                                    <DropdownInfo
                                        name={`${guestIncomesbyApartment.length} Ingresos `}
                                        action1={'Agregar nuevo ingreso'}
                                        toAction1={`/admin/guest_income/create/${id}`}>

                                        <DetailsActions>
                                            <SearchButton value={search} onChange={searcher} />
                                            {/* <ButtonGoTo value="Nuevo ingreso" href={`/admin/guest_income/create/${id}`} /> */}
                                        </DetailsActions>

                                        {loadingGuestIncomes ? <SmalSpinner /> :
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
                                                    <NotificationsAlert to={`/admin/guest_income/create/${id}`} msg={` para agregar un ingreso.`} />

                                                </div>
                                            )}
                                    </DropdownInfo>

                                    <DropdownInfo
                                        name={`${fineByApartment.length} Multas `}
                                        action1={'Agregar nueva multa'}
                                        toAction1={`/admin/fines/create/${id}`}>


                                        <DetailsActions>
                                            <SearchButton value={searchFine} onChange={searcherFines} />
                                            {/* <ButtonGoTo value="Nueva multa" href={`/admin/fines/create/${id}`} /> */}
                                        </DetailsActions>

                                        {loadingFines ? <SmalSpinner /> :
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
                                                    <NotificationsAlert to={`/admin/fines/create/${id}`} msg={` para agregar un multa.`} />

                                                </div>
                                            )}
                                    </DropdownInfo>




                                </Acordions>



                            </InfoDetails>
                        </>


                }






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

                                <InputsSelect id={"select"} options={towerList} name={"Estado"}
                                    value={idTower} onChange={e => setIdTower(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Numero apartamento " type={"text"}
                                    value={apartmentName} onChange={e => setApartmentName(e.target.value)}></Inputs>

                                <Inputs name="Area del apartamento " type={"text"}
                                    value={area} onChange={e => setArea(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                    value={status} onChange={e => setStatus(e.target.value)}
                                ></InputsSelect>

                                <Inputs type={"hidden"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></Inputs>

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
                                <InputsSelect disabled id={"select"} options={apartmentList} name={"Apartamento"}
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
                                buttonDelete={editingParkingSpace ? true : false}
                            >
                                <InputsSelect disabled id={"select"} options={apartmentList} name={"Apartamento"}
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
                                buttonDelete={true}

                            >
                                <InputsSelect disabled id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <InputsSelect disabled id={"select"} options={OwnersList} name={"Propietario"}
                                    value={idOwner} onChange={e => setIdOwner(e.target.value)}></InputsSelect>

                                <Inputs readonly name="Fecha de propiedad" type={"date"}
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
                                buttonDelete={true}

                            >
                                <InputsSelect disabled id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <InputsSelect disabled id={"select"} options={residentsList} name={"Residentes"}
                                    value={idResident} onChange={e => setIdResident(e.target.value)}></InputsSelect>

                                <Inputs name="Fecha de inicio de residencia" type={"date"} readonly
                                    value={residentStartDate} onChange={e => setResidentStartDate(e.target.value)}></Inputs>

                                <Inputs name="Fecha finalizacion de residencia" type={"date"}
                                    value={residentEndDate} onChange={e => setResidentEndDate(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                    value={statusApartmentResident} onChange={e => setStateApartmentResident(e.target.value)}></InputsSelect>

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
