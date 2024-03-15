import { Link } from 'react-router-dom';

import './Dropdowns.css';
import { useFetch } from '../../Hooks/useFetch';
import { useExcel } from '../../Hooks/useExcel';
import { MiniSpinner, Spinner } from '../Spinner/Spinner';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal, ModalContainer } from '../Modals/ModalTwo';
import { Accordion } from '../Accordion/Accordion';
import { Checkboxs } from '../Checkbox/Checkboxs';
import { postRequest } from '../../Helpers/Helpers';

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


const DropdownExcel = ({ table = 'apartments' }) => {
    const url = "http://localhost:3000/api/";

    const { downloadExcelFile, loading } = useExcel(url);

    const generateExel = () => {
        downloadExcelFile({ table });
    };

    return (
        <div className="file-action mr-2">
            <button
                type="button"
                className="btn ext-muted"
                onClick={generateExel}
            >
                {loading ? <MiniSpinner /> :
                    <img
                        className='icon-excel fe-16 ml-0'
                        src='https://icons.veryicon.com/png/o/file-type/file-type-icon-library/xlm-1.png'
                        alt="Excel"
                    />}
            </button>
        </div>
    );
};


const SearchButton = ({ value, onChange, type = 'text', id, options, placeholder = "Buscar" }) => {
    return (
        <div className="form-inline" id={id} >
            <div className="form-row" >
                <div className="form-group col-auto">
                    {/* <button type="submit" className="btn btn-secondary" style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', borderBottom: '0' }}>
                        <span className="fe fe-24 fe-search" style={{ color: 'gray' }}></span>
                    </button> */}
                    <label htmlFor="search" className="sr-only">Buscar</label>

                    {options?.length > 0 ? <SearchSelect options={options} value={value} onChange={onChange} /> :
                        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="form-control" />
                    }


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
