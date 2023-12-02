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

export const Vehicle = () => {
  const { data, load, error } = useFetchget('https://apptowerbackend.onrender.com/api/vehicle')
  console.log(data.vehicle)
  console.log(load)
  console.log(error)
  return (
    <>
      <ContainerTable title='Vehiculos'>
        <DivRow>
          <DropdownExcel />
          <SearchButton />
          <ButtonGoTo value='Crear vehiculos' href='create' />
        </DivRow>
        <TablePerson>
          <Thead>
            <Th name={'#'}></Th>
            <Th name={'nombre'}></Th>
            <Th name={'placa'}></Th>
            <Th name={'apartamento'}></Th>
            <Th name={'estado'}></Th>
            <Th name={''}></Th>
            <Th></Th>
          </Thead>
          <Tbody>
            <Row></Row>
            {
              load && <h1 className='d-flex'>Cargando...</h1>
            }
            {
              error && <h1 className='d-flex'>Error: {error}</h1>
            }
            {
              data.vehicle?.map(vehicle =>( 
                <Row
                  nombre={vehicle.typeuser}
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
