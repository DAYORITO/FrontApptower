import React from 'react'

export const Actions = ({module = "Module name", icon = 'class="fe fe-edit fe-12 mr-4"'}) => {
    return (
        <>
            <a class="dropdown-item" href="#"><i {...icon}></i>Edit {module} </a>
            <a class="dropdown-item" href="#"><i {...icon}></i>Assing {module}</a>

        </>

    )
}
