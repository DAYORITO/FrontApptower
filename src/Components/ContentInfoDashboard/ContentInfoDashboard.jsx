import React from 'react'
import { Link } from 'react-router-dom'

export const ContentInfoDashboard = ({
    module = 'Modulo',
    count = '50',
    icon = 'home',
    to = '/admin/',
}) => {
    return (

        <div class="col-md-6 col-xl-4 mb-4">
            <Link to={to}>
                <div class="card shadow border-0">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-3 text-center">
                                <span class="circle circle-sm bg-primary">
                                    <i class={`fe fe-16 fe-${icon} text-white mb-0`}></i>
                                </span>
                            </div>
                            <div class="col pr-0">
                                <p class="small text-muted mb-0">{module}</p>
                                <span class="h3 mb-0">{count}</span>
                                {/* <span class="small text-success">+16.5%</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}
