import React, { useState } from 'react'
import { Dropdown } from '../Dropdown/Dropdown'
import "./ContainerModule.css"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export const ContainerModule = ({

    icon = "home",
    to = '/admin/',

    A1 = "",
    A2 = "",

    A3,
    A4,
    A5,
    A6,
    A7,

    onClickEdit,
    status


}) => {

    let A1A2 = `${A1} ${A2}`.toUpperCase()
    const navigate = useNavigate()

    return (
        <div className="card shadow container-module card-header-details">
            <div className="card-body">
                <div className="row align-items-center header justify-content-between">
                    <Link to={to}>
                        <div className='info'>

                            <div className=" col-md-2 text-center" >
                                <div className="circle circle-lg bg-light ">
                                    <span className={`fe fe-${icon} fe-24 text-grey`}></span>
                                </div>
                            </div>

                            <div className="col ml-4">
                                <strong className="">{A1A2}</strong><span className={`dot dot-lg bg-${(status == "Active") ? "success" : "danger"} ml-2`}></span>

                                {
                                    A4 ? <><br /><span className="badge badge-light text-secondary">{A4}</span></> : null
                                }
                                {
                                    A5 ? <><br /><span className="badge badge-white text-secondary">{A5}</span></> : null
                                }
                                {
                                    A6 ? <><br /><span className="badge badge-white text-secondary">{A6}</span></> : null
                                }
                                {
                                    A3 ? <><br /><span className="badge badge-white text-secondary">{A3}</span></> : null
                                }

                            </div>
                        </div>
                    </Link>


                    <div className="file-action text-right m-4">


                        <button onClick={onClickEdit} className={`btn btn-light mr-2`}>Editar</button>
                        {A7 ?
                            <>
                                <a href={A7}><button className={`btn btn-light mr-2`}> <i className='fe fe-printer mr-2'></i>Descargar documento</button></a>
                                {/* <button onClick={onClickEdit} className={`btn btn-light mr-2`}>Editar</button> */}
                            </>
                            : null}
                        <button onClick={() => navigate(-1)} className={`btn btn-light`}>Regresar</button>

                    </div>
                </div>
            </div>
        </div>
    );

}
