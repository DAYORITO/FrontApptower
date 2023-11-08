/* eslint-disable react/prop-types */
export const IconHeader = ({ name }) => {
    const divStyle = {
        width: '20%',  
        height: '40px',
}
return (
    <div className="col-md-3 text-center mb-5">
        <div className="circle bg-dark" style={divStyle}>
            <span className="fe fe-user fe-32 text-muted"></span>
        </div>
        <span className="dot dot-md bg-success mr-1"></span>
    </div>
)
}
