import { Link } from 'react-router-dom';
import './CardUserNav.css';
import LogoApptower from '../../assets/Logo-Apptower.png';

export const CardUserNav = ({user = "Usuario"}) => {
    return (

        <div className='myNav-user'>
            <Link to={"users/"}>
                <div className='myNav-user-card'>
                    <div className='myNav-user-card-img'>
                        <img src="https://th.bing.com/th/id/R.92c842ab508f9def34fd6f5ee13ff0ab?rik=4m9tZK3a2h%2bQMg&pid=ImgRaw&r=0" id='userImg' />
                    </div>
                    <div className='myNav-user-card-text'>
                        <h4 className='h6'>Administrador</h4>
                        <p className='text-muted'>Diomedes diaz</p>
                    </div>

                </div>

                <div className='myNav-user-logo'>
                <img src={LogoApptower} alt="logoApptower" className="logo" />
                </div>

                
            </Link>
        </div>

    )
}
