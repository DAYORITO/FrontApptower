import React, { useState, useEffect } from 'react'
import { useFetchget, useFetchput } from '../../../Hooks/useFetch'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'

import { idToPrivilegesName, idToPermissionName } from '../../../Hooks/permissionRols'
import Cookies from 'js-cookie';


export const Users = () => {

    const [usersData, setUsersData] = useState([]);

    //privileges
    const [allowedPermissions, setAllowedPermissions] = useState([]);
    const token = Cookies.get('token');

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



    const fetchRoles = async () => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/rols');
            if (!response.ok) {
                throw new Error('Error al obtener los roles');
            }
            const data = await response.json();
            const rolesData = data.rols || [];
            return rolesData;
        } catch (error) {
            console.error('Error al obtener los roles:', error);
            return [];
        }
    };


    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRolesData = async () => {
            const rolesData = await fetchRoles();
            setRoles(rolesData);
        };
        fetchRolesData();
    }, []);




    const { data, load, error } = useFetchget('users')
    console.log(data.user)



    useEffect(() => {
        if (data && data.user) {
            setUsersData(data.user);
        }
    }, [data]);


    const [search, setSearch] = useState('');
    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)
    }
    let filterData = [];

    if (!search) {
        filterData = usersData;
    } else {
        filterData = usersData.filter((dato) =>
            (dato.name && dato.name.toLowerCase().includes(search.toLowerCase())) ||
            (dato.lastname && dato.lastname.toLowerCase().includes(search.toLowerCase())) ||
            (dato.document && dato.document.toLowerCase().includes(search.toLowerCase())) ||
            (dato.email && dato.email.toLowerCase().includes(search.toLowerCase())) ||
            (dato.phone && dato.phone.toLowerCase().includes(search.toLowerCase()))
        );
    }

    return (
        <>

            <ContainerTable
                title='Usuarios'
                dropdown={<DropdownExcel />}
                search={<SearchButton value={search} onChange={searcher} />}
                buttonToGo={
                    allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Crear')
                        ? <ButtonGoTo value='Crear Usuario' href='create' />
                        : null
                }
            >

                <TablePerson>
                    <Thead>
                        <Th name={'Información Usuario'}></Th>
                        <Th name={'Rol'}></Th>
                        <Th name={'Telefono'}></Th>
                        <Th name={'Correo'}></Th>



                        <Th></Th>
                    </Thead>
                    <Tbody>

                        {filterData?.map(user => (
                            <Row
                                key={user.iduser}
                                docType={user.documentType}
                                docNumber={user.document}
                                name={user.name}
                                lastName={user.lastname}
                                rol={
                                    roles.find(rol => rol.idrole === user.idrole)?.namerole || 'Desconocido'
                                }
                                corr={user.email}
                                tel={user.phone}
                                status={user.state}
                            >


                                {allowedPermissions['Usuarios'] && allowedPermissions['Usuarios'].includes('Editar') && (
                                    <Actions accion='Editar' href={`/admin/users/edit/${user.iduser}`} />
                                )}

                            </Row>
                        ))}

                    </Tbody>
                </TablePerson>
            </ContainerTable>



        </>

    )
}
