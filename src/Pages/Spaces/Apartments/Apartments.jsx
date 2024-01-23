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
import Cookies from 'js-cookie'
import { filter, handlePutRequest } from '../../../Helpers/Helpers'
import Inputs from '../../../Components/Inputs/Inputs'
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo'
import { createPortal } from 'react-dom'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { statusList } from '../../../Hooks/consts.hooks'



export const Apartments = () => {


  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"


  // Get Data

  const { data, get: getApartments, put: putApartment } = useFetch(url)
  const { data: towers, get: getTowers } = useFetch(url)


  useEffect(() => {

    getApartments('apartments')
    getTowers('towers')

  }, [])



  // Apartment information

  const { id } = useState('');
  const [area, setArea] = useState('');
  const [tower, setTower] = useState('');
  const [status, setStatus] = useState('');
  const [idApartment, setIdApartment] = useState("");
  const [apartmentName, setApartmentName] = useState('');

  const [showModal, setShowModal] = useState(false);

  const handleModal = (data) => {

    setIdApartment(data.idApartment)
    setApartmentName(data.apartmentName)
    setTower(data.idTower)
    setArea(data.area)
    setStatus(data.status)

    setShowModal(true)

  }


  // Edit apartmentresident

  const UpdateApartment = (event) => {



    const data = {

      idApartment: idApartment,
      idTower: parseInt(tower),
      apartmentName: apartmentName,
      area: area,
      status: status,

    }

    handlePutRequest(event, 'apartments', `Modificaste el apartamento ${apartmentName}`, data, setShowModal, putApartment, getApartments);

  };


  // List Towers

  const towerList = towers?.data?.towers

    ? towers.data?.towers
      .map(tower => ({
        value: tower.idTower,
        label: `${tower.towerName}`
      }))
    : [];



  // Funtionality to search

  const [search, setSearch] = useState('');

  let apartmentList = filter(search, data?.data?.apartments, "apartmentName")


  apartmentList = apartmentList.sort((a, b) => a.idApartment - b.idApartment);

  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)

  }











  return (
    <>
      <ContainerTable
        title='Apartamentos'
        dropdown={<DropdownExcel />}
        search={<SearchButton value={search} onChange={searcher} placeholder='Buscar apartamentos'
        />

        }
        buttonToGo={<ButtonGoTo value='Agregar apartamentos' href={"create"}  ></ButtonGoTo>}
      >

        <TablePerson>
          <Thead>

          </Thead>
          <Tbody>
            {apartmentList?.map(apartment => (

              <Row
                A1='Apartamento'
                A2={apartment.apartmentName}
                A3={apartment.Tower.towerName}
                A4={`Area: ${apartment.area} m² `}

                A8='Residentes'
                A9={apartment.residents}

                A10='Ingresos'
                A11={apartment.guestIncomes}

                A13='Vehiculos'
                A12={apartment.vehicles}

                A14='Multas'
                A15={apartment.fines}

                A16={apartment.residents}

                status={apartment.status}
                icon='home'
                to={`details/${apartment.idApartment}`}


              >

                <Actions accion='Ver detalle' icon='eye' href={`details/${apartment.idApartment}`} ></Actions>
                <Actions accion='Editar apartamento' onClick={() => handleModal(apartment)}></Actions>

              </Row>



            ))}
          </Tbody>
        </TablePerson>
      </ContainerTable>

      {showModal &&
        createPortal(
          <>
            <ModalContainer ShowModal={setShowModal}>
              <Modal
                onClick={UpdateApartment}
                showModal={setShowModal}
                title={`Editar apartamento ${apartmentName}`}
              >


                <InputsSelect id={"select"} options={towerList} name={"Torre"}
                  value={tower} onChange={e => setTower(e.target.value)}
                ></InputsSelect>

                <Inputs name="Numero apartamento " type={"text"}
                  value={apartmentName} onChange={e => setApartmentName(e.target.value)}></Inputs>

                <Inputs name="Area del apartamento " type={"text"}
                  value={area} onChange={e => setArea(e.target.value)}></Inputs>

                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                  value={status} onChange={e => setStatus(e.target.value)}
                ></InputsSelect>

                <Inputs type={"hidden"}
                  value={idApartment} onChange={e => setIdApartmentOwner(e.target.value)}></Inputs>

              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )}
    </>
  );

}
