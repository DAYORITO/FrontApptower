import { Actions } from "../../../Components/Actions/Actions"
import { BigCard } from "../../../Components/BigCard/BigCard"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"

import { useFetchget } from '../../../Hooks/useFetch'


export const Spaces = () => {

  const { data, load, error } = useFetchget('spaces')
  console.log(data.spaces)
  return (
    <>

      <ContainerTable title='Espacios'>
        <DropdownExcel />
        <SearchButton />
        <ButtonGoTo value='Crear espacio' href='create' />

        <TablePerson>
          <ContainerCard>

            {data.spaces?.map(spaces => (
              <BigCard
                cosa={spaces}
              >
                <Actions accion='Editar' />
                <Actions accion='Reservar' />
              </BigCard>
            ))}

          </ContainerCard>


        </TablePerson>

      </ContainerTable>
    </>
  )
}
