import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { DivRow } from '../../../Components/DivRow/DivRow'
import { useFetchget } from '../../../Hooks/useFetch'
import { useAuth } from '../../../Context/AuthContext'



export const Residents = () => {
    const { user, isAuth } = useAuth();

    const { data, load, error } = useFetchget('residents')
    // console.log(data.apartments)
    return (
        <>

            <ContainerTable title='Residentes'>

                <DivRow>
                    <DropdownExcel />
                    <SearchButton />
                    <ButtonGoTo value='Crear Residente' href='create' />
                </DivRow>

                <TablePerson>
                    <Thead>

                        <Th name={"Informacion del residente"} />
                        <Th name={'Informacion de contacto'}></Th>

                    </Thead>
                    <Tbody>
                        {data.residents?.map(residents => (
                            <Row

                                // Personal information
                                name={residents.name}
                                lastName={residents.lastName}
                                docType={residents.docType}
                                docNumber={residents.docNumber}
                                op6={residents.residentType == "owner" ? "Propietario" : "Arrendatario"}

                                // Contact information
                                email={residents.email}
                                phone={residents.phoneNumber}

                                // Others 

                                to={`details/${residents.idResident}`}
                                status={residents.status}


                            // file={residents.pdf}
                            >
                                <Actions icon='download' href={residents.pdf} accion='Descargar pdf' />
                                <Actions accion='Editar' />
                            </Row>
                        ))}


                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
