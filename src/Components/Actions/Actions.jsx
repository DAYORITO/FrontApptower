
export const Actions = ({accion = "Module name", route="#", icon = "fe fe-edit fe-12 mr-4"}) => {
    return (
        <>
            <a class="dropdown-item" href={route}><i class={icon}></i>{accion} </a>
        </>

    )
}
