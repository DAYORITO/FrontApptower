/* eslint-disable react/prop-types */
import "./IconHeader.css";
const style = {
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.09)',
    borderRadius: '10px',
    margin: '0% 0% 0% 2%',
    padding: '3% 0% 0% 0%',
    alignItems: 'center',
    justifyContent: 'center'

}
export const IconHeader = ({  children }) => {
    return (
        <>
            <div className="col-md-3 text-center  mt-3" style={style} >
                <div className="avatar avatar-xl mb-1">
                    <img src="./assets/avatars/face-1.jpg" alt="..." className="avatar-img rounded-circle"/>
                </div>
                {children}
            </div>
        </>
    )
}
