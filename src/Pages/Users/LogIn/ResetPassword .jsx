import './LogIn.css';
import ImageIcono from '../../../assets/Logo-Apptower.png';
import ImagenPerson from '../../../assets/Person.jpg';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {

            return;
        }
        return (
            <div className='container-login'>
                <div className="container-form login">
                    <div className="informations">
                        <div className="info-childs">
                            <img src={ImageIcono} width="140" height="140" alt="ApptowerApart" />
                            <h2>Bienvenido</h2>
                            <p className='message'>Recupera tu contraseña de forma segura con un código de verificación enviado a tu correo</p>
                        </div>
                    </div>
                    <div className="form-informations">
                        <div className="form-information-childs">
                            <img src={ImagenPerson} width="75" height="75" alt="" />
                            <form className="form" onSubmit={handleResetPassword}>
                                <p>Ingresa tu nueva contraseña</p>
                                <InputsLogIn
                                    placeholder='Nueva contraseña'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputsLogIn
                                    placeholder='Confirma tu contraseña'
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button className='boton-login' type='submit'>Restablecer contraseña</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
