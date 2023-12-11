
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
export const Vehicle = () => {
  const { data, load, error } = useFetchget('vehicle')
  console.log(data)
  console.log(load)
  console.log(error)
  
  
  return (
    <>
      <ContainerTable title='Vehiculo'
        buttonToGo={<ButtonGoTo value='Crear Vehiculo' href='create' />}
      >
        
        <TablePerson>
          <Thead>
            <Th name={'placa'}></Th>
            <Th name={'detalle'}></Th>
            <Th name={'apartamento'}></Th>
            <Th name={''}></Th>
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
              data.vehicle?.map(vehicles => (
                <Row
                icon='truck'
                  name={vehicles.licenseplate}
                  status={vehicles.state}
                  op2={vehicles.description}
                  op3={vehicles.Apartment.apartmentName}
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
