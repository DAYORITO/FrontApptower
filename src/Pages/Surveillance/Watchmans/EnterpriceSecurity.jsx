import { Actions } from "../../../Components/Actions/Actions"
import { BigCard } from "../../../Components/BigCard/BigCard"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import { useEffect, useState } from "react"

import { useAllowedPermissionsAndPrivileges, useFetch } from '../../../Hooks/useFetch'


import { usePaginator, filter, postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Modal, ModalContainer } from "../../../Components/Modals/ModalTwo"
import { createPortal } from "react-dom"


import Inputs from '../../../Components/Inputs/Inputs'
import { statusList } from "../../../Hooks/consts.hooks"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { Uploader } from "../../../Components/Uploader/Uploader"

import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { Spinner } from "../../../Components/Spinner/Spinner"
import { idToPermissionName, idToPrivilegesName } from "../../../Hooks/permissionRols"

import Cookies from 'js-cookie'
import { Paginator } from "../../../Components/Paginator/Paginator"
import { set } from "date-fns"
import { Row } from "../../../Components/Rows/Row"
import { Thead } from "../../../Components/Thead/Thead"
import { Th } from "../../../Components/Th/Th"
import { Tbody } from "../../../Components/Tbody/Tbody"
import { ModalContainerload, Modaload } from "../../../Components/Modals/Modal"
import { dotSpinner } from 'ldrs'




