import { Link } from 'react-router-dom';

export const Actions = ({ accion = "Module name", href, icon = "edit", onClick }) => {
    return (
        <>
            <Link className="dropdown-item" to={href} onClick={onClick}>
                <i className={`fe fe-${icon} fe-12 mr-4`}></i>
                {accion}
            </Link>

        </>
    );
};
