import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { Row } from "../../../Components/Rows/Row"
import { TablePerson } from "../../../Components/Tables/Tables"
import { Tbody } from "../../../Components/Tbody/Tbody"
import { useFetchget } from "../../../Hooks/useFetch"

import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { DivRow } from '../../../Components/DivRow/DivRow'
import { useState } from "react"


export const ParkingSpaces = () => {



  // 1. Start get all parking spaces

  const { data: parkingSpaces, load, error } = useFetchget('parkingSpaces')
  console.log(parkingSpaces.parkingSpaces)

  // 1. End get all parking spaces





  // 2. Start Funtionality to search

  const [search, setSearch] = useState('');
  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)
  }
  let filterData = [];

  if (!search) {
    filterData = parkingSpaces.parkingSpaces;
  } else {
    filterData = parkingSpaces.parkingSpaces.filter((parking) =>
      parking.parkingName.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 2. End Funtionality to search



  return (
    <>

      <ContainerTable title='Parqueaderos'>



        <DivRow>
          <DropdownExcel />
          <SearchButton value={search} onChange={searcher} />
          <ButtonGoTo value='Crear Residente' href='create' />
        </DivRow>

        <TablePerson>
          <Thead>

            <Th name={"Informacion del parqueadero"} />



          </Thead>
          <Tbody>
            {filterData?.map(parking => (
              <Row
                icon="octagon"
                to={`details/${parking.idParkingSpace}`}
                name={"Parqueadero "}
                lastName={parking.parkingName}

                docType={(parking.parkingType == "Private")? "Privado": (parking.parkingType == "Public")? "Publico": " "}
                status={parking.status}
                op1={""}
                op2={""}

              >
                <Actions accion='Editar' />
                <Actions accion='Reservar' />
              </Row>
            ))}

          </Tbody>
        </TablePerson>



      </ContainerTable>
    </>)
}
