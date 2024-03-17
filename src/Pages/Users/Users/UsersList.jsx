import React, { useState, useEffect } from 'react'
import { useAllowedPermissionsAndPrivileges, useFetch, useFetchget } from '../../../Hooks/useFetch'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton, SearchSelect } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { idToPrivilegesName, idToPermissionName } from '../../../Hooks/permissionRols'
import { usePaginator, filter, postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Paginator } from '../../../Components/Paginator/Paginator'
import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { Spinner } from 'react-bootstrap'

export const Users = () => {
    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Get Data

    const { data: UserData, get: getUser, loading } = useFetch(url)

    //Consulta Privilegios

    const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);
    const { data: { rols: dataRols }, load2, error2 } = useFetchget('rols')


    useEffect(() => {

        getUser('users')

    }, [])



    // Funtionality to search

    const [search, setSearch] = useState('');

    let userList = filter(search, UserData?.data?.user, "name")

    userList = userList.sort((a, b) => a.iduser - b.iduser);

    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)

    }

    //paginator

    const { totalPages, currentPage, nextPage, previousPage, filteredData: UserInfo } = usePaginator(userList, 5);

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

    let filteredUsers = UserInfo();

    if (searchForSelect !== null) {
        filteredUsers = filteredUsers.filter((dato) =>
            dato.idrole && dato.idrole.toString() === searchForSelect
        );
    }

    return (
        <>

            <ContainerTable title='Usuarios'
                search={<SearchButton value={search} onChange={searcher} placeholder='Buscar usuario' />}
                dropdown={<DropdownExcel table='users' />}
                buttonToGo={<ButtonGoTo value='Crear usuario' href='create' />}
                search2={<SearchSelect options={roleOptions} value={searchForSelect} onChange={searcherForSelect} ></SearchSelect>}
                showPaginator={
                    !loading && userList && userList.length > 0 ?
                        <Paginator
                            totalPages={totalPages}
                            currentPage={currentPage}
                            nextPage={nextPage}
                            previousPage={previousPage}
                        /> : null
                }
            >

                <TablePerson>
                    <Thead>
                        <Th name={'Información usuario'}></Th>
                        <Th name={'Rol'}></Th>
                        <Th name={'Teléfono'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th name={'Acciones'}></Th>
                    </Thead>
                    <Tbody>
                        {loading ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', position: 'fixed', left: '52%', top: '45%', transform: 'translate(-50%, -24%)' }}>
                                <Spinner style={{ color: 'blue' }} />
                            </div>
                            : userList.length == 0 || currentPage >= totalPages ?

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', marginLeft: '9vw' }}>
                                    <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" />
                                </div>
                                :
                                filteredUsers.map(user => {
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
            </ContainerTable>
        </>
    )
}