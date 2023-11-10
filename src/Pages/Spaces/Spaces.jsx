  import { BigCard } from "../../Components/BigCard/BigCard"
  import { ButtonGoTo, DropdownExcel, SearchButton } from "../../Components/Buttons/Buttons"
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

              <BigCard>

              </BigCard>

              {/* <Card name="Salon social" notions={2} type="Salon social" residents={3} status="Inactive">
                <Actions icon="fe fe-users fe-12 mr-4" accion="Hacer ingreso" />
                <Actions icon="fe fe-message-square fe-12 mr-4" accion="Ver notificaciones" />
              </Card> */}

            
            </ContainerCard>
          </TablePerson>

        </ContainerTable>
      </>
      )
  }
