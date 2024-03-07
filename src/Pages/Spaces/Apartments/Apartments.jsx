import { useAllowedPermissionsAndPrivileges, useFetch } from '../../../Hooks/useFetch'
import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton, SearchSelect } from "../../../Components/Buttons/Buttons"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import { Thead } from '../../../Components/Thead/Thead'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { useEffect, useState } from 'react'
import { usePaginator, filter, postRequest, useUserLogged, filterPerSelect } from '../../../Helpers/Helpers'
import Inputs from '../../../Components/Inputs/Inputs'
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo'
import { createPortal } from 'react-dom'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { statusList } from '../../../Hooks/consts.hooks'
import { useParams } from 'react-router'
import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { Spinner } from '../../../Components/Spinner/Spinner'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'
import Cookies from 'js-cookie'
import { Paginator } from '../../../Components/Paginator/Paginator'




export const Apartments = () => {
  const token = Cookies.get('token');

  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"


  // Get Data

  const { data, get: getApartments, put: putApartment, loading } = useFetch(url)
  const { data: towers, get: getTowers } = useFetch(url)

  //Consulta Privilegios

  const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);


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

  const [errorList, setErrorList] = useState([]);

  console.log(tower)

  const [showModal, setShowModal] = useState(false);

  const handleModal = (data) => {

    setErrorList('')

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

    await postRequest(event, 'apartments', 'PUT', setShowModal, data, url, setErrorList, null, null)
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

  // Paginator

  const { totalPages, currentPage, nextPage, previousPage, filteredData: apartmentInfo } = usePaginator(apartmentList, 4);



  return (
    <>
      <ContainerTable
        title='Apartamentos'
        dropdown={<DropdownExcel />}
        search2={<SearchSelect options={towerList} value={searchForSelect} onChange={searcherForSelect}></SearchSelect>}
        search={<SearchButton value={search} onChange={searcher} placeholder='Buscar apartamentos' />}
        buttonToGo={
          allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Crear')
            ? <ButtonGoTo value='Agregar apartamentos' href={`/admin/apartments/create/${tower}`}  ></ButtonGoTo>
            : null}
        showPaginator={<Paginator totalPages={totalPages} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />}
      >

        <TablePerson>
          <Thead>

          </Thead>
          <Tbody>


            {loading ? <Spinner /> : apartmentList.length == 0 || currentPage >= totalPages ?

              <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :

              apartmentInfo()?.map(apartment => (

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
                  {allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Editar') ? (
                    <Actions accion='Editar apartamento' onClick={() => handleModal(apartment)}></Actions>
                  ) : null}

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
                  identifier={'idTower'} errors={errorList}
                  value={tower} onChange={e => setTower(e.target.value)}
                ></InputsSelect>

                <Inputs name="Numero apartamento " type={"text"}
                  identifier={'apartmentName'} errors={errorList}
                  value={apartmentName} onChange={e => setApartmentName(e.target.value)}></Inputs>

                <Inputs name="Area del apartamento " type={"text"}
                  identifier={'area'} errors={errorList}
                  value={area} onChange={e => setArea(e.target.value)}></Inputs>

                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                  identifier={'status'} errors={errorList}
                  value={status} onChange={e => setStatus(e.target.value)}
                ></InputsSelect>

                <Inputs type={"hidden"}
                  value={idApartment} onChange={e => setIdApartment(e.target.value)}></Inputs>

              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )}
    </>
  );

}
