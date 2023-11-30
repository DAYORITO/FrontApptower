import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { useFetchget, useFetchput } from '../../../Hooks/useFetch'
import { useEffect, useState } from 'react'
import { useApiUpdate } from '../../../Hooks/FetchputDan'
import Swal from 'sweetalert2';


function Visitors() {
    //Se crea un estado para actualizar los datos al momento de cualquier accion
    const [visitorsData, setVisitorsData] = useState({ visitors: [] });

    const {data, load, error}= useFetchget('visitors')
    console.log(data.visitors)
    //se usa el effect para actualizar los datos del get
    useEffect(() => {
        if (data && data.visitors) {
            setVisitorsData(data.visitors);
        }
     }, [data]);

     //se crea una funcion para el boton que hara la accion de actualizar y se le pasa como parametro los datos que se van a actualizar
     const handleEditClick = async (dataToUpdate) => {

      //se llama a la funcion useApiUpdate y se le pasa como parametro los datos que se van a actualizar y el endpoint
      useApiUpdate(dataToUpdate, 'visitors')
      .then((responseData)=>{
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

    return (

        <>
            <ContainerTable title='Visitantes'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Crear Visitante' href='/admin/visitors/create' />
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
                                <Actions accion='Agregar Ingreso'/>
                                <Actions accion='Cambiar Acceso' onClick={() => {
                                    handleEditClick({idVisitor: visitor.idVisitor, access: !visitor.access});
                                }}/>
                            </Row>
                        ))}
                        

                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>
    )
}

export default Visitors