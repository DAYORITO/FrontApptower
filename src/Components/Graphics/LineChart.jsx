import React from 'react'

export const LineChart = () => {
    return (
        <>
            <div className="col-md-6 mb-4">
                <div className="card shadow">
                    <div className="card-header">
                        <strong className="card-title mb-0">Visitantes</strong>
                        <span className="badge badge-light float-right mr-2">30 days</span>
                        <span className="badge badge-light float-right mr-2">7 days</span>
                        <span className="badge badge-secondary float-right mr-2">Today</span>
                    </div>
                    <div className="card-body">
                        <canvas id="lineChartjs" width="400" height="300"></canvas>
                    </div>
                </div>
            </div>

        </>
    )
}
