import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'

export const Users = () => {
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
                        <Th name={'Telefono'}></Th>
                        <Th name={'Correo'}></Th>

                    </Thead>
                    <Tbody>
                        <Row docType='CC' docNumber='102340121' name='Alejandra' lastName='Aguirre' rol={'Administador'} email='aleja@gmail.com' phone='3145678904'  >
                            <Actions accion='Editar'></Actions>
                        </Row>
                        <Row docType='CC' docNumber='104567899' name='Emmanuel' lastName='Tabares' rol={'Residente'} email='emanuel@gmail.com' phone='3156789043'>
                            <Actions accion='Editar'></Actions>
                        </Row>
                        <Row docType='CC' docNumber='105678905' name='Daniel' lastName='Rivera' rol={'Residente'} email='daniel@gmail.com' phone='3167890987'>
                            <Actions accion='Editar'></Actions>
                        </Row >
                        <Row docType='CC' docNumber='104568291' name='Samuel' lastName='Osorio' rol={'Residente'} email='samuel@gmail.com' phone='300124433 '>
                            <Actions accion='Editar'></Actions>
                        </Row>
                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
