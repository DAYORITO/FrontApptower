/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */

import { useFetchget } from '../../../Hooks/useFetch'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { DivRow } from '../../../Components/DivRow/DivRow'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'

export const Booking = () => {
  const { data, load, error } = useFetchget('https://apptowerbackend.onrender.com/api/booking')
  console.log(data.booking)
  console.log(data.booking?.map(booking => booking.iduser.name))
  console.log(load)
  console.log(error)
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
            {
              data.booking?.map(booking =>( 
                <Row
                  txt={booking.idbooking}
                  nombre={booking.iduser.name}
                  op2={booking.amount}
                  op3={booking.space}
                  op4={booking.quantity}
                >
                  <Actions accion='Editar' />
                </Row>
              ))
            }
          </Tbody>
        </TablePerson>
      </ContainerTable>
    </>
  )
}
