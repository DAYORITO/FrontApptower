import { Link } from 'react-router-dom';

export const Actions = ({ accion = "Module name", href, icon = "fe fe-edit fe-12 mr-4", onClick }) => {
    return (
        <>
            <Link className="dropdown-item" to={href} onClick={ onClick }>
                <i className={icon}></i>
                {accion}
            </Link>
            
        </>
    );
};
