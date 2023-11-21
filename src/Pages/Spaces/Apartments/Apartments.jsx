import { useFetchget } from '../../../Hooks/useFetch'
import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"



export const Apartments = () => {

  const { data, load, error } = useFetchget('https://apptowerbackend.onrender.com/api/apartments')
  console.log(data.apartments)

  return (
    <>

      <ContainerTable title='Apartamentos'>
        <DropdownExcel />
        <SearchButton />
        <ButtonGoTo value='Crear apartamento' href='create' />

        <TablePerson>
          <ContainerCard>

            <Card name="101" type="Publico" status='Active' residents={2} notions={2} >
              <Actions icon="fe fe-arrow-up-right fe-12 mr-4" accion="Hacer ingreso" />
              <Actions icon="fe fe-home fe-12 mr-4" accion="Asignar espacio" />

            </Card>
            {data.apartments?.map(aparment => (
              <Card
                name={aparment.apartmentName}
                // area={aparment.area}
                status={aparment.status}
                esidents={2} notions={2}
              >
                <Actions accion='Editar' />
              </Card>
            ))}




          </ContainerCard>
        </TablePerson>
      </ContainerTable>
    </>)
}
