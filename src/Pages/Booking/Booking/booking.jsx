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
  const { data, load, error } = useFetchget('https://apptowerbackend.onrender.com/api/booking')
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
        title='Reservas'
        dropdown={<DropdownExcel />}
        search={<SearchButton />}
        buttonToGo={
          allowedPermissions['Reservas'] && allowedPermissions['Reservas'].includes('Crear')
            ? <ButtonGoTo value='Crear Reserva' href='create' />
            : null
        }
      >




        <TablePerson>
          <Thead>
            <Th name={''}></Th>
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
              data.booking?.map(booking => (
                <Row
                  name={booking.bookingtype === 1 ? 'Salon Social' :
                    booking.bookingtype === 2 ? 'Zona Humeda' : 'No definido'}
                  lastName={''}
                  docType={booking.status}
                  op1={booking.user.name + ' ' + booking.user.lastname}
                  op4={booking.amount}
                  op5={format(parseISO(booking.bookingdate), 'PPpp')}
                  op6={format(parseISO(booking.finalDate), 'PPpp')}
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
