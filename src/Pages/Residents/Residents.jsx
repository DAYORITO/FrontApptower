import React from 'react'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'
import { ContainerHeader } from '../../Components/ContainerHeader/containerHeader'
import { Nav } from '../../Components/Nav/Nav'
import { Aside } from '../../Components/Aside/Aside'

export const Residents = () => {
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
                    <Th name={'Resident information'}></Th>
                    <Th name={'Phone'}></Th>
                    <Th name={'Email'}></Th>
                </Thead>
                <Tbody>
                    <Row>
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
