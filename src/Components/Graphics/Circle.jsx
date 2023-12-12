import React from 'react';

export default function Circle() {
    const chartBoxStyle = {
        minHeight: '180px', // Aquí defines las propiedades de estilo como pares clave-valor
    };

    return (
        <>
            <div className="col-md-4">
                <div className="card shadow eq-card mb-4">
                    <div className="card-header">
                        <strong className="card-title">Atrasos de Pagos</strong>
                        <a className="float-right small text-muted" href="#!">View all</a>
                    </div>
                    <div className="card-body">
                        <div className="chart-box mb-3" style={chartBoxStyle}> {/* Aquí aplicas el estilo como un objeto */}
                            <div id="customAngle"></div>
                        </div>
                        <div className="mx-auto">
                            <div className="row align-items-center mb-2">
                                <div className="col">
                                    <p className="mb-0">Direct</p>
                                    <span className="my-0 text-muted small">+10%</span>
                                </div>
                                <div className="col-auto text-right">
                                    <p className="mb-0">218</p>
                                    <span className="dot dot-md bg-success"></span>
                                </div>
                            </div>
                            <div className="row align-items-center mb-2">
                                <div className="col">
                                    <p className="mb-0">Organic Search</p>
                                    <span className="my-0 text-muted small">+0.6%</span>
                                </div>
                                <div className="col-auto text-right">
                                    <p className="mb-0">1002</p>
                                    <span className="dot dot-md bg-warning"></span>
                                </div>
                            </div>
                            <div className="row align-items-center mb-2">
                                <div className="col">
                                    <p className="mb-0">Referral</p>
                                    <span className="my-0 text-muted small">+1.6%</span>
                                </div>
                                <div className="col-auto text-right">
                                    <p className="mb-0">67</p>
                                    <span className="dot dot-md bg-primary"></span>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col">
                                    <p className="mb-0">Social</p>
                                    <span className="my-0 text-muted small">+118%</span>
                                </div>
                                <div className="col-auto text-right">
                                    <p className="mb-0">386</p>
                                    <span className="dot dot-md bg-secondary"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

