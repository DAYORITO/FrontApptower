import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useFetchget } from '../../Hooks/useFetch';

import { createPortal } from 'react-dom';

import { cardio } from 'ldrs'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable';
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons';
import { TablePerson } from '../../Components/Tables/Tables';
import { Thead } from '../../Components/Thead/Thead';
import { Th } from '../../Components/Th/Th';
import { Tbody } from '../../Components/Tbody/Tbody';
import { ModalContainerload, Modaload } from '../../Components/Modals/Modal';
import { Row } from '../../Components/Rows/Row';
import { Actions } from '../../Components/Actions/Actions';




function Fines() {
    //Se crea un estado para actualizar los datos al momento de cualquier accion
    const [fines, setFines] = useState({fines: []})
    const [showModaload, setShowModaload] = useState(false);
    cardio.register()

    const {data, load, error}= useFetchget('fines')
    
    useEffect(() => {
      // Cuando la carga está en progreso (load es true), activamos el modal de carga
      if (load) {
          setShowModaload(true);
      } else {
          // Cuando la carga se completa (load es false), desactivamos el modal de carga
          setShowModaload(false);
      }
  }, [load]);
  
    console.log(data.fines)
    //se usa el effect para actualizar los datos del get
    useEffect(() => {
        if (data && data.fines) {
            setFines(data.fines);
        }
     }, [data]);

     //se crea una funcion para el boton que hara la accion de actualizar y se le pasa como parametro los datos que se van a actualizar
     const handleEditClick = async (dataToUpdate) => {
      setShowModaload(true);

      //se llama a la funcion useApiUpdate y se le pasa como parametro los datos que se van a actualizar y el endpoint
      useApiUpdate(dataToUpdate, 'visitors')
      .then((responseData)=>{
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
      .catch((error)=>{
        console.error('Error updating access:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        });
      });
    };

    return (
        <>
            {/* <ContainerTable title='Multas'
                dropdown={<DropdownExcel/>}
                search={<SearchButton/>}
                buttonToGo={<ButtonGoTo value='Crear Multa' href='/admin/fines/create'/>}
            >
                <TablePerson>
                    <Thead>
                        <Th name={'Tipo de multa'}></Th>
                    </Thead>
                    <Tbody>
                        {data.fines?.map(fine => (
                            <Row
                                name={fine.fineType}
                            >
                                <Actions accion='Agregar Ingreso'/>
                                <Actions accion='Cambiar Acceso' onClick={() => {
                                    handleEditClick({idVisitor: visitor.idVisitor, access: !visitor.access});
                                }}/>
                            </Row>
                        ))}
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
                    )} */}
                

            <ContainerTable title='Multas'
              dropdown={<DropdownExcel />}
              search={<SearchButton />}
              buttonToGo={<ButtonGoTo value='Crear Multa' href='/admin/fines/create' />}
            >
                <TablePerson>
                    <Thead>
                    
                        <Th name={'Tipo de multa'}></Th>
                        <Th name={'Fecha del incidente'}></Th>
                        <Th name={'Fecha limite de pago'}></Th>
                        <Th name={'Valor a pagar'}></Th>
                        <Th name={'Estado'}></Th>
                        <Th name={'Acciones'}></Th>
                    </Thead>
                    <Tbody>
                        {data.fines?.map(fine => (
                            <Row
                                name={fine.fineType}
                                docType="APTO"
                                docNumber={fine.apartment.apartmentName}
                                icon='dollar-sign'
                                status='Pendiente'
                                op1={fine.incidentDate}
                                op2={fine.paymentDate}
                                op3={"$"+fine.amount}
                                op4={fine.state}
                            >
                                <Actions accion='Agregar Comprobante'/>
                                <Actions accion='Aprobar pago' onClick={() => {
                                    handleEditClick({idVisitor: visitor.idVisitor, access: !visitor.access});
                                }}/>
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

export default Fines