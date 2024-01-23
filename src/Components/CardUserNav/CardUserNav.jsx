import { Link } from 'react-router-dom';
import './CardUserNav.css';
import LogoApptower from '../../assets/Logo-Apptower.png';

export const CardUserNav = ({ rol, name, lastName, userImg }) => {
    // Obtén las primeras tres letras del apellido
    const shortenedLastname = lastName.slice(0, 3);

    console.log(userImg)
    return (
        <div className='myNav-user'>
            <Link to={"users/profileList"}>
                <div className='myNav-user-card'>
                    <div className='myNav-user-card-img'>
                        <img src={userImg != null ? userImg : LogoApptower} id='userImg' alt='User Logo' />
                    </div>
                    <div className='myNav-user-card-text'>
                        <h4 className='h6'>{rol}</h4>
                        {/* Muestra las primeras tres letras del apellido */}
                        <p className='text-muted'>{name + " " + shortenedLastname}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
