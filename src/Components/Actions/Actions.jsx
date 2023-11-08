
export const Actions = ({accion = "Module name", href="/#/admin", icon = "fe fe-edit fe-12 mr-4"}) => {
    return (
        <>
            <a class="dropdown-item" href={href}><i class={icon}></i>{accion} </a>
        </>

    )
}
