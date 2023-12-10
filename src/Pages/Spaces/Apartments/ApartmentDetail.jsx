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


import { filterGuestIncomes } from '../../../Helpers/Helpers'



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

    const [idResident, setIdResident] = useState("");
    const [residentStartDate, setResidentStartDate] = useState("");
    const [residentEndDate, setResidentEndDate] = useState("");

    // Apartments relations

    const { data: apartment, get: getApartment } = useFetch(url)
    const { data: apartmentResidents, get: getApartmentResidents, del: delApartmentResidents } = useFetch(url)
    const { data: apartmentOwners, get: getApartmentOwners, del: delApartmentOwners } = useFetch(url)
    const { data: assignedParkingSpaces, post, get: getAssignedParkingSpaces, del: delAssignedParkingSpaces } = useFetch(url)
    const { data: guestIncomes, get: getGuestIncomes } = useFetch(url)

    // Parking spaces

    const [idParkingSpace, setIdParkingSpace] = useState("");


    // List

    const { data: apartments, get: getApartments } = useFetch(url)
    const { data: residents, get: getResidents } = useFetch(url)
    const { data: parkingSpaces, get: getParkingSpaces } = useFetch(url)



    // Modals

    const [showModalEditApartment, setShowModalEditApartment] = useState(false);
    const [showParkingSpacesModal, setShowParkingSpacesModal] = useState(false);
    const [showApartmentResidentsModal, setShowApartmentResidentsModal] = useState(false);

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
        getParkingSpaces("parkingSpaces")

    }, [apartment?.data?.spartment])


    // Funtion searcher

    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }



    // Modal edit apartment

    const handleModalEditApartment = () => {

        setShowModalEditApartment(true)

    }

    // Modal create parkingspace

    const handleParkingSpacesModal = () => {

        setShowParkingSpacesModal(true)

    }

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


    // List ParkingSpaces


    const parkingSpacesList = parkingSpaces.data && parkingSpaces.data.parkingSpaces
        ? parkingSpaces.data.parkingSpaces
            .filter(parking => parking.parkingType === 'Private')
            .map(parking => ({
                value: parking.idParkingSpace,
                label: `${parking.parkingName} - ${parking.parkingType}`
            }))
        : [];



    // Apartment residents create

    const handleCreateApartmentPerResidentExist = async (event) => {
        try {
            event.preventDefault();

            const data = {
                idApartment,
                idResident,
                residentStartDate,
            };

            console.log('Data:', data);

            const { response, error } = await useFetchpostFile(`http://localhost:3000/api/aparmentResidents`, data);

            if (response) {
                console.log('Response:', response);

                Swal.fire({
                    title: 'Éxito',
                    text: `Agregaste un residente al apartamento ${apartmentName} exitosamente`,
                    icon: 'success',
                }).then(() => {
                    setShowApartmentResidentsModal(false);
                    getApartmentResidents(`aparmentResidents/${id}`);
                });
            }

            if (error) {
                console.error('Hubo un error:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error al crear apartamento',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error('Error inesperado:', error);
        }
    };



    // const [editedUser, setEdit] = useState(null);



    const handleCreateAssignedParking = async (event) => {

        event.preventDefault();

        const data = {

            idApartment,
            idParkingSpace,

        };

        console.log('Data:', data);
        // post("assignedParkingSpaces", data);
        const { response, error } = await useFetchpostFile(`http://localhost:3000/api/assignedParkingSpaces`, data);


        if (response) {
            console.log('Response:', response);

            Swal.fire({
                title: 'Éxito',
                text: `Agregaste un parqueadero al apartamento ${apartmentName} exitosamente`,
                icon: 'success',
            }).then(() => {


                setShowParkingSpacesModal(false);
                getAssignedParkingSpaces(`assignedParkingSpaces/${id}`);

            });
        }

        if (error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error al crear apartamento',
                icon: 'error',
            });
        }
    };


    // delete Apartmentresident 

    const deleteResidentApartment = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estas seguro?',
                text: "Esta accion no es reversible",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
            });

            if (result.isConfirmed) {


                await delApartmentResidents('aparmentResidents', { idApartmentResident: id });

                Swal.fire(
                    'Eliminado',
                    'Eliminaste el residente',
                    'success'
                );
            }
        } catch (error) {
            console.error("Error al eliminar residente:", error);
        }
    };

    // Delete apartmentowner 

    const deleteApartmentOwner = async (id, idApartment) => {
        try {
            const result = await Swal.fire({
                title: '¿Estas seguro?',
                text: "Esta accion no es reversible",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
            });

            if (result.isConfirmed) {


                await delApartmentOwners('apartmentOwners', { idApartmentOwner: id });

                Swal.fire(
                    'Eliminado',
                    'Eliminaste el propietario',
                    'success'
                );
            }
        } catch (error) {
            console.error("Error al eliminar propietario:", error);
        }
    };

    // Delete assignedparkingspace 

    const deleteParkingSpace = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estas seguro?',
                text: "Esta accion no es reversible",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
            });

            if (result.isConfirmed) {


                await delAssignedParkingSpaces('assignedParkingSpaces', { idAssignedParking: id });

                Swal.fire(
                    'Eliminado',
                    'Eliminaste el propietario',
                    'success'
                );
            }
        } catch (error) {
            console.error("Error al eliminar propietario:", error);
        }
    };




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

                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions />


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
                                // onClick={handleSaveChanges}
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
                                title={"Asignar parqueadero"}

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
        </>
    )
}
