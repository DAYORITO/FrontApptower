/* eslint-disable react/prop-types */

export const ColHeader = ({ children }) => {
    return (
            <div className="row mt-5 align-items-start">
                {children}

                <div className="d-flex flex-column align-items-center" >
                    <button className="btn btn-primary my-2">Regresar</button>

                    <button className="btn btn-primary my-2">Editar </button>
                </div>
            </div>
    )
}
