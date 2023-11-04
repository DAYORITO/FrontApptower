
export const Actions = ({accion = "Module name", icon = "fe fe-edit fe-12 mr-4"}) => {
    return (
        <>
            <a class="dropdown-item" href="#"><i class={icon}></i>{accion} </a>
        </>

    )
}
