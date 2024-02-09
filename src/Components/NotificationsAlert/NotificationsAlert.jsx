import React from 'react';
import { Link } from 'react-router-dom';

export const NotificationsAlert = ({ msg, to }) => {
    return (
        <div className="alert alert-info" role="alert">
            <span className="fe fe-alert-triangle fe-16 mr-2"></span>
            {to && <Link className="text-info" to={to}>Has click aquí</Link>}
            {msg && `${msg} `}
        </div>
    );
};
