import React from 'react'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'
import { useFetchget } from '../../Hooks/useFetch'

export const Rols = () => {
    const { data, load, error } = useFetchget('https://apptowerbackend.onrender.com/api/rols')
    console.log(data.rols)


    return (
        <>
            <ContainerTable title='Roles'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Rol' href='/#/admin/rols/create' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Nombre Rol'}></Th>
                        <Th name={'Descripción'}></Th>

                    </Thead>
                    <Tbody>
                        <Row icon='fe fe-settings fe-16 text-muted' namerole={'Administrador'} descripcion={'Todas las funcionalidades'}  >
                            <Actions accion='Editar'></Actions>
                        </Row>
                        {load && <p>Cargando...</p>}
                        {!load && data.rols?.map(rols => (
                            <Row
                                namerole={rols.namerole}
                                descripcion={rols.description}
                                status={rols.state}
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
