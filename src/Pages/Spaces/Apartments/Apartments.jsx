import { useFetch, useFetchget } from '../../../Hooks/useFetch'
import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import { DivRow } from '../../../Components/DivRow/DivRow'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'



export const Apartments = () => {
  const token = Cookies.get('token');
  const [allowedPermissions, setAllowedPermissions] = useState([]);

  // Get Data

  const { data, load, error } = useFetchget('apartments')

  console.log(data)


  // Funtionality to search

  const [search, setSearch] = useState('');
  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)
  }
  let filterData = [];

  if (!search) {
    filterData = data.apartments;
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

  return (
    <>
      <ContainerTable
        title='Apartamentos'
        dropdown={<DropdownExcel />}
        search={<SearchButton value={search} onChange={searcher} />}
        buttonToGo={
          allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Crear')
            ? <ButtonGoTo value='Crear Apartamentos' href='create' />
            : null
        }
      >


        <TablePerson>
          <Thead>
            <Th name={"Apartamento"} />

            <Th name={'Respoonsables'}></Th>
            <Th name={'Notificaciones'}></Th>
            <Th />
            <Th />

          </Thead>
          <Tbody>

            {filterData?.map(apartment => (
              <Row

                icon={"home"}
                status={apartment.status}
                docType={apartment.tower}
                docNumber={apartment.area + " m²"}
                name={"Apartamento"}
                lastName={`${apartment.apartmentName}`}
                op1={""}
                op2={""}
                op3={""}

                to={`details/${apartment.idApartment}`}

              >
                {allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Editar') && (
                  <Actions accion='Editar' />
                )}
              </Row>
            ))}



          </Tbody>
        </TablePerson>
      </ContainerTable>



    </>)
}
