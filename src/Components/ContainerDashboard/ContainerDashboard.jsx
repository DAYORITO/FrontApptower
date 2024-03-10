import React from 'react'
import "./ContainerDashboard.css"

export const ContainerDashboard = ({ children }) => {
    return (
        <div className="container-dashboard"  >
            <h2 className=' mt-4 mb-4'>Dashboard</h2>
            <div class="row">
                <div class="col-12">
                    <div class="row">   

                        {children}

                    </div>
                </div>
            </div>
        </div>)
}
