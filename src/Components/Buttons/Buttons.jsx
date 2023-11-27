import { Link } from 'react-router-dom';


const ButtonGoTo = ({ value = 'New module', href, modalButton }) => {
    return (
        <div className="col-auto">
            <Link to={href} className="btn btn-primary">
                <span>{value}</span>
            </Link>
            <div>{modalButton}</div>
        </div>
    );
};

const DropdownExcel = () => {
    return (
        <div className="file-action mr-4">
            <button type="button" className="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="text-muted sr-only">Action</span>
            </button>
            <div className="dropdown-menu m-2">
                <a className="dropdown-item" href="#"><i className="fe fe-download-cloud fe-12 mr-4"></i>Download excel</a>
            </div>
        </div>

    )
}


const SearchButton = () => {
    return (
        <form className="form-inline" action="/Usuarios/Index" method="get">
            <div className="form-row">
                <div className="form-group col-auto">
                    {/* <button type="submit" className="btn btn-secondary" style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', borderBottom: '0' }}>
                        <span className="fe fe-24 fe-search" style={{ color: 'gray' }}></span>
                    </button> */}
                    <label htmlFor="search" className="sr-only">Buscar</label>
                    <input type="text" className="form-control" name="buscar" value="" placeholder="Buscar" />

                </div>
            </div>
        </form>
    )
}

export { ButtonGoTo, DropdownExcel, SearchButton };
