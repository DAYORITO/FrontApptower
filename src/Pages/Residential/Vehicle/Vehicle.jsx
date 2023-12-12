
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
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'
import { useEffect, useState } from 'react'

export const Vehicle = () => {
  const [allowedPermissions, setAllowedPermissions] = useState([]);
  const token = Cookies.get('token');
  const { data, load, error } = useFetchget('vehicle')
  console.log(data)
  console.log(load)
  console.log(error)


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



  const totalPages = data.vehicle ? Math.ceil(data.vehicle.length / 8) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


  const [currentPage, setCurrentPage] = useState(0);

  const filteredDatavehicle = () => {
    if (data && data.vehicle) {
      return data.vehicle.slice(currentPage, currentPage + 8);
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

      <ContainerTable
        title='Vehiculos'
        dropdown={<DropdownExcel />}
        search={<SearchButton />}
        buttonToGo={
          allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Crear')
            ? <ButtonGoTo value='Crear Vehiculo' href='create' />
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
            <Th name={'placa'}></Th>
            <Th name={'detalle'}></Th>
            <Th name={'apartamento'}></Th>
            <Th name={''}></Th>
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
              filteredDatavehicle().map(vehicle => (
                <Row
                  icon='truck'
                  name={vehicle.licenseplate}
                  lastName={''}
                  status={vehicle.state}
                  op2={vehicle.description}
                  op3={vehicle.Apartment.apartmentName}
                >
                  {allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Editar') && (
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
