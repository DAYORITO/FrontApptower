import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { useFetchget } from '../../../Hooks/useFetch'
import { ModalContainerload, Modaload } from "../../../Components/Modals/Modal";
import { useEffect, useState } from 'react'
import { createPortal } from "react-dom";
import { useApiUpdate } from '../../../Hooks/FetchputDan'
import Swal from 'sweetalert2';
import { cardio } from 'ldrs'
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'




function Visitors() {


  const token = Cookies.get('token');
  const [allowedPermissions, setAllowedPermissions] = useState([]);

  //Se crea un estado para actualizar los datos al momento de cualquier accion
  const [visitorsData, setVisitorsData] = useState({ visitors: [] });
  const [showModaload, setShowModaload] = useState(false);
  cardio.register()

  const { data, load, error } = useFetchget('visitors')

  useEffect(() => {
    // Cuando la carga está en progreso (load es true), activamos el modal de carga
    if (load) {
      setShowModaload(true);
    } else {
      // Cuando la carga se completa (load es false), desactivamos el modal de carga
      setShowModaload(false);
    }
  }, [load]);

  console.log(data.visitors)
  //se usa el effect para actualizar los datos del get
  useEffect(() => {
    if (data && data.visitors) {
      setVisitorsData(data.visitors);
    }
  }, [data]);

  //se crea una funcion para el boton que hara la accion de actualizar y se le pasa como parametro los datos que se van a actualizar
  const handleEditClick = async (dataToUpdate) => {
    setShowModaload(true);

    //se llama a la funcion useApiUpdate y se le pasa como parametro los datos que se van a actualizar y el endpoint
    useApiUpdate(dataToUpdate, 'visitors')
      .then((responseData) => {
        setShowModaload(false);

        console.log(responseData)
        Swal.fire({
          icon: 'success',
          title: 'Acceso actualizado',
          showConfirmButton: false,
          timer: 1500
        })
        //se crea una constante que va a actualizar los datos para que en el momento que se actualice el estado se actualice la tabla
        const updatedVisitors = visitorsData.map((visitor) => {
          if (visitor.idVisitor === dataToUpdate.idVisitor) {
            visitor.access = dataToUpdate.access;
          }
          return visitor;
        });
        setVisitorsData(updatedVisitors);

      })
      .catch((error) => {
        console.error('Error updating access:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        });
      });
  };

  // const apiHookUpdate = async (visitor, endpoint="visitors") => {
  //   const updatedVisitor = {
  //     idVisitor: visitor.idVisitor,
  //     access: !visitor.access,
  //   };
  //   const url= `https://apptowerbackend.onrender.com/api/`

  //   try {
  //     const response = await fetch(url+endpoint, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedVisitor),
  //     });

  //     if (!response.ok) {

  //       throw new Error(`Failed to update access for visitor ${visitor.idVisitor}`);
  //     }else{
  //       Swal.fire({
  //           icon: 'success',
  //           title: 'Acceso actualizado',
  //           showConfirmButton: false,
  //           timer: 1500
  //         })
  //     }
  //     const updatedVisitors = visitorsData.map((visitor) => {
  //       if (visitor.idVisitor === updatedVisitor.idVisitor) {
  //         visitor.access = updatedVisitor.access;
  //       }
  //       return visitor;
  //     });
  //     setVisitorsData(updatedVisitors);
  //   } catch (error) {
  //     console.error('Error updating access:', error);
  //   }
  // };
  // 



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
        title='Visitantes'
        dropdown={<DropdownExcel />}
        search={<SearchButton />}
        buttonToGo={
          allowedPermissions['Visitantes'] && allowedPermissions['Visitantes'].includes('Crear')
            ? <ButtonGoTo value='Crear Visitante' href='create' />
            : null
        }
      >

        <TablePerson>
          <Thead>

            <Th name={'Informacion del visitante'}></Th>
            <Th name={'Acceso'}></Th>
            <Th name={'Sexo'}></Th>
            <Th name={'Acciones'}></Th>
          </Thead>
          <Tbody>
            {data.visitors?.map(visitor => (
              <Row
                docType={visitor.documentType}
                docNumber={visitor.documentNumber}
                name={visitor.name}
                lastName={visitor.lastname}
                op1={
                  visitor.access === true ? 'Permitido' :
                    visitor.access === false ? 'Denegado' :
                      'Desconocido'
                }
                op2={visitor.genre}
              >

                {allowedPermissions['Ingresos'] && allowedPermissions['Ingresos'].includes('Crear') && (
                  <Actions accion='Agregar Ingreso' />
                )}

                {allowedPermissions['Visitantes'] && allowedPermissions['Visitantes'].includes('Editar') && (
                  <Actions accion='Cambiar Acceso' onClick={() => {
                    handleEditClick({ idVisitor: visitor.idVisitor, access: !visitor.access });
                  }} />
                )}
              </Row>
            ))}


          </Tbody>
        </TablePerson>
      </ContainerTable>
            // {showModaload &&
        createPortal(
          <>
            <ModalContainerload ShowModal={setShowModaload}>
              <Modaload
                showModal={setShowModaload}
              >
                <div className='d-flex justify-content-center'>
                  <l-cardio
                    size="50"
                    stroke="4"
                    speed="2"
                    color="black"
                  ></l-cardio>
                </div>


              </Modaload>
            </ModalContainerload>
          </>,
          document.getElementById("modalRender")
        )}

    </>
  )
}

export default Visitors