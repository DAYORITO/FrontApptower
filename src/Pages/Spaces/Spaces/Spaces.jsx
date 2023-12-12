import { Actions } from "../../../Components/Actions/Actions"
import { BigCard } from "../../../Components/BigCard/BigCard"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'
import { useEffect, useState } from "react"

import { useFetchget } from '../../../Hooks/useFetch'


export const Spaces = () => {

  const [allowedPermissions, setAllowedPermissions] = useState([]);
  const token = Cookies.get('token');

  const { data, load, error } = useFetchget('spaces')
  console.log(data.spaces)



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

  const totalPages = data.spaces ? Math.ceil(data.spaces.length / 8) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


  const [currentPage, setCurrentPage] = useState(0);

  const filteredDataSpaces = () => {
    if (data && data.spaces) {
      return data.spaces.slice(currentPage, currentPage + 8);
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
        title='Zonas Comunes'
        buttonToGo={
          allowedPermissions['Zona Comunes'] && allowedPermissions['Zona Comunes'].includes('Crear')
            ? <ButtonGoTo value='Nueva Zona Común' href='create' />
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
          <ContainerCard>

            {filteredDataSpaces().map(spaces => (
              <BigCard
                cosa={spaces}
              >
                {allowedPermissions['Zona Comunes'] && allowedPermissions['Zona Comunes'].includes('Editar') && (
                  <Actions accion='Editar' />
                )}
                <Actions accion='Reservar' icon="calendar" />
              </BigCard>
            ))}

          </ContainerCard>


        </TablePerson>

      </ContainerTable >
    </>
  )
}
