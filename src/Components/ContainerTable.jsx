import React from 'react'; 
import PropTypes from 'prop-types';
import { ButtonGoTo,SearchButton, DropdownExcel } from "./Buttons";
import { TablePerson } from './Tables';

export const ContainerTable = ({ title = 'Nombre modulo' }) => {
    return (
        <div class="container-fluid" >
            <div class="card-body">
                <div style={{padding: "0 2% 0 2%"}} class="toolbar">
                    <form class="form">

                        <div className="row align-items-center my-4">
                            <div className="col">
                                <h2 className="h3 mb-0 page-title ml-2">{title}</h2>

                            </div>

                            <DropdownExcel></DropdownExcel>

                            <SearchButton></SearchButton>
                            <ButtonGoTo value='New owner'></ButtonGoTo>

                        </div>
                        <TablePerson></TablePerson>
                    </form>


                </div>

                <nav aria-label="Table Paging" class="mb-0 text-muted my-4">
                    <ul class="pagination justify-content-center mb-0">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item active"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}



ContainerTable.propTypes = {
    title: PropTypes.string.isRequired
}
