import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable";
import {
  ButtonGoTo,
  DropdownExcel,
  SearchButton,
} from "../../../Components/Buttons/Buttons";
import { TablePerson } from "../../../Components/Tables/Tables";
import { Thead } from "../../../Components/Thead/Thead";
import { Th } from "../../../Components/Th/Th";
import { Tbody } from "../../../Components/Tbody/Tbody";
import { Row } from "../../../Components/Rows/Row";
import { Actions } from "../../../Components/Actions/Actions";
import { useFetchget, useFetchpost } from "../../../Hooks/useFetch";
import { ModalContainerload, Modaload } from "../../../Components/Modals/Modal";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useApiUpdate } from "../../../Hooks/FetchputDan";
import Swal from "sweetalert2";
import { cardio } from "ldrs";
import { Modal, ModalContainer } from "../../../Components/Modals/ModalTwo";
import Inputs from "../../../Components/Inputs/Inputs";
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import Select2 from "../../../Components/Inputs/Select2";
import InputTextArea from "../../../Components/Inputs/InputTextArea";
import { set } from "date-fns";
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
  const [visitorname, setVisitorname] = useState(" ");

  //Se crean los estados para los datos del formulario
  const [apartment, setApartment] = useState(null);
  const [personAllowsAccesss, setPersonAllowsAccess] = useState("");
  const [observationss, setObservations] = useState("");
  const [parkingGuestIncome, setParkingGuestIncoming] = useState("");
  const [visitor, setVisitor] = useState(null);

  //Se crean los estados para el modal de visitantes
  const [documentNumber, setDocumentNumber] = useState("");
  const [name, setName] = useState("");
  cardio.register();
  const opciones = [
    { value: "si", label: "Si" },
    { value: "no", label: "No" },
  ];

  const { data: dataapartments, load2, error2 } = useFetchget("apartments");
  const {
    data: dataResidentApartment,
    load4,
    error4,
  } = useFetchget("aparmentResidents");
  const {
    data: dataParkingSpaces,
    load3,
    error3,
  } = useFetchget("parkingSpaces");

  useEffect(() => {
    // Cuando la carga está en progreso (load es true), activamos el modal de carga
    if (load || load2 || load3 || load4) {
      setShowModaload(true);
    } else {
      // Cuando la carga se completa (load es false), desactivamos el modal de carga
      setShowModaload(false);
    }
  }, [load, load2, load3, load4]);

  const handleChange = (e) => {
    if (e.target.value === "si") {
      setCheck1(true);
    } else {
      setCheck1(false);
    }
  };

  const towers = TowerData.map((towerData) => ({
    value: towerData.tower,
    label: `Tower ${towerData.tower}`,
  }));
  console.log("holatower" + towers);
  //Obtiene los apartamentos de TowerData
  const organizeApartmentsByTower = (dataapartments) => {
    const apartmentsByTower = {};
    // Organizar los apartamentos por torre
    dataapartments?.apartments?.forEach((apartment) => {
      const { idApartment, apartmentName, tower } = apartment;
      // Si no existe la torre, se crea un array vacío
      if (!apartmentsByTower[tower]) {
        apartmentsByTower[tower] = [];
      }
      // Se agrega el apartamento al array correspondiente a la torre
      apartmentsByTower[tower].push({
        value: idApartment,
        label: apartmentName,
      });
    });

    const resultArray = [];

    // Convertir el objeto a un array
    for (const tower in apartmentsByTower) {
      if (apartmentsByTower.hasOwnProperty(tower)) {
        const apartments = apartmentsByTower[tower];

        // Agregar el primer elemento con value y label vacíos
        apartments.unshift({ value: "", label: "" });
        resultArray.push({
          tower,
          apartments: apartmentsByTower[tower],
        });
      }
    }

    return resultArray;
  };

  const getparkingSpots = (dataParkingSpaces) => {
    return (
      dataParkingSpaces?.parkingSpaces
        ?.filter(
          (park) => park.parkingType === "Public" && park.status === "Active"
        )
        .map((park) => ({
          value: park.idParkingSpace,
          label: park.parkingName,
        })) || []
    );
  };

  useEffect(() => {
    if (dataParkingSpaces.parkingSpaces)
      setparkingSpots(getparkingSpots(dataParkingSpaces));
  }, [dataParkingSpaces]);

  useEffect(() => {
    if (dataapartments.apartments)
      setTowerData(organizeApartmentsByTower(dataapartments));
  }, [dataapartments]);

  console.log(data.visitors);
  //se usa el effect para actualizar los datos del get
  useEffect(() => {
    if (data && data.visitors) {
      setVisitorsData(data.visitors);
    }
  }, [data]);

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

  const handleTowerChange = (selectedTower) => {
    setPhone("Seleccione un apartamento");
    setSelectedTower(selectedTower);
    console.log(selectedTower);

    // Encuentra los apartamentos correspondientes a la torre seleccionada
    const selectedTowerData = TowerData.find(
      (towerData) => towerData.tower === selectedTower
    );
    setSelectedApartments(
      selectedTowerData ? selectedTowerData.apartments : []
    );
    console.log("hola", selectedTowerData);
  };

  const handlePhoneSetted = (selectedValue) => {
    console.log("Selected Value:", selectedValue);
    setApartment(parseInt(selectedValue));
    console.log("este es mi apartamento " + apartment);

    if (dataResidentApartment && dataResidentApartment.apartmentResidents) {
      const resident = dataResidentApartment.apartmentResidents.find(
        (resident) => resident.idApartment === parseInt(selectedValue)
      );

      if (resident) {
        if (resident.resident && resident.resident.phoneNumber) {
          setPhone(
            resident.resident.phoneNumber +
              " - " +
              resident.resident.name +
              " " +
              resident.resident.lastName
          );
          console.log("Phone Number:", resident.resident.phoneNumber);
        } else {
          console.log("No phone number registered for this resident.");
          setPhone("No se cuenta con un numero.");
        }
      } else {
        console.log("No resident found for the selected apartment.");
        setPhone("Nadie habita");
      }
    } else {
      console.log("No data or apartmentResidents property found.");
      setPhone("No se encontro el apartamento");
    }
  };

  //se crea una funcion para el boton que hara la accion de actualizar y se le pasa como parametro los datos que se van a actualizar
  const handleEditClick = async (dataToUpdate) => {
    setShowModaload(true);

    //se llama a la funcion useApiUpdate y se le pasa como parametro los datos que se van a actualizar y el endpoint
    useApiUpdate(dataToUpdate, "visitors")
      .then((responseData) => {
        setShowModaload(false);

        console.log(responseData);
        Swal.fire({
          icon: "success",
          title: "Acceso actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
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
        console.error("Error updating access:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal!",
        });
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowModaload(true);
    const { response, error } = await useFetchpost('guestIncome', {
      "startingDate": new Date(),
      "departureDate": null,
      "idApartment": apartment,
      "personAllowsAccess": personAllowsAccesss,
      "observations": observationss ?  observationss : "Sin observaciones",
      "idVisitor": visitor,
    });
    if (response) {
      if (response && check1){
        const { response: response2, error: error2 } = await useFetchpost('guestincomeparking', {
          "idParkingSpace": parkingGuestIncome,
          "idGuest_income": response.guestIncome.idGuest_income
        });
        if (response2) {
          // Manejar la respuesta exitosa
          console.log('Respuesta exitosa:', response2);
          useApiUpdate({"idParkingSpace":parkingGuestIncome, "status":'Inactive'}, 'parkingSpaces')
          .then((responseData)=>{
            setShowModaload(false);
            setShowmodal(false);
            console.log(responseData)
          }) 
        }
        if (error2) {
          console.error('Error:', error2);
        }
                
      }
      setShowModaload(false);
      setShowmodal(false);
      // Manejar la respuesta exitosa
      console.log('Respuesta exitosa:', response);
            Swal.fire({
                title: 'Éxito',
                text: 'Ingreso creado exitosamente',
                icon: 'success',
            }).then(() => {

                navigate('/admin/guest_income');
            });
    }

    if (error) {
            setShowModaload(false);
            Swal.fire({
                title: 'Error',
                text: 'Error al crear ingreso',
                icon: 'error',
            });
      console.error('Error:', error);
    }
  };

  return (
    <>
      <ContainerTable
        title="Visitantes"
        dropdown={<DropdownExcel />}
        search={<SearchButton />}
        buttonToGo={
          <ButtonGoTo value="Crear Visitante" href="/admin/visitors/create" />
        }
      >
        <TablePerson>
          <Thead>
            <Th name={"Informacion del visitante"}></Th>
            <Th name={"Acceso"}></Th>
            <Th name={"Sexo"}></Th>
            <Th name={"Acciones"}></Th>
          </Thead>
          <Tbody>
            {data.visitors?.map((visitor) => (
              <Row
                docType={visitor.documentType}
                docNumber={visitor.documentNumber}
                name={visitor.name}
                lastName={visitor.lastname}
                op1={
                  visitor.access === true
                    ? "Permitido"
                    : visitor.access === false
                    ? "Denegado"
                    : "Desconocido"
                }
                op2={visitor.genre}
              >
                {visitor.access === true ? (
                  <Actions accion="Agregar ingreso" 
                  onClick={() => {
                    setVisitor(visitor.idVisitor);
                    setName(visitor.name);
                    setDocumentNumber(visitor.documentNumber);
                    setShowmodal(true);
                  }}/>
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
      {showModal &&
        createPortal(
          <>
            <ModalContainer ShowModal={setShowmodal}>
              <Modal title={"Crear Ingreso"} showModal={setShowmodal} onClick={handleSubmit}>
                <InputsSelect
                  name={"Torre"}
                  onChange={(e) => {
                    handleTowerChange(e.target.value);
                  }}
                  options={towers}
                ></InputsSelect>
                <div className="mb-4">
                <Select2
                  name={"Apartamento"}
                  onChange={(selectedValue) => {
                    handlePhoneSetted(selectedValue),
                      setApartment(selectedValue);
                  }}
                  options={selectedApartments}
                ></Select2>
                </div>
                
                <Inputs name="Telefono" readonly={true} value={phone}></Inputs>

                <div
                  className="d-flex justify-content-around"
                  style={{ width: "100%" }}
                >
                  <div className="mr-1" style={{ width: "100%" }}>
                    <Inputs
                      name={"Visitante"}
                      value={documentNumber}
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
                  name="Ingreso con vehiculo"
                  style="width: 100%"
                  id={"tipoingreso"}
                  onChange={handleChange}
                  options={opciones}
                ></InputsSelect>
                {/* <Inputs name="Apartamento" list={'opciones'} options={apartmentsOptions}></Inputs> */}
                {check1 && (
                  <InputsSelect
                    name="Parqueadero"
                    id={"tipoingreso"}
                    onChange={(e) => setParkingGuestIncoming(e.target.value)}
                    options={parkingSpots}
                  ></InputsSelect>
                )}
                <Inputs
                  name="Persona que permite el acceso"
                  type="text"
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
                <InputTextArea name={"Observaciones"} onChange={(e)=>setObservations(e.target.value)}></InputTextArea>
              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )}
    </>
  );
}

export default Visitors;
