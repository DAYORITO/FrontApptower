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
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'



export const Residents = () => {
    const [allowedPermissions, setAllowedPermissions] = useState([]);
    const token = Cookies.get('token');


    const { data, load, error } = useFetchget('residents')
    // console.log(data.apartments)



    useEffect(() => {
        if (token) {
            fetchUserPrivilegeAndPermission(token);
        }
    }, [token]);


    //Consulta privilegios 
    const fetchUserPrivilegeAndPermission = async (token) => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/privilegefromrole', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user privileges');
            }

            const data = await response.json();
            console.log(data, 'data');
            console.log('Allowed Permissions hi:', data.privileges);

            if (data && data.privileges && Array.isArray(data.privileges)) {
                const allowed = {};
                data.privileges.forEach(({ idpermission, idprivilege }) => {
                    const permissionName = idToPermissionName[idpermission];
                    const privilegeName = idToPrivilegesName[idprivilege];

                    if (!allowed[permissionName]) {
                        allowed[permissionName] = [];
                    }
                    allowed[permissionName].push(privilegeName);
                });

                setAllowedPermissions(allowed);
            }
        } catch (error) {
            console.error('Error fetching user permissions:', error);
        }
    };



    const totalPages = data.residents ? Math.ceil(data.residents.length / 8) : 0;
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const [currentPage, setCurrentPage] = useState(0);

    const filteredDataresidents = () => {
        if (data && data.residents) {
            return data.residents.slice(currentPage, currentPage + 8);
        } else {
            return [];
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 8)
    }


    const PreviousPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 8)
    }

    return (
        <>

            <ContainerTable
                title='Residentes'
                dropdown={<DropdownExcel />}
                search={<SearchButton />}
                buttonToGo={
                    allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Crear')
                        ? <ButtonGoTo value='Crear Residente' href='create' />
                        : null
                }
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

                        <Th name={"Informacion del residente"} />
                        <Th name={'Informacion de contacto'}></Th>

                    </Thead>
                    <Tbody>
                        {filteredDataresidents().map(residents => (
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

                                {allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Editar') && (
                                    <Actions accion='Editar' />
                                )}
                            </Row>
                        ))}


                    </Tbody>
                </TablePerson>
            </ContainerTable>
        </>

    )
}
