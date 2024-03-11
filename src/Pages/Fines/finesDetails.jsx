import React, { useContext, useEffect, useState } from 'react'

import { Details } from "../../Components/Details/details"
import Inputs from '../../Components/Inputs/Inputs'
import InputsSelect from "../../Components/Inputs/InputsSelect"
import { docTypes, sexs, statusList } from "../../Hooks/consts.hooks"
import { TablePerson } from '../../Components/Tables/Tables'
import { TableDetails } from "../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../Components/InfoDetails/InfoDetails"
import { ButtonGoTo, SearchButton } from "../../Components/Buttons/Buttons"
import { DetailsActions } from "../../Components/DetailsActions/DetailsActions"
import { idToPermissionName } from '../../Hooks/permissionRols'
import { useAllowedPermissions, useFetch, useFetchForFile, useFetchUserInformation } from "../../Hooks/useFetch"
import { Dropdownanchor, Dropdownanchor2 } from "../../Components/DropDownAnchor/Dropdownanchor"
import { ContainerModule } from "../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../Components/RowNotificacions/RowNotificactions"
import { NotificationsAlert } from "../../Components/NotificationsAlert/NotificationsAlert"
import { ModalContainer, Modal, ModalImg } from "../../Components/Modals/ModalTwo"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import { format, set } from 'date-fns';
import { SmalSpinner, Spinner } from '../../Components/Spinner/Spinner'
import { createPortal } from 'react-dom'
import { Uploader } from '../../Components/Uploader/Uploader'
import { postRequest, useUserLogged } from '../../Helpers/Helpers'
import { Table, ThInfo } from '../../Components/Table/Table'
import { Thead } from '../../Components/Thead/Thead'
const token = Cookies.get('token');
import Cookies from 'js-cookie';
import { da } from 'date-fns/locale'
import Swal from 'sweetalert2'
import ImageContainer from '../../Components/ImgContainer/imageContainer'
import moment from 'moment';
import { SocketContext } from '../../Context/SocketContext'
import { ModalContainerload, Modaload } from '../../Components/Modals/Modal'


