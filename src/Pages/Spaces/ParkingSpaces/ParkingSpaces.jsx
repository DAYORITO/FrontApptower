import { Actions } from "../../../Components/Actions/Actions"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { Row } from "../../../Components/Rows/Row"
import { TablePerson } from "../../../Components/Tables/Tables"
import { Tbody } from "../../../Components/Tbody/Tbody"
import { useFetchget } from "../../../Hooks/useFetch"

import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { DivRow } from '../../../Components/DivRow/DivRow'
import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'

export const ParkingSpaces = () => {

  const [allowedPermissions, setAllowedPermissions] = useState([]);
  const token = Cookies.get('token');

  // 1. Start get all parking spaces

  const { data: parkingSpaces, load, error } = useFetchget('parkingSpaces')
  console.log(parkingSpaces.parkingSpaces)

  // 1. End get all parking spaces





  // 2. Start Funtionality to search

  const [search, setSearch] = useState('');
  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)
  }
  let filterData = [];

  if (!search) {
    filterData = parkingSpaces.parkingSpaces;
  } else {
    filterData = parkingSpaces.parkingSpaces.filter((parking) =>
      parking.parkingName.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 2. End Funtionality to search



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
        title='Parqueaderos'
        dropdown={<DropdownExcel />}
        search={<SearchButton value={search} onChange={searcher} />}
        buttonToGo={
          allowedPermissions['Parqueaderos'] && allowedPermissions['Parqueaderos'].includes('Crear')
            ? <ButtonGoTo value='Crear Parqueadero' href='create' />
            : null
        }
      >




        <TablePerson>
          <Thead>

            <Th name={"Informacion del parqueadero"} />



          </Thead>
          <Tbody>
            {filterData?.map(parking => (
              <Row
                icon="octagon"
                to={`details/${parking.idParkingSpace}`}
                name={"Parqueadero "}
                lastName={parking.parkingName}

                docType={(parking.parkingType == "Private") ? "Privado" : (parking.parkingType == "Public") ? "Publico" : " "}
                status={parking.status}
                op1={""}
                op2={""}

              >
                {allowedPermissions['Parqueaderos'] && allowedPermissions['Parqueaderos'].includes('Editar') && (
                  <Actions accion='Editar' />
                )}
                <Actions accion='Reservar' />
              </Row>
            ))}

          </Tbody>
        </TablePerson>



      </ContainerTable>
    </>)
}
