import useState from 'react'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'


function Visitors() {
    
  return (
    
    <>
     <ContainerTable title='Visitors'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Visitante' href='/#/admin/visitors/create' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Informacion del visitante'}></Th>
                        <Th name={'Acceso'}></Th>
                        <Th name={'Sexo'}></Th>
                    </Thead>
                    <Tbody>
                        <Row
                            docType='CC'
                            docNumber='1007238447'
                            name='Daniel'
                            lastName='Rivera'
                            phone='M'
                            email='Permitido'
                        >
                            <Actions accion='Agregar Ingreso'></Actions>
                            <Actions accion='Cambiar Acceso'></Actions>
                        </Row>
                        <Row
                            docType='CC'
                            docNumber='987654321'
                            name='María Rodríguez'
                            lastName='Caicedo'
                            phone='F'
                            email='Permitido'
                        >
                            <Actions accion='Agregar Ingreso'></Actions>
                            <Actions accion='Cambiar Acceso'></Actions>
                        </Row>
                        <Row
                            docType='TI'
                            docNumber='543216789'
                            name='Juan Pérez'
                            lastName='García'
                            phone='M'
                            email='Permitido'
                        >
                            <Actions accion='Agregar Ingreso'></Actions>
                            <Actions accion='Cambiar Acceso'></Actions>
                        </Row>
                        <Row
                            docType='CC'
                            docNumber='567890123'
                            name='Ana Gómez'
                            lastName='London'
                            phone='F'
                            email='Permitido'
                        >
                            <Actions accion='Agregar Ingreso'></Actions>
                            <Actions accion='Cambiar Acceso'></Actions>
                        </Row>
                        <Row
                            docType='RC'
                            docNumber='987123456'
                            name='Carlos Sánchez'
                            lastName='Lopez'
                            phone='M'
                            email='Permitido'
                        >
                            <Actions accion='Agregar Ingreso'></Actions>
                            <Actions accion='Cambiar Acceso'></Actions>
                        </Row>
                        <Row
                            docType='CE'
                            docNumber='456789012'
                            name='Luisa Martínez'
                            lastName='Pelaez'
                            phone='F'
                            email='Permitido'
                        >
                            <Actions accion='Agregar Ingreso'></Actions>
                            <Actions accion='Cambiar Acceso'></Actions>
                        </Row>

                    </Tbody>
                </TablePerson>
            </ContainerTable>
    </>
  )
}

export default Visitors