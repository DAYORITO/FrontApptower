import './LogIn.css';
import ImageIcono from '../../../assets/Logo-Apptower.png';
import ImagenPerson from '../../../assets/Person.jpg';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { useState } from 'react';
import Swal from 'sweetalert2';


export const EnterRecoveryCode = ({ handleRecoveryCodeSubmit }) => {
    const [recoveryCode, setRecoveryCode] = useState('');

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

                        <form className="form" >
                            {/* <p>Codigo de Verificación  </p> */}
                            <InputsLogIn placeholder='Codigo' type='number' value={recoveryCode} onChange={(newValue) => setRecoveryCode(newValue)} />

                            <button className='boton-login'>Enviar Codigo</button><br />

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )

}