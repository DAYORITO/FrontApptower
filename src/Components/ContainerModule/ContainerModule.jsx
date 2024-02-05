import React, { useState } from 'react'
import { Dropdown } from '../Dropdown/Dropdown'
import "./ContainerModule.css"
import { useNavigate } from 'react-router'

export const ContainerModule = ({

    icon = "home",
    A1 = "",
    A2 = "",

    A3,
    A4,

    onClickEdit,
    status


}) => {

    let A1A2 = `${A1} ${A2}`
    const navigate = useNavigate()

    return (
        <div className="card shadow container-module card-header-details">
            <div className="card-body">
                <div className="row align-items-center header justify-content-between">
                    <div className='info'>
                        <div className=" col-md-2 text-center" >
                            <div className="circle circle-lg bg-white">
                                <span className={`fe fe-${icon} fe-24 text-grey mb-4`}></span>
                            </div>
                        </div>
                        <div className="col ml-4">
                            <strong className="mb-1">{A1 + A2}</strong><span className={`dot dot-lg bg-${(status === "Active") ? "success" : "danger"} ml-2`}></span>
                            <br /><span className="badge badge-light text-secondary">{A3}</span>
                            <span className="badge badge-light text-secondary">{A4}</span>
                        </div>
                    </div>

                    <div className="file-action text-right">
                        <button onClick={onClickEdit} className={`btn btn-primary mr-2`}>Editar</button>
                        <button onClick={() => navigate(-1)} className={`btn btn-secondary`}>Regresar</button>
                    </div>
                </div>
            </div>
        </div>
    );

}
