import "./IconHeader.css";

export const IconHeader = ({ name = "fe fe-24 fe-user" }) => {


return (
    <div className="col-md-3 text-center mb-5" >
        <div className="circle bg-muted ml-5" id='circle' >
            <span className={name}></span>
        </div>
        <span className="dot dot-lg bg-success ml-2 "></span>
    </div>
)
}
