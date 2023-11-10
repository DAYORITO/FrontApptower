import './BigCard.css';

export const BigCard = () => {
    return (

        <div class="col-md-3">
            <div class="card shadow mb-4">

                <a href=''>

                    <div class="card-body text-center">
                        <div class="avatar avatar-lg mt-4">
                            <i class="fe item.TipoEspacio fe-home fe-24"></i>
                        </div>
                        <div class="card-text my-2">
                            <strong class="card-title my-0">Nombre espacio</strong>
                            <p class="text-muted">Descripcion</p>
                            <p class="text-muted">Descripcion</p>
                            <p class="text-muted">Descripcion</p>
                            <p class="text-muted">Descripcion</p>

                        </div>
                    </div>
                </a>

                <div class="card-footer">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-auto">
                            <small>
                                <span class="dot dot-lg bg-success bg-danger mr-1"></span>
                            </small>
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
