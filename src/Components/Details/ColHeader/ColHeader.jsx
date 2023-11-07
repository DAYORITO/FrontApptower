/* eslint-disable react/prop-types */

export const ColHeader = ({ children,name }) => {
    return (
        <div className="col">
            <div className="row align-items-center">
                <strong>{name}</strong>
            </div>
            <div className="row mb-4">
                <div className="col">
                {children}    
                </div>
            </div>
        </div>
    )
}

