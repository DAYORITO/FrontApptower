import React from 'react'
import "./Spinner.css"


export const Spinner = () => {
    return (

        <div class="container-spinner">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}
