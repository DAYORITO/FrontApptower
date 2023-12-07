import React, { useEffect, useState } from 'react'
import { Details } from "../../../Components/Details/details"
import Inputs from '../../../Components/Inputs/Inputs'
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { statusList } from "../../../Hooks/consts.hooks"
import { TablePerson } from '../../../Components/Tables/Tables'
import { TableDetails } from "../../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons"
import { DetailsActions } from "../../../Components/DetailsActions/DetailsActions"
import { useFetchgetById } from "../../../Hooks/useFetch"
import { Dropdownanchor, Dropdownanchor2 } from "../../../Components/DropDownAnchor/Dropdownanchor"
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { NotificationsAlert } from "../../../Components/NotificationsAlert/NotificationsAlert"
import { ModalContainer, Modal } from "../../../Components/Modals/ModalTwo"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import './Watchman.css'


export const WatchmanDetails = (props) => {

    // 1. Start Get apartment information by id

    const { idwatchman } = useParams();
    console.log(idwatchman, "idwatchman")
    const { data: watchman, error, load } = useFetchgetById('watchman', idwatchman);
    const [idWatchman, setIdwatchman] = useState("");
    const [name, setName] = useState('');
    const [lastname, setwatchmanLastname] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [document, setDocument] = useState('');
    const [status, setStatus] = useState('');
    const [dateOfbirth, setDateOfbirth] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');



    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

    const [age, setAge] = useState(null);

    useEffect(() => {
        if (watchman && watchman.watchman) {
            setDateOfbirth(watchman.watchman.dateOfbirth);
            setAge(calculateAge(watchman.watchman.dateOfbirth));

        }
    }, [watchman]);


    useEffect(() => {

        if (watchman && watchman.watchman) {
            setIdwatchman(watchman.watchman.idwatchman);
            setName(watchman.watchman.namewatchman);
            setwatchmanLastname(watchman.watchman.lastnamewatchman);
            setDocumentType(watchman.watchman.documentType);
            setDocument(watchman.watchman.document);
            setStatus(watchman.watchman.state);
            setDateOfbirth(watchman.watchman.dateOfbirth);
            setEmail(watchman.watchman.email);
            setPhone(watchman.watchman.phone);



        }
    }, [watchman])



    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index)
    };

    return (
        <>
            <Details>

                <InfoDetails>


                    {/* <ContainerModule name={`Vigilante ${name} ${lastname}`} date1={`Documento: ${documentType} ${document}`} date2={`Correo: ${email} Telefono: ${phone} edad: ${dateOfbirth}`} status={status} >

                        <Dropdownanchor2 name={"Editar vigilante"} icon={"edit"} onClick={(e) => {
                            e.preventDefault();
                            handleModal(apartment);
                        }} />



                    </ContainerModule> */}

                    <div class='container-icons-custom472'>

                        <div class="circlecon-unique">
                            <span class='fe fe-shield text-muted fe-32 custom-icons'></span>

                            {['Active', 'Activo'].includes(status)
                                ? <span className="dot dot-md bg-success mr-1"></span>
                                : <span className="dot dot-md bg-danger mr-1"></span>}
                        </div>
                        <div class='info-vs-custom'>
                            <h2 class="custom-heading">Vigilante</h2>
                            <p class="custom-paragraph">{`${name} ${lastname}`} </p>
                            <p class="custom-paragraph">{`${documentType} ${document}`} </p>
                            <p class="custom-paragraph">{`Correo: ${email} Teléfono:${phone}`} </p>
                            <p class="custom-paragraph">{`Edad: ${age}`} </p>

                            <div class="back-strange">
                                <a href={"/admin/watchman/"} type="button" class="btn btn-sm btn-secondary weird-link">Regresar</a>
                            </div>
                        </div>

                    </div>






                </InfoDetails>

                <ListsDetails>
                    <NavDetails>

                        <NavListDetails index={1} name={"Mensajes"} toggleState={toggleState} onClick={() => toggleTab(1)} />
                        <NavListDetails index={2} name={"Ingresos"} toggleState={toggleState} onClick={() => toggleTab(2)} />

                    </NavDetails>

                    <TableDetails index={1} toggleState={toggleState} >

                        <TablePerson>
                            {/* <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo notificacion" href={"notificaciones/"} />
                            </DetailsActions> */}

                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions />


                        </TablePerson>
                    </TableDetails>

                    <TableDetails index={2} toggleState={toggleState} >
                        <TablePerson>
                            <DetailsActions>
                                <SearchButton />
                                <ButtonGoTo value="Nuevo ingreso" />
                            </DetailsActions>
                            <RowNotificactions status="Active" name="Ingreso" lastName="" icon="user" fecha="Fecha 22-11-2023" mensaje="Ingreso Juan Camilo" />
                            <RowNotificactions status="Inactive" name="Ingreso" lastName="" icon="user" fecha="Fecha 22-11-2023" mensaje="Ingreso Juan Camilo" />
                            <RowNotificactions status="Inactive" name="Ingreso" lastName="" icon="user" fecha="Fecha 22-11-2023" mensaje="Ingreso Juan Camilo" />

                        </TablePerson>

                    </TableDetails>


                </ListsDetails>
            </Details >

            {/* {showModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowModal}>
                            <Modal
                                // onClick={handleSaveChanges}
                                showModal={setShowModal}
                                title={"Editar apartamento"}
                            >
                                <Inputs name="Torre " type={"text"}
                                    value={tower} onChange={e => setTower(e.target.value)}></Inputs>
                                <Inputs name="Numero apartamento " type={"text"}
                                    value={apartmentName} onChange={e => setApartmentName(e.target.value)}></Inputs>

                                <Inputs name="Area del apartamento " type={"text"}
                                    value={area} onChange={e => setArea(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                    value={status} onChange={e => setStatus(e.target.value)}
                                ></InputsSelect>
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}

            {showApartmentResidentsModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowApartmentResidentsModal}>
                            <Modal
                                // onClick={handleSaveChanges}
                                showModal={setShowApartmentResidentsModal}
                                title={"Agregar residente existente"}


                            >
                                <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"}
                                    value={idApartment} onChange={e => setIdApartment(e.target.value)}></InputsSelect>

                                <InputsSelect id={"select"} options={residentsExistList} name={"Residente"}
                                    value={idResident} onChange={e => setIdResident(e.target.value)}></InputsSelect>


                                <Inputs name="Fecha de inicio de residencia" type={"date"}
                                    value={residentStartDate} onChange={e => setResidentStartDate(e.target.value)}></Inputs>
                                <Inputs name="Fecha de fin de residencia" type={"date"}
                                    value={residentEndDate} onChange={e => setResidentEndDate(e.target.value)}></Inputs>
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )} */}
        </>
    )
}
