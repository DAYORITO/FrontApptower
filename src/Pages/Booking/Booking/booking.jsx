/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { format, parseISO } from 'date-fns';
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
import { useState } from 'react'

export const Booking = () => {
  const { data, load, error } = useFetchget('booking')
  console.log(load)
  console.log(error)
  console.log(data.booking)
  const [search, setSearch] = useState('');
  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)
  }
  let filterData = [];

  if (!search) {
    filterData = data;
  } else {
    filterData = data.apartments.filter((dato) =>
      dato.apartmentName.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <>
      <ContainerTable title='Reservas'
        dropdown={<DropdownExcel />}
        search={<SearchButton value={search} onChange={searcher}/>}
        buttonToGo={<ButtonGoTo value='Crear Reserva' href='create' />}
      >
        <TablePerson>
          <Thead>
            <Th></Th>
            <Th name={'Nombre del Solicitante'}></Th>
            <Th name={'Cantidad de personas'}></Th>
            <Th name={'Fecha de Inicio'}></Th>
            <Th name={'Fecha de Fin'}></Th>
            <Th></Th>
          </Thead>
          <Tbody>
            {
              load && <h1 className='d-flex'>Cargando...</h1>
            }
            {
              error && <h1 className='d-flex'>Error: {error}</h1>
            }
            {
              data.booking?.map(booking =>(   
                <Row
                  name={booking.Space.spaceName}
                  icon='calendar'
                  lastName={''}
                  docType={booking.status}
                  status={booking.status}
                  op1={booking.user.name + ' ' + booking.user.lastname}
                  op2={booking.amount}
                  op3={format(parseISO(booking.bookingdate), 'PPpp')}
                  op4={format(parseISO(booking.finalDate), 'PPpp')}
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
