import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import useFetchUserPrivileges, { useFetchForFile, useFetchget } from '../../Hooks/useFetch';
import { createPortal } from 'react-dom';
import { Uploader } from '../../Components/Uploader/Uploader';
import { dotSpinner } from 'ldrs'
import { ContainerTable } from '../../Components/ContainerTable/ContainerTable';
import { ButtonGoTo, DropdownExcel, SearchButton, SearchSelect } from '../../Components/Buttons/Buttons';
import { TablePerson } from '../../Components/Tables/Tables';
import { Thead } from '../../Components/Thead/Thead';
import { Th } from '../../Components/Th/Th';
import { Tbody } from '../../Components/Tbody/Tbody';
import { ModalContainerload, Modaload } from '../../Components/Modals/Modal';
import { Row } from '../../Components/Rows/Row';
import { Actions } from '../../Components/Actions/Actions';
import { Modal, ModalContainer } from '../../Components/Modals/ModalTwo';
import { set } from 'date-fns';
import { useApiUpdate } from '../../Hooks/FetchputDan';
import ImageContainer from '../../Components/ImgContainer/imageContainer';
import Cookies from 'js-cookie';
import { idToPermissionName, idToPrivilegesName } from '../../Hooks/permissionRols';
import FileUploader from '../../Components/ImgContainer/FileSelector';
import Inputs from '../../Components/Inputs/Inputs';
import { Spinner } from '../../Components/Spinner/Spinner';



