import React from 'react'
import { useFetchget } from '../../Hooks/useFetch'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'

export const Watchman = () => {
    const { data, load, error } = useFetchget('https://apptowerbackend.onrender.com/api/watchman')
    console.log(data.watchman)

    return (
        <>
            <ContainerTable title='Vigilantes'>
                <DropdownExcel />
                <SearchButton />

                <ButtonGoTo value='Crear Vigilante' href='/#/admin/watchman/create' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Información Vigilante'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th name={'Estado'}></Th>

                    </Thead>
                    <Tbody>
                        <Row icon='fe fe-shield fe-16 text-muted' module='Vigilantes' docType='CC' docNumber='102340121' name='Andres' lastName='Amaya' email='andres@gmail.com' phone='315678943'  >
                            <Actions accion='Editar'></Actions>
                        </Row>
                        {load && <p>Cargando...</p>}
                        {!load && data.watchman?.map(watchman => (
                            <Row
                                docType={watchman.documentType}
                                docNumber={watchman.document}
                                name={watchman.namewatchman}
                                lastName={watchman.lastnamewatchman}
                                phone={watchman.phone}
                                email={watchman.email}
                                status={watchman.state}
                            >
                                <Actions accion='Editar' />
                            </Row>
                        ))}
                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>


    )
}
