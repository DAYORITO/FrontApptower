/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { format, parseISO } from 'date-fns';
import { useFetchget } from '../../../Hooks/useFetch'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { DivRow } from '../../../Components/DivRow/DivRow'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'

export const Booking = () => {
  const token = Cookies.get('token');
  const [allowedPermissions, setAllowedPermissions] = useState([]);
  const { data, load, error } = useFetchget('booking')
  console.log(load)
  console.log(error)
  console.log(data.booking)
  const [search, setSearch] = useState('');
  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)
  }
  let filterData = [];

  if (!search) {
    filterData = data;
  } else {
    filterData = data.apartments.filter((dato) =>
      dato.apartmentName.toLowerCase().includes(search.toLowerCase())
    );
  }



  useEffect(() => {
    if (token) {
      fetchUserPrivilegeAndPermission(token);
    }
  }, [token]);


  //Consulta privilegios 
  const fetchUserPrivilegeAndPermission = async (token) => {
    try {
      const response = await fetch('https://apptowerbackend.onrender.com/api/privilegefromrole', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user privileges');
      }

      const data = await response.json();
      console.log(data, 'data');
      console.log('Allowed Permissions hi:', data.privileges);

      if (data && data.privileges && Array.isArray(data.privileges)) {
        const allowed = {};
        data.privileges.forEach(({ idpermission, idprivilege }) => {
          const permissionName = idToPermissionName[idpermission];
          const privilegeName = idToPrivilegesName[idprivilege];

          if (!allowed[permissionName]) {
            allowed[permissionName] = [];
          }
          allowed[permissionName].push(privilegeName);
        });

        setAllowedPermissions(allowed);
      }
    } catch (error) {
      console.error('Error fetching user permissions:', error);
    }
  };


  const totalPages = data.booking ? Math.ceil(data.booking.length / 8) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


  const [currentPage, setCurrentPage] = useState(0);

  const filteredDatabooking = () => {
    if (data && data.booking) {
      return data.booking.slice(currentPage, currentPage + 8);
    } else {
      return [];
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 8)
  }


  const PreviousPage = () => {
    if (currentPage > 0)
      setCurrentPage(currentPage - 8)
  }

  return (
    <>
      <ContainerTable title='Reservas'
        dropdown={<DropdownExcel />}
        search={<SearchButton value={search} onChange={searcher} />}
        buttonToGo={
          allowedPermissions['Reservas'] && allowedPermissions['Reservas'].includes('Crear')
            ? <ButtonGoTo value='Crear Reserva' href='create' />
            : null
        }
        showPaginator={
          <nav aria-label="Table Paging" className="mb- text-muted my-4">
            <ul className="pagination justify-content-center mb-0">
              <li className="page-item">
                <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); PreviousPage(); }}>Anterior</a>
              </li>
              {pageNumbers.map((pageNumber) => (
                <li key={pageNumber} className={`page-item ${currentPage + 1 === pageNumber ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); setCurrentPage((pageNumber - 1) * 10); }}>{pageNumber}</a>
                </li>
              ))}


              <li className="page-item">
                <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); nextPage(); }}>Siguiente</a>
              </li>
            </ul>
          </nav >
        }
      >



        <TablePerson>
          <Thead>
            <Th name={'Zona Común'} ></Th>
            <Th name={'Nombre del Solicitante'}></Th>
            <Th name={'Cantidad de personas'}></Th>
            <Th name={'Fecha de Inicio'}></Th>
            <Th name={'Fecha de Fin'}></Th>
            <Th></Th>
          </Thead>
          <Tbody>
            {
              load && <h1 className='d-flex'>Cargando...</h1>
            }
            {
              error && <h1 className='d-flex'>Error: {error}</h1>
            }
            {
              filteredDatabooking().map(booking => (
                <Row
                  name={booking.Space.spaceName}
                  icon='calendar'
                  lastName={''}
                  docType={booking.status}
                  status={booking.status}
                  op1={booking.user.name + ' ' + booking.user.lastname}
                  op2={booking.amount}
                  op3={format(parseISO(booking.bookingdate), 'PPpp')}
                  op4={format(parseISO(booking.finalDate), 'PPpp')}
                >
                  {allowedPermissions['Reservas'] && allowedPermissions['Reservas'].includes('Editar') && (
                    <Actions accion='Editar' />
                  )}
                </Row>

              ))
            }
          </Tbody>
        </TablePerson>
      </ContainerTable>
    </>
  )
}
