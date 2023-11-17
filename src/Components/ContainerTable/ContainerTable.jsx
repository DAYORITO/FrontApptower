import PropTypes from 'prop-types';
import './ContainerTable.css'

export const ContainerTable = ({ title = 'Nombre modulo', children }) => {
    return (
        <div id='formContainer' className="card shadow" >
            <div className="card-body">
                <div className="toolbar">
                    <div id="tableContainer" className="row align-items-center">
                        <div className="col">
                            <h4 className="ml-4 page-title">{title}</h4>

                        </div>

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
