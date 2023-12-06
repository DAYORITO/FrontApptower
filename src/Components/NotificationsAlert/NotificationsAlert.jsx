import React from 'react'

export const NotificationsAlert = ({msg}) => {
    return (
        <div class="alert alert-warning" role="alert">
            <span class="fe fe-alert-triangle fe-16 mr-2"></span> {msg} </div>)
}
