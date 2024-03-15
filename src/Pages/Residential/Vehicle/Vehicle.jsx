
import { useAllowedPermissionsAndPrivileges, useFetch, useFetchget } from '../../../Hooks/useFetch'
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
import { useContext, useEffect, useState } from 'react'
import { RowNotificactions } from '../../../Components/RowNotificacions/RowNotificactions'
import { Spinner } from '../../../Components/Spinner/Spinner'
import { usePaginator, filter, postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Paginator } from '../../../Components/Paginator/Paginator'
import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { useParams } from 'react-router'
import { createPortal } from 'react-dom'
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import Inputs from '../../../Components/Inputs/Inputs'
import { SocketContext } from '../../../Context/SocketContext'
import InputTextArea from '../../../Components/Inputs/InputTextArea'


export const Vehicle = () => {

  const url = "http://localhost:3000/api/"

  const { id } = useParams();

  const { socket } = useContext(SocketContext)


  const { idUserLogged, idRolLogged } = useUserLogged()

  const { data: dataRols, loadRols, errorRols } = useFetchget('rols');

  const nameRole = dataRols?.rols?.find(rol => rol.idrole === idRolLogged)?.namerole;




  const token = Cookies.get('token');

  const { data: vehicles, get: getVehicles, loading: vehicleLoading } = useFetch(url)

  useEffect(() => {

    getVehicles("vehicle")

  }, []);

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
        },
        credentials: 'include'
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


  // Modal edit vehicle

  const [vehicleModalEdit, setVehicleModalEdit] = useState(false);

  const openVehicleModalEdit = (data) => {

    console.log(data)

    setIdVehicle(data.idvehicle)
    setIdApartment(data.idApartment)
    setDescription(data.description)
    setPlate(data.licenseplate)

    setVehicleModalEdit(true)
  }

  // filter 

  const [search, setSearch] = useState(id ? id : '');

  const searcher = (e) => {

    setSearch(e.target.value)
    console.log(e.target.value)

  }

  let vehicleList = filter(search, vehicles?.data?.vehicle, "licenseplate")


  //Consulta Privilegios

  const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);


  // Paginator

  const { totalPages, currentPage, nextPage, previousPage, filteredData: vehiclesInto } = usePaginator(vehicleList, 4);



  // data

  const [plate, setPlate] = useState('');
  const [description, setDescription] = useState('');
  const [idApartment, setIdApartment] = useState('');
  const [idvehicle, setIdVehicle] = useState('');

  const [errorList, setErrorList] = useState([]);

  // List

  const { data: apartments, get: getApartment } = useFetch(url)

  useEffect(() => {

    getApartment("apartments")

  }, []);

  const AparmetList = apartments && apartments?.data?.apartments
    ? apartments?.data?.apartments
      .filter(apartment => apartment.status === 'Active')
      .map(apartment => ({
        value: apartment.idApartment,
        label: `${apartment.apartmentName} ${apartment.Tower.towerName}`
      }))
    : [];


  // Edit vehicle

  const editVehicle = async (event) => {

    const data = {

      // User logged

      idUserLogged: idUserLogged,

      idvehicle: idvehicle,
      idApartment: parseInt(idApartment),
      licenseplate: plate,
      description: description

    }

    await postRequest(event, 'vehicle', 'PUT', setVehicleModalEdit, data, url, setErrorList, null, socket);

    getVehicles('vehicle')


  }




  return (
    <>

      <ContainerTable
        title='Vehiculos'
        dropdown={nameRole ? (nameRole.toLowerCase().includes('vigilante') || nameRole.toLowerCase().includes('seguridad') || nameRole.toLowerCase().includes('vigilancia') ? null : <DropdownExcel table='apartments' />) : <DropdownExcel table='apartments' />}
        search={<SearchButton value={search} onChange={searcher} />}
        buttonToGo={
          allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Crear')
            ? <ButtonGoTo value='Crear Vehiculo' href='/admin/vehicle/create/' />
            : null
        }
        showPaginator={<Paginator totalPages={totalPages} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />}

      >

        <TablePerson>

          <Tbody>


            {

              vehicleLoading ? <Spinner /> : vehicleList.length == 0 || currentPage >= totalPages ?

                <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :

                vehiclesInto().map(vehicle => (

                  <Row
                    img={'https://icones.pro/wp-content/uploads/2021/03/icone-de-voiture-symbole-png-grise.png'}
                    A1={`Placa`}
                    A2={vehicle.licenseplate}
                    A3={'Descripcion: '}
                    A4={vehicle.description.toLowerCase()}

                    // A4={`Asociado al apartamento ${vehicle.Apartment.apartmentName}`}

                    A9={`Apartamento asociado`}
                    A11={`${vehicle.Apartment.apartmentName}`}

                    status={vehicle.state}

                    onClick={() => openVehicleModalEdit(vehicle)}

                  >

                    {allowedPermissions['Vehiculos'] && allowedPermissions['Vehiculos'].includes('Editar') ? (
                      <Actions onClick={() => openVehicleModalEdit(vehicle)} accion='Editar' />
                    ) : null}
                    <Actions href={`/admin/apartments/details/${vehicle.Apartment.idApartment}`} accion='Ir a ver apartamento' />
                  </Row>

                ))
            }
          </Tbody>
        </TablePerson>
      </ContainerTable>

      {
        vehicleModalEdit &&
        createPortal(
          <>
            <ModalContainer>
              <Modal
                onClick={editVehicle}
                showModal={setVehicleModalEdit}
                title={`Informacion vehiculo `}
              >


                <InputsSelect id={"select"} options={AparmetList} name={"Numero de aparmento"}
                  identifier={'idApartment'} errors={errorList}
                  value={idApartment} onChange={e => setIdApartment(e.target.value)}
                  disabled={id ? idApartment : ''}>

                </InputsSelect>
                <Inputs name={"Placa"} value={plate}
                  identifier={'licenseplate'} errors={errorList}
                  type="text" onChange={e => setPlate(e.target.value)}>

                </Inputs>
                <InputTextArea
                  name="Descripción"
                  identifier={"details"}
                  errors={errorList}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                ></InputTextArea>
                <Inputs type={"hidden"}
                  value={idvehicle} onChange={e => setIdVehicle(e.target.value)}></Inputs>

              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )
      }
    </>
  )
}
