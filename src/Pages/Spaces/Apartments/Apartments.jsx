import { useFetch, useFetchget } from '../../../Hooks/useFetch'
import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton, SearchSelect } from "../../../Components/Buttons/Buttons"
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
import { filter, filterPerSelect, postRequest} from '../../../Helpers/Helpers'
import Inputs from '../../../Components/Inputs/Inputs'
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo'
import { createPortal } from 'react-dom'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { statusList } from '../../../Hooks/consts.hooks'
import { useParams } from 'react-router'
import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { Spinner } from '../../../Components/Spinner/Spinner'




export const Apartments = () => {


  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"


  // Get Data

  const { data, get: getApartments, put: putApartment, loading } = useFetch(url)
  const { data: towers, get: getTowers } = useFetch(url)

  useEffect(() => {

    getApartments('apartments')
    getTowers('towers')

  }, [])



  // Apartment information

  const { id } = useParams()
  const [area, setArea] = useState('');
  const [tower, setTower] = useState(id != null ? parseInt(id) : "");
  const [status, setStatus] = useState('');
  const [idApartment, setIdApartment] = useState("");
  const [apartmentName, setApartmentName] = useState('');

  console.log(tower)

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

  const UpdateApartment = async (event) => {



    const data = {

      idApartment: idApartment,
      idTower: parseInt(tower),
      apartmentName: apartmentName,
      area: area,
      status: status,

    }

    await postRequest(event, 'apartments', 'PUT', setShowModal, data, url)
    getApartments('apartments')

  };


  // List Towers

  const towerList = towers?.data?.towers
    ? towers.data.towers
      .map((tower) => ({
        value: tower.idTower,
        label: `${tower.towerName}`
      }))
      .sort((a, b) => a.value - b.value) // Ordenar por idTower
    : [];




  // Funtionality to search

  const [search, setSearch] = useState('');
  const [searchForSelect, setSearchForSelect] = useState(id != null ? id : "");

  let apartmentList = id !== null ? filterPerSelect(searchForSelect, data?.data?.apartments, "idTower")
    : data?.data?.apartments



  const searchApartments = () => {

    let filteredApartments = apartmentList;

    filteredApartments = filter(search, filteredApartments, "apartmentName");

    filteredApartments = filterPerSelect(searchForSelect, filteredApartments, "idTower");

    filteredApartments = filteredApartments.sort((a, b) => a.idApartment - b.idApartment);

    apartmentList = filteredApartments;
  };



  const searcher = (e) => {

    filter(search, data?.data?.apartments, "apartmentName")
    setSearch(e.target.value)
    searchApartments()

    console.log(apartmentList)

  }

  const searcherForSelect = (e) => {

    apartmentList = filterPerSelect(searchForSelect, data?.data?.apartments, "idTower")

    console.log(parseInt(setTower(e.target.value)))
    setSearchForSelect(e.target.value)
    searchApartments()
    console.log(apartmentList)

  }

  searchApartments()




  return (
    <>
      <ContainerTable
        title='Apartamentos'
        dropdown={<DropdownExcel />}
        search2={<SearchSelect options={towerList} value={searchForSelect} onChange={searcherForSelect}></SearchSelect>}
        search={<SearchButton value={search} onChange={searcher} placeholder='Buscar apartamentos' />}
        buttonToGo={<ButtonGoTo value='Agregar apartamentos' href={`/admin/apartments/create/${tower}`}  ></ButtonGoTo>}
      >

        <TablePerson>
          <Thead>

          </Thead>
          <Tbody>


            {loading ? <Spinner /> : apartmentList.length == 0 ?

              <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :

              apartmentList?.map(apartment => (

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
                  to={`/admin/apartments/details/${apartment.idApartment}`}


                >

                  <Actions accion='Ver detalle' icon='eye' href={`/admin/apartments/details/${apartment.idApartment}`} ></Actions>
                  <Actions accion='Editar apartamento' onClick={() => handleModal(apartment)}></Actions>

                </Row>



              ))
            }
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
