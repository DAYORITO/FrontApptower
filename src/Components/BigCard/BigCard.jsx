import { Link } from 'react-router-dom';
import './BigCard.css';
import imageNotImg from "../../assets/imgDontFound.png"

export const BigCard = ({ img, title, A1, A2, A3, A4, status, to, children }) => {
    return (


        <div class="col-md-3">


            <div class="card shadow mb-4">

                <Link to={to} style={{ textDecoration: 'none' }}>

                    <div class="card-body text-center" id='card-space'>
                        <div class="avatar avatar-lg mt-2">
                            <img class="space-img" id='img' src={img == "" ? imageNotImg : img} alt="Descripción de la imagen"></img>
                        </div>
                        <div class="card-text">
                            <strong class="card-title">{title}</strong>
                            {A1 != null ? <p className='text-muted'>{` ${A1}`}</p> : null}
                            {A2 != null ? <p className='text-muted'>{` ${A2}`}</p> : null}
                            {A3 != null ? <p className='text-muted'>{` ${A3}`}</p> : null}
                            {A4 != null ? <p className='text-muted'>{` ${A4}`}</p> : null}

                        </div>
                    </div>
                </Link>
                <div class="card-footer">
                    <div class="row" id='card-footer-down'>
                        <div class="col-auto">
                            <small>
                                {status !== 'Active' && status !== 'Activo' ? (
                                    <span class="dot dot-lg bg-danger mr-1"></span>
                                ) : (
                                    <span class="dot dot-lg bg-success mr-1"></span>
                                )}
                            </small>
                            <span>{status === "Active" ? "Activo" : "Inactivo"}</span>
                        </div>
                        <div class="col-auto">
                            <div class="file-action">
                                <button A1="button" class="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto"
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
