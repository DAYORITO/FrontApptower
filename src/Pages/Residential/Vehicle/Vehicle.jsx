
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


  
  
  return (
    <>
      <ContainerTable title='Vehiculo'
        buttonToGo={<ButtonGoTo value='Crear Vehiculo' href='create' />}
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
              data.vehicle?.map(vehicles => (
                <Row
                icon='truck'
                  name={vehicles.licenseplate}
                  lastName={''}
                  status={vehicles.state}
                  op2={vehicles.description}
                  op3={vehicles.Apartment.apartmentName}
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
