import { Actions } from "../../../Components/Actions/Actions";
import { BigCard } from "../../../Components/BigCard/BigCard";
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons";
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable";
import { TablePerson } from "../../../Components/Tables/Tables";
import { useContext, useEffect, useState } from "react";
import { useAllowedPermissionsAndPrivileges, useFetch, useFetchget } from '../../../Hooks/useFetch';
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard";
import { usePaginator, filter, postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Spinner } from "../../../Components/Spinner/Spinner";
import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { createPortal } from "react-dom";
import { Modal, ModalContainer } from "../../../Components/Modals/ModalTwo";
import { Uploader } from "../../../Components/Uploader/Uploader";
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import { spacesTypes, statusList } from "../../../Hooks/consts.hooks";
import Inputs from "../../../Components/Inputs/Inputs";
import { idToPermissionName, idToPrivilegesName } from "../../../Hooks/permissionRols";
import Cookies from 'js-cookie'
import { Paginator } from "../../../Components/Paginator/Paginator";
import { set } from "date-fns";
import { SocketContext } from "../../../Context/SocketContext";

export const Spaces = () => {
  const token = Cookies.get('token');

  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"

  // Socket

  const { socket } = useContext(SocketContext)

  // User logged

  const { idUserLogged } = useUserLogged()

  const { data: spaces, get: getSpaces, loading } = useFetch(url)
  console.log(spaces, 'spaces')

  //Consulta Privilegios

  const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);


  useEffect(() => {

    getSpaces('spaces')

  }, [])


  // Funtionality to search


  const [search, setSearch] = useState('');

  let spacesList = filter(search, spaces?.data?.spaces, "spaceName")

  spacesList = spacesList.sort((a, b) => a.idSpace - b.idSpace);


  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)

  }

  const [idSpace, setIdSpace] = useState('');

  const [spaceType, setSpaceType] = useState('');

  const [image, setImage] = useState('');
  const [spaceName, setSpaceName] = useState('');

  const [area, setArea] = useState('');
  const [capacity, setCapacity] = useState('');


  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  const [maxTime, setMaxTime] = useState("");
  const [minTime, setMinTime] = useState("");

  const [status, setStatus] = useState('');

  // Erros 

  const [errorList, setErrorList] = useState([]);


  const [modalSpace, setModalSpace] = useState(false);

  const openModal = (data) => {

    setErrorList('')

    console.log(data, 'data?.spaceType')
    setIdSpace(data?.idSpace)
    setSpaceType(data?.spaceType)
    setImage(data?.image)
    setSpaceName(data?.spaceName)

    setArea(data?.area)
    setCapacity(data?.capacity)

    setOpeningTime(data?.openingTime)
    setClosingTime(data?.closingTime)

    setMinTime(data?.minTime)
    setMaxTime(data?.maxTime)

    setStatus(data?.status)

    setModalSpace(true)



  }

  const updateSpace = async (event) => {

    const data = {

      // User logged
      idUserLogged: idUserLogged,

      spaceType: spaceType,
      idSpace: idSpace,
      spaceName: spaceName,
      image: image,
      openingTime: openingTime,
      closingTime: closingTime,
      minTime: minTime,
      maxTime: maxTime,

      area: area,
      capacity: capacity,
      status: status

    }

    await postRequest(event, 'spaces', 'PUT', setModalSpace, data, url, setErrorList, null, socket)

    getSpaces('spaces')

  };

  // Paginator

  const { totalPages, currentPage, nextPage, previousPage, filteredData: spacesInfo } = usePaginator(spacesList, 4);


  return (
    <>
      <ContainerTable
        title='Zonas Comunes'
        buttonToGo={
          allowedPermissions['Zona Comunes'] && allowedPermissions['Zona Comunes'].includes('Crear')
            ? <ButtonGoTo value='Nueva Zona Común' href='create' />
            : null
        }
        search={<SearchButton value={search} onChange={searcher} placeholder='Buscar zona comun' />}
        showPaginator={<Paginator totalPages={totalPages} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />}

      >
        <TablePerson>
          <ContainerCard>


            {loading ? <Spinner /> : spacesList.length == 0 || currentPage >= totalPages ?

              <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :
              spacesInfo().map((space) => (
                <BigCard
                  key={space.idSpace}
                  title={space.spaceName}
                  img={space.image}

                  A2={`Horario: ${space?.openingTime} a ${space?.closingTime} Maximo: ${parseInt(space?.maxTime)} horas`}

                  status={space.status}
                  to={`/admin/booking/calendar/${space.idSpace}`}
                >
                  {allowedPermissions['Zona Comunes'] && allowedPermissions['Zona Comunes'].includes('Editar') ? (
                    <Actions accion='Editar' onClick={() => openModal(space)} />
                  ) : null}

                  <Actions href={`/admin/booking/calendar/${space.idSpace}`} accion='Reservar' icon="calendar" />
                </BigCard>
              ))}
          </ContainerCard>

        </TablePerson>

      </ContainerTable>

      {modalSpace &&
        createPortal(
          <>
            <ModalContainer ShowModal={setModalSpace}>
              <Modal
                onClick={updateSpace}
                showModal={setModalSpace}
                title={`Editar ${spaceName}`}
              >

                <Uploader name="img" label="Foto de zona comun" onChange={e => setImage(e.target.files[0])} />

                <h6 className='mb-4 text-muted'>Disponibilidad de {spaceName}</h6>

                <Inputs name="Hora de apertura" type="time" identifier={'openingTime'} errors={errorList}
                  value={openingTime} onChange={e => setOpeningTime(e.target.value)}></Inputs>

                <Inputs name="Hora de cierre" type="time" identifier={'closingTime'} errors={errorList}
                  value={closingTime} onChange={e => setClosingTime(e.target.value)}></Inputs>

                <Inputs min={1} name="Tiempo minimo" type="number" identifier={'minTime'} errors={errorList}
                  value={minTime} onChange={e => setMinTime(e.target.value)}></Inputs>

                <Inputs name="Tiempo maximo" type="number" identifier={'maxTime'} errors={errorList}
                  value={maxTime} onChange={e => setMaxTime(e.target.value)}></Inputs>

                <InputsSelect id={"select"} options={statusList} name={"Estado"} identifier={'status'} errors={errorList}
                  value={status} onChange={e => setStatus(e.target.value)}
                ></InputsSelect>

                <h6 className='mb-4 text-muted'>Informacion de {spaceName}</h6>


                <InputsSelect id={"select"} options={spacesTypes} name={"Tipo de zona comun"} identifier={'spaceType'} errors={errorList}
                  value={spaceType} onChange={e => setSpaceType(e.target.value)}
                ></InputsSelect>

                <Inputs name="Nombre zona comun" type={"text"} identifier={'spaceName'} errors={errorList}
                  value={spaceName} onChange={e => setSpaceName(e.target.value)}></Inputs>


                <Inputs name="Area" type={"number"} identifier={'area'} errors={errorList}
                  value={area} onChange={e => setArea(e.target.value)}></Inputs>

                <Inputs name="Capacidad" type={"number"} identifier={'capacity'} errors={errorList}
                  value={capacity} onChange={e => setCapacity(e.target.value)}></Inputs>


                <Inputs type={"hidden"}
                  value={idSpace} onChange={e => setIdSpace(e.target.value)}></Inputs>


              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )}
    </>
  );
};

