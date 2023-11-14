import React, { useState } from 'react'
import { useFetchget } from '../../Hooks/useFetch'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'

export const Users = () => {


    const { data, load, error } = useFetchget('https://apptowerbackend.onrender.com/api/users')
    console.log(data.user)

    return (
        <>
            <ContainerTable title='Usuarios'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Usuario' href='/#/admin/users/create' />
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Información Usuario'}></Th>
                        <Th name={'Rol'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th name={'Estado'}></Th>


                    </Thead>
                    <Tbody>
                        <Row docType='CC' docNumber='102340121' name='Alejandra' lastName='Aguirre' rol={'Administador'} email='aleja@gmail.com' phone='3145678904'  >
                            <Actions accion='Editar'></Actions>
                        </Row>
                        {load && <p>Cargando...</p>}
                        {!load && data.user?.map(user => (
                            <Row
                                docType={user.documentType}
                                docNumber={user.document}
                                name={user.name}
                                lastName={user.lastname}
                                rol={
                                    user.idrole === 1 ? 'Administrador' :
                                        user.idrole === 2 ? 'Residente' :
                                            user.idrole === 3 ? 'Vigilante' : 'Desconocido'
                                }
                                email={user.email}
                                phone={user.phone}
                                status={user.state}
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
