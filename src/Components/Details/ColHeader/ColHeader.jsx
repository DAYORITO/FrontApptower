/* eslint-disable react/prop-types */

export const ColHeader = ({ title, children }) => {
    return (
        <div className="col">
            <div className="row align-items-center">
                <h4 className="mb-1">{title}</h4>
            </div>
            <div className="row mb-4">

                {children}

            </div>
        </div>
    )
}

