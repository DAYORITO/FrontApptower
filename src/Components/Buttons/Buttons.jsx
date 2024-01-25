import { Link } from 'react-router-dom';


const ButtonGoTo = ({ value = 'New module', href, modalButton, onClick }) => {
    return (
        <div className="col-auto">
            <Link to={href} onClick={onClick} className="btn btn-primary">
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

                <Link to="#"><i className="fe fe-download-cloud fe-12 mr-4"></i>Download excel</Link>
            </div>
        </div>

    )
}


const SearchButton = ({ value, onChange, type = 'text', id, placeholder = "Buscar" }) => {
    return (
        <div className="form-inline" id={id} >
            <div className="form-row" >
                <div className="form-group col-auto">
                    {/* <button type="submit" className="btn btn-secondary" style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', borderBottom: '0' }}>
                        <span className="fe fe-24 fe-search" style={{ color: 'gray' }}></span>
                    </button> */}
                    <label htmlFor="search" className="sr-only">Buscar</label>
                    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="form-control" />

                </div>
            </div>
        </div>
    )
}

const DateButton = ({ value, onChange, id }) => {
    return (
        <div className="form-inline d-flex justify-content-start" id={id} >
            <div className="form-col">
                <div className="form-group col-auto">
                    <input type="date" value={value} onChange={onChange} placeholder='Buscar' className="form-control" />
                </div>
            </div>
        </div>
    )
}


const SearchSelect = ({ options, value, onChange }) => {

    return (
        <select value={value} onChange={onChange} class="form-select mr-2 form-control" aria-label="Disabled select example">


            {options?.map((option) => (

                // console.log(option.label)
                <option key={option.value} value={option.value} onClick={() => console.log(option.label)}
                >{option.label} </option>
                
            ))}

        </select>)
}

export { ButtonGoTo, DropdownExcel, SearchButton, DateButton, SearchSelect };
