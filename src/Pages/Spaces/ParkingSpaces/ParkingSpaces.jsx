import React, { useState, useEffect } from "react";
import { useFetch, useFetchget } from "../../../Hooks/useFetch";
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons";
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable";
import { TablePerson } from "../../../Components/Tables/Tables";
import { Thead } from '../../../Components/Thead/Thead';
import { Th } from '../../../Components/Th/Th';
import { Row } from "../../../Components/Rows/Row";
import { Actions } from "../../../Components/Actions/Actions";
import { Spinner } from "../../../Components/Spinner/Spinner";

import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { filter, postRequest } from "../../../Helpers/Helpers";
import { Tbody } from "../../../Components/Tbody/Tbody";
import { createPortal } from "react-dom";
import { Modal, ModalContainer } from "../../../Components/Modals/ModalTwo";
import { parkingTypes, statusList } from "../../../Hooks/consts.hooks";
import { useParams } from "react-router";
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import Inputs from "../../../Components/Inputs/Inputs";


export const ParkingSpaces = () => {

  const url = "http://localhost:3000/api/"
  // const url = "https://appparkingTypebackend.onrender.com/api/"


  // Get Data

  const { data: parkingSpaces, get: getParkingSpace, loading } = useFetch(url)

  useEffect(() => {

    getParkingSpace('parkingSpaces')

  }, [])

  console.log(parkingSpaces)

  // Funtionality to search


  const [search, setSearch] = useState('');

  let parkingList = filter(search, parkingSpaces?.data?.parkingSpaces, "parkingName")

  parkingList = parkingList.sort((a, b) => a.idParkingSpace - b.idParkingSpace);


  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)

  }

  const [modalParking, setModalParkin] = useState(false);

  const { id } = useParams()
  const [idParkingSpace, setIdParkingSpace] = useState("");
  const [parkingName, setParkingName] = useState('');
  const [parkingType, setParkingType] = useState("");
  const [status, setStatus] = useState('');

  const openModal = (data) => {

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

    await postRequest(event, 'parkingSpaces', 'PUT', setModalParkin, data, url)

    getParkingSpace('parkingSpaces')

  };



  return (
    <>
      <ContainerTable
        title='Parqueaderos'
        dropdown={<DropdownExcel />}
        search={<SearchButton value={search} onChange={searcher} />}
        buttonToGo={<ButtonGoTo value='Agregar parqueaderos' href={`/admin/parkingSpaces/create`}  ></ButtonGoTo>}

      >
        <TablePerson>

          <Tbody>


            {loading ? <Spinner /> : parkingList.length == 0 ?

              <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :

              parkingList?.map(parking => (

                <Row
                  A1='Parqueadero'
                  A2={parking.parkingName}
                  A3={parking.parkingType == "Public" ? "Publico" : "Privado "}
                  A4={`${parking.status == "Active" && parking.parkingType == "Public" ? "Disponible" : "Ocupado"}`}

                  status={parking.status}
                  icon='map-pin'
                  to={`/admin/parkingSpaces/details/${parking.idParkingSpace}`}


                >

                  <Actions accion='Asignar vehiculo' icon="map-pin" href={`/admin/guest_income/create/${parking.idParkingSpace}`}></Actions>
                  <Actions accion='Editar parqueadero' onClick={() => openModal(parking)}></Actions>
                  <Actions accion='Ver detalle' icon='eye' href={`/admin/parkingSpaces/details/${parking.idParkingSpace}`} ></Actions>


                </Row>



              ))
            }
          </Tbody>
        </TablePerson>
      </ContainerTable>

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


                <InputsSelect id={"select"} options={parkingTypes} name={"Torre"}
                  value={parkingType} onChange={e => setParkingType(e.target.value)}
                ></InputsSelect>

                <Inputs name="Nombre parqueadero" type={"text"}
                  value={parkingName} onChange={e => setParkingName(e.target.value)}></Inputs>

                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                  value={status} onChange={e => setStatus(e.target.value)}
                ></InputsSelect>

                <Inputs type={"hidden"}
                  value={idParkingSpace} onChange={e => setIdParkingSpace(e.target.value)}></Inputs>

              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )}
    </>
  );
}
