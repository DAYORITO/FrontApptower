import React from 'react';
import { Link } from 'react-router-dom';

export const NotificationsAlert = ({ msg, to }) => {
    return (
        <div className="alert alert-warning" role="alert">
            <span className="fe fe-alert-triangle fe-16 mr-2"></span>
            {to && <Link to={to}>Has click aquí</Link>}
            {msg && `${msg} `}
        </div>
    );
};