function Fines() {
    const [LoadingSpiner, setLoadingSpiner] = useState(true);
    //Se crea un estado para actualizar los datos al momento de cualquier accion
    const [fines, setFines] = useState({ fines: [] })
    const [showModaload, setShowModaload] = useState(false);
    // const [search, setSearch] = useState('');
    dotSpinner.register()
    const token = Cookies.get('token');
    const { data: allowedPermissions, get: fetchPermissions, loading: loadingPermissions } = useFetchUserPrivileges(token, idToPermissionName, idToPrivilegesName);
    const [showModal, setShowModal] = useState(false);
    const [evidenceFiles, setEvidenceFiles] = useState();
    const [paymentproof, setPaymentproof] = useState();
    const [showevidences, setShowEvidences] = useState(true);
    const [id, setId] = useState();
    const [selectedFilterParam, setSelectedFilterParam] = useState('date');
    const [selectedFilterValue, setSelectedFilterValue] = useState('');
    const [originalFines, setOriginalFines] = useState([]);

    const { data, load, error } = useFetchget('fines')

    const filterOptions =[{label: 'Fecha incidente', value: "incidentDate"},
    {label:'Fecha limite de pago', value:'paymentDate'},
    {label: 'Fecha de creacion', value: "createdAt"},
    {label: 'Estado', value: "state"},
    {label: 'Tipo de multa', value: "fineType"},
    {label: 'apartamento', value: "apartmentName"}
    ]
    const [optionState, setOptionState] = useState('Por revisar');
    const typeOptions = [{label: 'Pendiente', value: 'pendiente'}, {label: 'Por revisar', value: 'por revisar'}, {label: 'Pagada', value: 'pagada'}]
    // const [dateOption, setDateOption] = useState('incidentDate');
    const dateOptions = [{label: 'Fecha incidente', value: 'incidentDate'}, {label: 'Fecha limite de pago', value: 'paymentDate'}, {label: 'Fecha de creacion', value: 'createdAt'}]
    const [dateMarked, setDateMarked] = useState();
    useEffect(() => {
        // Cuando la carga está en progreso (load es true), activamos el modal de carga
        if (data?.fines?.length > 0) {
            setLoadingSpiner(false);
        } else {
        setTimeout(() => {setLoadingSpiner(false)}, 10000);
            // Cuando la carga se completa (load es false), desactivamos el modal de carga

        }
    }, [data]);
    //se usa el effect para actualizar los datos del get
    useEffect(() => {
        if (data && data.fines) {
            setFines(reorderFines(data.fines));
            setOriginalFines(reorderFines(data.fines));
        }
    }, [data]);

    function handleChange(e){
        searcher(e);
    }


    function searcher(e) {
        setSelectedFilterValue(e.target.value.toLowerCase());
      
        
        let filteredFines=originalFines.filter((dato) =>{
            if (selectedFilterParam === "incidentDate") {
                return dato.incidentDate.toString().toLowerCase().includes(e.target.value.toLowerCase())
            }
            if (selectedFilterParam === "state") {
                console.log("estado", dato.state)
                return dato.state.toString().toLowerCase().includes(e.target.value.toLowerCase())
            }
            if (selectedFilterParam === "fineType") {
                return dato.fineType.toString().toLowerCase().includes(e.target.value.toLowerCase())
            }
            if (selectedFilterParam === "apartmentName") {
                return dato.apartment.apartmentName.toString().toLowerCase().includes(e.target.value.toLowerCase())
            }
        })
        setFines(filteredFines);
       
    }
    
      

    function reorderFines(fines) {
        return fines.sort((a, b) => {
          // Comparar por estado
          if (a.state === "Pagada" && b.state !== "Pagada") return 1;
          if (a.state !== "Pagada" && b.state === "Pagada") return -1;
          if (a.state === "Por aprobar" && b.state !== "Por aprobar") return -1;
          if (a.state !== "Por aprobar" && b.state === "Por aprobar") return 1;
          if (a.state === "Pendiente" && b.state !== "Pendiente") return -1;
          if (a.state !== "Pendiente" && b.state === "Pendiente") return 1;
          // Si ambos tienen el mismo estado, comparar por fecha de incidente (de más antiguo a más nuevo)
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA - dateB;
        })
      }

    //se crea una funcion para el boton que hara la accion de actualizar y se le pasa como parametro los datos que se van a actualizar
    const handleEditClick = async (dataToUpdate) => {
        setShowModaload(true);

        //se llama a la funcion useApiUpdate y se le pasa como parametro los datos que se van a actualizar y el endpoint
        let response = await useFetchForFile('https://apptowerbackend.onrender.com/api/fines',dataToUpdate, 'PUT')
            // .then((responseData) => {
                
            console.log("respuesta de api holi",response)
            if(response.response != null){
                setShowModaload(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Archivo actualizado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    //se crea una constante que va a actualizar los datos para que en el momento que se actualice el estado se actualice la tabla
                    const updatedfine = fines.map((fine) => {
                        console.log("entre pero no encontrado", fine)
                        console.log("id buscado", dataToUpdate.idFines, "idActual", fine.idFines)
                        console.log("datos respuesta", response.response)
                        if (fine.idFines == dataToUpdate.idfines) {
                            if (dataToUpdate.paymentproof) {
                                fine.paymentproof = response.response.results.paymentproof;
                            }
                            console.log("Encontrado! ", fine, "id",fine.idFines)
                            fine.state = dataToUpdate.state;
                        }
                        
                        return fine;
                        
                    });
                    console.log("regiostro actualizado: ", updatedfine)
                    setFines(updatedfine);
                }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salió mal!',
                        });
                        setShowModaload(false);

                }
                
            
    };


    const totalPages = fines ? Math.ceil(fines.length / 8) : 0;
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const [currentPage, setCurrentPage] = useState(0);

    const filteredDatafines = () => {
        if (data && data.fines && fines.length > 0) {
            return fines?.slice(currentPage, currentPage + 8);
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
            <ContainerTable title='Multas'
                dropdown={<DropdownExcel />}
                search2={<SearchSelect options={filterOptions} onChange={(e)=>{setSelectedFilterParam(e.target.value);
                    setSelectedFilterValue('');
                    setFines(originalFines);
                    if(e.target.value == "incidentDate"
                    || e.target.value == "paymentDate"
                    || e.target.value == "createdAt"
                    )
                    {setDateMarked('date')}else{ setDateMarked('text')}
                    }}/>}
                search={selectedFilterParam == "state" ? <SearchButton options={typeOptions} type={dateMarked} onChange={handleChange} />
                :<SearchButton value={selectedFilterValue} type={dateMarked} onChange={handleChange} placeholder='Buscar multa'/>}
                buttonToGo={
                    allowedPermissions['Multas'] && allowedPermissions['Multas'].includes('Crear')
                        ? <ButtonGoTo value='Crear Multa' href='/admin/fines/create' />
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

                        <Th name={'Tipo de multa'}></Th>
                        <Th name={'Fecha del incidente'}></Th>
                        <Th name={'Fecha limite de pago'}></Th>
                        <Th name={'Valor a pagar'}></Th>
                        <Th name={'Estado'}></Th>
                        <Th name={'Acciones'}></Th>
                    </Thead>
                    <Tbody>
                        {LoadingSpiner == true ? <Spinner/> : filteredDatafines()?.map(fine => (
                            <Row
                                key={fine.idFines}
                                A1={fine.fineType}
                                A3="APTO"
                                A4={fine.apartment.apartmentName}
                                icon='dollar-sign'
                                // status='Pendiente'
                                A6={(() => {
                                    let incidentDate = new Date(fine.incidentDate).toLocaleDateString('es-ES', {
                                        timeZone: 'UTC',
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    });
                                    return incidentDate;
                                })()}
                                A7={(() => {
                                    let paymentDate = new Date(fine.paymentDate).toLocaleDateString('es-ES', {
                                        timeZone: 'UTC',
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    });
                                    return paymentDate;
                                })()}
                                A9={"$" + fine.amount}
                                A12={fine.state}
                            >
                                {fine.state != 'Pagada' ?
                                    <Actions accion='Agregar Comprobante' onClick={()=>{
                                        setShowEvidences(false);
                                        setId(fine.idFines);
                                        console.log("Comprobante de pago1", fine.paymentproof);

                                        setPaymentproof([fine.paymentproof]); 
                                        console.log("Comprobante de pago2", paymentproof);
                                        setShowModal(true)} } /> : ""}

                                {fine.paymentproof != null && fine.state != 'Pagada'
                                 ?
                                <Actions accion='Aprobar pago' onClick={() => {
                                    handleEditClick({ idfines: fine.idFines, state: 'Pagada' });
                                }} /> : ""}

                                <Actions accion='Ver detalles' 
                                // href={`/admin/fines/details/${fine.idFines}`}
                                onClick={() => {
                                    setShowEvidences(true);
                                    setEvidenceFiles(fine.evidenceFiles);
                                    setShowModal(true);
                                }
                                }
                                 />
                            </Row>
                        ))}


                    </Tbody>
                </TablePerson>
            </ContainerTable>
            {showModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowModal}>
                            <Modal
                                showModal={setShowModal}
                                onClick={() => {setShowModal(false), handleEditClick({idfines: id, state: "Por revisar", paymentproof: paymentproof})} }
                                title={showevidences ? "Evidencias" : "Comprobante de pago"}
                                onClickClose={() => {setEvidenceFiles([]); setPaymentproof([])}}
                                showSave={showevidences ? false : true}
                            >
                            {
                                showevidences ? 
                                <ImageContainer urls={evidenceFiles} />
                                :
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <ImageContainer urls={paymentproof} />
                                    <div style={{width: "200px", height: "200px"}}>
                                    <Uploader label={"Agregar archivo"}
                                        onChange={(e) => {
                                            setPaymentproof(e.target.files[0]);
                                        }}
                                    />
                                    </div>
                                    
                                    
                                </div>
                                
                            }
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )
                                
            }
            // {showModaload &&
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


                            </Modaload>
                        </ModalContainerload>
                    </>,
                    document.getElementById("modalRender")
                )}

        </>
    )
}

export default Fines