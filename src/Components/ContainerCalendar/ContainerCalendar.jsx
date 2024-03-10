import React from 'react'
import './ContainerCalendar.css'
import { useNavigate } from 'react-router'

export const ContainerCalendar = ({ children }) => {
    const navigate = useNavigate();
    return (
        <div id='formContainer' className="card shadow containercal"   >
            <div className='row details'>
                <button className="btn btn-light botonregresso " style={{ marginRight: '50px', width: '110px', }} onClick={() => navigate(-1)} >Regresar</button>
                {children}

            </div>
        </div>
    )
}
