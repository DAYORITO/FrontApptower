import "./InfoDetails.css"

export const InfoDetails = ({ children }) => {
    return (

        <div className='col-md-5 details-info'>
            <div class="row container">

                {children}
                
            </div>
        </div>
    )
}
