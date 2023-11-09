import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'

export const Rols = () => {
    return (
        <>
            <ContainerTable title='Roles'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Rol' />
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
                        <Row icon='fe fe-settings fe-16 text-muted' namerole={'Residente'} descripcion={'Habitante del conjunto residencial'}>
                            <Actions accion='Editar'></Actions>
                        </Row>
                        <Row icon='fe fe-settings fe-16 text-muted' namerole={'Vigilante'} descripcion={'Seguridad del conjunto'}>
                            <Actions accion='Editar'></Actions>
                        </Row >
                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
