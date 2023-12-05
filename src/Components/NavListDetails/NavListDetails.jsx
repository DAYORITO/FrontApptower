import "./NavListDetails.css"

export const NavListDetails = ({ name, toggleState, onClick, index }) => {
    return (
        <li
            className={toggleState === index ? "tabs-active" : "tabs"}
            onClick={onClick}>
            <a className="nav-link"  >{name}</a>
        </li>
    )
}
