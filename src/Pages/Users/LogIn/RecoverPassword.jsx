import './LogIn.css';
import ImageIcono from '../../../assets/Logodomus.png';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export const RecoverPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCheck = await fetch('http://localhost:3000/api/email', {
                // const userCheck = await fetch('http://localhost:3000/api/email', {
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

                const sendCode = await fetch('http://localhost:3000/api/email/verify', {
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
                }
            } else {
                const error = await userCheck.json();
                console.log(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se encontró el correo proporcionado',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    };

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
                            <InputsLogIn placeholder='Correo' type='email' value={email} onChange={(newValue) => setEmail(newValue)} />

                            <button className='boton-login'>Enviar Código</button><br />
                            <div>
                                <Link to="/" class="buttonStyle" id="sign-up">Regresar</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div></div>
    )
}
