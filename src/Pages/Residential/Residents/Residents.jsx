

import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { useContext, useEffect, useState } from 'react'
import { useAllowedPermissionsAndPrivileges, useFetch } from '../../../Hooks/useFetch'
import { Spinner } from '../../../Components/Spinner/Spinner'
import { usePaginator, filter, postRequest, useUserLogged } from '../../../Helpers/Helpers'

import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { createPortal } from 'react-dom'
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import Inputs from '../../../Components/Inputs/Inputs'
import { useParams } from 'react-router'
import { docTypes, residentsTypes, sexs, statusList } from '../../../Hooks/consts.hooks'
import { Uploader } from '../../../Components/Uploader/Uploader'
import FormColumn from '../../../Components/Forms/FormColumn'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { format } from 'date-fns'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'
import Cookies from 'js-cookie'
import { Paginator } from '../../../Components/Paginator/Paginator'
import { SocketContext } from '../../../Context/SocketContext'


export const Residents = () => {
    const token = Cookies.get('token');

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/

    // Socket

    const { socket } = useContext(SocketContext)


    const { data: residents, get: getResidents, loading } = useFetch(url)
    const { data: apartments, get: getApartments, loading: loadingApartments } = useFetch(url)
    const { del: delApartmentResidents } = useFetch(url)


    //Consulta Privilegios

    const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);



    useEffect(() => {

        getResidents("residents")
        getApartments("apartments")

    }, [])


    const [search, setSearch] = useState('');

    let residentList = filter(search, residents?.data?.residents, "user", "name")

    residentList = residentList.sort((a, b) => a.idResident - b.idResident);


    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)

    }

    const [modalResident, setModalResident] = useState(false);
    const [modalResidentEdit, setModalResidentEdit] = useState(false);
    const [modalAddChangeApartment, setModalAddChangeApartment] = useState(false);


    // Apartment information

    const { id } = useParams()

    const { idUserLogged } = useUserLogged()

    const [idResident, setIdResident] = useState("");

    const [residentType, setResidentType] = useState('');

    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const [status, setStatus] = useState('');

    const [residentName, setResidentName] = useState("")


    // const [userImg, setUserImg] = useState("");

    const [idUser, setIdUser] = useState("")
    const [pdf, setPdf] = useState("");
    const [docType, setDocType] = useState("");
    const [docNumber, setDocNumber] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [sex, setSex] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [idApartmentResident, setIdApartmentResident] = useState("")
    const [idApartment, setIdApartment] = useState("")
    const [residentStartDate, setResidentStartDate] = useState("")
    const [residentEndDate, setResidentEndDate] = useState("")


    const [isCreateApartmentResident, setIsCreateApartmentResident] = useState(false)

    // List apartments

    const apartmentList = apartments?.data && apartments?.data?.apartments

        ? apartments.data.apartments
            .map(apartment => ({
                value: apartment.idApartment,
                label: `${apartment.apartmentName} - ${apartment.Tower.towerName}`
            }))
        : [];

    const residentsList = residents && residents?.data?.residents
        ? residents?.data?.residents
            .map(resident => ({
                value: resident.idResident,
                label: ` ${resident.user.name} ${resident.user.lastName} - ${resident.user.document}`
            }))
        : [];


    const openModal = (data) => {

        console.log(data)
        !data.apartments.length == 0 ? setIdApartment(data.apartments[0].idApartment) : setIdApartment("")

        setIdResident(data.idResident)
        setResidentType(data.residentType)
        setCreatedAt(format(new Date(data.createdAt), 'yyyy-MM-dd'))
        setUpdatedAt(format(new Date(data.updatedAt), 'yyyy-MM-dd'))
        setStatus(data.status)

        setResidentName(`${data.user.name + data.user.lastName}`)

        setModalResident(true)

    }

    const openModalEdit = (data) => {

        console.log(data)
        setIdUser(data.iduser)
        setDocType(data.user.docType)
        setDocNumber(data.user.document)
        setName(data.user.name)
        setLastName(data.user.lastName)
        setBirthday(format(new Date(data.user.birthday), 'yyyy-MM-dd'))
        setSex(data.user.sex)
        setEmail(data.user.email)
        setPhone(data.user.phone)


        setModalResidentEdit(true)

    }

    const openModalAddChangeApartment = (data) => {

        console.log(data)

        if (data.apartments.length != 0) {

            setIsCreateApartmentResident(false)
            setIdApartmentResident(data.apartmentResidents[0].idApartmentResident)
            setIdApartment(data.apartmentResidents[0].idApartment)
            setIdResident(data.apartmentResidents[0].idResident)
            setResidentStartDate(format(new Date(data.apartmentResidents[0].residentStartDate), 'yyyy-MM-dd'))
            setResidentEndDate(format(new Date(data.apartmentResidents[0].residentEndDate), 'yyyy-MM-dd'))
            setStatus(data.apartmentResidents[0].status)


        }

        else {
            setIsCreateApartmentResident(true)
            setIdApartmentResident("")
            setIdApartment("")
            setIdResident(data.idResident)
        }




        setModalAddChangeApartment(true)

    }

    // Edit apartment residents 

    const updateApartmentResident = async (event) => {

        const data = {

            idApartmentResident: idApartmentResident,
            idApartment: idApartment,
            idResident: idResident,
            status: status

        }
        console.log(data)

        await postRequest(event, 'aparmentResidents', 'PUT', {}, data, url)

        setModalAddChangeApartment(false)
        getResidents('residents')

    };

    // Create apartment residents 

    const CreateApartmentResident = async (event) => {

        const data = {

            // User logged

            idUserLogged: idUserLogged,

            idApartment: parseInt(idApartment),
            idResident: idResident,
            residentStartDate: residentStartDate,
            // status: "active"

        }

        await postRequest(event, 'aparmentResidents', 'POST', setModalAddChangeApartment, data, url, null, null, socket)

        getResidents('residents')

    };

    // Edit resident user information

    // const updateResidentPersonalInformation = async (event) => {

    //     const data = {

    //         // User logged

    //         idUserLogged: idUserLogged,

    //         iduser: idUser,
    //         pdf: pdf,
    //         docType: docType,
    //         document: docNumber,
    //         name: name,
    //         lastName: lastName,
    //         birthday: birthday,
    //         sex: sex,
    //         email: email,
    //         phone: phone,

    //     }


    //     await postRequest(event, 'users', 'PUT', setModalResidentEdit, data, url)

    //     getResidents('residents')

    // };


    // Edit resident

    const updateResident = async (event) => {

        const data = {

            // User logged

            idUserLogged: idUserLogged,

            idResident: idResident,
            residentType: residentType,
            status: status,
            idApartment: idApartment

        }

        await postRequest(event, 'residents', 'PUT', setModalResident, data, url, null, null, socket)

        getResidents('residents')

    };


    const deleteApartmentResident = async (event) => {


        const deleteFunction = async () => {
            await delApartmentResidents('aparmentResidents', { idApartmentResident: idApartmentResident });
        };

        await showConfirmationDialog('¿Estas seguro?', 'Esta acción no es reversible', 'Eliminar', deleteFunction);
        setModalAddChangeApartment(false)
        getResidents('residents')
    };

    // Paginator

    const { totalPages, currentPage, nextPage, previousPage, filteredData: residentsInto } = usePaginator(residentList, 6);


    return (
        <>
            <ContainerTable
                title='Residentes'
                dropdown={<DropdownExcel />}
                search={<SearchButton value={search} onChange={searcher} />}
                buttonToGo={
                    allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Crear')
                        ? <ButtonGoTo value='Nuevo residente' href={'/admin/residents/create'} />
                        : null}
                showPaginator={<Paginator totalPages={totalPages} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />}

            >
                <TablePerson>

                    {/* <Thead>
                        <Th name={"Informacion perosonal"} />
                        <Th name={"Apartamento residencia"} />
                        <Th name={"Informacion de contacto"} />
                        <Th name={"Acciones"} />

                    </Thead> */}

                    <Tbody>


                        {loading ? <Spinner /> : residentList.length == 0 || currentPage >= totalPages ?

                            <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :

                            residentsInto()?.map(resident => (

                                <Row
                                    A1={resident.user.name}
                                    A2={resident.user.lastName}
                                    A3={resident.residentType == "tenant" ? "Arrendatario" : "Propietario"}
                                    A4={`${resident.user.docType} ${resident.user.document}`}

                                    A9={"Apartamento"}
                                    A10={`${resident.apartments && resident.apartments.length == 0 ? "No hay apartamentos" : resident.apartments.map((index) => index.apartmentName).join(', ')}`}

                                    A13='Correo'
                                    A12={resident.user.email}

                                    A14='Telefono'
                                    A15={resident.user.phone}

                                    status={resident.status}

                                    to={`/admin/resident/details/${resident.iduser}`}

                                >
                                    {resident.apartments.length == 0 ?
                                        <Actions accion={`Asiganar apartamento`} icon='home' onClick={() => openModalAddChangeApartment(resident)}></Actions> :
                                        <>
                                            <Actions accion='Ver apartamento'
                                                icon='home'
                                                href={`/admin/apartments/details/${resident.apartments[0].idApartment}`}
                                            />
                                            {/* <Actions accion={`Modificar residencia apartamento`} onClick={() => openModalAddChangeApartment(resident)}></Actions> */}
                                        </>

                                    }

                                    {/* <Actions accion='Modificar informacion personal' icon='edit' onClick={() => openModalEdit(resident)}></Actions> */}
                                    {allowedPermissions['Residentes'] && allowedPermissions['Residentes'].includes('Editar') ? (
                                        <Actions accion='Modificar datos de residencia' onClick={() => openModal(resident)}></Actions>
                                    ) : null}

                                    {
                                        resident.user.pdf ? <Actions accion='Documento' icon='file' href={resident.user.pdf} ></Actions> : null
                                    }

                                    {/* <Actions accion='Ver detalle' icon='eye' href={`/admin/residents/details/${resident.idResident}`} ></Actions> */}

                                </Row>



                            ))
                        }
                    </Tbody>
                </TablePerson>
            </ContainerTable >

            {modalAddChangeApartment &&
                createPortal(
                    <>
                        <ModalContainer showModal={setModalAddChangeApartment}>
                            <Modal
                                onClick={isCreateApartmentResident ? CreateApartmentResident : updateApartmentResident}
                                showModal={setModalAddChangeApartment}
                                title={`${isCreateApartmentResident ? "Asignar apartamento" : "Modificar apartamento asignado"}`}
                                buttonDelete={isCreateApartmentResident ? false : true}
                                // onClickForDelete={deleteApartmentResident}
                            >

                                <InputsSelect disabled id={"select"} options={residentsList} name={"Residente"}
                                    value={idResident} onChange={e => setIdApartmentResident(e.target.value)}
                                ></InputsSelect>

                                <InputsSelect disabled={!isCreateApartmentResident} id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Fecha de residencia de apartamento" type={"date"}
                                    value={residentStartDate} onChange={e => setResidentStartDate(e.target.value)}></Inputs>

                                {
                                    isCreateApartmentResident ? null :
                                        <>

                                            <Inputs name="Fecha de modificacion residencia de apartamento " type={"date"}
                                                value={residentEndDate} onChange={e => setResidentEndDate(e.target.value)}></Inputs>

                                            <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                                value={status} onChange={e => setStatus(e.target.value)}
                                            ></InputsSelect>

                                            <Inputs type={"hidden"}
                                                value={idApartmentResident} onChange={e => setIdApartmentResident(e.target.value)}></Inputs>
                                        </>

                                }





                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )
            }

            {
                modalResident &&
                createPortal(
                    <>
                        <ModalContainer modalResident={setModalResident}>
                            <Modal
                                onClick={updateResident}
                                showModal={setModalResident}
                                title={`Modificar residencia ${residentName}`}

                            >


                                <InputsSelect id={"select"} options={residentsTypes} name={"Tipo de residente"}
                                    value={residentType} onChange={e => setResidentType(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Fecha de inicio de residencia " type={"date"}
                                    value={createdAt} onChange={e => setCreatedAt(e.target.value)}></Inputs>

                                <Inputs name="Fecha de modificacion de residencia " type={"date"}
                                    value={updatedAt} onChange={e => setUpdatedAt(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                    value={status} onChange={e => setStatus(e.target.value)}
                                ></InputsSelect>

                                <Inputs type={"hidden"}
                                    value={idResident} onChange={e => setIdResident(e.target.value)}></Inputs>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )
            }
            {
                modalResidentEdit &&
                createPortal(
                    <>
                        <ModalContainer modalResident={setModalResidentEdit}>
                            <Modal
                                onClick={updateResidentPersonalInformation}
                                showModal={setModalResidentEdit}
                                title={`Modificar informacion personal ${residentName}`}
                            >

                                <Uploader name="img" label="Documento de identidad" onChange={e => setPdf(e.target.files[0])} />

                                <InputsSelect id={"select"} options={docTypes} name={"Tipo de residente"}
                                    value={docType} onChange={e => setDocType(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Numero de documento" type={"text"}
                                    value={docNumber} onChange={e => setDocNumber(e.target.value)}></Inputs>

                                <Inputs name="Nombres" type={"text"}
                                    value={name} onChange={e => setName(e.target.value)}></Inputs>

                                <Inputs name="Apellidor" type={"text"}
                                    value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>

                                <Inputs name="Fecha de cumpleaños" type={"date"}
                                    value={birthday} onChange={e => setBirthday(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={sexs} name={"Sexo"}
                                    value={sex} onChange={e => setSex(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Correo electronico" type={"text"}
                                    value={email} onChange={e => setEmail(e.target.value)}></Inputs>

                                <Inputs name="Numero de telefono" type={"text"}
                                    value={phone} onChange={e => setPhone(e.target.value)}></Inputs>

                                <Inputs type={"hidden"}
                                    value={idResident} onChange={e => setIdResident(e.target.value)}></Inputs>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )
            }
        </>
    )
}
