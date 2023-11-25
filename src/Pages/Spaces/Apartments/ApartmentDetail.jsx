
import { Details } from "../../../Components/Details/details"
import React, { useState } from 'react'
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
import { DropdownExcel } from "../../../Components/Buttons/Buttons"


export const ApartmentDetails = () => {
    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        console.log(index)
        setToggleState(index)
    };

    return (
        <>
            <Details>

                <InfoDetails>
                    <FormContainer name='Apartamento 101'>

                        <Inputs name="Nombre apartamento" placeholder="Ejemplo: 101"
                        // value={apartmentName} onChange={e => setApartmentName(e.target.value)}
                        ></Inputs>
                        <Inputs name="Area" type="number"
                        // value={area} onChange={e => setArea(e.target.value)}
                        ></Inputs>
                        <InputsSelect name={"Estado"} options={statusList} ></InputsSelect>
                        <DropdownExcel></DropdownExcel>

                        <FormButton name='Editar apartamento' backButton='Regresar' to='/admin/apartments/' />

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

                    <TableDetails index={2} toggleState={toggleState} >
                        <TablePerson>
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
                    <TableDetails index={5} toggleState={toggleState} >
                        <TablePerson>
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
