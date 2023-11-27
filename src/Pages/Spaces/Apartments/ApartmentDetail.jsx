
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
import { useFetchgetById } from "../../../Hooks/useFetch"
import { Actions } from "../../../Components/Actions/Actions"


export const ApartmentDetails = (props) => {


    const { id } = useParams();
    const { data: apartment, error, load } = useFetchgetById('apartments', id);

    const { data } = useFetchgetById('spacesOwners', id)


    const [apartmentName, setapartmentName] = useState('');
    const [area, setArea] = useState('');
    const [status, setStatus] = useState('');
    const [apartmentOwnersList, setApartmentOwnersList] = useState([])

    useEffect(() => {
        if (apartment && apartment.spartment) {
            setapartmentName(apartment.spartment.apartmentName);
            setArea(apartment.spartment.area);
            setStatus(apartment.spartment.status);
        }

        if (data && data.apartmentOwners) {

            setApartmentOwnersList(data.apartmentOwners);

        }
    }, [apartment, data]);

    console.log(apartmentOwnersList)


    //Funtions por update

    // const handleStatusChange = (event) => {
    //     setStatus(event.target.value);
    // };

    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        // console.log(index)
        setToggleState(index)
    };

    return (
        <>
            <Details>

                <InfoDetails>
                    <FormContainer name={`Apartamento ${apartmentName}`}>

                        <Inputs name="Nombre apartamento" placeholder="Ejemplo: 101"
                            value={apartmentName}
                        ></Inputs>
                        <Inputs name="Area" type="number"
                            value={area}
                        ></Inputs>
                        <InputsSelect name={"Estado"} options={statusList}
                            value={status}

                        ></InputsSelect>

                        <FormButton name={`Editar apartamento ${apartmentName}`} backButton='Regresar' to='/admin/apartments/' />

                    </FormContainer>
                </InfoDetails>

                <ListsDetails>
                    <NavDetails>

                        <NavListDetails index={1} name={"Notificaciones"} toggleState={toggleState} onClick={() => toggleTab(1)} />
                        <NavListDetails index={2} name={"Ingresos"} toggleState={toggleState} onClick={() => toggleTab(2)} />
                        <NavListDetails index={3} name={"Visitantes"} toggleState={toggleState} onClick={() => toggleTab(3)} />
                        <NavListDetails index={4} name={"Propietarios"} toggleState={toggleState} onClick={() => toggleTab(4)} />
                        <NavListDetails index={5} name={"Reisidentes"} toggleState={toggleState} onClick={() => toggleTab(5)} />

                    </NavDetails>

                    <TableDetails index={1} toggleState={toggleState} >

                        <TablePerson>
                            <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo notificacion" href={"notificaciones/"} />
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
                                </Row><Row
                                    docType='CC'
                                    docNumber='1007238447'
                                    name='Emmanuel'
                                    lastName='Tabares'
                                // phone='3218298707'
                                // email='emanueltabares@gmail.com'
                                // file={"https://res.cloudinary.com/ddptpzasb/raw/upload/v1700529918/Documents/f709663c-1a9f-46d9-8cb5-4005f22c14d8"}
                                >
                                </Row><Row
                                    docType='CC'
                                    docNumber='1007238447'
                                    name='Emmanuel'
                                    lastName='Tabares'
                                // phone='3218298707'
                                // email='emanueltabares@gmail.com'
                                // file={"https://res.cloudinary.com/ddptpzasb/raw/upload/v1700529918/Documents/f709663c-1a9f-46d9-8cb5-4005f22c14d8"}
                                >
                                </Row><Row
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

                    <TableDetails index={2} toggleState={toggleState} >
                        <TablePerson>
                            <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo ingreso" />
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
                            </Tbody>
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
                            </Tbody>
                        </TablePerson>

                    </TableDetails>
                    <TableDetails index={4} toggleState={toggleState} >
                        <TablePerson>
                            <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo Propietario" href={"/admin/owners/create"} />
                            </DetailsActions>
                            <Tbody>

                                {apartmentOwnersList?.map(ow => (
                                    <Row

                                        icon={"fe fe-user fe-16 text-muted"}
                                        status={ow.owner.status}
                                        docNumber={ow.owner.docNumber}
                                        name={ow.owner.name}
                                        lastName={ow.owner.lastName}
                                        docType={ow.owner.docType}
                                        op1={ow.owner.phoneNumber}

                                        to={`/admin/owners/details/${ow.owner.idOwner}`}

                                    >
                                        <Actions accion='Editar' />
                                        <Actions accion='Reservar' />
                                    </Row>
                                ))}
                            </Tbody>
                        </TablePerson>

                    </TableDetails>
                    <TableDetails index={5} toggleState={toggleState} >
                        <TablePerson>
                            <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo residentes" href={"/admin/residents/create"} />
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
                            </Tbody>
                        </TablePerson>

                    </TableDetails>
                </ListsDetails>
            </Details>
        </>
    )
}