export const EnterpriceSecurity = () => {

    const url = import.meta.env.VITE_API_URL

    // Enterprice information

    const [nameEnterprice, setNameEnterprice] = useState("");
    const [email, setEmail] = useState("");
    const [NIT, setNIT] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [idEnterpriseSecurity, setIdEnterpriseSecurity] = useState("");
    const [state, setStatus] = useState("");

    const [IsEditedEnterprice, setIsEditedEnterprice] = useState(true);
    const [EnterpriceFormModal, setEnterpriceFormModal] = useState(false);
    const [errorList, setErrorList] = useState([]);

    const openEnterpriceModal = (data) => {

        setErrorList('')
        console.log(data)

        if (data == null) {

            setIsEditedEnterprice(false)
            setPhone('')
            setAddress('')
            setIdEnterpriseSecurity('')
            setStatus('')
            setNIT('')
            setEmail('')
            setNameEnterprice('')


        } else {

            setIsEditedEnterprice(true)
            setPhone(data.phone)
            setAddress(data.address)
            setIdEnterpriseSecurity(data.idEnterpriseSecurity)
            setStatus(data.state)
            setNIT(data.NIT)
            setEmail(data.email)
            setNameEnterprice(data.nameEnterprice)


        }


        setEnterpriceFormModal(true)

    }


    // Get Data

    const { data: enterprice, get: getEnterprice, loading } = useFetch(url)

    //Consulta Privilegios

    const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);

    const statusEnterprice = [
        {
            value: "Activo",
            label: "Activo"
        },
        {
            value: "Inactivo",
            label: "Inactivo"
        }
    ];

    useEffect(() => {

        getEnterprice('enterpricesecurity')

    }, [])


    // Funtionality to search


    const [search, setSearch] = useState('');

    let enterpriceList = filter(search, enterprice?.data?.enterpriseSecurity, "nameEnterprice")

    enterpriceList = enterpriceList.sort((a, b) => a.idEnterpriseSecurity - b.idEnterpriseSecurity);


    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)

    }

    const [shouldValidate, setShouldValidate] = useState(false);
    const updateEnterprice = async (event) => {

        const data = {

            idEnterpriseSecurity: idEnterpriseSecurity,
            nameEnterprice: nameEnterprice,
            email: email,
            NIT: NIT,
            phone: phone,
            address: address,
            state: state

        }

        console.log("edit data", data)

        await postRequest(event, `enterpricesecurity`, 'PUT', setEnterpriceFormModal, data, url, setErrorList, null, null)
        setShouldValidate(true)
        getEnterprice('enterpricesecurity')

    };

    const createEnterprice = async (event) => {

        const data = {

            nameEnterprice: nameEnterprice,
            email: email,
            NIT: NIT,
            phone: phone,
            address: address,

        }

        console.log("edit data", data)

        try {
            await postRequest(event, 'enterpricesecurity', 'POST', setEnterpriceFormModal, data, url, setErrorList, null, null, null)
            setShouldValidate(true)
            getEnterprice('enterpricesecurity')
        } catch (error) {
            console.error("Error creating enterprise: ", error);

        }

    };


    //paginator

    const { totalPages, currentPage, nextPage, previousPage, filteredData: EnterpriceInfo } = usePaginator(enterpriceList, 10);



    return (
        <>
            <ContainerTable
                title='Empresas de Seguridad'
                buttonToGo={
                    allowedPermissions['Vigilantes'] && allowedPermissions['Vigilantes'].includes('Crear')
                        ? <ButtonGoTo value='Nueva Empresa' onClick={() => openEnterpriceModal(null)} />
                        : null
                }

                search={<SearchButton value={search} onChange={searcher} placeholder='Buscar Empresa' />}
                showPaginator={
                    !loading && enterpriceList && enterpriceList.length > 0 ?
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
                        <Th name={'Información Empresa'}></Th>
                        <Th name={'Dirección'}></Th>
                        <Th name={'Teléfono'}></Th>
                        <Th name={'Correo'}></Th>
                        <Th name={'Acciones'}></Th>


                    </Thead>
                    <Tbody>
                        {loading ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', position: 'fixed', left: '58%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                <Spinner />
                            </div>
                            : enterpriceList.length == 0 || currentPage >= totalPages ?

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', marginLeft: '9vw' }}>
                                    <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" />
                                </div> :

                                EnterpriceInfo().map(enterprise => (
                                    <Row
                                        img='https://icons.veryicon.com/png/o/miscellaneous/menu-basic-linearity/enterprise-certification-6.png'
                                        key={enterprise.idEnterpriseSecurity}
                                        A3={'NIT'}
                                        A4={enterprise.NIT}
                                        A1={enterprise.nameEnterprice}
                                        status={enterprise.state}
                                        A2={''}
                                        description={enterprise.address}
                                        A7={enterprise.phone}
                                        A17={enterprise.email}
                                        onClick={() => openEnterpriceModal(enterprise)}

                                    >
                                        <Actions onClick={() => openEnterpriceModal(enterprise)} accion='Editar Empresa' icon="edit" />
                                        {enterprise.state === "Activo" ?
                                            <Actions accion="Crear Vigilante" href={`/admin/watchman/create/${enterprise.idEnterpriseSecurity}`} /> : null}
                                    </Row>
                                ))}

                    </Tbody>
                </TablePerson>

            </ContainerTable >

            {EnterpriceFormModal &&
                createPortal(
                    <>
                        <ModalContainer showModal={setEnterpriceFormModal}>
                            <Modal
                                onClick={IsEditedEnterprice ? updateEnterprice : createEnterprice}
                                showModal={setEnterpriceFormModal}
                                title={IsEditedEnterprice ? `Editar empresa` : 'Crear nueva empresa'}
                            >

                                <Inputs
                                    name="NIT"
                                    type='number'
                                    value={NIT}
                                    onChange={e => {
                                        setNIT(e.target.value);
                                        setErrorList([]);
                                    }}
                                    required={true}
                                    errors={errorList}
                                    identifier={'NIT'}
                                />
                                <Inputs name="Nombre Empresa" type='text' value={nameEnterprice} onChange={e => { setNameEnterprice(e.target.value); setErrorList([]); (e.target.value) }}
                                    errors={errorList}
                                    identifier={'nameEnterprice'}
                                ></Inputs>
                                <Inputs name="Dirección" type='text' value={address} onChange={e => { setAddress(e.target.value); setErrorList([]); }}
                                    errors={errorList}
                                    identifier={'address'}
                                ></Inputs>
                                <Inputs name="Correo" type='email' value={email} onChange={e => { setEmail(e.target.value); setErrorList([]); }}
                                    errors={errorList}
                                    identifier={'email'}
                                ></Inputs>
                                <Inputs name="Teléfono" type='number' value={phone} onChange={e => { setPhone(e.target.value); setErrorList([]); }}
                                    errors={errorList}
                                    identifier={'phone'}
                                ></Inputs>


                                {

                                    IsEditedEnterprice ?
                                        <>
                                            <InputsSelect id={"select"} options={statusEnterprice} name={"Estado"}
                                                value={state} onChange={e => setStatus(e.target.value)}
                                            ></InputsSelect>

                                            <Inputs type={"hidden"}
                                                value={idEnterpriseSecurity} onChange={e => setIdEnterpriseSecurity(e.target.value)}></Inputs>
                                        </>
                                        : null
                                }


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}
        </>


    )
}
