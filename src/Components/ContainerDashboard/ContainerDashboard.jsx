import React from 'react'

export const ContainerDashboard = ({ children }) => {
    return (
        <div class="container-fluid container-dashboard">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="row">

                        {children}

                    </div>
                </div>
            </div>
        </div>)
}
