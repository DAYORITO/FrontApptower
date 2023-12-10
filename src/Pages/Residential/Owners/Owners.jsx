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
                <ButtonGoTo value='Nuevo propietario' href='create' />
                <TablePerson>
                    <Thead>

                        <Th name={"Informacion del residente"} />
                        <Th name={'Informacion de contacto'}></Th>

                    </Thead>
                    <Tbody>



                        {data.owners?.map(owners => (
                            <Row

                                // Personal information
                                name={owners.name}
                                lastName={owners.lastName}

                                docType={owners.docType}
                                docNumber={owners.docNumber}

                                // Contact information

                                phone={owners.phoneNumber}
                                email={owners.email}

                                // Others 
                                status={owners.status}
                                to={`details/${owners.idOwner}`}

                            >

                                <Actions icon='download' href={owners.pdf} accion='Descargar pdf' />
                                <Actions accion='Editar' />
                            </Row>
                        ))}


                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
