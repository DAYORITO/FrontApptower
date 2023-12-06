import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { useFetchget } from '../../../Hooks/useFetch'

export const Owners = () => {

    const { data, load, error } = useFetchget('owners')
    console.log(data.owners)

    return (
        <>

            <ContainerTable title='Propietarios'>
                <DropdownExcel />
                <SearchButton />
                <ButtonGoTo value='Nuevo propietario' href='create'/>
                <TablePerson>
                    <Thead>
                        <Th></Th>
                        <Th name={'Owner information'}></Th>
                        <Th name={'Phone'}></Th>
                        <Th name={'Email'}></Th>
                        <Th></Th>

                    </Thead>
                    <Tbody>
                        


                        {data.owners?.map(owners => (
                            <Row
                            to={`details/${owners.idOwner}`}
                                docType={owners.docType}
                                docNumber={owners.docNumber}
                                name={owners.name}
                                lastName={owners.lastName}
                                // sex={owners.sex}
                                phone={owners.phoneNumber}
                                email={owners.email}
                                file={owners.pdf}
                            >
                                <Actions accion='Editar' />
                                <Actions accion='Reservar' />
                            </Row>
                        ))}


                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
