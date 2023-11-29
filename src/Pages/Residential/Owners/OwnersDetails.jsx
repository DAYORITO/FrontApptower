
import { Details } from "../../../Components/Details/details"
import React, { useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { docTypes, residentsTypes, sexs, statusList } from "../../../Hooks/consts.hooks"
import { TablePerson } from '../../../Components/Tables/Tables'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { TableDetails } from "../../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"


export const OwnerDetail = () => {
  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index) => {
    console.log(index)
    setToggleState(index)
  };

  return (
    <>
      <Details>

        <InfoDetails>
          <FormContainer name='Editar propietario' buttons={<FormButton name='Editar propietario' backButton='Regresar' to='/admin/owners/'
          />}>
            {/* <FormColumn> */}

            <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
            // onChange={e => setPdf(e.target.files[0])} 
            />

            <InputsSelect id={"select"} options={residentsTypes} name={"Tipo residente"}
            // value={residentType} onChange={e => setResidentType(e.target.value)}
            ></InputsSelect>

            <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"}
            // value={docType} onChange={e => setDocType(e.target.value)}
            ></InputsSelect>

            <Inputs name="Numero de documento" placeholder="1000000007"
            // value={docNumber} onChange={e => setDocNumber(e.target.value)}
            ></Inputs>

            <Inputs name="Nombre"
            // value={name} onChange={e => setName(e.target.value)}
            ></Inputs>
            <Inputs name="Apellido"
            // value={lastName} onChange={e => setLastName(e.target.value)}
            ></Inputs>

            <InputsSelect id={"select"} options={sexs} name={"Sexo"}
            // value={sex} onChange={e => setSex(e.target.value)}
            ></InputsSelect>

            <Inputs name="Fecha de nacimiento" type="Date"
            // value={birthday} onChange={e => setBirthday(e.target.value)}
            ></Inputs>

            <Inputs name="Correo" type="email"
            // value={email} onChange={e => setEmail(e.target.value)}
            ></Inputs>

            <Inputs name="Numero de telefono"
            // value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
            ></Inputs>

            <InputsSelect id={"select"} options={statusList} name={"Estado"}
            ></InputsSelect>




          </FormContainer>
        </InfoDetails>

        <ListsDetails>
          <NavDetails>

            <NavListDetails index={1} name={"Apartamento"} toggleState={toggleState} onClick={() => toggleTab(1)} />

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
