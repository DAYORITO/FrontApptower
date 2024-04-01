import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable";
import {
  ButtonGoTo,
  DropdownExcel,
  SearchButton,
  SearchSelect,
} from "../../../Components/Buttons/Buttons";
import { TablePerson } from "../../../Components/Tables/Tables";
import { Thead } from "../../../Components/Thead/Thead";
import { Th } from "../../../Components/Th/Th";
import { Tbody } from "../../../Components/Tbody/Tbody";
import { Row } from "../../../Components/Rows/Row";
import { Actions } from "../../../Components/Actions/Actions";
import { useFetchForFile, useFetchget, useFetchpost, useFetch, useAllowedPermissionsAndPrivileges } from "../../../Hooks/useFetch";
import { ModalContainerload, Modaload } from "../../../Components/Modals/Modal";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useApiUpdate } from "../../../Hooks/FetchputDan";
import Swal from "sweetalert2";
import { dotSpinner } from 'ldrs'
import { Modal, ModalContainer } from "../../../Components/Modals/ModalTwo";
import Inputs from "../../../Components/Inputs/Inputs";
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import Select2 from "../../../Components/Inputs/Select2";
import InputTextArea from "../../../Components/Inputs/InputTextArea";
import { set } from "date-fns";
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'
import { Spinner } from "../../../Components/Spinner/Spinner";
import { useUserLogged } from "../../../Helpers/Helpers";

