
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'

function GuestIncome() {
  return (
    <>
        <ContainerTable title='Ingresos'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Visitante' href='/#/admin/guest_income/create' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Informacion del Ingreso'}></Th>
                        <Th name={'Fecha inicio'}></Th>
                        <Th name={'Fecha fin'}></Th>
                    </Thead>
                    <Tbody>
                        <Row
                            docType='Apto visitado'
                            docNumber='405'
                            name='Daniel'
                            lastName='Rivera'
                            phone='No registrada'
                            email='2023-11-02 11:45'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row>
                        <Row
                            docType='Apto visitado'
                            docNumber='405'
                            name='Daniel'
                            lastName='Rivera'
                            phone='No registrada'
                            email='2023-11-02 11:45'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row>

                        <Row
                            docType='Casa'
                            docNumber='101'
                            name='María'
                            lastName='González'
                            phone='No registrada'
                            email='2023-11-02 09:30'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row>

                        <Row
                            docType='Apartamento'
                            docNumber='210'
                            name='Juan'
                            lastName='Pérez'
                            phone='No registrado'
                            email='2023-11-03 14:15'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row>

                        <Row
                            docType='Casa'
                            docNumber='512'
                            name='Ana'
                            lastName='Martínez'
                            phone='2023-11-03 18:56'
                            email='2023-11-03 16:00'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row>

                        <Row
                            docType='Oficina'
                            docNumber='305'
                            name='Carlos'
                            lastName='Sánchez'
                            phone='2023-11-04 12:34'
                            email='2023-11-04 10:30'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row>

                        <Row
                            docType='Casa'
                            docNumber='203'
                            name='Luisa'
                            lastName='López'
                            phone='2023-11-06 8:00'
                            email='2023-11-05 15:45'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row>


                    </Tbody>
                </TablePerson>
            </ContainerTable>
    </>
  )
}

export default GuestIncome