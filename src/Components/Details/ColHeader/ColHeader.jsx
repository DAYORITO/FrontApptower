/* eslint-disable react/prop-types */

export const ColHeader = ({ title, subtitle,}) => {
    return (
        <div className="col">
            <div className="row align-items-center">
            </div>
            <div className="row mb-4">
                <div className="col">

                    <div scope="row">

                        <h5>{title}</h5>
                        <p>{subtitle}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

