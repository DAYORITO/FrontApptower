import PropTypes from 'prop-types';
import './ContainerTable.css'

export const ContainerTable = ({ title = 'Nombre modulo',search2 , children, dropdown, search, buttonToGo, showPaginator }) => {


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
                    {search2}

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
                    <div className='pagination'>
                        {showPaginator}
                    </div>

                </div>

            </div>
        </div>
    );
}



ContainerTable.propTypes = {
    title: PropTypes.string.isRequired
}
