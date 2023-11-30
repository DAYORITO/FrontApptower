
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


export const SpaceDetails = () => {
  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index) => {
    console.log(index)
    setToggleState(index)
  };

  return (
    <>
      <Details>
        
          <InfoDetails>
            <FormContainer name='Salon social'>
            {/* <FormButton name='Crear espacio' backButton='Regresar' to='/admin/spaces/' /> */}

              <Uploader name="img" />
              <InputsSelect name={"Tipo de espacio"} options={spacesTypes} readonly></InputsSelect>
              <Inputs name="Nombre espacio" placeholder="Ejemplo: 101"></Inputs>
              <Inputs name="Area" type="number" readonly ></Inputs>
              <Inputs name="Capacidad" type="number" readonly></Inputs>
              <InputsSelect name={"Estado"} options={statusList} readonly></InputsSelect>

              <FormButton name='Crear espacio' backButton='Regresar' to='/admin/spaces/' />

            </FormContainer>
          </InfoDetails>

          <ListsDetails>
            <NavDetails>

              <NavListDetails index={1} name={"Reservas"} toggleState={toggleState} onClick={() => toggleTab(1)} />

            </NavDetails>

            <TableDetails toggleState={1} >
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

            <TableDetails index={2}>
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
