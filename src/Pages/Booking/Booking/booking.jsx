import { BigCard } from "../../../Components/BigCard/BigCard";
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons";
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable";
import { TablePerson } from "../../../Components/Tables/Tables";
import { useEffect, useState } from "react";
import { useAllowedPermissionsAndPrivileges, useFetch, useFetchget } from '../../../Hooks/useFetch';
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard";
import { usePaginator, filter, postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Spinner } from "../../../Components/Spinner/Spinner";
import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { idToPermissionName, idToPrivilegesName } from "../../../Hooks/permissionRols";
import Cookies from 'js-cookie'
import { Paginator } from "../../../Components/Paginator/Paginator";
import { name } from "dayjs/locale/es";

export const Booking = () => {
  const token = Cookies.get('token');

  const url = import.meta.env.VITE_API_URL

  const { data: spaces, get: getSpaces, loading } = useFetch(url)

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

  const { totalPages, currentPage, nextPage, previousPage, filteredData: spacesInfo } = usePaginator(spacesList, 8);



  return (
    <>
      <ContainerTable
        title='Reservas'
        search={<SearchButton value={search} onChange={searcher} placeholder='Buscar zona común' />}
        showPaginator={<Paginator totalPages={totalPages} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />}
        buttonToGo={<ButtonGoTo value='Todas las reservas' href='calendar/' />}

      >
        <TablePerson>
          <ContainerCard>
            {loading ? <Spinner /> : spacesList.length == 0 || currentPage >= totalPages ?
              <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :
              spacesInfo().map((space) => (
                space.status == 'Active' ?
                  <BigCard
                    key={space.idSpace}
                    title={space.spaceName}
                    img={space.image}
                    small={false}
                    accions={false}
                    A1={`Hora de apertura: ${new Date(`1970-01-01T${space?.openingTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - Hora de cierre: ${new Date(`1970-01-01T${space?.closingTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}

                    to={`/admin/booking/calendar/${space.idSpace}`}
                  /> : null
              ))}
          </ContainerCard>

        </TablePerson>

      </ContainerTable>

    </>
  );
};

