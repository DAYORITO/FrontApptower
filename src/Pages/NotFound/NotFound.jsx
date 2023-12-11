import React from 'react';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="wrapper-notfound">
            <div className="contents">
                <h1 className="titlen">404</h1>
                <h1 className="subTitles">¡UPS!</h1>
                <h6>No se pudo encontrar la página.</h6>
                <a href="/" className="linkl">
                    Volver al inicio
                </a>
            </div>
        </div>
    );
}
