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
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Residente' href='/#/admin/residents/create' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Resident information'}></Th>
                        <Th></Th>

                        <Th name={'Phone'}></Th>
                        <Th name={'Email'}></Th>
                    </Thead>
                    <Tbody>
                        <Row rol={'Administrador'}
                            docType='CC'
                            docNumber='1007238447'
                            name='Emmanuel'
                            lastName='Tabares'
                            phone='3218298707'
                            email='emanueltabares@gmail.com'
                        >
                            <Actions></Actions>
                        </Row>
                        <Row>
                            <Actions></Actions>
                        </Row>
                        <Row>
                            <Actions></Actions>
                        </Row>
                        <Row>
                            <Actions></Actions>
                        </Row><Row>
                            <Actions></Actions>
                        </Row>
                        <Row>
                            <Actions></Actions>
                        </Row><Row>
                            <Actions></Actions>
                        </Row>
                        <Row>
                            <Actions></Actions>
                        </Row><Row>
                            <Actions></Actions>
                        </Row>
                        <Row>
                            <Actions></Actions>
                        </Row>
                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
