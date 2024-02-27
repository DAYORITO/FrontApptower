import { BigCard } from "../../../Components/BigCard/BigCard";
import { SearchButton } from "../../../Components/Buttons/Buttons";
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

export const Booking = () => {
  const token = Cookies.get('token');

  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"

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

  const { totalPages, currentPage, nextPage, previousPage, filteredData: spacesInfo } = usePaginator(spacesList, 4);



  return (
    <>
      <ContainerTable
        title='Reservas'
        search={<SearchButton value={search} onChange={searcher} placeholder='Buscar zona común' />}
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
                  status={space.status}
                  accions={false}
                  to={`/admin/booking/calendar/${space.idSpace}`}
                >

                </BigCard>
              ))}
          </ContainerCard>

        </TablePerson>

      </ContainerTable>

    </>
  );
};

