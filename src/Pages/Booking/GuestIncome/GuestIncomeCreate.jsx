
import FormContainer from '../../../Components/Forms/FormContainer'
import { docTypes, sexs } from "../../../Hooks/consts.hooks"
import FormButton from '../../../Components/Forms/FormButton'
import Inputs from '../../../Components/Inputs/Inputs'
import { useFetchget } from '../../../Hooks/useFetch'
import { useState, useEffect } from 'react'
import Select2 from '../../../Components/Inputs/Select2'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { createPortal } from 'react-dom'
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo'
import Swal from 'sweetalert2'
import { useFetchpost } from '../../../Hooks/useFetch'
import { useNavigate } from "react-router-dom";
import ModalButton from '../../../Components/Modals/ModalButton'
import { useApiUpdate } from '../../../Hooks/FetchputDan'
import { ModalContainerload, Modaload } from "../../../Components/Modals/Modal";
import { cardio } from 'ldrs'
import { set } from 'date-fns'



function GuestIncomeCreate() {
  const navigate = useNavigate();
  cardio.register()
  //mostrar modales
  const [showModalvisitor, setShowModalvisitor] = useState(false);
  const [showModaload, setShowModaload] = useState(false);
  //estados para valores de los select
  const [TowerData, setTowerData] = useState([]);
  const [phone, setPhone] = useState('Seleccione un apartamento');
  const [visitorsData, setVisitorsData] = useState({ visitors: [] });
  const [parkingSpots, setparkingSpots] = useState({ parkingSpaces: [] });
  const [selectedTower, setSelectedTower] = useState(null);
  const [selectedApartments, setSelectedApartments] = useState([]);
  //mostrar el campo de parqueadero
  const [check1, setCheck1] = useState(false);
  //mostrar el nombre del visitante
  const [visitorname, setVisitorname] = useState(' ')

  //Se crean los estados para los datos del formulario
  const [apartment, setApartment] = useState(null)
  const [personAllowsAccesss, setPersonAllowsAccess] = useState('')
  const [observationss, setObservations] = useState('')
  const [parkingGuestIncome, setParkingGuestIncoming] = useState('')
  const [visitor, setVisitor] = useState(null)

  //Se crean los estados para el modal de visitantes
  const [documentType, setDocumentType] = useState("");
  const [documentvisitor, setDocumentVisitor] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [genre, setGenre] = useState("");



  const opciones = [
    { value: 'si', label: 'Si' },
    { value: 'no', label: 'No' },

  ]
  //Peticiones a la api
  const { data: dataVisitors, load2, error2 } = useFetchget('visitors')
  const { data, load, error } = useFetchget('apartments')
  const { data: dataResidentApartment, load4, error4 } = useFetchget('aparmentResidents')
  const { data: dataParkingSpaces, load3, error3 } = useFetchget('parkingSpaces')
  const { data: dataTowers, load5, error5 } = useFetchget('towers')
  useEffect(() => {
    if (load || load2 || load3 || load4 || load5) {
      setShowModaload(true);
    } else {
      setShowModaload(false);
    }
  }, [load, load2, load3, load4, load5])

  //Muestra o no, el los datos del formulario del vehiculo y la reserva
  const handleChange = (e) => {
    if (e.target.value === 'si') {
      setCheck1(true)
    } else {
      setCheck1(false)
    }
  }

  //Obtiene las torres de TowerData
  const towers = TowerData.map((towerData) => ({
    value: towerData.tower,
    label: dataTowers.towers.find((tower) => tower.idTower === towerData.tower).towerName
  }));
  //Obtiene los apartamentos de TowerData
  const organizeApartmentsByTower = (data) => {
    const apartmentsByTower = {};
    // Organizar los apartamentos por torre
    data?.apartments?.forEach((apartment) => {
      const { idApartment, apartmentName, idTower } = apartment;
      // Si no existe la torre, se crea un array vacío
      if (!apartmentsByTower[idTower]) {
        apartmentsByTower[idTower] = [];
      }
      // Se agrega el apartamento al array correspondiente a la torre
      apartmentsByTower[idTower].push({ value: idApartment, label: apartmentName });
    });
    console.log("Apartamentos por torreprimero:", apartmentsByTower);

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
    console.log("Apartamentos por torre:", resultArray);

    return resultArray;
  };
  const getVisitors = (dataVisitors) => {
    const visitorsList = dataVisitors?.visitors?.map((visitor) => ({
      value: visitor.idVisitor,
      label: `${visitor.documentNumber} ${visitor.access ? '' : '- Acceso no permitido'}`
    })) || [];

    // Agrega un registro vacío al principio de la lista
    visitorsList.unshift({
      value: '',
      label: ''
    });

    return visitorsList;
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



  //Carga los datos de la api para usarlos como variables 

  useEffect(() => {
    if (data.apartments)
      setTowerData(organizeApartmentsByTower(data))
      console.log("Datos de las turres Xd", TowerData)
      console.log("Datos de las turres", data)
  }, [data])


  useEffect(() => {
    if (dataVisitors.visitors)
      setVisitorsData(getVisitors(dataVisitors))
  }, [dataVisitors])


  useEffect(() => {
    if (dataParkingSpaces.parkingSpaces)
      setparkingSpots(getparkingSpots(dataParkingSpaces))
  }, [dataParkingSpaces])


  //Evento para cambia los datos del select de apartamentos
  const handleTowerChange = (selectedTower) => {
    setPhone('Seleccione un apartamento');
    setSelectedTower(selectedTower);
    console.log(selectedTower)

    // Encuentra los apartamentos correspondientes a la torre seleccionada
    const selectedTowerData = TowerData.find((towerData) => towerData.tower === selectedTower);
    setSelectedApartments(selectedTowerData ? selectedTowerData.apartments : []);
    console.log('hola', selectedTowerData)

  };
  const handlePhoneSetted = (selectedValue) => {
    console.log("Selected Value:", selectedValue);
    setApartment(parseInt(selectedValue))
    console.log('este es mi apartamento ' + apartment)

    if (dataResidentApartment && dataResidentApartment.apartmentResidents) {
      const resident = dataResidentApartment.apartmentResidents.find(
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
  const handleSelectedVisitor = (selectedValue) => {
    console.log("Selected Value:", selectedValue);
    setVisitor(parseInt(selectedValue))
    console.log('este es mi visitante ' + visitor)

    if (dataVisitors && dataVisitors.visitors) {
      const visitor = dataVisitors.visitors.find(
        (visitor) => visitor.idVisitor === parseInt(selectedValue)
      );

      if (visitor) {
        if (visitor.name && visitor.lastname) {
          setVisitorname(visitor.name + ' ' + visitor.lastname);
          console.log("Phone Number:", visitor.name);
        } else {
          console.log("No existe el visitante.");
          setVisitorname("No existe el visitante.");
        }
      } else {
        setVisitorname("Noexiste");
      }
    } else {

      setVisitorname("No existe");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModaload(true);
    const { response, error } = await useFetchpost('guestIncome', {
      "startingDate": new Date(),
      "departureDate": null,
      "idApartment": apartment,
      "personAllowsAccess": personAllowsAccesss,
      "observations": observationss ? observationss : "Sin observaciones",
      "idVisitor": visitor,
    });
    if (response) {
      if (response && check1) {
        const { response: response2, error: error2 } = await useFetchpost('guestincomeparking', {
          "idParkingSpace": parkingGuestIncome,
          "idGuest_income": response.guestIncome.idGuest_income
        });
        if (response2) {
          // Manejar la respuesta exitosa
          console.log('Respuesta exitosa:', response2);
          useApiUpdate({ "idParkingSpace": parkingGuestIncome, "status": 'Inactive' }, 'parkingSpaces')
            .then((responseData) => {
              setShowModaload(false);
              console.log(responseData)
            })
        }
        if (error2) {
          console.error('Error:', error2);
        }

      }
      setShowModaload(false);
      // Manejar la respuesta exitosa
      console.log('Respuesta exitosa:', response);
      Swal.fire({
        title: 'Éxito',
        text: 'Ingreso creado exitosamente',
        icon: 'success',
      }).then(() => {

        navigate(-1);
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
  }

  const handleSubmitVisitor = async (e) => {
    e.preventDefault();
    setShowModaload(true);
    setShowModalvisitor(false);
    const { response, error } = await useFetchpost('visitors', {
      "name": name,
      "lastname": lastname,
      "documentType": documentType,
      "documentNumber": documentvisitor,
      "genre": genre,
      "access": true
    });
    if (response) {

      // Manejar la respuesta exitosa
      const newVisitor = {
        value: response.visitor.idVisitor,
        label: response.visitor.documentNumber
      };
      // Actualizar el estado local agregando el nuevo visitante
      setVisitorsData((prevData) => [newVisitor, ...prevData]);
      setShowModaload(false);
      console.log('Respuesta exitosa:', response);
      Swal.fire({
        title: 'Éxito',
        text: 'Visitante creado exitosamente',
        icon: 'success',
      })
    }

    if (error) {
      setShowModaload(false);
      Swal.fire({
        title: 'Error',
        text: 'Error al crear visitante',
        icon: 'error',
      });
      console.error('Error:', error);
    }
  }

  return (
    <>
      <FormContainer name='Crear Ingreso' buttons={<FormButton name='Crear' backButton='Cancelar' onClick={handleSubmit} />} modalButton={<ModalButton name="Crear visitante" onClick={setShowModalvisitor} />}>
        <div className='d-flex justify-content-around' style={{ width: '100%' }}>
          <div className='mr-1' style={{ width: '100%' }} >
            <InputsSelect name={'Torre'} onChange={(e) => { handleTowerChange(e.target.value) }} options={towers}></InputsSelect>
          </div>

          <div className="mr-1" style={{ width: '100%' }}>
            <Select2 name={'Apartamento'} onChange={(selectedValue) => { handlePhoneSetted(selectedValue), setApartment(selectedValue) }} options={selectedApartments}></Select2>

          </div>
          <div style={{ width: '100%' }}>
            <Inputs name='Telefono' readonly={true} value={phone} ></Inputs>
          </div>
        </div>
        <div className='d-flex justify-content-around' style={{ width: '100%' }}>
          <div className='mr-1' style={{ width: '100%' }}>
            <Select2 name={'Visitante'} onChange={(selectedValue) => { handleSelectedVisitor(selectedValue), setVisitor(selectedValue) }} options={getVisitors(dataVisitors)}></Select2>
          </div>
          <div style={{ width: '100%' }}>
            <Inputs name='Nombre' readonly={true} value={visitorname} ></Inputs>
          </div>

        </div>
        <InputsSelect name="Ingreso con vehiculo" style="width: 100%" id={'tipoingreso'} onChange={handleChange} options={opciones}></InputsSelect>
        {/* <Inputs name="Apartamento" list={'opciones'} options={apartmentsOptions}></Inputs> */}
        {
          check1 &&
          <InputsSelect name="Parqueadero" id={'tipoingreso'} onChange={(e) => setParkingGuestIncoming(e.target.value)} options={parkingSpots}></InputsSelect>
        }
        <Inputs name="Persona que permite el acceso" type="text" onChange={(e) => { setPersonAllowsAccess(e.target.value) }}></Inputs>
        <Inputs name="Observaciones" type="text" onChange={(e) => { setObservations(e.target.value) }}></Inputs>
      </FormContainer>
      {
        showModalvisitor &&
        createPortal(
          <ModalContainer showModal={setShowModalvisitor}>
            <Modal title={'Crear Ingreso'} showModal={setShowModalvisitor} onClick={handleSubmitVisitor}>
              <InputsSelect name="Tipo de documento" options={docTypes} onChange={(e) => setDocumentType(e.target.value)} />
              <Inputs name="Numero Documento" onChange={(e) => setDocumentVisitor(e.target.value)} />
              <Inputs name="Nombre" onChange={(e) => setName(e.target.value)} />
              <Inputs name="Apellido" type="text" onChange={(e) => setLastName(e.target.value)} />
              <InputsSelect name="Sexo" options={sexs} onChange={(e) => setGenre(e.target.value)} />
            </Modal>
          </ModalContainer>,
          document.getElementById('modalRender')
        )
      }
      {showModaload &&
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

export default GuestIncomeCreate