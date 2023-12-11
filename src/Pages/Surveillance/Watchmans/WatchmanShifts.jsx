import React, { useState } from 'react'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import './WatchmanShifs.css'
import { TablePerson } from '../../../Components/Tables/Tables'
import { useFetchpost, useFetchget } from '../../../Hooks/useFetch'
import FormContainer from '../../../Components/Forms/FormContainer'
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import moment from 'moment-timezone';
import Swal from 'sweetalert2'



export const WatchmanShifts = () => {
    const [shiftStart, setShiftStart] = useState(null);
    const [shiftEnd, setShiftEnd] = useState(null);
    const [displayedStart, setDisplayedStart] = useState('No definido');
    const [displayedEnd, setDisplayedEnd] = useState('No definido');
    const [startDisabled, setStartDisabled] = useState(false);
    const [endDisabled, setEndDisabled] = useState(true);
    const [turnState, setTurnState] = useState('Fuera de turno');
    const [watchmanId, setWatchmanId] = useState(null);
    console.log(watchmanId, 'watchmanId')


    const [userData, setUserData] = useState({});
    console.log(userData, 'userData')
    const token = Cookies.get('token');
    const [userRole, setUserRole] = useState('');
    console.log(userRole, 'userRole')






    const starShift = async () => {
        const url = 'guardshifts';
        const start = moment().tz('America/Bogota').format();
        const data = {
            "idwatchman": watchmanId,
            "start": start,
            "end": null,
        };
        Swal.fire({
            title: 'Turno iniciado',
            text: 'El turno ha sido iniciado',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,

        })

        setShiftStart(start);
        setDisplayedStart(new Date(data.start).toLocaleTimeString());
        setStartDisabled(true);
        setEndDisabled(false);
        setTurnState('Dentro de turno');

        console.log('Data:', data);
    }

    const endShift = async () => {
        if (shiftStart) {
            const url = 'guardshifts';
            const end = moment().tz('America/Bogota').format();
            const data = {
                "idwatchman": watchmanId,
                "start": shiftStart,
                "end": end,
            };
            Swal.fire({
                title: 'Turno finalizado',
                text: 'El turno ha sido finalizado',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,

            })


            setShiftEnd(end);
            setDisplayedEnd(new Date(data.end).toLocaleTimeString());
            setEndDisabled(true);
            setTurnState('Fuera de turno');

            console.log('Data:', data);


            useFetchpost(url, data)
                .then(({ response, error }) => {
                    if (response) {
                        console.log('Response:', response);
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        } else {
            console.log('No se puede registrar el turno, falta información.');
        }
    }

    useEffect(() => {
        if (token) {

            fetchUserInformation(token);
        }
    }, [token]);

    const fetchUserInformation = async (token) => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/informationUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }

            const data = await response.json();
            setUserData(data);

        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };



    useEffect(() => {
        if (userData?.user && userData.user?.document) {
            fetch(`http://localhost:3000/api/watchman/document/${userData.user.document}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.watchman) {
                        const watchmanId = data.watchman.idwatchman;
                        console.log('Watchman id holaaa:', watchmanId);
                        setWatchmanId(data.watchman.idwatchman);

                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }, [userData]);


    return (
        <>
            <FormContainer name='Registro de Turnos'>
                <TablePerson >
                    <div class='container-icon'>
                        <div class="circle circle-large bg-light circlecon">
                            <span class='fe fe-shield text-muted custom-icon'></span>
                        </div>
                        <div class='info-v'>
                            <h2>Vigilante</h2>
                            <p>Alfonso Gonzalez</p>
                        </div>
                        <div class='observation'>
                            <h4>Estado: {turnState}</h4>
                        </div>
                    </div>
                    <div className="buttons-shift " >
                        <button className={`btn btn-outline-secondary m-2 mb-3 ${startDisabled ? 'disabled-btn' : ''}`} onClick={starShift} disabled={startDisabled}>Inicio de Turno</button>
                        <button className={`btn btn-outline-secondary m-2 mb-3 ${endDisabled ? 'disabled-btn' : ''}`} onClick={endShift} disabled={endDisabled}>Fin de Turno</button>
                    </div>

                    <div className="container-historial">
                        <div className="container-historial-title">
                            <h4>Historial de Turnos</h4>
                        </div>
                        <div className="container-shift">
                            <div className="turn-details">
                                <div className="turn-detail">
                                    <span className='hola'>Inicio de turno:</span>
                                    <span className='hola'>{displayedStart}</span>
                                </div>
                                <div className="turn-detail">
                                    <span className='hola'>Fin de turno:</span>
                                    <span className='hola'>{displayedEnd}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </TablePerson>
            </FormContainer>


        </>


    )
}
