
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { useFetchget } from '../../../Hooks/useFetch'
import { useApiUpdate } from '../../../Hooks/FetchputDan'
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react'
import { createPortal } from "react-dom";
import { ModalContainerload, Modaload } from "../../../Components/Modals/Modal"; 
import { cardio } from 'ldrs'
import { useAuth } from '../../../Context/AuthContext'




function GuestIncome() {
    // const {permisos} = useAuth()
    // if(!permisos.incudes("Ver Ingreso")){
    //     navigate
    // }
    cardio.register()
    //se crea un estado para actualizar los datos al momento de cualquier accion
    const [guestIncomeData, setGuestIncomeData] = useState({ guestIncome: [] });
    const [guestIncomeParkingData, setGuestIncomeParkingData] = useState({ guestIncomeParking: [] });
    
    const [showModaload, setShowModaload] = useState(false);
    const {data, load, error} = useFetchget('guestIncome')
    const { data: data2, load: load2, error: error2 } = useFetchget('guestincomeparking')
    console.log(data2)
  
    console.log(data)

    useEffect(() => {
        if (data && data.guestIncome) {
            setGuestIncomeData(data.guestIncome);
        }
    }, [data])

    useEffect(() => {
        if (data2 && data2.guestincomeparking) {
            setGuestIncomeParkingData(data2.guestincomeparking);
            
        }
        
    }, [data2])

    useEffect(() => {
        // Cuando la carga está en progreso (load es true), activamos el modal de carga
        if (load || load2) {
            setShowModaload(true);
        } else {
            // Cuando la carga se completa (load es false), desactivamos el modal de carga
            setShowModaload(false);
        }
    }, [load, load2]);
    
    

    const handleEditClick = async (dataToUpdate) => {
        setShowModaload(true);
        
        const verify = guestIncomeParkingData?.find((guestIncomeParking) => guestIncomeParking.idGuest_income === dataToUpdate.idGuest_income);
        console.log(verify)
        if (verify !== null) {
            useApiUpdate({"idParkingSpace":verify.idParkingSpace, "status":'Active'}, 'parkingSpaces')
            .then((responseData) => {
                console.log(responseData)
            })
        }
        
        useApiUpdate(dataToUpdate, 'guestIncome')
            .then((responseData) => {
                setShowModaload(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Salida registrada con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
                const updatedGuestIncome = guestIncomeData.map((guestIncome) => {
                    if (guestIncome.idGuest_income === dataToUpdate.idGuest_income) {
                        guestIncome.departureDate = dataToUpdate.departureDate;
                    }
                    return guestIncome;
                });
                setGuestIncomeData(updatedGuestIncome);
            })
    }


    const formatDate = (date) => {
        return new Date(date).toLocaleString('es-CO', {
            format: 'dd/MM/yyyy HH:mm:ss',
        });
      };
  return (
    <>
        <ContainerTable title='Ingresos'
            dropdown={<DropdownExcel />}
            search={<SearchButton />}
            buttonToGo={<ButtonGoTo value='Crear Ingreso' href='/admin/guest_income/create' />}
        >
                <TablePerson>
                    <Thead>
                        <Th name={'Informacion del Ingreso'}></Th>
                        <Th name={'Fecha inicio'}></Th>
                        <Th name={'Fecha fin'}></Th>
                        <Th name={'Acciones'}></Th>
                    </Thead>
                    <Tbody>
                        {/* <Row
                            docType='Apto visitado'
                            docNumber='405'
                            name='Daniel'
                            lastName='Rivera'
                            phone='No registrada'
                            email='2023-11-02 11:45'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row> */}
                        {data.guestIncome?.map(Income => (
                            <Row
                                docType="Apto visitado"
                                docNumber={Income.asociatedApartment.apartmentName}
                                name={Income.asociatedVisitor.name}
                                lastName={Income.asociatedVisitor.lastname}
                                op2={Income.departureDate == null ? 'No registrada' : formatDate(Income.departureDate)}
                                op1={formatDate(Income.startingDate)}
                            >
                                {Income.departureDate == null ?
                                    <Actions accion='Registrar salida' onClick={() => {
                                        handleEditClick({ idGuest_income: Income.idGuest_income, departureDate: new Date() });
                                    }}></Actions>
                                    : ''
                                }

                                <Actions accion='Detalles del Ingreso'></Actions>
                            </Row>
                        )
                        )}
                    </Tbody>
                </TablePerson>
            </ContainerTable>
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

export default GuestIncome