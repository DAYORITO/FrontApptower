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
    console.log(data.apartments)
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

                        <Th name={'Correo'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th />
                        <Th />

                    </Thead>
                    <Tbody>
                        <Row
                            docType='CC'
                            docNumber='1007238447'
                            name='Emmanuel'
                            lastName='Tabares'
                            phone='3218298707'
                            email='emanueltabares@gmail.com'
                            file={"https://res.cloudinary.com/ddptpzasb/raw/upload/v1700529918/Documents/f709663c-1a9f-46d9-8cb5-4005f22c14d8"}
                        >
                            <Actions accion='Edit resident'></Actions>
                            <Actions accion='Assigned space to resident'></Actions>                        </Row>
                        {data.residents?.map(residents => (
                            <Row
                                docType={residents.docType}
                                docNumber={residents.docNumber}
                                name={residents.name}
                                lastName={residents.lastName}
                                phone={residents.phoneNumber}
                                email={residents.email}
                                file={residents.pdf}
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
