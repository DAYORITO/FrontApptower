import React from 'react';


export const LoadingPage = () => {
    return (
        <div className="wrapper-notfound">
            <div className="contents">
                <h1 className="titleLoading">Cargando...</h1>
                <div className="spinnerContainer">
                    <div className="spinnerLoader"></div>
                </div>
                <h3 className="subTitles">Por favor, espera un momento</h3>
                <h6 className='h6l'>Estamos preparando todo para ti.</h6>
            </div>
        </div>
    );
}