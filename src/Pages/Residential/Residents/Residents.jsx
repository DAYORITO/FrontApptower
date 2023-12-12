import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import { ButtonGoTo, DropdownExcel, SearchButton } from '../../../Components/Buttons/Buttons'
import { TablePerson } from '../../../Components/Tables/Tables'
import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Tbody } from '../../../Components/Tbody/Tbody'
import { Row } from '../../../Components/Rows/Row'
import { Actions } from '../../../Components/Actions/Actions'
import { DivRow } from '../../../Components/DivRow/DivRow'
import { useFetch, useFetchget } from '../../../Hooks/useFetch'
import { useAuth } from '../../../Context/AuthContext'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal, ModalContainer } from '../../../Components/Modals/ModalTwo'
import { docTypes, sexs, statusList } from '../../../Hooks/consts.hooks'
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import Inputs from '../../../Components/Inputs/Inputs'
import Swal from 'sweetalert2'
import { handlePutRequest } from '../../../Helpers/Helpers'



export const Residents = () => {


    const { user, isAuth } = useAuth();

    // const url = "http://localhost:3000/api/"
    const url = "https://apptowerbackend.onrender.com/api/"

    // Get residents

    const { data: residents, response: responseResidents, get: getResidents, put: putResident } = useFetch(url)

    // Resident atributes

    const [idResident, setIdResident] = useState("")
    const [docNumber, setDocNumber] = useState("")
    const [docType, setDocType] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [sex, setSex] = useState("")
    const [status, setStatus] = useState("")

    // Modal edit resident

    const [showModalEditReisident, setShowModalEditReisident] = useState(false)


    useEffect(() => {

        getResidents(`residents`)

    }, [])


    console.log((residents))
    // Funtions to show resident

    const OpenModalEditReisident = (data) => {

        setIdResident(data.idResident)
        setDocNumber(data.docNumber)
        setDocType(data.docType)
        setName(data.name)
        setLastName(data.lastName)
        setEmail(data.email)
        setPhoneNumber(data.phoneNumber)
        setSex(data.sex)
        setStatus(data.status)
        setShowModalEditReisident(true)

    }

    // Edit resident

    const handleUpdateResident = (event) => {

        const data = {
            idResident: idResident,
            docNumber: docNumber,
            docType: docType,
            name: name,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            sex: sex,
            status: status,
        }

        handlePutRequest(event, 'residents', `Operacion exitosa jaja`, data, setShowModalEditReisident, putResident, getResidents);
    };



        return (
            <>

                <ContainerTable title='Residentes'
                    dropdown={<DropdownExcel />}
                    search={<SearchButton />}
                    buttonToGo={<ButtonGoTo value='Crear Residente' href='create' />}
                >

                    <TablePerson>
                        <Thead>

                            <Th name={"Informacion del residente"} />
                            <Th name={'Informacion de contacto'}></Th>

                        </Thead>
                        <Tbody>
                            {residents?.data?.residents?.map(residents => (
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
                                    <Actions onClick={() => OpenModalEditReisident(residents)} accion='Modificar' />
                                </Row>
                            ))}


                        </Tbody>
                    </TablePerson>
                </ContainerTable>

                {showModalEditReisident &&
                    createPortal(
                        <>
                            <ModalContainer ShowModal={setShowModalEditReisident}>
                                <Modal
                                    // onClick={() => putResident('residents', data)}
                                    onClick={handleUpdateResident}

                                    showModal={setShowModalEditReisident}
                                    title={"Modificar residente"}

                                >
                                    {/* <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>
                                <InputsSelect id={"select"} options={residentsList} name={"Residentes"}
                                    value={idResident} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <Inputs name="Fecha de inicio de residencia" type={"date"} readonly
                                    value={residentStartDate} onChange={e => setOwnershipStartDate(e.target.value)}></Inputs> */}



                                    <InputsSelect id={"select"} options={docTypes} name={"Tipo de documento"}
                                        value={docType} onChange={e => setDocType(e.target.value)}></InputsSelect>

                                    <Inputs name="Numero de documento" type={"text"}
                                        value={docNumber} onChange={e => setDocNumber(e.target.value)}></Inputs>

                                    <Inputs name="Nombre" type={"text"}
                                        value={name} onChange={e => setName(e.target.value)}></Inputs>

                                    <Inputs name="Apellido" type={"text"}
                                        value={lastName} onChange={e => setLastName(e.target.value)}></Inputs>

                                    <Inputs name="Correo" type={"email"}
                                        value={email} onChange={e => setEmail(e.target.value)}></Inputs>

                                    <Inputs name="Telefono" type={"text"}
                                        value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></Inputs>

                                    <InputsSelect id={"select"} options={sexs} name={"Sexo"}
                                        value={sex} onChange={e => setSex(e.target.value)}></InputsSelect>

                                    <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                        value={status} onChange={e => setStatus(e.target.value)}></InputsSelect>

                                    <Inputs type={"hidden"}
                                        value={idResident} ></Inputs>


                                </Modal>
                            </ModalContainer>
                        </>,
                        document.getElementById("modalRender")
                    )}
            </>



        )
    }
