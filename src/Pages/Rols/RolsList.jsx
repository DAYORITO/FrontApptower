import { useState, useEffect } from 'react'
import { useFetch, useFetchget } from '../../Hooks/useFetch'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'
import { usePaginator, filter, postRequest, useUserLogged } from '../../Helpers/Helpers'
import { Paginator } from '../../Components/Paginator/Paginator'
import dataNotFoundImg from "../../assets/dataNotFound.jpg"
import { Spinner } from 'react-bootstrap'

export const Rols = () => {
    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Get Data

    const { data: Rols, get: getRols, loading } = useFetch(url)


    useEffect(() => {

        getRols('rols')

    }, [])


    // Funtionality to search

    const [search, setSearch] = useState('');

    let rolsList = filter(search, Rols?.data?.rols, "namerole")

    rolsList = rolsList.sort((a, b) => a.idrole - b.idrole);

    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)

    }

    //paginator

    const { totalPages, currentPage, nextPage, previousPage, filteredData: RolsInfo } = usePaginator(rolsList, 4);

    return (
        <>

            <ContainerTable title='Roles'
                search={<SearchButton value={search} onChange={searcher} placeholder='Buscar rol' />}
                buttonToGo={<ButtonGoTo value='Crear rol' href='create' />}
                showPaginator={<Paginator totalPages={totalPages} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />}
            >
                <TablePerson>
                    <Thead>
                        <Th name={'Nombre rol'} ></Th>
                        <Th name={'Descripción'}></Th>
                    </Thead>
                    <Tbody>
                        {loading ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', position: 'fixed', left: '52%', top: '45%', transform: 'translate(-50%, -24%)' }}>
                                <Spinner style={{ color: 'blue' }} />
                            </div>
                            : rolsList.length == 0 || currentPage >= totalPages ?

                                <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" />
                                :

                                RolsInfo()?.map(rols => (
                                    <Row
                                        icon='settings'
                                        key={rols.idrole}
                                        A5={rols.namerole}
                                        description={rols.description}
                                        status={rols.state}
                                    >
                                        <Actions accion='Editar' href={`/admin/rols/editNew/${rols.idrole}`} />
                                        {rols.state === "Activo" ?
                                            <>
                                                <Actions accion='Crear usuario' href={`/admin/users/create/${rols.idrole}`} />
                                            </> : null
                                        }
                                    </Row>
                                ))
                        }

                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>
    )
}