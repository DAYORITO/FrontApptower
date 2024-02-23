import React from 'react';

export const Paginator = ({ totalPages, currentPage, setCurrentPage, nextPage, previousPage }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav aria-label="Table Paging" className="mb- text-muted my-4">
            <ul className="pagination justify-content-center mb-0">
                <li className="page-item">
                    <a className="page-link" 
                    href="#" onClick={(event) => { event.preventDefault(); previousPage(); }}>Anterior</a>
                </li>
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber - 1 ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); setCurrentPage(pageNumber - 1); }}>{pageNumber}</a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" href="#" onClick={(event) => { event.preventDefault(); nextPage(); }}>Siguiente</a>
                </li>
            </ul>
        </nav>
    );
};
