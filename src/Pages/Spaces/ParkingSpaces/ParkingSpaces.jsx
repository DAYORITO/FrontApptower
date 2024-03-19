import React, { useState, useEffect, useContext } from "react";
import { useAllowedPermissionsAndPrivileges, useFetch, useFetchget } from "../../../Hooks/useFetch";
import { ButtonGoTo, DropdownExcel, SearchButton, SearchSelect } from "../../../Components/Buttons/Buttons";
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable";
import { TablePerson } from "../../../Components/Tables/Tables";
import { Thead } from '../../../Components/Thead/Thead';
import { Th } from '../../../Components/Th/Th';
import { Row } from "../../../Components/Rows/Row";
import { Actions } from "../../../Components/Actions/Actions";
import { Spinner } from "../../../Components/Spinner/Spinner";

import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { usePaginator, filter, postRequest, useUserLogged, filterPerSelect } from '../../../Helpers/Helpers'
import { Tbody } from "../../../Components/Tbody/Tbody";
import { createPortal } from "react-dom";
import { Modal, ModalContainer } from "../../../Components/Modals/ModalTwo";
import { parkingTypes, statusList } from "../../../Hooks/consts.hooks";
import { useParams } from "react-router";
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import Inputs from "../../../Components/Inputs/Inputs";
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from "../../../Hooks/permissionRols";
import { Paginator } from "../../../Components/Paginator/Paginator";
import { SocketContext } from "../../../Context/SocketContext";
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions";
import { Acordions } from "../../../Components/Acordions/Acordions";
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo";


