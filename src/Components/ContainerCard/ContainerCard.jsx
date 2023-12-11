import React from 'react'

export const ContainerCard = ({ children }) => {
    return (
        <div class="row">
            {children}
        </div>
    )
}



// export const Card = ({ children }) => {
//     return (
//         <div className="col-md-3">
//             <div className="card shadow mb-4">
//                     <div className="card-body text-center">
//                         <div className="avatar avatar-lg mt-4">
//                             {/* Ícono basado en el tipo de espacio */}
//                             <i className={`fe fe-home' fe-24`}></i>
//                         </div>
//                         <div className="card-text my-2">
//                             <strong className="card-title my-0">@item.NombreEspacio</strong>
//                             <p className="text-muted">@item.TipoEspacio</p>
//                             <p className="mb-0"> area </p>
//                         </div>
//                     </div>
//                 </a>
//                 <div className="card-footer">
//                     <div className="row align-items-center justify-content-between">
//                         <div className="col-auto">
//                             <small>
//                                 <span className={`dot dot-lg bg-success mr-1`}></span>
//                             </small>
//                         </div>
//                         <div className="col-auto">
//                             <div className="file-action">
//                                 <button type="button" className="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto"
//                                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                     <span className="text-muted sr-only">Action</span>
//                                 </button>
//                                 <div className="dropdown-menu m-2">
//                                     {children}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


