import { Actions } from "../../../Components/Actions/Actions";
import { BigCard } from "../../../Components/BigCard/BigCard";
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons";
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable";
import { TablePerson } from "../../../Components/Tables/Tables";
import { useEffect, useState } from "react";
import useFetchUserPrivileges, { useFetch, useFetchget } from '../../../Hooks/useFetch';
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard";
import usePaginator, { filter, postRequest } from "../../../Helpers/Helpers";
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

export const Spaces = () => {
  const token = Cookies.get('token');

  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"

  const { data: spaces, get: getSpaces, loading } = useFetch(url)
  const { data: allowedPermissions, get: fetchPermissions, loading: loadingPermissions } = useFetchUserPrivileges(token, idToPermissionName, idToPrivilegesName);


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

  const [status, setStatus] = useState('');

  const [modalSpace, setModalSpace] = useState(false);

  const openModal = (data) => {

    setIdSpace(data.idSpace)
    setSpaceType(data.spaceType)
    setImage(data.image)
    setSpaceName(data.spaceName)

    setArea(data.area)
    setCapacity(data.capacity)

    setStatus(data.status)

    setModalSpace(true)

  }

  const updateSpace = async (event) => {

    console.log(image)
    const data = {

      idSpace: idSpace,
      spaceName: spaceName,
      image: image,
      area: area,
      capacity: capacity,
      status: status

    }

    console.log("edit data", data)

    await postRequest(event, 'spaces', 'PUT', setModalSpace, data, url)

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
        showPaginator={
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            nextPage={nextPage}
            previousPage={previousPage}
          />}
      >
        <TablePerson>
          <ContainerCard>


            {loading ? <Spinner /> : spacesList.length == 0 ?

              <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :
              spacesInfo().map((space) => (
                <BigCard
                  key={space.idSpace}
                  title={space.spaceName}
                  img={space.image}
                  A1={"Reservas: 50"}
                  status={space.status}
                  to={`/admin/booking/create`}
                >
                  {allowedPermissions['Zona Comunes'] && allowedPermissions['Zona Comunes'].includes('Editar') ? (
                    <Actions accion='Editar' onClick={() => openModal(space)} />
                  ) : null}

                  <Actions href={`/admin/booking/create`} accion='Reservar' icon="calendar" />
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


                <InputsSelect id={"select"} options={spacesTypes} name={"Tipo de zona comun"}
                  value={spaceType} onChange={e => setSpaceType(e.target.value)}
                ></InputsSelect>

                <Inputs name="Nombre zona comun" type={"text"}
                  value={spaceName} onChange={e => setSpaceName(e.target.value)}></Inputs>


                <Inputs name="Area" type={"number"}
                  value={area} onChange={e => setArea(e.target.value)}></Inputs>

                <Inputs name="Capacidad" type={"number"}
                  value={capacity} onChange={e => setCapacity(e.target.value)}></Inputs>

                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                  value={status} onChange={e => setStatus(e.target.value)}
                ></InputsSelect>

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

