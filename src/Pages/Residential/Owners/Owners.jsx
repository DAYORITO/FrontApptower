import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { useFetchget } from '../../../Hooks/useFetch'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'

export const Owners = () => {
    const token = Cookies.get('token');
    const [allowedPermissions, setAllowedPermissions] = useState([]);

    const { data, load, error } = useFetchget('owners')
    console.log(data.owners)





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

    return (
        <>



            <ContainerTable
                title='Propietarios'
                dropdown={<DropdownExcel />}
                search={<SearchButton />}
                buttonToGo={
                    allowedPermissions['Propietarios'] && allowedPermissions['Propietarios'].includes('Crear')
                        ? <ButtonGoTo value='Nuevo Propietario' href='create' />
                        : null
                }
            >


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

                                {allowedPermissions['Propietarios'] && allowedPermissions['Propietarios'].includes('Editar') && (
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
