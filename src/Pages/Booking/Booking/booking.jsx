

import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { DivRow } from '../../../Components/DivRow/DivRow'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
export const Booking = () => {
  return (
    <>
      <ContainerTable title='Reservas'>
        <DivRow>
          <DropdownExcel />
          <SearchButton />
          <ButtonGoTo value='Crear Reserva' href='create' />
        </DivRow>
        <TablePerson>
          <Thead>
            <Th name={'#'}></Th>
            <Th name={'Nombre del Solicitante'}></Th>
            <Th name={'Espacio'}></Th>
            <Th name={'Cantidad de personas'}></Th>
            <Th name={'Fecha de Inicio'}></Th>
            <Th name={'Fecha de Fin'}></Th>
            <Th></Th>
          </Thead>
          <Tbody>
            <Row
            name={'Emmanuel'}
            lastName={'Tabares'}
            docType={'Pendiente'}
            op1={'Zona Humeda'}
            op2={'2'}
            op3={'12/12/2021 12:00 pm'}
            op4={'13/12/2021 12:00 pm'}
            >
            </Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>
            <Row op1={''} op2={''}op3={''}op4={''}></Row>

          </Tbody>
        </TablePerson>
      </ContainerTable>
    </>
  )
}
