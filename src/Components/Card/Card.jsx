
export const Card = ({ icon = 'fe fe-home fe-16 ', children, name = 'Name', type = 'type', residents, notions, status='Active' }) => {


    if (type === 'Salon social') {
        icon = 'fe fe-smile fe-16 ';
    }
    if (type === 'Zona humeda') {
        icon = 'fe fe-droplet fe-16';
    }

    return (


        <div class="col-md-6 col-lg-4">
            <div class="card shadow mb-4">
                <div class="card-body file-list">
                    <div class="d-flex align-items-center">
                        <div class="circle circle-md bg-light">
                            <span class={icon}></span>
                            
                        </div>
                        {status === 'Active' ? (
                                <span className="dot dot-lg bg-success mt-4"></span>
                            ) : (
                                <span className="dot dot-lg bg-danger mt-4"></span>
                            )}

                        <div class="flex-fill ml-4 fname">
                            
                            <strong>{name}</strong><br />
                            <span class="badge badge-light text-muted">{type}</span>

                            {residents && <i className="fe fe-users fe-12 ml-2 text-success"></i>}
                            {residents && <span className="badge text-success">{residents}</span>}

                            {notions && <i className="fe fe-message-square fe-12 ml-2 text-warning"></i>}
                            {notions && <span className="badge badge-light text-warning">{notions}</span>}

                        </div>
                        <div class="file-action">
                            <button type="button" class="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                            </button>
                            <div class="dropdown-menu m-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>)
}

