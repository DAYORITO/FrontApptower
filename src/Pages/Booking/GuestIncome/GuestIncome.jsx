
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
import { useAuth } from '../../../Context/AuthContext'




function GuestIncome() {
    // const {permisos} = useAuth()
    // if(!permisos.incudes("Ver Ingreso")){
    //     navigate
    // }
    const [guestIncomeData, setGuestIncomeData] = useState({ guestIncome: [] });//se crea un estado para actualizar los datos al momento de cualquier accion
    const {data, load, error} = useFetchget('guestIncome')
  
    console.log(data)

    useEffect(() => {
        if (data && data.guestIncome) {
            setGuestIncomeData(data.guestIncome);
        }
    }, [data])

    const handleEditClick = async (dataToUpdate) => {
        
        useApiUpdate(dataToUpdate, 'guestIncome')
            .then((responseData) => {
                console.log(responseData)
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
            <ContainerTable title='Ingresos'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Ingreso' href='/admin/guest_income/create' />
                <TablePerson>
                    <Thead>
                        <Th name={'Informacion del Ingreso'}></Th>
                        <Th name={'Fecha inicio'}></Th>
                        <Th name={'Fecha fin'}></Th>
                        <Th name={'Acciones'}></Th>
                    </Thead>
                    <Tbody>
                        <Row
                            docType='Apto visitado'
                            docNumber='405'
                            name='Daniel'
                            lastName='Rivera'
                            phone='No registrada'
                            email='2023-11-02 11:45'
                        >
                            <Actions accion='Registrar salida'></Actions>
                            <Actions accion='Detalles del Ingreso'></Actions>
                        </Row>
                        {data.guestIncome?.map(Income => (
                            <Row
                                docType="Apto visitado"
                                docNumber={Income.asociatedApartment.apartmentName}
                                name={Income.asociatedVisitor.name}
                                lastName={Income.asociatedVisitor.lastname}
                                phone={Income.departureDate == null ? 'No registrada' : formatDate(Income.departureDate)}
                                email={formatDate(Income.startingDate)}
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
            
    </>
  )
}

export default GuestIncome