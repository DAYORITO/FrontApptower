import React, { useState } from 'react'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import './WatchmanShifs.css'
import { TablePerson } from '../../../Components/Tables/Tables'
import { useFetchpost } from '../../../Hooks/useFetch'



export const WatchmanShifts = () => {
    const [shiftStart, setShiftStart] = useState(null);
    const [shiftEnd, setShiftEnd] = useState(null);
    const [displayedStart, setDisplayedStart] = useState('No definido');
    const [displayedEnd, setDisplayedEnd] = useState('No definido');
    const [startDisabled, setStartDisabled] = useState(false);
    const [endDisabled, setEndDisabled] = useState(true);
    const [turnState, setTurnState] = useState('Fuera de turno');


    const starShift = async () => {
        const url = 'https://apptowerbackend.onrender.com/api/guardshifts';
        const start = new Date().toISOString();
        const data = {
            "idwatchman": 1,
            "start": start,
            "end": null,
        };


        setShiftStart(start);
        setDisplayedStart(new Date(data.start).toLocaleTimeString());
        setStartDisabled(true);
        setEndDisabled(false);
        setTurnState('Dentro de turno');

        console.log('Data:', data);
    }

    const endShift = async () => {
        if (shiftStart) {
            const url = 'https://apptowerbackend.onrender.com/api/guardshifts';
            const end = new Date().toISOString();
            const data = {
                "idwatchman": 1,
                "start": shiftStart,
                "end": end,
            };
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

    return (
        <>
            <ContainerTable title='Registro de Turnos'>
                <TablePerson>
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
                                    <span>Inicio de turno:</span>
                                    <span>{displayedStart}</span>
                                </div>
                                <div className="turn-detail">
                                    <span>Fin de turno:</span>
                                    <span>{displayedEnd}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </TablePerson>


            </ContainerTable>



        </>


    )
}
