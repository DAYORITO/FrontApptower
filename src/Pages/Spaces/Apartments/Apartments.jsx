import { useFetchget } from '../../../Hooks/useFetch'
import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import { DivRow } from '../../../Components/DivRow/DivRow'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'



export const Apartments = () => {

  const { data, load, error } = useFetchget('apartments')
  console.log(data.apartments)

  return (
    <>

      <ContainerTable title='Apartamentos'>
        <DivRow>
          <DropdownExcel />
          <SearchButton />
          <ButtonGoTo value='Crear Residente' href='create' />
        </DivRow>

        <TablePerson>
          <Thead>
            <Th name={"Apartamento"} />

            <Th name={'Respoonsables'}></Th>
            <Th name={'Notificaciones'}></Th>
            <Th />
            <Th />

          </Thead>
          <Tbody>
            
            {data.apartments?.map(apartment => (
              <Row

                icon={"home"}
                status={apartment.status}
                docType={"Area"}
                docNumber={apartment.area + " m²" }
                name={"Apartamento"}
                lastName={apartment.apartmentName}
                op1={"Jhon mario"}
                op2={"6"}
                op3={""}

                to={`details/${apartment.idApartment}`}

              >
                <Actions accion='Editar' />
                <Actions accion='Reservar' />
              </Row>
            ))}



          </Tbody>
        </TablePerson>
      </ContainerTable>
    </>)
}
