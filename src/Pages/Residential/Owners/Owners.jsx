

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
import Cookies from 'js-cookie'

import { format } from 'date-fns'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'
import { Paginator } from '../../../Components/Paginator/Paginator'
import { SocketContext } from '../../../Context/SocketContext'


export const Owners = () => {
    const token = Cookies.get('token');

    // socket 

    const { socket } = useContext(SocketContext)


    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/

    const { data: owners, get: getOwners, loading } = useFetch(url)
    const { data: apartments, get: getApartments, loading: loadingApartments } = useFetch(url)
    const { del: delApartmentResidents } = useFetch(url)


    //Consulta Privilegios

    const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);

    useEffect(() => {

        getOwners("owners")
        getApartments("apartments")

    }, [])


    const [search, setSearch] = useState('');



    let ownerList = filter(search, owners?.data?.owners, "user", "name")


    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)

    }

    const [modalAssigApartmentToOwner, setModalAssigApartmentToOwner] = useState(false);

    const [idOwner, setIdOwner] = useState("")
    const [idApartment, setIdApartment] = useState("")
    const [ownershipStartDate, setOwnershipStartDate] = useState("")
    const [ownershipEndDate, setOwnershipEndDate] = useState("")

    const [errorList, setErrorList] = useState([])


    // List owners

    const ownersList = owners && owners?.data?.owners
        ? owners?.data?.owners
            .filter(owner => owner.status === 'Active')
            .map(owner => ({
                value: owner.idOwner,
                label: ` ${owner.user.name} ${owner.user.lastName} - ${owner.user.document}`
            }))
        : [];

    // List apartments

    const apartmentList = apartments?.data && apartments?.data?.apartments

        ? apartments.data.apartments
            .filter(apartment => apartment.status === 'Active')
            .map(apartment => ({
                value: apartment.idApartment,
                label: `${apartment.apartmentName} - ${apartment.Tower.towerName}`
            }))
        : [];

    const openModalAssingApartmentToOwner = (data) => {

        setErrorList('')

        setIdOwner(data.idOwner)
        setModalAssigApartmentToOwner(true)

    }

    const { idUserLogged } = useUserLogged()

    const CreateApartmentOwner = async (event) => {

        const data = {

            // User logged

            idUserLogged: idUserLogged,

            idApartment: parseInt(idApartment),
            idOwner: idOwner,
            OwnershipStartDate: ownershipStartDate,
            // status: "active"

        }

        console.log(socket)


        await postRequest(event, 'apartmentOwners', 'POST', setModalAssigApartmentToOwner, data, url, setErrorList, null, socket)

        getOwners('Owners')

    };

    const [modalPersonalInfoEdit, setModalPersonalInfoEdit] = useState(false)

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

    const openModalEdit = (data) => {

        console.log(data)
        setModalPersonalInfoEdit(true)

        setIdUser(data.iduser)
        setDocType(data.user.docType)
        setDocNumber(data.user.document)
        setName(data.user.name)
        setLastName(data.user.lastName)
        setBirthday(format(new Date(data.user.birthday), 'yyyy-MM-dd'))
        setSex(data.user.sex)
        setEmail(data.user.email)
        setPhone(data.user.phone)

    }


    const { totalPages, currentPage, nextPage, previousPage, filteredData: ownersInfo } = usePaginator(ownerList, 4);





    return (
        <>
            <ContainerTable
                title='Propietarios'
                dropdown={<DropdownExcel />}
                search={<SearchButton value={search} onChange={searcher} />}
                buttonToGo={
                    allowedPermissions['Propietarios'] && allowedPermissions['Propietarios'].includes('Crear')
                        ? <ButtonGoTo value='Nuevo propietario' href={'/admin/owners/create'} />
                        : null
                }
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


                        {loading ? <Spinner /> : ownerList.length == 0 || currentPage >= totalPages ?

                            <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :

                            ownersInfo()?.map(owner => (

                                <Row
                                    A1={owner.user.name}
                                    A2={owner.user.lastName}
                                    A3={owner.residentType == "tenant" ? "Arrendatario" : "Propietario"}
                                    A4={`${owner.user.docType} ${owner.user.document}`}

                                    A9={"Propiedades"}
                                    A10={`${owner.apartments && owner.apartments.length == 0 ? "Asigna una propiedad" : owner.apartments.map((index) => index.apartmentName).join(', ')}`}

                                    A13='Correo'
                                    A12={owner.user.email}

                                    A14='Telefono'
                                    A15={owner.user.phone}

                                    status={owner.status}

                                    to={`/admin/owners/details/${owner.idOwner}`}

                                >
                                    {owner.apartments.length == 0 ?
                                        <Actions accion={`Asiganar propiedad`} icon='home' onClick={() => openModalAssingApartmentToOwner(owner)}></Actions> :
                                        <>
                                            <Actions accion={`Asignar otro apartamento`} icon='home' onClick={() => openModalAssingApartmentToOwner(owner)}></Actions>
                                        </>

                                    }

                                    {/* <Actions accion='Modificar informacion personal' icon='edit' onClick={() => openModalEdit(owner)}></Actions> */}
                                    {/* <Actions accion='Modificar datos de residencia' onClick={() => openModal(resident)}></Actions> */}
                                    {
                                        owner.user.pdf ? <Actions accion='Documento' icon='file' href={owner.user.pdf} ></Actions> : null
                                    }




                                </Row>



                            ))
                        }
                    </Tbody>
                </TablePerson>
            </ContainerTable>

            {modalAssigApartmentToOwner &&
                createPortal(
                    <>
                        <ModalContainer showModal={setModalAssigApartmentToOwner}>
                            <Modal
                                onClick={CreateApartmentOwner}
                                showModal={setModalAssigApartmentToOwner}
                                title={`Asignar propiedad`}
                            // buttonDelete={isCreateApartmentResident ? false : true}
                            // onClickForDelete={deleteApartmentResident}
                            >

                                <InputsSelect disabled id={"select"} options={ownersList} name={"Propietario activo"}
                                    identifier={'idOwner'} errors={errorList}
                                    value={idOwner} onChange={e => setIdOwner(e.target.value)}
                                ></InputsSelect>

                                <InputsSelect id={"select"} options={apartmentList} name={"Propiedad"}
                                    identifier={'idApartment'} errors={errorList}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}
                                ></InputsSelect>

                                <Inputs name="Fecha desde cuando es propietario" type={"date"}
                                    identifier={'OwnershipStartDate'} errors={errorList}
                                    value={ownershipStartDate} onChange={e => setOwnershipStartDate(e.target.value)}>
                                </Inputs>


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )
            }

            {
                modalPersonalInfoEdit &&
                createPortal(
                    <>
                        <ModalContainer modalResident={setModalPersonalInfoEdit}>
                            <Modal
                                // onClick={updateResidentPersonalInformation}
                                showModal={setModalPersonalInfoEdit}
                                title={`Modificar informacion personal`}
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
                                    value={idUser} onChange={e => setIdUser(e.target.value)}></Inputs>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )
            }
        </>
    )
}
