
import { Details } from "../../../Components/Details/details"
import React, { useEffect, useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { spacesTypes, statusList } from "../../../Hooks/consts.hooks"
import { TablePerson } from '../../../Components/Tables/Tables'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { TableDetails } from "../../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { Thead } from "../../../Components/Thead/Thead"
import { Th } from "../../../Components/Th/Th"
import { DivRow } from '../../../Components/DivRow/DivRow'
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { DetailsActions } from "../../../Components/DetailsActions/DetailsActions"
import { useParams } from "react-router"
import { useFetch, useFetchgetById } from "../../../Hooks/useFetch"
import { Actions } from "../../../Components/Actions/Actions"
import { Link } from "react-router-dom"
import { Dropdown } from "../../../Components/Dropdown/Dropdown"
import { Dropdownanchor, Dropdownanchor2 } from "../../../Components/DropDownAnchor/Dropdownanchor"
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { NotificationsAlert } from "../../../Components/NotificationsAlert/NotificationsAlert"


export const ApartmentDetails = (props) => {


    const { id } = useParams();
    const { data: apartment, error, load } = useFetchgetById('apartments', id);
    const { data: owners } = useFetchgetById('apartmentOwners', id)
    const { data: residents } = useFetchgetById('aparmentResidents', id)
    const { data: parkingSpace } = useFetchgetById('assignedParkingSpaces', id)


    const { data: test, loading, error: error1, get, post, put, del } = useFetch("http://localhost:3000/api/");


    const [apartmentName, setapartmentName] = useState('');
    const [area, setArea] = useState('');
    const [status, setStatus] = useState('');
    const [apartmentOwnersList, setApartmentOwnersList] = useState([])
    const [apartmentResidentsList, setApartmentResidentsList] = useState([])
    const [assignedParkingList, setAssignedParkingList] = useState([])


    useEffect(() => {

        if (apartment && apartment.spartment) {
            setapartmentName(apartment.spartment.apartmentName);
            setArea(apartment.spartment.area);
            setStatus(apartment.spartment.status);
        }

        if (owners && owners.apartmentOwners) {

            setApartmentOwnersList(owners.apartmentOwners);

        }
        if (residents && residents.apartmentResidents) {

            setApartmentResidentsList(residents.apartmentResidents);

        }
        if (parkingSpace && parkingSpace.assignedParking) {

            setAssignedParkingList(parkingSpace.assignedParking);

        }

        // const id = { idResidentApartment: residents.apartmentResidents.idResidentApartment };
        // del('/aparmentResidents', id);

    }, [apartment,
        residents,
        owners, parkingSpace]);

    useEffect(() => {
        get(`apartments/${id}`)
    }, [])

    console.log(test, 'test')
    console.log(error1, 'Error')

    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        // console.log(index)
        setToggleState(index)
    };



    return (
        <>
            <Details>

                <InfoDetails>


                    <ContainerModule name={`Apartamento ${apartmentName}` } status={status} >

                        <Dropdownanchor2 name={"Editar apartamento"} icon={"edit"} />

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

                        <DropdownInfo name={"Residentes"} to1="/admin/residents/create">
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
                        <NavListDetails index={3} name={"Visitantes"} toggleState={toggleState} onClick={() => toggleTab(3)} />

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
                    <TableDetails index={3} toggleState={toggleState} >

                        <TablePerson>
                            <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo visitante" />
                            </DetailsActions>
                            <Tbody>
                                <Row
                                    docType='CC'
                                    docNumber='1007238447'
                                    name='Emmanuel'
                                    lastName='Tabares'
                                // phone='3218298707'
                                // email='emanueltabares@gmail.com'
                                // file={"https://res.cloudinary.com/ddptpzasb/raw/upload/v1700529918/Documents/f709663c-1a9f-46d9-8cb5-4005f22c14d8"}
                                >
                                </Row>
                                <Row
                                    docType='CC'
                                    docNumber='1007238447'
                                    name='Emmanuel'
                                    lastName='Tabares'
                                // phone='3218298707'
                                // email='emanueltabares@gmail.com'
                                // file={"https://res.cloudinary.com/ddptpzasb/raw/upload/v1700529918/Documents/f709663c-1a9f-46d9-8cb5-4005f22c14d8"}
                                >
                                </Row>
                                <Row
                                    docType='CC'
                                    docNumber='1007238447'
                                    name='Emmanuel'
                                    lastName='Tabares'
                                // phone='3218298707'
                                // email='emanueltabares@gmail.com'
                                // file={"https://res.cloudinary.com/ddptpzasb/raw/upload/v1700529918/Documents/f709663c-1a9f-46d9-8cb5-4005f22c14d8"}
                                >
                                </Row>
                                <Row
                                    docType='CC'
                                    docNumber='1007238447'
                                    name='Emmanuel'
                                    lastName='Tabares'
                                // phone='3218298707'
                                // email='emanueltabares@gmail.com'
                                // file={"https://res.cloudinary.com/ddptpzasb/raw/upload/v1700529918/Documents/f709663c-1a9f-46d9-8cb5-4005f22c14d8"}
                                >
                                </Row>
                            </Tbody>
                        </TablePerson>

                    </TableDetails>

                </ListsDetails>
            </Details >
        </>
    )
}
