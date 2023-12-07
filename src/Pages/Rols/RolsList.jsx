import React from 'react'
import { useFetchget } from '../../Hooks/useFetch'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'

export const Rols = () => {
    const { data, load, error } = useFetchget('rols')
    console.log(data.rols)


    return (
        <>
            <ContainerTable title='Roles'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Rol' href='/admin/rols/create' />
                <TablePerson>
                    <Thead>
                        <Th name={'Nombre Rol'} ></Th>
                        <Th name={'Descripción'}></Th>

                        <Th></Th>

                    </Thead>
                    <Tbody>


                        {data.rols?.map(rols => (
                            <Row
                                key={rols.idrole}
                                namerole={rols.namerole}
                                descripcion={rols.description}
                                status={rols.state}
                            >
                                <Actions accion='Editar' href={`/admin/rols/editNew/${rols.idrole}`} />
                            </Row>
                        ))}
                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