export const ParkingSpaces = () => {
  const token = Cookies.get('token');

  const url = import.meta.env.VITE_API_URL;
  // const url = "https://appparkingTypebackend.onrender.com/api/"


  // Get Data

  const { data: parkingSpaces, get: getParkingSpace, loading } = useFetch(url)
  const { data: apartments, get: getApartments } = useFetch(url)


  //Consulta Privilegios

  const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);



  useEffect(() => {

    getParkingSpace('parkingSpaces')
    getApartments('apartments')


  }, [])

  // Socket

  const { socket } = useContext(SocketContext)

  // User logged

  const { idUserLogged, idRolLogged } = useUserLogged()

  const { data: dataRols, loadRols, errorRols } = useFetchget('rols');

  const nameRole = dataRols?.rols?.find(rol => rol.idrole === idRolLogged)?.namerole;



  const { id } = useParams()

  // Funtionality to search

  const [searchForSelect, setSearchForSelect] = useState("");

  const [search, setSearch] = useState(id ? id : '');

  let parkingList = filter(search, parkingSpaces?.data?.parkingSpaces, "parkingName")

  parkingList = parkingList.sort((a, b) => a.idParkingSpace - b.idParkingSpace);


  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)

  }

  const searchParkingType = () => {

    let filteredParking = parkingList;

    filteredParking = filter(search, filteredParking, "parkingName");

    filteredParking = filterPerSelect(searchForSelect, filteredParking, "parkingType");

    // filteredParking = filteredParking.sort((a, b) => a.idApartment - b.idApartment);

    parkingList = filteredParking;
  };

  const searcherForSelect = (e) => {

    console.log(e.target.value)

    parkingList = filterPerSelect(searchForSelect, parkingSpaces?.data?.parkingSpaces, "parkingType")

    setSearchForSelect(e.target.value)
    searchParkingType()

  }

  const [modalParking, setModalParkin] = useState(false);

  const [idParkingSpace, setIdParkingSpace] = useState("");
  const [parkingName, setParkingName] = useState('');
  const [parkingType, setParkingType] = useState('');
  const [status, setStatus] = useState('');

  const [errorList, setErrorList] = useState([]);

  const [idApartment, setIdApartment] = useState("");


  const openModal = (data) => {

    setErrorList('')

    setIdParkingSpace(data.idParkingSpace)
    setParkingName(data.parkingName)
    setParkingType(data.parkingType)
    setStatus(data.status)

    setModalParkin(true)

  }

  // Edit parking

  const updateParking = async (event) => {

    const data = {

      idParkingSpace: idParkingSpace,
      parkingName: parkingName,
      parkingType: parkingType,
      status: status,

    }

    await postRequest(event, 'parkingSpaces', 'PUT', setModalParkin, data, url, setErrorList, null, socket)

    getParkingSpace('parkingSpaces')

  };

  searchParkingType()


  const [modalAsignedApartment, setModalAsignedApartment] = useState(false);

  // Parking spaces



  const openModalAsignedApartment = (data) => {

    setErrorList('')
    setIdApartment('')

    setIdParkingSpace(data.idParkingSpace)

    setModalAsignedApartment(true)

  }

  // List apartments

  const apartmentList = apartments?.data && apartments?.data?.apartments

    ? apartments?.data?.apartments
      .map(apartment => ({
        value: apartment.idApartment,
        label: `${apartment.apartmentName} - ${apartment.Tower.towerName}`
      }))
    : [];

  const parkingSpacesList = parkingSpaces.data && parkingSpaces.data.parkingSpaces
    ? parkingSpaces.data.parkingSpaces
      .filter(parking => parking.parkingType === 'Private')
      .map(parking => ({
        value: parking.idParkingSpace,
        label: `${parking.parkingName} - ${parking.parkingType}`
      }))
    : [];


  // create assignedparkingspace 

  const createAssignedParking = async (event) => {

    const data = {

      // User logged
      idUserLogged: idUserLogged,

      idApartment: parseInt(idApartment),
      idParkingSpace: parseInt(idParkingSpace)

    };

    await postRequest(event, 'assignedParkingSpaces', 'POST', setModalAsignedApartment, data, url, setErrorList, null, socket);

    getParkingSpace(`parkingSpaces`)

  };

  // Paginator

  const { totalPages, currentPage, nextPage, previousPage, filteredData: parkingInfo } = usePaginator(parkingList, 5);



  return (
    <>
      <ContainerTable
        title='Parqueaderos'
        dropdown={nameRole ? (nameRole.toLowerCase().includes('vigilante') || nameRole.toLowerCase().includes('seguridad') || nameRole.toLowerCase().includes('vigilancia') ? null : <DropdownExcel table="parkingSpaces" />) : <DropdownExcel table="parkingSpaces" />}
        search2={<SearchSelect options={parkingTypes} value={searchForSelect} onChange={searcherForSelect}></SearchSelect>}
        search={<SearchButton value={search} onChange={searcher} />}
        buttonToGo={
          allowedPermissions['Parqueaderos'] && allowedPermissions['Parqueaderos'].includes('Crear')
            ? <ButtonGoTo value='Agregar parqueaderos' href={`/admin/parkingSpaces/create`}  ></ButtonGoTo>
            : null
        }
        showPaginator={<Paginator totalPages={totalPages} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />}

      >
        <TablePerson>

          <Tbody>


            {loading ? <Spinner /> : parkingList.length == 0 || currentPage >= totalPages ?

              <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :

              parkingInfo()?.map(parking => (

                <Row
                  A1='Parqueadero'
                  A2={parking.parkingName}
                  A3={parking.parkingType == "Public" ? "Publico" : "Privado "}
                  A4={`${parking.status == "Active" && parking.parkingType == "Public" ? "Disponible" : "Ocupado"}`}
                  A9={parking.parkingType !== "Public" ? null : 'Nota de ingreso activo'}
                  A10={parking.parkingType !== "Public" ? null : parking.vehicleAssigned ? parking.vehicleAssigned.observations : 'No hay nota'}

                  A12={parking.parkingType == "Public" ? null : 'Apartamento'}
                  A14={parking.parkingType == "Public" ? null : parking.apartmentAssigned.apartmentInfo ? parking.apartmentAssigned.apartmentInfo.apartmentName : 'No tiene apartamento designado'}

                  status={parking.status}
                  icon='map-pin'

                  onClick={() => openModal(parking)}

                >
                  {/* {
                    parking.apartmentAssigned ? null : 
                  } */}
                  {
                    parking.parkingType !== "Public" && parking.apartmentAssigned.apartmentInfo ? (
                      <Actions
                        accion="Ver apartamento"
                        icon="home"
                        href={`/admin/apartments/details/${parking.apartmentAssigned.apartmentInfo.idApartment}`}
                      />
                    ) : parking.parkingType == "Public" && !parking.vehicleAssigned ? (
                      <>
                        <Actions
                          accion="Asignar vehiculo"
                          icon="map-pin"
                          href={`/admin/guest_income/create/`}
                        />
                      </>
                    ) : parking.parkingType == "Private" ? <Actions accion="Asignar apartamento" onClick={() => openModalAsignedApartment(parking)} icon="home" /> : null

                  }

                  {allowedPermissions['Parqueaderos'] && allowedPermissions['Parqueaderos'].includes('Editar') ? (
                    <Actions accion='Editar parqueadero' onClick={() => openModal(parking)}></Actions>
                  ) : null}



                </Row>



              ))
            }
          </Tbody>
        </TablePerson>
      </ContainerTable >

      {modalParking &&
        createPortal(
          <>
            <ModalContainer modalParking={setModalParkin}>
              <Modal
                onClick={updateParking}
                modalParking={setModalParkin}
                title={`Editar parqueadero ${parkingName}`}
                showModal={setModalParkin}
              >


                <InputsSelect id={"select"} options={parkingTypes} name={"Torre"} identifier={'parkingType'} errors={errorList}
                  value={parkingType} onChange={e => setParkingType(e.target.value)}
                ></InputsSelect>

                <Inputs name="Nombre parqueadero" type={"text"} identifier={'parkingName'} errors={errorList}
                  value={parkingName} onChange={e => setParkingName(e.target.value)}></Inputs>

                <InputsSelect id={"select"} options={statusList} name={"Estado"} identifier={'status'} errors={errorList}
                  value={status} onChange={e => setStatus(e.target.value)}
                ></InputsSelect>

                <Inputs type={"hidden"}
                  value={idParkingSpace} onChange={e => setIdParkingSpace(e.target.value)}></Inputs>


              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )
      }

      {modalAsignedApartment &&
        createPortal(
          <>
            <ModalContainer showModal={setModalAsignedApartment}>
              <Modal
                onClick={createAssignedParking}
                showModal={setModalAsignedApartment}
                title={`Asignar apartamento`}

              >

                <InputsSelect id={"select"} options={parkingSpacesList} name={"Parqueadero"}
                  identifier={'idParkingSpace'} errors={errorList} disabled
                  value={idParkingSpace} onChange={e => setIdParkingSpace(e.target.value)}
                ></InputsSelect>

                <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                  identifier={'idApartment'} errors={errorList}
                  value={idApartment} onChange={e => setIdApartment(e.target.value)}
                ></InputsSelect>


              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )
      }
    </>
  );
}
