import { useFetch, useFetchget } from '../../../Hooks/useFetch'
import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import { DivRow } from '../../../Components/DivRow/DivRow'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { useEffect, useState } from 'react'



export const Apartments = () => {

  // Get Data

  const { data, load, error } = useFetchget('apartments')

  console.log(data)


  // Funtionality to search

  const [search, setSearch] = useState('');
  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)
  }
  let filterData = [];

  if (!search) {
    filterData = data.apartments;
  } else {
    filterData = data.apartments.filter((dato) =>
      dato.apartmentName.toLowerCase().includes(search.toLowerCase())
    );
  }


  return (
    <>

      <ContainerTable title='Apartamentos'
        dropdown={<DropdownExcel />}
        search={<SearchButton value={search} onChange={searcher}/>}
        buttonToGo={<ButtonGoTo value='Crear apartamentos' href='create' />}
      >
        {/* <DivRow>
          <DropdownExcel />
          <SearchButton value={search} onChange={searcher} />
          <ButtonGoTo value='Crear apartamentos' href='create' />
        </DivRow> */}

        <TablePerson>
          <Thead>
            <Th name={"Apartamento"} />

            <Th name={'Respoonsables'}></Th>
            <Th name={'Notificaciones'}></Th>
            <Th />
            <Th />

          </Thead>
          <Tbody>

            {filterData?.map(apartment => (
              <Row

                icon={"home"}
                status={apartment.status}
                docType={apartment.tower}
                docNumber={apartment.area + " m²"}
                name={"Apartamento"}
                lastName={`${apartment.apartmentName}`}
                op1={""}
                op2={""}
                op3={""}

                to={`details/${apartment.idApartment}`}

              >
                <Actions accion='Editar' />
              </Row>
            ))}



          </Tbody>
        </TablePerson>
      </ContainerTable>



    </>)
}
