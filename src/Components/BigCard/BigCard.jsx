import { Link } from 'react-router-dom';
import './BigCard.css';
import imagen from "../../assets/2.jpeg"

export const BigCard = ({ cosa = 'cosa', to, children }) => {
    return (


        <div class="col-md-3">


            <div class="card shadow mb-4">

                <Link to={to} style={{ textDecoration: 'none' }}>

                    <div class="card-body text-center" id='card-space'>
                        <div class="avatar avatar-lg mt-2">
                            <img class="space-img" id='img' src={cosa.image} alt="Descripción de la imagen"></img>
                        </div>
                        <div class="card-text">
                            <strong class="card-title">{cosa.spaceName}</strong>
                            <p className='text-muted'>{` ${cosa.spaceType === "Wet area" ? "Zona humeda": "Area comun"}`}</p>
                        </div>
                    </div>
                </Link>
                <div class="card-footer">
                    <div class="row" id='card-footer-down'>
                        <div class="col-auto">
                            <small>
                                {cosa.status !== 'Active' && cosa.status !== 'Activo' ? (
                                    <span class="dot dot-lg bg-danger mr-1"></span>
                                ) : (
                                    <span class="dot dot-lg bg-success mr-1"></span>
                                )}
                            </small>
                            <span>{cosa.status === "Active" ? "Activo": "Inactivo"}</span>
                        </div>
                        <div class="col-auto">
                            <div class="file-action">
                                <button type="button" class="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="text-muted sr-only">Action</span>
                                </button>
                                <div class="dropdown-menu m-2">

                                    {children}

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >

    )
}
