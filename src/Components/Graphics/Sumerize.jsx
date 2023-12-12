import React from 'react'

export default function Sumerize() {
    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow eq-card mb-4">
                        <div className="card-body">
                            <div className="card-title">
                                <strong>Sumerize</strong>
                                <a className="float-right small text-muted" href="#!">View all</a>
                            </div>
                            <div className="row mt-b">
                                <div className="col-6 text-center mb-3 border-right">
                                    <p className="text-muted mb-1">Today</p>
                                    <h6 className="mb-1">830</h6>
                                    <p className="text-muted mb-2">+5.5% <span className="fe fe-arrow-up fe-12 text-success"></span></p>
                                </div>
                                <div className="col-6 text-center mb-3">
                                    <p className="text-muted mb-1">Yesterday</p>
                                    <h6 className="mb-1">4,830</h6>
                                    <p className="text-muted">-5.5%</p>
                                </div>
                                <div className="col-6 text-center border-right">
                                    <p className="text-muted mb-1">This Week</p>
                                    <h6 className="mb-1">680</h6>
                                    <p className="text-muted mb-2">+1.5% <span className="fe fe-arrow-up fe-12 text-warning"></span></p>
                                </div>
                                <div className="col-6 text-center">
                                    <p className="text-muted mb-1">Last Week</p>
                                    <h6 className="mb-1">430</h6>
                                    <p className="text-muted">-5.5%</p>
                                </div>
                            </div>
                            <div className="chart-widget">
                                <div id="columnChartWidget" width="300" height="200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
