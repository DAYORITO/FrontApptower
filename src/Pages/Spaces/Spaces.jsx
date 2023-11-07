import { Actions } from "../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../Components/Buttons/Buttons"
import { Card } from "../../Components/Card/Card"
import { ContainerCard } from "../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../Components/Tables/Tables"

export const Spaces = () => {
  return (
    <>

      <ContainerTable title='Espacios'>
        <DropdownExcel />
        <SearchButton />
        <ButtonGoTo value='Crear espacio' href='/#/admin/spaces/create' />

        <TablePerson>
          <ContainerCard>

            <Card name="Salon social" notions={2} type="Salon social" residents={3} status="Inactive">
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="Pscina"type="Zona humeda" residents={15}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="Turco"type="Zona humeda" residents={1} >
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>



            <Card name="101" notions={2} type="Apartamento" residents={3} >
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="102" type="Apartamento" residents={5} notions={3}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="103" type="Apartamento" notions={1}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="104" type="Apartamento" residents={3}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>
            <Card name="105" type="Apartamento" residents={2} notions={4}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="106" type="Apartamento" residents={1}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="107" type="Apartamento" notions={3}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="108" type="Apartamento" residents={4} notions={2}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>

            <Card name="109" type="Apartamento" residents={2}>
              <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
            </Card>




          </ContainerCard>


        </TablePerson>

      </ContainerTable>
    </>
    )
}
