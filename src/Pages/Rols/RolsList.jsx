import React from 'react'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'

export const Rols = () => {
    return (
        <>
            <ContainerTable>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Nombre Rol'}></Th>
                        <Th name={'Descripción'}></Th>

                    </Thead>
                    <Tbody>
                        <Row namerole={'Administrador'} descripcion={'Todas las funcionalidades'}  >
                            <Actions></Actions>
                        </Row>
                        <Row namerole={'Residente'} descripcion={'Habitante del conjunto residencial'}>
                            <Actions></Actions>
                        </Row>
                        <Row namerole={'Vigilante'} descripcion={'Seguridad del conjunto'}>
                            <Actions></Actions>
                        </Row >
                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
