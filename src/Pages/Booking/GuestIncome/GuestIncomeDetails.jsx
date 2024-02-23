import React, { useEffect, useState } from 'react';
import { Details } from "../../../Components/Details/details"
import { InfoDetails } from '../../../Components/InfoDetails/InfoDetails';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ModalContainerload, Modaload } from '../../../Components/Modals/Modal';
import { createPortal } from 'react-dom';
import Swal from 'sweetalert2';
import { useFetch, useFetchForFile, useFetchget } from '../../../Hooks/useFetch';
import "./GuestIncomeDetails.css";
import { set } from 'date-fns';



const GuestIncomeDetails = () => {
    const { details } = useParams();
    const objeto2 = JSON.parse(decodeURIComponent(details));
    // console.log(objeto, 'objeto');
    const [objeto, setObjeto] = useState(objeto2);
    const [showModaload, setShowModaload] = useState(false);
    const navigate = useNavigate();
    const [guestIncomeParkingData, setGuestIncomeParkingData] = useState({guestIncomeParking:[]});
    const {data} = useFetchget("guestIncomeParking");
    
    useEffect(() => {
        setGuestIncomeParkingData(data.guestincomeparking);
        console.log("Datos de ingresos de parqueadero:", guestIncomeParkingData);
    }, [data]);

    const handleEditClick = async (dataToUpdate) => {
        setShowModaload(true);

        const verify = guestIncomeParkingData?.find((guestIncomeParking) => guestIncomeParking.idGuest_income === dataToUpdate.idGuest_income);
        console.log("Respuesta verify:", verify);
        if (verify !== null && verify !== undefined) {
            const parkingUpdateData = { "idParkingSpace": verify.idParkingSpace, "status": 'Active' };
            const parkingUpdateUrl = 'https://apptowerbackend.onrender.com/api/parkingSpaces';

            try {
                const parkingResponse = await useFetchForFile(parkingUpdateUrl, parkingUpdateData, 'PUT');
                console.log(parkingResponse);
            } catch (error) {
                console.error('Error al actualizar el estado del espacio de estacionamiento:', error);
                
            }
        }

        const guestIncomeUpdateUrl = 'https://apptowerbackend.onrender.com/api/guestIncome';
        try {
            const guestIncomeResponse = await useFetchForFile(guestIncomeUpdateUrl, dataToUpdate, 'PUT');
            setShowModaload(false);
            Swal.fire({
                icon: 'success',
                title: 'Salida registrada con éxito.',
                showConfirmButton: false,
                timer: 1500
            });
            const updatedGuestIncome = objeto.departureDate = dataToUpdate.departureDate;
            setGuestIncomeData(updatedGuestIncome);
        } catch (error) {
            setShowModaload(false);
            console.error('Error al actualizar los datos del ingreso del huésped:', error);
        }
    }

  return (
    <>
      <Details>

        <InfoDetails>
            
                    <div className='' style={{width: '100%', paddingTop:"2rem"}}>
                        <div className='header'>
                            <h3>Detalles del ingreso</h3>
                            <button type="button" onClick={() => { navigate(-1); if (regresar) regresar(); }} class="btn btn-light">Regresar</button>
                        </div>
                        <div className="mt-5">
                        <p><strong className='text-secondary'>Apartamento:</strong> {objeto.asociatedApartment.apartmentName}</p>
                        <p><strong className='text-secondary'>Visitante: </strong>{objeto.asociatedVisitor.name+" "+objeto.asociatedVisitor.lastname}</p>
                        <p><strong className='text-secondary'>Fecha de ingreso: </strong>{(() => {
                                    let startingDate = new Date(objeto.startingDate).toLocaleDateString('es-CO', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',

                                        
                                    });
                                    return startingDate;
                                })()}</p>
                        <div className='header'>
                        <p><strong className='text-secondary'>Fecha de salida: </strong>{objeto.departureDate == null ? "Sin registrar" : (() => {
                                    let departureDate = new Date(objeto.departureDate ).toLocaleDateString('es-CO', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    });
                                    return departureDate;
                                })()}</p>
                        
                        </div>
                        <p><strong className='text-secondary'>Persona que permitió el acceso: </strong>{objeto.personAllowsAccess}</p>
                        <p><strong className='text-secondary'>Observaciones: </strong>{objeto.observations}</p>
                        </div>
                        {objeto.departureDate == null ? <button 
                        onClick={()=>handleEditClick({ idGuest_income: objeto.idGuest_income, departureDate: new Date().toISOString() })} 
                        className='btn btn-dark' >Registrar salida</button>: null}
                        
                        </div>
                       
        </InfoDetails>
      </Details>
      {showModaload &&
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
  );
};

export default GuestIncomeDetails;