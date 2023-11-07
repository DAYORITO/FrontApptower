import React from 'react'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'

export const Watchman = () => {
    return (
        <>
            <ContainerTable title='Vigilantes'>
                <DropdownExcel />
                <SearchButton />

                <ButtonGoTo value='Crear Vigilante' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Información Vigilante'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th name={'Correo'}></Th>

                    </Thead>
                    <Tbody>
                        <Row icon='fe fe-shield fe-16 text-muted' module='Vigilantes' docType='CC' docNumber='102340121' name='Andres' lastName='Amaya' email='andres@gmail.com' phone='315678943'  >
                            <Actions accion='Editar'></Actions>
                        </Row>
                        <Row icon='fe fe-shield fe-16 text-muted' docType='CC' docNumber='104567832' name='Willian' lastName='Torres' email='willian@gmail.com' phone='321456789'>
                            <Actions accion='Editar'></Actions>
                        </Row>
                        <Row icon='fe fe-shield fe-16 text-muted' docType='CC' docNumber='120382842' name='Jorge' lastName='Orozco' email='jorge@gmail.com' phone='312123564'>
                            <Actions
                                accion='Editar'
                            ></Actions>
                        </Row >
                        <Row icon='fe fe-shield fe-16 text-muted' docType='CC' docNumber='139288383' name='Juan' lastName='Lopéz' email='juan@gmail.com' phone='301224223'>
                            <Actions accion='Editar'></Actions>
                        </Row>
                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
