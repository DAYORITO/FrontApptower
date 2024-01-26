import { useState, useEffect } from 'react'
import { useFetchget } from '../../Hooks/useFetch'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../Components/Buttons/Buttons'
import { TablePerson } from '../../Components/Tables/Tables'
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Tbody } from '../../Components/Tbody/Tbody'
import { Row } from '../../Components/Rows/Row'
import { Actions } from '../../Components/Actions/Actions'

export const Rols = () => {
    const [rolsData, setRolsData] = useState([]);
    const { data, load, error } = useFetchget('rols')

    useEffect(() => {
        if (data && data.rols) {
            setRolsData(data.rols);
        }
    }, [data]);

    const [search, setSearch] = useState('');
    const searcher = (e) => {
        setSearch(e.target.value)
    }
    let filterData = [];

    if (!search) {
        filterData = rolsData;
    } else {
        filterData = rolsData.filter((dato) =>
            (dato.namerole && dato.namerole.toLowerCase().includes(search.toLowerCase())) ||
            (dato.description && dato.description.toLowerCase().includes(search.toLowerCase()))
        );
    }



    const totalPages = Math.ceil(filterData.length / 10);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const [currentPage, setCurrentPage] = useState(0);
    const filteredDataRols = () => {
        return filterData.slice(currentPage, currentPage + 10)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 10)
    }


    const PreviousPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 10)
    }

    return (
        <>

            <ContainerTable title='Roles'
                search={<SearchButton value={search} onChange={searcher} />}
                buttonToGo={<ButtonGoTo value='Crear Rol' href='create' />}
                showPaginator={
                    <nav aria-label="Table Paging" className="mb- text-muted my-4">
                        <ul className="pagination justify-content-center mb-0">
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); PreviousPage(); }}>Anterior</a>
                            </li>
                            {pageNumbers.map((pageNumber) => (
                                <li key={pageNumber} className={`page-item ${currentPage + 1 === pageNumber ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); setCurrentPage((pageNumber - 1) * 10); }}>{pageNumber}</a>
                                </li>
                            ))}


                            <li className="page-item">
                                <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); nextPage(); }}>Siguiente</a>
                            </li>
                        </ul>
                    </nav >
                }
            >
                <TablePerson>
                    <Thead>
                        <Th name={'Nombre Rol'} ></Th>
                        <Th name={'Descripción'}></Th>
                    </Thead>
                    <Tbody>


                        {filteredDataRols().map(rols => (
                            <Row
                                icon='settings'
                                key={rols.idrole}
                                A5={rols.namerole}
                                description={rols.description}
                                status={rols.state}
                            >
                                <Actions accion='Editar' href={`/admin/rols/editNew/${rols.idrole}`} />
                            </Row>
                        ))}
                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
