import './LogIn.css';
import ImageIcono from '../../../assets/Logo-Apptower.png';
import ImagenPerson from '../../../assets/Person.jpg';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([{}]);
    const [showModaload, setShowModaload] = useState(false);

    const email = Cookies.get('email');
    const navigate = useNavigate();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setShowModaload(true);

        try {
            const response = await fetch(`http://localhost:3000/api/users/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword: password, confirmPassword: confirmPassword }),
            });


            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: 'Éxito',
                    text: data.message,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => navigate('/'));


            } else {
                if (data.errors && data.errors.length > 0) {
                    setError(data.errors);

                    Swal.fire('Error', data.errors[0].message, 'error');
                } else {
                    Swal.fire('Error', 'Ocurrió un error inesperado', 'error');
                }
            }

            setShowModaload(false);

        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            Swal.fire('Error', 'Ocurrió un error al restablecer la contraseña', 'error');
        } finally {
            setShowModaload(false);
        }

    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    return (
        <div className='container-login'>
            <div className="container-form login">
                <div className="informations">
                    <div className="info-childs">
                        {/* <img src={ImageIcono} width="140" height="140" alt="ApptowerApart" /> */}
                        <h2>Bienvenido</h2>
                        <p className='message'>Recupera tu contraseña de forma segura con un código de verificación enviado a tu correo</p>
                    </div>
                </div>
                <div className="form-informations">
                    <div className="form-information-childs">
                        <img src={ImagenPerson} width="75" height="75" alt="" />
                        <form className="form" onSubmit={handleResetPassword}>

                            <InputsLogIn
                                placeholder='Nueva contraseña'
                                type='password'
                                value={password}
                                onChange={(newValue) => setPassword(newValue)}
                                onKeyPress={handleKeyPress}
                                errors={error}
                                identifier={'newPassword'}
                            />


                            <InputsLogIn
                                placeholder='Confirmar contraseña'
                                type='password'
                                onKeyPress={handleKeyPress}
                                value={confirmPassword}
                                onChange={(newValue) => setConfirmPassword(newValue)}
                                errors={error}
                                identifier={'confirmPassword'}

                            />

                            <button className='boton-login' type='submit' disabled={showModaload}>
                                {showModaload ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Restableciendo...
                                    </>
                                ) : (
                                    <>
                                        Restablecer contraseña
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

