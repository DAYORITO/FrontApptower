import React from 'react'

export default function Graphics() {
    return (
        <>
            <div className="col-md-12 col-lg-4">
                <div className="card shadow eq-card mb-4">
                    <div className="card-body">
                        <div className="d-flex mt-3 mb-4">
                            <div className="flex-fill pt-2">
                                <p className="mb-0 text-muted">Total</p>
                                <h4 className="mb-0">108</h4>
                                <span className="small text-muted">+37.7%</span>
                            </div>
                            <div className="flex-fill chart-box mt-n2">
                                <div id="barChartWidget"></div>
                            </div>
                        </div>
                        <div className="row border-top">
                            <div className="col-md-6 pt-4">
                                <h6 className="mb-0">108 <span className="small text-muted">+37.7%</span></h6>
                                <p className="mb-0 text-muted">Cost</p>
                            </div>
                            <div className="col-md-6 pt-4">
                                <h6 className="mb-0">1168 <span className="small text-muted">-18.9%</span></h6>
                                <p className="mb-0 text-muted">Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
