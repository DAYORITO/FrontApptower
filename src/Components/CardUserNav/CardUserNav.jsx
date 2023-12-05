import { Link } from 'react-router-dom';
import './CardUserNav.css';
import LogoApptower from '../../assets/Logo-Apptower.png';

export const CardUserNav = ({ rol, name, lastname }) => {
    return (

        <div className='myNav-user'>
            <Link to={"users/profileList"}>
                <div className='myNav-user-card'>
                    <div className='myNav-user-card-img'>
                        <img src={LogoApptower} id='userImg' />
                    </div>
                    <div className='myNav-user-card-text'>
                        <h4 className='h6'>{rol}</h4>
                        <p className='text-muted'>{name + " " + lastname}</p>
                    </div>

                </div>

            </Link>
        </div>

    )
}
