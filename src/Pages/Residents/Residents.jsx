import React from 'react'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'

export const Residents = () => {
    return (
        <>

            <ContainerTable title='Residentes'>
            <ContainerTable title='Residents'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Residente' href='/#/admin/residents/create' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Resident information'}></Th>
                        <Th name={'Phone'}></Th>
                        <Th name={'Email'}></Th>
                    </Thead>
                    <Tbody>
                        <Row
                            docType='CC'
                            docNumber='1007238447'
                            name='Emmanuel'
                            lastName='Tabares'
                            phone='3218298707'
                            email='emanueltabares@gmail.com'
                        >
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>                        </Row>
                        <Row
                            docType='TI'
                            docNumber='2001234567'
                            name='Maria'
                            lastName='Lopez'
                            phone='3216666666'
                            email='maria@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                        <Row
                            docType='CC'
                            docNumber='3003456789'
                            name='Carlos'
                            lastName='Rodriguez'
                            phone='3217777777'
                            email='carlos@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                        <Row
                            docType='CC'
                            docNumber='4004567890'
                            name='Laura'
                            lastName='Gonzalez'
                            phone='3218888888'
                            email='laura@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                        <Row
                            docType='CC'
                            docNumber='5005678901'
                            name='Pedro'
                            lastName='Martinez'
                            phone='3219999999'
                            email='pedro@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                        <Row
                            docType='TI'
                            docNumber='6006789012'
                            name='Sofia'
                            lastName='Ramirez'
                            phone='3220000000'
                            email='sofia@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                        <Row
                            docType='CC'
                            docNumber='7007890123'
                            name='Elena'
                            lastName='Hernandez'
                            phone='3221111111'
                            email='elena@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                        <Row
                            docType='CC'
                            docNumber='8008901234'
                            name='Diego'
                            lastName='Garcia'
                            phone='3222222222'
                            email='diego@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                        <Row
                            docType='TI'
                            docNumber='9009012345'
                            name='Lucia'
                            lastName='Alvarez'
                            phone='3223333333'
                            email='lucia@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                        <Row
                            docType='CC'
                            docNumber='1010123456'
                            name='Manuel'
                            lastName='Diaz'
                            phone='3224444444'
                            email='manuel@example.com'>
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>
                        </Row>

                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
