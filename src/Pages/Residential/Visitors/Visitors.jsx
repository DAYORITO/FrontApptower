import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { useFetchget, useFetchput } from '../../../Hooks/useFetch'


function Visitors() {

    const {data, load, error}= useFetchget('visitors')
    console.log(data.visitors)
    const handleAccessChange = async (data) => {
        console.log(data)
        useFetchput('visitors', data)
    }
    const handleClick = () => {
        const data = {
          idVisitor: visitor.idVisitor,
          access: !visitor.access,
        };
        console.log(data);
        handleAccessChange(data);
      };

    

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
                        <Row
                            docType='CC'
                            docNumber='1007238447'
                            name='Daniel'
                            lastName='Rivera'
                            phone='M'
                            email='Permitido'
                        >
                            <Actions accion='Agregar Ingreso'></Actions>
                            <Actions accion='Cambiar Acceso'></Actions>
                        </Row>
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
                                <Actions accion='Cambiar Acceso' onClick={handleClick
                                }/>
                            </Row>
                        ))}
                        

                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>
    )
}

export default Visitors