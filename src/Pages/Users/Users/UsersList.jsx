import React, { useState, useEffect } from 'react'
import useFetchUserPrivileges, { useAllowedPermissionsAndPrivileges, useFetchget, useFetchput } from '../../../Hooks/useFetch'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton, SearchSelect } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { cardio } from 'ldrs';
import { createPortal } from 'react-dom';
import { idToPrivilegesName, idToPermissionName } from '../../../Hooks/permissionRols'
import Cookies from 'js-cookie';
import { filterPerSelect } from '../../../Helpers/Helpers'
import { ModalContainerload, Modaload } from '../../../Components/Modals/Modal'
import { dotSpinner } from 'ldrs'





export const Users = () => {

    const [usersData, setUsersData] = useState([]);
    dotSpinner.register()
    const [showModaload, setShowModaload] = useState(true);

    const token = Cookies.get('token');

    //Consulta Privilegios

    const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);

    const { data: { rols: dataRols }, load2, error2 } = useFetchget('rols')
    const { data, load, error } = useFetchget('users')

    useEffect(() => {
        if (data && data.user) {
            setUsersData(data.user);
        }
    }, [data]);

    useEffect(() => {
        // Cuando la carga está en progreso (load es true), activamos el modal de carga
        if (data?.user?.length > 0) {
            setTimeout(() => {
                setShowModaload(false);
            }, 700);
        } else {
            setTimeout(() => {
                setShowModaload(false);
            }, 2000);

        }
    }, [data]);


    const [search, setSearch] = useState('');
    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const roleOptions = [
        { value: "allUsers", label: "Todos los usuarios" },
        ...(dataRols || []).filter(role => role.state === 'Activo').map(role => ({
            value: role.idrole.toString(),
            label: role.namerole
        }))
    ];


    const [searchForSelect, setSearchForSelect] = useState(null);


    const searcherForSelect = (event) => {
        const newValue = event.target.value === "allUsers" ? null : event.target.value;
        setSearchForSelect(newValue);
    }

    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        let filteredUsers = usersData;

        if (search) {
            filteredUsers = filteredUsers.filter((dato) =>
                (dato.name && dato.name.toLowerCase().includes(search.toLowerCase())) ||
                (dato.lastname && dato.lastname.toLowerCase().includes(search.toLowerCase())) ||
                (dato.document && dato.document.toLowerCase().includes(search.toLowerCase())) ||
                (dato.email && dato.email.toLowerCase().includes(search.toLowerCase())) ||
                (dato.phone && dato.phone.toLowerCase().includes(search.toLowerCase()))
            );
        }

        if (searchForSelect !== null) {
            filteredUsers = filteredUsers.filter((dato) =>
                dato.idrole && dato.idrole.toString() === searchForSelect
            );
        }

        setFilterData(filteredUsers);
    }, [search, searchForSelect, usersData]);



    const totalPages = Math.ceil(filterData.length / 10);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const [currentPage, setCurrentPage] = useState(0);
    const filteredDataUsers = () => {
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

            <ContainerTable
                title='Usuarios'
                dropdown={<DropdownExcel />}
                search={<SearchButton value={search} onChange={searcher} />}
                search2={<SearchSelect options={roleOptions} value={searchForSelect} onChange={searcherForSelect} ></SearchSelect>}
                buttonToGo={
                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Crear')
                        ? <ButtonGoTo value='Crear Usuario' href='create' />
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
                        <Th name={'Información Usuario'}></Th>
                        <Th name={'Rol'}></Th>
                        <Th name={'Teléfono'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th></Th>
                    </Thead>
                    <Tbody>

                        {filteredDataUsers().map(user => {
                            const userRole = (dataRols || []).find(role => role.idrole === user.idrole);
                            const redirectTo = userRole && (
                                userRole.namerole.toLowerCase() === 'vigilante' ||
                                userRole.namerole.toLowerCase() === 'vigilancia' ||
                                userRole.namerole.toLowerCase() === 'seguridad'
                            ) ? `/admin/watchman/details/${user.iduser}` :
                                userRole && userRole.namerole.toLowerCase() === 'residente' ?
                                    `/admin/resident/details/${user.iduser}` :
                                    `/admin/users/details/${user.iduser}`;

                            return (
                                <Row
                                    key={user.iduser}
                                    img={user.userImg}
                                    A3={user.docType}
                                    A4={user.document}
                                    A1={user.name}
                                    A2={user.lastName}
                                    description={userRole?.namerole || 'Desconocido'}
                                    A17={user.email}
                                    A7={user.phone ? user.phone : 'Desconocido'}
                                    status={user.status}
                                    to={redirectTo}
                                >
                                    {allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Editar') ? (
                                        <Actions accion='Editar' href={`/admin/users/edit/${user.iduser}`} />
                                    ) : null}
                                </Row>
                            );
                        })}

                    </Tbody>
                </TablePerson>
            </ContainerTable >

            {showModaload &&
                createPortal(
                    <>
                        <ModalContainerload ShowModal={setShowModaload}>
                            <Modaload
                                showModal={setShowModaload}
                            >
                                <div className='d-flex justify-content-center'>
                                    <l-dot-spinner
                                        size="50"
                                        speed="2"
                                        color="black"
                                    ></l-dot-spinner>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p> </p>
                                    <p className="mt-2 text-muted">Cargando datos...</p>
                                </div>


                            </Modaload>
                        </ModalContainerload>
                    </>,
                    document.getElementById("modalRender")
                )}




        </>

    )
}
