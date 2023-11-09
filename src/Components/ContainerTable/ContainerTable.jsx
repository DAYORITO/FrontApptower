import React from 'react';
import PropTypes from 'prop-types';
import './ContainerTable.css'

export const ContainerTable = ({ title = 'Nombre modulo', children }) => {
    return (
        <div className="container-fluid" >
            <div className="card-body">
                <div className="toolbar">
                    <div id="align-items-center" className="row align-items-center my-4">
                        <div className="col">
                            <h2 className="h3 mb-0 page-title ml-2">{title}</h2>

                        </div>

                        {/* Children must be Table Components */}
                        {children}

                    </div>
                </div>
                <nav aria-label="Table Paging" className="mb- text-muted my-4">
                    <ul className="pagination justify-content-center mb-0">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item  active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}



ContainerTable.propTypes = {
    title: PropTypes.string.isRequired
}
