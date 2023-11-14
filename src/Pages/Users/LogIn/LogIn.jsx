import { useEffect } from 'react';
import './LogIn.css';
import ImageIcono from '../../../assets/Logo-Apptower.png';
import ImagenPerson from '../../../assets/Person.jpg';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { SelectInput } from '../../../Components/Inputs/selectLogIn';
import { Link } from 'react-router-dom';


const LogIn = () => {

    useEffect(() => {
        const btnSignIn = document.getElementById("sign-in");
        const btnSignUp = document.getElementById("sign-up");
        const formRegister = document.querySelector(".register");
        const formLogin = document.querySelector(".login");

        btnSignIn.addEventListener("click", e => {
            formRegister.classList.add("hide");
            formLogin.classList.remove("hide")
        });

        btnSignUp.addEventListener("click", e => {
            formLogin.classList.add("hide");
            formRegister.classList.remove("hide");
        });
    }, []);

    return (

        <div className='container-login'>
            <div className="container-form login">
                <div className="informations">
                    <div className="info-childs">
                        <img src={ImageIcono} width="140" height="140" alt="ApptowerApart" />
                        <h2>Bienvenido</h2>
                        <p className='loginp'>Inicia sesión para interactuar con nuestra comunidad residencial.</p>
                    </div>
                </div>
                <div className="form-informations">
                    <div className="form-information-childs">
                        <img src={ImagenPerson} width="75" height="75" alt="" />

                        <form className="form">

                            <InputsLogIn placeholder='Usuario' type='text' />

                            <InputsLogIn placeholder='Contraseña' type='password' />
                            <div>
                                <a href="/#/recoverpassword" className='buttonStyle'>¿Olvidaste la contraseña?</a>
                            </div>
                            <Link to="/admin/residents/">
                                <button className='boton-login' >Iniciar Sesión</button><br />
                            </Link>
                            <a href="#" class="buttonStyle" id="sign-up">¿No puedes acceder? Registrate</a>
                        </form>

                    </div>
                </div>
            </div>

            <div className="container-form register hide">
                <div className="information">
                    <div className="info-childs">
                        <img src={ImageIcono} width="140" height="140" alt="Apptower" />
                        <h2>Bienvenido</h2>
                        <p className='registerp'>Para unirte a nuestra comunidad por favor regístrate con tus datos</p>


                    </div>
                </div>
                <div className="form-information">
                    <div className="form-information-childs">
                        <img src={ImagenPerson} width="75" height="75" alt="" />
                        <form className="form-register">
                            <SelectInput
                                options={[
                                    { value: 'CC', label: 'Cédula' },
                                    { value: 'CE', label: 'Cédula de extranjería' }
                                ]}
                                placeholder={'Tipo Documento'}

                            />
                            <InputsLogIn placeholder='Documento' type='number' />
                            <InputsLogIn placeholder='Nombre' type='text' />
                            <InputsLogIn placeholder='Apellido' type='text' />
                            <InputsLogIn placeholder='Correo' type='email' />
                            <InputsLogIn placeholder='Teléfono' type='number' />
                            <InputsLogIn placeholder='Contraseña' type='password' />
                            <InputsLogIn placeholder='Confirmar Contraseña' type='password' />

                            <button className='boton-register'>Registrate</button>
                            <a href="#" class="buttonStyle" id="sign-in">¿Ya tienes acceso? Inicia sesión</a>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LogIn;
