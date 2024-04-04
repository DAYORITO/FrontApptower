import React, { useContext, useEffect, useState } from "react";
import { Details } from "../../../Components/Details/details";
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails";
import { Spinner } from "../../../Components/Spinner/Spinner";
import {
  useAllowedPermissions,
  useFetch,
  useFetchForFile,
  useFetchUserInformation,
} from "../../../Hooks/useFetch";
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule";
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo";
import { Acordions } from "../../../Components/Acordions/Acordions";
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { createPortal } from "react-dom";
import { postRequest, useUserLogged } from "../../../Helpers/Helpers";
const token = Cookies.get("token");
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { SocketContext } from "../../../Context/SocketContext";
import { dotSpinner } from "ldrs";

// import React, { useEffect, useState } from 'react';
// import { Details } from "../../../Components/Details/details"
// import { InfoDetails } from '../../../Components/InfoDetails/InfoDetails';
// import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ModalContainerload, Modaload } from "../../../Components/Modals/Modal";
// import { createPortal } from 'react-dom';
// import Swal from 'sweetalert2';
// import { useFetch, useFetchForFile, useFetchget } from '../../../Hooks/useFetch';
// import "./GuestIncomeDetails.css";
// import { set } from 'date-fns';

const GuestIncomeDetails = () => {
  const token = Cookies.get("token");
  // API URL

  const url = import.meta.env.VITE_API_URL;

  // guest income informacion

  const { id } = useParams();
  dotSpinner.register();

  const { idUserLogged } = useUserLogged();

  // Socket

  const { socket } = useContext(SocketContext);

  const [idGuest_income, setIdGuest_income] = useState(id);

  // info guestincome relations

  const { data: guestIncome, get: getGuestIncome, loading: loadingGuestIncome, } = useFetch(url);

  useEffect(() => {
    try {
      getGuestIncome(`guestIncome/${idGuest_income}`);
      console.log("Datos de ingreso:", guestIncome);
    } catch (error) {
      console.error("Error al obtener datos de ingreso", error);
    }
  }, []);

  // Guest income details

  const [startingDate, setStartingDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [personAllowsAccess, setPersonAllowsAccess] = useState("");
  const [observations, setObservations] = useState("");
  const [asociatedVisitor, setAsociatedVisitor] = useState("");
  const [asociatedApartment, setAsociatedApartment] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [showModaload, setShowModaload] = useState(false);

  const [guestIncomeParking, setGuestIncomeParking] = useState("");

  useEffect(() => {

    console.log(guestIncome, 'guestIncome')


    setStartingDate(guestIncome?.data?.guestIncome?.startingDate);
    setDepartureDate(guestIncome?.data?.guestIncome?.departureDate);
    setPersonAllowsAccess(guestIncome?.data?.guestIncome?.personAllowsAccess);
    setObservations(guestIncome?.data?.guestIncome?.observations);
    setAsociatedVisitor(guestIncome?.data?.guestIncome?.asociatedVisitor);
    setAsociatedApartment(guestIncome?.data?.guestIncome?.asociatedApartment);
    setCreatedAt(guestIncome?.data?.guestIncome?.createdAt);
    setUpdatedAt(guestIncome?.data?.guestIncome?.updatedAt);

    setGuestIncomeParking(guestIncome?.data?.guestIncome);
  }, [guestIncome?.data?.guestIncome]);



  // add proof modal

  // const [addProofFilesModal, setAaddProofFilesModal] = useState(false);

  // const openProofFilesModal = () => {

  //     setAaddProofFilesModal(true)

  // }

  const dateFormater = (date) => {
    let formatedDate = new Date(date).toLocaleDateString("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formatedDate;
  };

  const handleEditClick = async (dataToUpdate) => {
    setShowModaload(true);

    try {

      const guestIncomeUpdateUrl = `${import.meta.env.VITE_API_URL}guestIncome`;

      const guestIncomeResponse = await useFetchForFile(
        guestIncomeUpdateUrl,
        dataToUpdate,
        "PUT"
      );

      console.log("Respuesta ingreso:", guestIncomeResponse);

      if (guestIncomeResponse.error !== null && guestIncomeResponse.error !== undefined) {
        console.log("Error ingreso:", guestIncomeResponse.error);
        throw new Error(`Error al actualizar los datos del ingreso del huésped: ${guestIncomeResponse.statusText}`);
      }

      Swal.fire({
        icon: "success",
        title: "Salida registrada con éxito.",
        showConfirmButton: false,
        timer: 1500,
      });
      setDepartureDate(dataToUpdate?.departureDate);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al registrar la salida.",
        text: error,
      });
    } finally {
      setShowModaload(false);
    }
  };

  console.log(asociatedVisitor);
  console.log("Datos del ingreso:", guestIncome)
  console.log("Datos del parqueadero:", guestIncomeParking)
  return (
    <>
      <Details>
        {loadingGuestIncome ? (
          <Spinner />
        ) : (
          <ContainerModule
            to={"/admin/guest_income/"}
            icon="arrow-up-right"
            A1={`Ingreso de `}
            A2={`${asociatedVisitor?.name} ${asociatedVisitor?.lastname}`}
            A5={`Se dirige a: ${asociatedApartment?.apartmentName != null ? "apartmaento " + asociatedApartment?.apartmentName : "Sercivio del conjunto"}`}
            A6={`Autoriza: ${personAllowsAccess}`}
            status={"Active"}
            actionOnClick2={!departureDate ? "Registrar salida" : null}
            onClick2={
              !departureDate
                ? () => {
                  handleEditClick({
                    idGuest_income: idGuest_income,
                    departureDate: new Date(),
                  });
                }
                : null
            }
          // // A7={pdf}
          // status={state}
          // onClick2={EqualUser ? openModalChangePassword : null}
          // showBackButton={EqualUser && allowedPermissions.includes('Usuarios') ? false : true}
          // onClickEdit={setShowModalEditApartment}
          />
        )}

        <InfoDetails>
          <Acordions>
            <DropdownInfo
              name={`Informacion del ingreso`}
            // action1={'Editar datos de la multa'}
            // onClickAction1={openModalEdit}
            >
              <ul className="list-unstyled">
                <li>
                  Ingreso de: {asociatedVisitor?.name}{" "}
                  {asociatedVisitor?.lastname}
                </li>
                <li>
                  Se dirige a:{" "}
                  {
                    asociatedApartment?.apartmentName != null
                      ? (
                        <Link to={`/admin/apartments/details/${asociatedApartment?.idApartment}`}>
                          {`apartamento ${asociatedApartment?.apartmentName}`}
                        </Link>
                      )
                      : "Servicio del conjunto"
                  }
                </li>
                <br />
                <li>Autoriza: {personAllowsAccess} </li>
                <li>
                  {observations} el dia {dateFormater(startingDate)}
                </li>
                <br />
                <li>
                  Fecha y hora de salida:{" "}
                  {departureDate
                    ? dateFormater(departureDate)
                    : "No registrada"}{" "}
                </li>
              </ul>
            </DropdownInfo>
          </Acordions>

          {guestIncomeParking?.asociatedParkingSpace ? (
            <Acordions>
              <DropdownInfo
                name={`Parqueadero asignado`}
              // action1={'Agregar evidencia'}
              // onClickAction1={openEvidenceFilesModal}
              >
                <RowNotificactions
                  // Information
                  name={"Parqueadero publico"}
                  lastName={
                    guestIncomeParking?.asociatedParkingSpace?.parkingName
                  }
                  msg={observations}
                  to={`/admin/parkingSpaces/${guestIncomeParking?.asociatedParkingSpace?.parkingName}`}
                  icon="map-pin"
                ></RowNotificactions>
              </DropdownInfo>
            </Acordions>
          ) : null}
        </InfoDetails>
      </Details>
      {showModaload &&
        createPortal(
          <>
            <ModalContainerload ShowModal={setShowModaload}>
              <Modaload showModal={setShowModaload}>
                <div className="d-flex justify-content-center">
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

      {/* {addProofFilesModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setAaddProofFilesModal}>
                            <Modal
                                showModal={setAaddProofFilesModal}
                                onClick={() => console.log('Hola')}
                                title={"Agregar comprobante de pago"}
                            // showSave={showevidences ? false : true}
                            >

                                <Uploader multiple label={"Agregar comprobante de pago"}
                                    onChange={(e) => {
                                        setFile(e.target.files);
                                    }}
                                />
                                <ImageContainer urls={paymentproof} />






                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )

            } */}
    </>
  );
  //     const { details } = useParams();
  //     const objeto2 = JSON.parse(decodeURIComponent(details));
  //     // console.log(objeto, 'objeto');
  //     const [objeto, setObjeto] = useState(objeto2);

  //     const navigate = useNavigate();
  //     const [guestIncomeParkingData, setGuestIncomeParkingData] = useState({guestIncomeParking:[]});
  //     const {data} = useFetchget("guestIncomeParking");

  //     useEffect(() => {
  //         setGuestIncomeParkingData(data.guestincomeparking);
  //         console.log("Datos de ingresos de parqueadero:", guestIncomeParkingData);
  //     }, [data]);

  //     const handleEditClick = async (dataToUpdate) => {
  //         setShowModaload(true);

  //         const verify = guestIncomeParkingData?.find((guestIncomeParking) => guestIncomeParking.idGuest_income === dataToUpdate.idGuest_income);
  //         console.log("Respuesta verify:", verify);
  //         if (verify !== null && verify !== undefined) {
  //             const parkingUpdateData = { "idParkingSpace": verify.idParkingSpace, "status": 'Active' };
  //             const parkingUpdateUrl = 'https://apptowerbackend.onrender.com/api/parkingSpaces';

  //             try {
  //                 const parkingResponse = await useFetchForFile(parkingUpdateUrl, parkingUpdateData, 'PUT');
  //                 console.log(parkingResponse);
  //             } catch (error) {
  //                 console.error('Error al actualizar el estado del espacio de estacionamiento:', error);

  //             }
  //         }

  //         const guestIncomeUpdateUrl = 'https://apptowerbackend.onrender.com/api/guestIncome';
  //         try {
  //             const guestIncomeResponse = await useFetchForFile(guestIncomeUpdateUrl, dataToUpdate, 'PUT');
  //             setShowModaload(false);
  //             Swal.fire({
  //                 icon: 'success',
  //                 title: 'Salida registrada con éxito.',
  //                 showConfirmButton: false,
  //                 timer: 1500
  //             });
  //             const updatedGuestIncome = objeto.departureDate = dataToUpdate.departureDate;
  //             setGuestIncomeData(updatedGuestIncome);
  //         } catch (error) {
  //             setShowModaload(false);
  //             console.error('Error al actualizar los datos del ingreso del huésped:', error);
  //         }
  //     }

  //   return (
  //     <>
  //       <Details>

  //         <InfoDetails>

  //                     <div className='' style={{width: '100%', paddingTop:"2rem"}}>
  //                         <div className='header'>
  //                             <h3>Detalles del ingreso</h3>
  //                             <button type="button" onClick={() => { navigate(-1); if (regresar) regresar(); }} class="btn btn-light">Regresar</button>
  //                         </div>
  //                         <div className="mt-5">
  //                         <p><strong className='text-secondary'>Apartamento:</strong> {objeto.asociatedApartment.apartmentName}</p>
  //                         <p><strong className='text-secondary'>Visitante: </strong>{objeto.asociatedVisitor.name+" "+objeto.asociatedVisitor.lastname}</p>
  //                         <p><strong className='text-secondary'>Fecha de ingreso: </strong>{}</p>
  //                         <div className='header'>
  //                         <p><strong className='text-secondary'>Fecha de salida: </strong>{objeto.departureDate == null ? "Sin registrar" : (() => {
  //                                     let departureDate = new Date(objeto.departureDate ).toLocaleDateString('es-CO', {
  //                                         weekday: 'long',
  //                                         day: 'numeric',
  //                                         month: 'short',
  //                                         year: 'numeric',
  //                                         hour: 'numeric',
  //                                         minute: 'numeric',
  //                                     });
  //                                     return departureDate;
  //                                 })()}</p>

  //                         </div>
  //                         <p><strong className='text-secondary'>Persona que permitió el acceso: </strong>{objeto.personAllowsAccess}</p>
  //                         <p><strong className='text-secondary'>Observaciones: </strong>{objeto.observations}</p>
  //                         </div>
  //                         {objeto.departureDate == null ? <button
  //                         onClick={()=>handleEditClick({ idGuest_income: objeto.idGuest_income, departureDate: new Date().toISOString() })}
  //                         className='btn btn-dark' >Registrar salida</button>: null}

  //                         </div>

  //         </InfoDetails>
  //       </Details>

  //     </>
  //   );
};

export default GuestIncomeDetails;
