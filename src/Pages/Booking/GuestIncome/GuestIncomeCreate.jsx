
import FormContainer from '../../../Components/Forms/FormContainer'
import FormButton from '../../../Components/Forms/FormButton'
import Inputs from '../../../Components/Inputs/Inputs'
import { useFetchget } from '../../../Hooks/useFetch'
import { useState, useEffect } from 'react'
import  Select2  from '../../../Components/Inputs/Select2'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import {createPortal} from 'react-dom'
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo'
import FormColumn from '../../../Components/Forms/FormColumn'


function GuestIncomeCreate() {
  const [showModalvisitor, setShowModalvisitor] = useState(false);
  const [showModalvehicle, setShowModalvehicle] = useState(false);
  const [TowerData, setTowerData] = useState([]);
  const [phone, setPhone] = useState('');
  const [selectedTower, setSelectedTower] = useState(null);
  const [selectedApartments, setSelectedApartments] = useState([]);
  const [visitorsOptions, setVisitorsOptions] = useState([])
  const [vehiclesOptions, setVehiclesOptions] = useState([])
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const opciones = [
    { value: 'si', label: 'Si' },
    { value: 'no', label: 'No' },
    
  ]
  //Peticiones a la api
  const {data, load, error}= useFetchget('apartments')
  const {data: dataVisitors, load2, error2} = useFetchget('visitors')
  const {data: dataVehicle, load3, error3} = useFetchget('vehicle')
  const {data: dataResidentApartment, load4, error4} = useFetchget('aparmentResidents')

  //Muestra o no, el los datos del formulario del vehiculo y la reserva
  const handleChange = (e) => {
    if(e.target.value === 'si'){
      setCheck1(true)
    }else{
      setCheck1(false)
    }
  }

  //Obtiene las torres de TowerData
  const towers = TowerData.map((towerData) => ({
    value: towerData.tower,
    label: `Tower ${towerData.tower}`
  }));

  const organizeApartmentsByTower = (data) => {
    const apartmentsByTower = {};
  
    data?.apartments?.forEach((apartment) => {
      const { idApartment, apartmentName, tower } = apartment;
      
      if (!apartmentsByTower[tower]) {
        apartmentsByTower[tower] = [];
      }
  
      apartmentsByTower[tower].push({ value: idApartment, label: apartmentName });
    });
  
    const resultArray = [];
  
    // Convertir el objeto a un array
    for (const tower in apartmentsByTower) {
      if (apartmentsByTower.hasOwnProperty(tower)) {
        resultArray.push({
          tower,
          apartments: apartmentsByTower[tower]
        });
      }
    }
  
    return resultArray;
  };
  const getVisitors = (dataVisitors) => {
    return data2?.visitors?.map((visitor) => {
      return {
        value: visitor.idVisitor,
        label: visitor.visitorName
      }
    })
  }
  const getVehicles = (dataVehicle) => {
    return data3?.vehicles?.map((vehicle) => {
      return {
        value: vehicle.idVehicle,
        label: vehicle.plate
      }
    })
  }
  console.log(data)
  console.log(dataVehicle)
  console.log(dataVisitors)
  console.log(dataResidentApartment)

  //Carga los datos de la api para usarlos como variables 
  
  useEffect(() => {
    if(data.apartments) 
    setTowerData(organizeApartmentsByTower(data))
  },[data])
  console.log(TowerData)

  //Evento para cambia los datos del select de apartamentos
  const handleTowerChange = (selectedTower) => {
    setSelectedTower(selectedTower);
    console.log(selectedTower)
  
    // Encuentra los apartamentos correspondientes a la torre seleccionada
    const selectedTowerData = TowerData.find((towerData) => towerData.tower === selectedTower);
    setSelectedApartments(selectedTowerData ? selectedTowerData.apartments : []);
    console.log('hola', selectedTowerData)
    
  };
  const handlePhoneSetted = () => {
    const selectedValue = target.data.id;
    console.log(selectedValue);
    console.log(dataResidentApartment)
    // const getApartment = dataResidentApartment.apartmentResidents.map((resident) => resident.idApartment === selectedValue)
    // console.log(getApartment)
  }
  return (
    <>
    <FormContainer name='Crear Ingreso' buttons={<FormButton name='Crear'  backButton='Cancelar'/>}>
      <div className='d-flex justify-content-around' style={{width: '100%'}}>
        <div className='mr-1' style={{width: '100%'}} >
        <InputsSelect name={'Apartamento'} onChange={(e)=>{handleTowerChange(e.target.value)}} options={towers}></InputsSelect>
        </div>
          
       <div className="mr-1" style={{width: '100%'}}>
       <Select2 name={'Apartamento'} onChange={handlePhoneSetted} options={selectedApartments}></Select2>
          
        </div>
          <div style={{width: '100%'}}>
          <Inputs name='Telefono' readonly={true} ></Inputs>
        </div>
          
      </div>
          
 
        <Inputs name="Persona que permite el acceso" type="text"></Inputs>
        <Inputs name="Observaciones" type="text"></Inputs>
        <InputsSelect name="Ingreso con vehiculo" style="width: 100%" id={'tipoingreso'} onChange={handleChange} options={opciones}></InputsSelect>
        {/* <Inputs name="Apartamento" list={'opciones'} options={apartmentsOptions}></Inputs> */}
        {
          check1 && 
          <>
          <Inputs name="Placa" type="text"></Inputs>
          <Inputs name="Estacionamiento" type="text"></Inputs>
          </> 
        }
    </FormContainer>
    {
      showModalvisitor &&
      createPortal(
        <ModalContainer showModal={showModalvisitor}>
          <Modal title={'Crear Ingreso'} showModal={setShowModalvisitor}>
            <p>¿Está seguro que desea crear este ingreso?</p>
          </Modal>
        </ModalContainer>,
        document.getElementById('modalRender')
      )
    }
    {
      showModalvehicle &&
      createPortal(
        <ModalContainer showModal={showModalvehicle}>
          <Modal title={'Crear Ingreso'} showModal={setShowModalvehicle}>
            <p>¿Está seguro que desea crear este vehiculo?</p>
          </Modal>
        </ModalContainer>,
        document.getElementById('modalRender')
      )
    }
    </>
  )
}

export default GuestIncomeCreate