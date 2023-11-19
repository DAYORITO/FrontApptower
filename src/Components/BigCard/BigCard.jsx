import { Link } from 'react-router-dom';
import './BigCard.css';
import imagen from "../../assets/2.jpeg"

export const BigCard = ({cosa = 'cosa'}) => {
    return (


        <div class="col-md-3">


            <div class="card shadow mb-4">

                <Link to={'details'} style={{ textDecoration: 'none' }}>

                    <div class="card-body text-center" id='card-space'>
                        <div class="avatar avatar-lg mt-2">
                            <img class="space-img" id='img' src={imagen} alt="Descripción de la imagen"></img>
                        </div>
                        <div class="card-text">
                            <strong class="card-title">{cosa}</strong>
                            <p>{cosa}</p>
                        </div>
                    </div>
                </Link>
                <div class="card-footer">
                    <div class="row" id='card-footer-down'>
                        <div class="col-auto">
                            <small>
                                <span class="dot dot-lg bg-success bg-danger mr-1"></span>
                            </small>
                            <span>{cosa}</span>
                        </div>
                        <div class="col-auto">
                            <div class="file-action">
                                <button type="button" class="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="text-muted sr-only">Action</span>
                                </button>
                                <div class="dropdown-menu m-2">


                                    <a class="dropdown-item" asp-controller="" asp-action="" asp-route-id="@item.IdEspacio">
                                        <i class="fe fe-send fe-12 mr-4"></i>Notificar
                                    </a>

                                    <a class="dropdown-item" asp-controller="" asp-action="" asp-route-id="@item.IdEspacio">
                                        <i class="fe fe-clipboard fe-12 mr-4"></i>Generar reserva
                                    </a>

                                    <a class="dropdown-item" asp-action="Edit" asp-route-id="@item.IdEspacio">
                                        <i class="fe fe-edit fe-12 mr-4"></i>Editar
                                    </a>
                                    <button class="dropdown-item delete-user" data-toggle="modal" data-target="#deleteModal" data-user-id="@item.IdEspacio">
                                        <i class="fe fe-delete fe-12 mr-4"></i>Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >

    )
}
