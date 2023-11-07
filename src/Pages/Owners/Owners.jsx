import React from 'react'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'
import { Nav } from '../../Components/Nav/Nav'
import { ContainerHeader } from '../../Components/ContainerHeader/containerHeader'
import { Aside } from '../../Components/Aside/Aside'


export const Owners = () => {
    return (
        <>

            <ContainerTable title='Propietarios'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Add new ower' href='/#/admin/owners/create' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Owner information'}></Th>
                        <Th name={'Phone'}></Th>
                        <Th name={'Email'}></Th>
                    </Thead>
                    <Tbody>
                        <Row
                            name='Emmanuel'
                            lastName='Tabares Ortiz'
                            docType='CC'
                            docNumber='1007238447'
                            phone='3218298707'
                            email='emanueltabares@hotmail.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>

                        </Row>
                        <Row
                            name='Juan'
                            lastName='Gomez'
                            docType='CC'
                            docNumber='1002345678'
                            phone='3215555555'
                            email='juan@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Maria'
                            lastName='Lopez'
                            docType='TI'
                            docNumber='2001234567'
                            phone='3216666666'
                            email='maria@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Carlos'
                            lastName='Rodriguez'
                            docType='CC'
                            docNumber='3003456789'
                            phone='3217777777'
                            email='carlos@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Laura'
                            lastName='Gonzalez'
                            docType='CC'
                            docNumber='4004567890'
                            phone='3218888888'
                            email='laura@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Pedro'
                            lastName='Martinez'
                            docType='CC'
                            docNumber='5005678901'
                            phone='3219999999'
                            email='pedro@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Sofia'
                            lastName='Ramirez'
                            docType='TI'
                            docNumber='6006789012'
                            phone='3220000000'
                            email='sofia@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Elena'
                            lastName='Hernandez'
                            docType='CC'
                            docNumber='7007890123'
                            phone='3221111111'
                            email='elena@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Diego'
                            lastName='Garcia'
                            docType='CC'
                            docNumber='8008901234'
                            phone='3222222222'
                            email='diego@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Lucia'
                            lastName='Alvarez'
                            docType='TI'
                            docNumber='9009012345'
                            phone='3223333333'
                            email='lucia@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                        <Row
                            name='Manuel'
                            lastName='Diaz'
                            docType='CC'
                            docNumber='1010123456'
                            phone='3224444444'
                            email='manuel@example.com'>
                            <Actions accion='Edit owner'></Actions>
                            <Actions accion='Assigned space'></Actions>
                        </Row>

                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