function Visitors() {
  const url = "https://apptowerbackend.onrender.com/api/";


  const { idUserLogged, idRolLogged } = useUserLogged()

  const { data: dataRols, loadRols, errorRols } = useFetchget('rols');

  const nameRole = dataRols?.rols?.find(rol => rol.idrole === idRolLogged)?.namerole;


  const [errors, setErrors] = useState([{}]);
  const filterOptions = [{ label: 'Nombre', value: 'name' }, { label: 'Documento', value: 'documentNumber' }, { label: 'Acceso', value: 'access' }];
  const [selectedFilterParam, setSelectedFilterParam] = useState('name');
  const accessOptions = [{ label: 'Permitido', value: true }, { label: 'Denegado', value: false }];
  //Se crea un estado para actualizar los datos al momento de cualquier accion
  const [visitorsData, setVisitorsData] = useState({ visitors: [] });
  const [visitorsDataOriginal, setVisitorDataOriginal] = useState({ visitors: [] });
  const [showModaload, setShowModaload] = useState(false);
  const [LoadingSpine, setLoadingSpine] = useState(false);
  dotSpinner.register()

  // const { data, load, error } = useFetchget('visitors')
  const { data: fetchVisitors, loading: loadVisitors, get: getVisitors } = useFetch(url)

  //se usa el effect para actualizar los datos del get

  useEffect(() => {
    // if (data && data.visitors) {
    //   setVisitorsData(data.visitors);
    // }
    getVisitors('visitors')
  }, []);
  useEffect(() => {
    if (fetchVisitors?.data?.visitors) {
      setVisitorsData(fetchVisitors.data.visitors);
      setVisitorDataOriginal(fetchVisitors.data.visitors);
      console.log('Encontre visitantes', fetchVisitors?.data)
    }
    else {
      console.log('No hay datos', fetchVisitors?.data)
    }
  }, [fetchVisitors.data])
  //Se crea un estado para actualizar los datos al momento de cualquier accion
  const [showModal, setShowmodal] = useState(false);
  const [TowerData, setTowerData] = useState([]);
  const [phone, setPhone] = useState("Seleccione un apartamento");
  const [parkingSpots, setparkingSpots] = useState({ parkingSpaces: [] });
  const [selectedTower, setSelectedTower] = useState(null);
  const [selectedApartments, setSelectedApartments] = useState([]);
  //mostrar el campo de parqueadero
  const [check1, setCheck1] = useState(false);
  //mostrar el nombre del visitante
  const [visitorname, setVisitorname] = useState("");

  //Se crean los estados para los datos del formulario
  const [apartment, setApartment] = useState(null);
  const [personAllowsAccesss, setPersonAllowsAccess] = useState("");
  const [observationss, setObservations] = useState("");
  const [parkingGuestIncome, setParkingGuestIncoming] = useState("");
  const [visitor, setVisitor] = useState(null);

  //Se crean los estados para el modal de visitantes
  const [documentNumber, setDocumentNumber] = useState("");
  const [name, setName] = useState("");

  const opciones = [
    { value: "si", label: "Si" },
    { value: "no", label: "No" },
  ];

  //Peticiones a la api
  const { data: dataApartment, loading: loadApartments, get: getApartments } = useFetch(url)
  const { data: dataResidentApartment, loading: loadResidentApartment, get: getResidentApartment } = useFetch(url)
  const { data: dataParkingSpaces, loading: loadParkingSpaces, get: getParkingSpaces } = useFetch(url)
  const { data: dataTowers, loading: loadTowers, get: getTowers } = useFetch(url)

  //Consulta Privilegios

  const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);

  // const { data: dataApartment} = useFetchget('apartments')
  // const { data: dataResidentApartment, load: load2, error4 } = useFetchget('aparmentResidents')
  // const { data: dataParkingSpaces, load: load3, error3 } = useFetchget('parkingSpaces')
  // const { data: dataTowers, load: load4, error5 } = useFetchget('towers')

  useEffect(() => {
    // if(dataApartment?.apartments?.length >0 && dataResidentApartment?.apartmentResidents?.length > 0  && dataParkingSpaces?.parkingSpaces?.length > 0  && dataTowers?.towers?.length > 0){
    //   setVisitorsData(sortByCreatedAtDescending(data.visitors));
    //   setVisitorDataOriginal(sortByCreatedAtDescending(data.visitors));
    //   setShowModaload(false);
    // }
    getApartments('apartments')
    getResidentApartment('aparmentResidents')
    getParkingSpaces('parkingSpaces')
    getTowers('towers')
  }, [])

  useEffect(() => {
    if (loadApartments || loadResidentApartment || loadParkingSpaces || loadTowers) {
      setLoadingSpine(true);

    }
    else {

      setLoadingSpine(false);
    }
  }, [loadApartments, loadResidentApartment, loadParkingSpaces, loadTowers])

  const handleChange = (e) => {
    if (e.target.value === "si") {
      setCheck1(true);
    } else {
      setCheck1(false);
    }
  };
  function sortByCreatedAtDescending(data) {
    // Copia el array para no modificar el original
    const sortedData = [...data];

    // Ordena el array por fecha de creación de forma descendente
    sortedData.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    return sortedData;
  }


  const towers = TowerData.map((towerData) => {
    const matchingTower = dataTowers.data.towers.find((tower) => tower.idTower === parseInt(towerData.tower));
    return {
      value: towerData.tower,
      label: matchingTower ? matchingTower.towerName : 'Torre no encontrada'
    };
  });


  const organizeApartmentsByTower = (dataApartment) => {
    const apartmentsByTower = {};
    // Organizar los apartamentos por torres
    dataApartment?.data?.apartments?.forEach((apartment) => {
      const { idApartment, apartmentName, idTower } = apartment;
      // Si no existe la torre, se crea un array vacío
      if (!apartmentsByTower[idTower]) {
        apartmentsByTower[idTower] = [];
      }
      // Se agrega el apartamento al array correspondiente a la torre
      apartmentsByTower[idTower].push({ value: idApartment, label: apartmentName });
    });

    const resultArray = [];

    // Convertir el objeto a un array
    for (const tower in apartmentsByTower) {
      if (apartmentsByTower.hasOwnProperty(tower)) {
        const apartments = apartmentsByTower[tower];

        // Agregar el primer elemento con value y label vacíos
        apartments.unshift({ value: '', label: '' });
        resultArray.push({
          tower,
          apartments: apartmentsByTower[tower]
        });
      }
    }

    return resultArray;
  };

  const getparkingSpots = (dataParkingSpaces) => {
    return (
      dataParkingSpaces?.parkingSpaces
        ?.filter((park) => park.parkingType === "Public" && park.status === "Active")
        .map((park) => ({
          value: park.idParkingSpace,
          label: park.parkingName
        })) || []
    );
  };

  useEffect(() => {
    if (dataApartment.data.apartments) {
      console.log(dataApartment.data.apartments, 'dataApartment1')
      setTowerData(organizeApartmentsByTower(dataApartment))
    }
    else {
      console.log('No hay datos de apartamentos2', dataApartment.data.apartments)
    }
  }, [dataApartment])


  useEffect(() => {
    if (dataParkingSpaces.data.parkingSpaces)
      setparkingSpots(getparkingSpots(dataParkingSpaces.data))
  }, [dataParkingSpaces])

  //Evento para cambia los datos del select de apartamentos
  const handleTowerChange = (selectedTower) => {
    setPhone('Seleccione un apartamento');
    setSelectedTower(selectedTower);
    console.log(selectedTower)

    // Encuentra los apartamentos correspondientes a la torre seleccionada
    const selectedTowerData = TowerData.find((towerData) => towerData.tower === selectedTower);
    if (apartment) {
      setSelectedApartments(apartment)
    }
    setSelectedApartments(selectedTowerData ? selectedTowerData.apartments : []);
    console.log('hola', selectedTowerData)

  };
  const handlePhoneSetted = (selectedValue) => {
    selectedValue = selectedValue?.value ? selectedValue?.value : apartment;
    console.log("Selected Value:", selectedValue);
    setApartment(parseInt(selectedValue?.value))
    console.log('este es mi apartamento ' + apartment)

    if (dataResidentApartment.data && dataResidentApartment.data.apartmentResidents) {
      const resident = dataResidentApartment.data.apartmentResidents.find(
        (resident) => resident.idApartment === parseInt(selectedValue)
      );


      if (resident && resident.resident && resident.resident.status === "Active") {
        console.log(resident.resident.status)
        const user = resident.resident.user;
        if (user && user.phone) {
          setPhone(`${user.phone} - ${user.name} ${user.lastName}`);
          console.log("Phone Number:", user.phone);
        } else {
          console.log("No phone number registered for this resident.");
          setPhone("No se cuenta con un numero.");
        }
      } else {
        console.log("No active resident found for the selected apartment.");
        setPhone("Nadie habita");
      }
    } else {
      console.log("No data or apartmentResidents property found.");
      setPhone("No se encontro el apartamento");
    }
  };

  useEffect(() => {
    if (dataApartment && dataApartment.data.apartments) {
      const apartment = dataApartment.data.apartments.find((apartment) => apartment.idApartment === Number(id));
      if (apartment) {
        setApartment(apartment.idApartment);
        console.log(apartment.idApartment, "apartment.idApartment");
      }
    }
  }, [dataApartment]);




  const handleEditClick = async (data) => {
    setShowModaload(true);
    const response = await useFetchForFile(
      "https://apptowerbackend.onrender.com/api/visitors/",
      data,
      "PUT"
    );
    if (response) {
      setShowModaload(false);
      console.log(response);
      console.log(visitorsData);
      Swal.fire({
        icon: "success",
        title: "Acceso modificado",
        showConfirmButton: false,
        timer: 1500,
      });
      const updatedVisitor = visitorsData.map((visitor) => {
        if (visitor.idVisitor === data.idVisitor) {
          visitor.access = data.access;
        }
        return visitor;
      });
      setVisitorsData(updatedVisitor);
      console.log(updatedVisitor);
      console.log(visitorsData);

    } else {
      setShowModaload(false);
      Swal.fire({
        icon: "error",
        title: "Error al modificar el acceso",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModaload(true);

    try {
      console.log('Esta es la fecha de hoy', new Date());
      // Crear el guestIncome
      const { response: guestIncomeResponse, error: guestIncomeError } = await useFetchpost('guestIncome', {
        "startingDate": new Date().toISOString(),
        "departureDate": null,
        "idApartment": apartment?.value,
        "personAllowsAccess": personAllowsAccesss,
        "observations": observationss ? observationss : "Sin observaciones",
        "idVisitor": visitor,
      });

      if (guestIncomeError) {
        const errorData = guestIncomeError.errorData;
        setErrors(errorData);
        throw new Error('Error al crear el ingreso de huésped');
      }

      if (guestIncomeResponse && check1) {
        // Crear el guestIncomeParking
        const { response: guestIncomeParkingResponse, error: guestIncomeParkingError } = await useFetchpost('guestincomeparking', {
          "idParkingSpace": parkingGuestIncome,
          "idGuest_income": guestIncomeResponse.guestIncome.idGuest_income
        });

        if (guestIncomeParkingError) {
          throw new Error('Error al crear el ingreso del huésped para el estacionamiento');
        }

        // Desactivar el espacio de estacionamiento
        const { response: parkingResponse, error: parkingError } = await useFetchForFile(`${import.meta.env.VITE_API_URL}parkingSpaces`, {
          "idParkingSpace": parkingGuestIncome,
          "status": 'Inactive'
        }, 'PUT');

        if (parkingError) {
          throw new Error('Error al desactivar el espacio de estacionamiento');
        }
      }

      // Éxito
      setShowModaload(false);
      console.log('Respuesta exitosa:', guestIncomeResponse);
      Swal.fire({
        title: 'Éxito',
        text: 'Ingreso creado exitosamente',
        icon: 'success',
      }).then(() => {
        setShowmodal(false);
      });
    } catch (error) {
      setShowModaload(false);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Error desconocido',
        icon: 'error',
      });
      console.error('Error:', error);
    }
  }

  const totalPages = visitorsData ? Math.ceil(visitorsData.length / 8) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


  const [currentPage, setCurrentPage] = useState(0);

  const filteredDatavisitor = () => {
    if (visitorsData.length > 0) {
      return visitorsData?.slice(currentPage, currentPage + 8);
    } else {
      return [];
    }
  };
  const [selectedFilterValue, setSelectedFilterValue] = useState('true');

  const searcher = (e) => {
    console.log("Searcher value", e.target.value);
    setSelectedFilterValue(e.target.value);
    const filtered = visitorsDataOriginal.filter((visitor) => {
      if (selectedFilterParam === 'access') {
        console.log("Estoy en el access")
        console.log("Visitor Access", visitor.access);
        return visitor.access.toString() === e.target.value;
      }
      if (selectedFilterParam === 'name') {
        let fullname = `${visitor.name} ${visitor.lastname}`;
        return fullname.toLowerCase().trim().includes(e.target.value.toLowerCase().trim());
      }
      if (selectedFilterParam === 'documentNumber') {
        return visitor.documentNumber.toLowerCase().includes(e.target.value.toLowerCase());
      }
    });
    setVisitorsData(filtered);
  }

  function handleChangeFilter(e) {
    searcher(e);
  }


  return (
    <>
      <ContainerTable
        title="Visitantes"
        dropdown={nameRole ? (nameRole.toLowerCase().includes('vigilante') || nameRole.toLowerCase().includes('seguridad') || nameRole.toLowerCase().includes('vigilancia') ? null : <DropdownExcel table="visitors" />) : <DropdownExcel table="visitors" />}
        search2={<SearchSelect options={filterOptions} onChange={(e) => {
          setSelectedFilterParam(e.target.value);
          console.log(selectedFilterParam);
          setSelectedFilterValue('');
          setSelectedFilterValue('');
          setVisitorsData(visitorsDataOriginal);
        }}></SearchSelect>}
        search={selectedFilterParam == "access" ? <SearchSelect options={accessOptions} label="Buscar visitante" onChange={handleChangeFilter} /> : <SearchButton value={selectedFilterValue} label="Buscar visitante" onChange={handleChangeFilter} />}
        buttonToGo={
          allowedPermissions['Visitantes'] && allowedPermissions['Visitantes'].includes('Crear')
            ? <ButtonGoTo value="Crear Visitante" href="/admin/visitors/create" />
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
            <Th name={"Información del visitante"}></Th>
            <Th name={"Acceso"}></Th>
            <Th name={"Género"}></Th>
            <Th name={"Acciones"}></Th>
          </Thead>
          <Tbody>
            {LoadingSpine == true ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', position: 'fixed', left: '52%', top: '45%', transform: 'translate(-50%, -24%)' }}>
              <Spinner />
            </div> : filteredDatavisitor().map(visitor => (
              <Row
                A3={visitor.documentType}
                A4={visitor.documentNumber}
                A1={`${visitor.name} ${visitor.lastname || ""} `}
                A6={
                  visitor.access === true
                    ? "Permitido"
                    : visitor.access === false
                      ? "Denegado"
                      : "Desconocido"
                }
                A7={visitor.genre}
              >
                {visitor.access === true ? (
                  <Actions accion="Agregar ingreso"
                    onClick={() => {
                      setVisitor(visitor.idVisitor);
                      setName(visitor.name);
                      setDocumentNumber(visitor.documentNumber);
                      setShowmodal(true);
                    }} />
                ) : (
                  ""
                )}
                <Actions
                  accion="Cambiar Acceso"
                  onClick={() => {
                    handleEditClick({
                      idVisitor: visitor.idVisitor,
                      access: !visitor.access,
                    });
                  }}
                />
              </Row>
            ))}
          </Tbody>
        </TablePerson>
      </ContainerTable>
      //{" "}
      {showModaload &&
        createPortal(
          <>
            <ModalContainerload ShowModal={setShowModaload}>
              <Modaload showModal={setShowModaload}>
                <div className="d-flex justify-content-center">
                  <l-dot-spinner
                    size="50"
                    speed="2"
                    color="black"
                  ></l-dot-spinner>
                </div>
                <div className="d-flex justify-content-center">
                  <p> </p>
                  <p className="mt-2 text-muted">Cargando datos...</p>
                </div>
              </Modaload>
            </ModalContainerload>
          </>,
          document.getElementById("modalRender")
        )}
      {showModal &&
        createPortal(
          <>
            <ModalContainer ShowModal={setShowmodal}>
              <Modal title={"Crear Ingreso"} showModal={setShowmodal} onClick={handleSubmit}>
                <InputsSelect name={'Torre'} onChange={(e) => { handleTowerChange(e.target.value) }} options={towers} />
                <div className="mb-4">
                  <Select2 placeholder={'Apartamento'} identifier={"idApartment"} errors={errors} value={apartment} onChange={(selectedValue) => { handlePhoneSetted(selectedValue), setApartment(selectedValue) }} options={selectedApartments}></Select2>
                </div>

                <Inputs name='Teléfono' readonly={true} value={phone} inputStyle={{ backgroundColor: '#F8F8F8' }}></Inputs>

                <div
                  className="d-flex justify-content-around"
                  style={{ width: "100%" }}
                >
                  <div className="mr-1" style={{ width: "100%" }}>
                    <Inputs
                      name={"Visitante"}
                      value={documentNumber}
                      readonly={true}
                    ></Inputs>
                  </div>
                  <div style={{ width: "100%" }}>
                    <Inputs
                      name="Nombre"
                      readonly={true}
                      value={name}
                    ></Inputs>
                  </div>
                </div>
                <InputsSelect
                  name="Ingreso con vehículo"
                  style="width: 100%"
                  id={"tipoingreso"}
                  onChange={handleChange}
                  options={opciones}
                ></InputsSelect>
                {/* <Inputs name="Apartamento" list={'opciones'} options={apartmentsOptions}></Inputs> */}
                {check1 && (
                  <InputsSelect
                    name="Parqueadero*"
                    id={"tipoingreso"}
                    onChange={(e) => setParkingGuestIncoming(e.target.value)}
                    options={parkingSpots}
                  ></InputsSelect>
                )}
                <Inputs
                  name="Persona que permite el acceso"
                  type="text"
                  identifier={"personAllowsAccess"}
                  errors={errors}
                  onChange={(e) => {
                    setPersonAllowsAccess(e.target.value);
                  }}
                ></Inputs>
                {/* <Inputs
                  name="Observaciones"
                  type="text"
                  onChange={(e) => {
                    setObservations(e.target.value);
                  }}
                ></Inputs> */}
                <InputTextArea name={"Observaciones"} onChange={(e) => setObservations(e.target.value)}></InputTextArea>
              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )}
    </>
  );
}

export default Visitors;
