import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"


export const ParkingSpaces = () => {
  return (
    <>

      <ContainerTable title='Parqueaderos'>
        <DropdownExcel />
        <SearchButton />
        <ButtonGoTo value='Crear parqueadero' href='/#/admin/parkingSpaces/create' />

        <TablePerson>
          <ContainerCard>

            <Card name="S101" type="Publico" status='Active' >
              <Actions icon="fe fe-arrow-up-right fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />

            </Card>

            <Card name="S102" type="Privado" status='Inactive'>
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />
            </Card>

            <Card name="S103" type="Publico" status='Active'>
              <Actions icon="fe fe-arrow-up-right fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />
            </Card>

            <Card name="S104" type="Privado" status='Active'>
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />
            </Card>

            <Card name="S105" type="Publico" status='Inactive'>
              <Actions icon="fe fe-arrow-up-right fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />
            </Card>

            <Card name="S106" type="Privado" status='Active'>
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />
            </Card>

            <Card name="S107" type="Publico" status='Inactive'>
              <Actions icon="fe fe-arrow-up-right fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />
            </Card>

            <Card name="S108" type="Privado" status='Inactive'>
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />
            </Card>

            <Card name="S109" type="Publico" status='Active'>
              <Actions icon="fe fe-arrow-up-right fe-12 mr-4" accion="Hacer ingreso" />

              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />
            </Card>



          </ContainerCard>
        </TablePerson>
      </ContainerTable>
    </>)
}
