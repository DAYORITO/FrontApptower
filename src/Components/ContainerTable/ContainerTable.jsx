import PropTypes from 'prop-types';
import './ContainerTable.css'

export const ContainerTable = ({ title = 'Nombre modulo', children, dropdown, search, buttonToGo }) => {
    return (
        <div id='formContainer' className="card shadow" >
            <div className="d-flex justify-content-between pr-4" >
                <div>
                    <strong>
                        <h3 className="ml-2 page-title">{title}</h3>
                    </strong>
                </div>
                <div className='d-flex align-items-center'>
                    {dropdown}
                    {search}
                    {buttonToGo}
                </div>
          
          {/* <p>Buenos diasBuenos diasBuenos diasBuenos diasBuenos diasBuenos dias</p> */}
          
        </div>
            
            <div className="card-body">
                <div className="toolbar">
                    <div id="tableContainer" className="row align-items-center">
                        {/* Children must be Table Components */}
                        {children}
                    </div>
                    {/* <nav aria-label="Table Paging" className="mb- text-muted my-4" >
                        <ul className="pagination justify-content-center mb-0">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item  active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav> */}
                </div>

            </div>
        </div>
    );
}



ContainerTable.propTypes = {
    title: PropTypes.string.isRequired
}
