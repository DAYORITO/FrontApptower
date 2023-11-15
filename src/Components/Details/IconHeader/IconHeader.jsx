/* eslint-disable react/prop-types */
import "./IconHeader.css";
const style = {
    padding: '2% 1% 2% 1%',
    margin: '0 1% 0 0',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'

}
export const IconHeader = ({ name, children }) => {
    return (
        <>
            <div className="col-md-3 text-center" style={style} >
                <div className="circle circle-lg bg-secondary text-white mb-4 mt-4">
                    <span className={name}></span>
                    
                </div>
                {children}
            </div>
        </>     
    )
}