export const FinesDetail = () => {
  const token = Cookies.get('token');
  // API URL

  const url = "http://localhost:3000/api/"
  // const url = "https://apptowerbackend.onrender.com/api/"


  // Fine informacion

  const { id } = useParams();

  const { idUserLogged } = useUserLogged()

  // Socket

  const { socket } = useContext(SocketContext)

  const [idFines, setIdFines] = useState(id)

  // info fines relations

  const { data: fines, get: getFine, loading: loadingFines } = useFetch(url)


  useEffect(() => {

    try {

      getFine(`fines/${idFines}`)


    } catch (error) {

      console.error('Error al obtener datos de la multa', error);

    }

  }, [])

  // Fine details

  const [fineType, setFineType] = useState('')
  const [incidentDate, setIncidentDate] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [amount, setAmount] = useState('')
  const [details, setDetails] = useState('')
  const [idApartment, setIdApartment] = useState('')
  const [apartmentName, setApartmentName] = useState('')
  const [state, setState] = useState('')
  const [showModaload, setShowModaload] = useState(false)
  const [showModal, setShowModal] = useState(false)


  const [evidenceFiles, setEvidenceFiles] = useState([])
  const [paymentproof, sePaymentproof] = useState([])
  const [paymentproofFiles, setPaymentproofFiles] = useState([])
  const [userTaxer, setUserTaxer] = useState('')

  const [evidenceImg, setEvidenceImg] = useState('')


  // Var to upload files in evidences and proof

  const [file, setFile] = useState('')



  useEffect(() => {

    setFineType(fines?.data?.fines?.fineType)
    setIncidentDate(fines?.data?.fines?.incidentDate)
    setPaymentDate(fines?.data?.fines?.paymentDate)
    setAmount(fines?.data?.fines?.amount)
    setDetails(fines?.data?.fines?.details)
    setIdApartment(fines?.data?.fines?.idApartment)
    setApartmentName(fines?.data?.fines?.apartment?.apartmentName)
    setState(fines?.data?.fines?.state)

    setEvidenceFiles(fines?.data?.fines?.evidenceFiles)

    sePaymentproof(fines?.data?.fines?.paymentproof)

    setUserTaxer(fines?.data?.fines?.user)


  }, [fines?.data?.fines])

  // Modal img

  const [modalImg, setModalImg] = useState(false)

  const openModalImg = (data) => {

    console.log('data: ', data)
    setEvidenceImg(data)
    setModalImg(true)

  }


  // add proof modal

  const [addProofFilesModal, setAaddProofFilesModal] = useState(false);

  const openProofFilesModal = () => {

    setAaddProofFilesModal(true)

  }
  const handleEditClick = async (dataToUpdate) => {
    setShowModaload(true);

    //se llama a la funcion useApiUpdate y se le pasa como parametro los datos que se van a actualizar y el endpoint
    let response = await useFetchForFile('http://localhost:3000/api/fines', dataToUpdate, 'PUT')
    // .then((responseData) => {

    console.log("respuesta de api holi", response)
    if (response.response != null) {
      setShowModaload(false);
      Swal.fire({
        icon: 'success',
        title: 'Archivo actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      //se crea una constante que va a actualizar los datos para que en el momento que se actualice el estado se actualice la tabla
      setState(dataToUpdate.state);
      sePaymentproof(dataToUpdate.paymentproof);

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
      });
      setShowModaload(false);

    }


  };


  return (
    <>
      <Details>

        {


          loadingFines ? <Spinner /> :
            <ContainerModule
              to={'/admin/fines/'}
              icon='file-plus'
              A1={`Multa por `}
              A2={`${fineType}`}
              A5={`Multado por: ${userTaxer?.name} ${userTaxer?.lastName}`}
              A6={`Estado de pago: ${state}`}
              actionOnClick2='Agregar comprobante de pago'
              onClick2={() => { setShowModal(true) }}
              // A7={pdf}
              status={state}
            // onClick2={EqualUser ? openModalChangePassword : null}
            // showBackButton={EqualUser && allowedPermissions.includes('Usuarios') ? false : true}
            // onClickEdit={setShowModalEditApartment}
            />

        }



        <InfoDetails>

          <Acordions>

            <DropdownInfo
              name={`Informacion de la multa`}
            // action1={'Editar datos de la multa'}
            // onClickAction1={openModalEdit}
            >

              <ul className='list-unstyled'>
                <li>De: Administracion</li>
                <li>Para: <Link to={`/admin/apartments/details/${idApartment}`}>{`Inquilinos apartamento ${apartmentName}`}</Link> </li>
                <br />
                <li>Motivo: {fineType}</li>
                <li>{details}</li>
                <br />

                <li>Fecha de incidente: {moment(incidentDate).format('MMMM Do')}</li>
                <li>Fecha limite de pago: {moment(paymentDate).format('MMMM Do')}</li>

                <br />

                <li>Estado: {state}</li>

              </ul>

            </DropdownInfo>

          </Acordions>

          <Acordions>

            <DropdownInfo
              name={`${evidenceFiles?.length} ${evidenceFiles?.length == 1 ? 'Evidencia' : 'Evidencias'}`}
            // action1={'Agregar evidencia'}
            // onClickAction1={openEvidenceFilesModal}
            >

              {loadingFines ? <SmalSpinner /> :
                evidenceFiles && evidenceFiles.length > 0 ? (
                  evidenceFiles?.map((evidence, index) => (

                    <RowNotificactions

                      // Information
                      img={evidence}
                      toOpen={true}
                      to={evidence}
                      name={'Evidencia'}
                      lastName={index + 1}
                      msg={details}
                      icon="x-square"
                      onclick={() => openModalImg(evidence)}


                    ></RowNotificactions>

                  ))
                ) : (
                  <div className='mt-4 ml-2'>
                    <NotificationsAlert to={`/admin/fines/create/${id}`} msg={` para agregar un multa.`} />

                  </div>
                )}

            </DropdownInfo>

          </Acordions>

          <Acordions>
            <DropdownInfo
              name={'Comprobante de pago'}
              action1={'Agregar comporbante de pago'}
              onClickAction1={openProofFilesModal}
            >
              {loadingFines ? <SmalSpinner /> : paymentproof ? (
                <>
                  <RowNotificactions
                    // Information
                    img={paymentproof}
                    to={paymentproof}
                    name={'Valor pagado: '}
                    lastName={amount}
                    msg={'Comprobante de pago'}
                    icon="file-plus"
                  />
                  <div className='mt-4 ml-2'>
                    <NotificationsAlert onClick={() => setShowModal(true)} msg={`agregar un comprobante.`} />
                  </div>
                </>
              ) : null}
            </DropdownInfo>
          </Acordions>
        </InfoDetails>
      </Details >

      {showModal &&
        createPortal(
          <>
            <ModalContainer ShowModal={setShowModal}>
              <Modal
                showModal={setShowModal}
                onClick={() => { setShowModal(false), handleEditClick({ idUserLogged: idUserLogged, idfines: id, state: "Por revisar", paymentproof: paymentproofFiles }) }}
                title={"Comprobante de pago"}

              >
                {

                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <ImageContainer urls={paymentproof} />
                    <div style={{ width: "200px", height: "200px" }}>
                      <Uploader label={"Agregar archivo"}
                        onChange={(e) => {
                          setPaymentproofFiles(e.target.files[0]);
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


      {addProofFilesModal &&
        createPortal(
          <>
            <ModalContainer ShowModal={setAaddProofFilesModal}>
              <Modal
                showModal={setAaddProofFilesModal}
                onClick={() => { setShowModal(false), handleEditClick({ idfines: id, state: "Por revisar", paymentproof: paymentproofFiles }) }}
                title={"Agregar comprobante de pago"}
              // showSave={showevidences ? false : true}
              >

                <Uploader multiple label={"Agregar comprobante de pago"}
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                />
                <ImageContainer urls={[paymentproof]} name='Comprobante' />

              </Modal>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )

      }

      {modalImg &&
        createPortal(
          <>
            <ModalContainer ShowModal={setModalImg}>
              <ModalImg
                img={evidenceImg}
                showModal={setModalImg}
                onClick={() => alert('Aqui funciona algo')}
                title={"Evidencia de multa."}
              // showSave={showevidences ? false : true}
              >

                {/* <Uploader multiple label={"Agregar comprobante de pago"}
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                />
                <ImageContainer urls={[paymentproof]} name='Comprobante' /> */}

              </ModalImg>
            </ModalContainer>
          </>,
          document.getElementById("modalRender")
        )

      }
    </>
  )
}
