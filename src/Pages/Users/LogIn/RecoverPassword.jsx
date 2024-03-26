import './LogIn.css';
import ImageIcono from '../../../assets/Logodomus.png';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { set } from 'date-fns';


export const RecoverPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState([{}]);
    const [showModaload, setShowModaload] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setShowModaload(true);

        try {
            const userCheck = await fetch(`${import.meta.env.VITE_API_URL}email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (userCheck.ok) {
                const userData = await userCheck.json();
                console.log(userData.message);
                Cookies.set("email", email);

                const sendCode = await fetch(`${import.meta.env.VITE_API_URL}email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });

                if (sendCode.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Correo enviado',
                        text: 'Se ha enviado un correo con el código de verificación',
                        showConfirmButton: false,
                        timer: 3000
                    }).then(() => {
                        navigate('/recoveycode');
                    })
                } else {
                    const error = await sendCode.json();
                    console.log(error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo enviar el correo con el código de verificación',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setError(error.errors);
                    setShowModaload(false);
                }
            } else {
                const error = await userCheck.json();
                console.log(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.errors[0].message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setError(error.errors);
                setShowModaload(false);
            }
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);

        }
    };

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
                        <p className='message'>Recupera tu contraseña de forma segura con un código de verificación enviado a tu correo.</p>
                    </div>
                </div>
                <div className="form-informations">
                    <div className="form-information-childs">
                        <img src={ImageIcono} width="75" className='iconperson' height="75" alt="" />

                        <form className="form" onSubmit={handleEmailSubmit}>
                            {/* <p>Ingresa tu correo  </p> */}
                            <InputsLogIn placeholder='Correo' type='email' errors={error} identifier={'email'} value={email} onChange={(newValue) => setEmail(newValue)} onKeyPress={handleKeyPress} />

                            <button className='boton-login' disabled={showModaload}>
                                {showModaload ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Validando...
                                    </>
                                ) : (
                                    <>
                                        Enviar Código
                                    </>
                                )}
                            </button>

                            <div>
                                <Link to="/" className="buttonStyle" id="sign-up">Regresar</Link>
                            </div>

                        </form>

                    </div>
                </div>
            </div></div>
    )
}
