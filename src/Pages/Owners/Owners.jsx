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
        <ContainerHeader>
            <Nav/>
            <Aside/>
        </ContainerHeader>
            <ContainerTable>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Owner information'}></Th>
                        <Th name={'Phone'}></Th>
                        <Th name={'Email'}></Th>
                    </Thead>
                    <Tbody>
                        <Row>
                            <Actions accion='Edit owner'></Actions>
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
