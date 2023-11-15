/* eslint-disable react/prop-types */

export const ColHeader = ({ title, children }) => {
    return (
        <div className="col">
            <div className="row align-items-center mt-5">
                <h4 className="mb-1">{title}</h4>
            </div>
            <div className="row">

                {children}

            </div>
        </div>
    )
}

