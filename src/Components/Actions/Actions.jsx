
export const Actions = ({ accion = "Module name", href = "/#/admin", icon = "fe fe-edit fe-12 mr-4", onClick }) => {
    return (
        <>
            <a class="dropdown-item" onClick={e=>{e.preventDefault(); onClick()} } href={href}><i class={icon}></i>{accion} </a>
        </>

    )
}
