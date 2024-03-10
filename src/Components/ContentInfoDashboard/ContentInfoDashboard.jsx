import React from 'react';
import { Link } from 'react-router-dom';

export const ContentInfoDashboard = ({
    moduleLabel = true,
    count = '50',
    icon = 'home',
    to = '/admin/',
    dataLabel = 'Data',
    label = 'Información',
    neutralCount,
    activeCount,
    inactiveCount,
    warningCount,

    size = 4,
    mt = false

}) => {

    mt ? mt = 'mt-n3' : ''

    return (
        <div className={`col-md-6 col-xl-${size} mb-4 effect-hover`}>
            <Link to={to}>
                <div className="card shadow border-0">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-3 text-center mr-3">
                                <span className="circle circle-lg bg-light">
                                    <i className={`fe fe-24 fe-${icon} text-secondary mb-0`}></i>
                                </span>
                            </div>
                            <div className="col pr-0">
                                <span className="h3">{count}</span>
                                <span className="small h1 ml-1">{dataLabel}</span>
                                {moduleLabel && <p className="text-muted  mb-1">{label}</p>}
                                {neutralCount && <p className="badge badge-light text-secondary mr-2">{neutralCount}</p>}
                                {activeCount && <p className="badge badge-light text-success mr-2">{activeCount}</p>}
                                {inactiveCount && <p className="badge badge-light text-danger mr-2 ">{inactiveCount}</p>}
                                {warningCount && <p className={`badge badge-light text-warning mr-2 ${mt}`}>{warningCount}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
