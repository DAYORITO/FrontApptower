import { useState } from 'react';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';

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
                        <p className='message'>Restablece tu contraseña aquí</p>
                    </div>
                </div>
                <div className="form-informations">
                    <div className="form-information-childs">
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
