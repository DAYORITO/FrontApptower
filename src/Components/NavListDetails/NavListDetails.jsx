import "./NavListDetails.css"
import { Link } from 'react-router-dom';

export const NavListDetails = ({ name, toggleState, onClick, index }) => {
    return (
        <li
            className={toggleState === index ? "tabs-active" : "tabs"}
            onClick={onClick}>
            <Link className="nav-link"  >{name}</Link>
        </li>
    )
}
