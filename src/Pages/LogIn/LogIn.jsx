import React, { useEffect } from 'react';
import './LogIn.css';
import Inputs from '../../Components/Inputs/Inputs';
import ImageIcono from '../../assets/Logo-Apptower.png';
import ImagenPerson from '../../assets/Person.jpg';

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

        <>
            <div className="container-form login">
                <div className="information">
                    <div className="info-childs">
                        <img src={ImageIcono} width="140" height="140" alt="ApptowerApart" />
                        <h2>Bienvenido</h2>
                        <p>Inicia sesión para interactuar con nuestra comunidad residencial.</p>
                    </div>
                </div>
                <div className="form-information">
                    <div className="form-information-childs">
                        <img src={ImagenPerson} width="70" height="70" alt="" />
                        <h2>Iniciar Sesión</h2>
                        <form className="form">
                            <label>
                                <i className='bx bx-user'></i>
                                <input type="text" placeholder='Usuario' />
                            </label>
                            <label>

                                <input type="password" placeholder='Contraseña' />
                            </label>
                            <div>
                                <a href="#" className='buttonStyle'>¿Olvidaste la contraseña?</a>
                            </div>
                            <input type="submit" value="Iniciar Sesión" /><br />
                            <a href="#" class="buttonStyle" id="sign-up">¿No puedes acceder? Registrarse</a>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container-form register hide">
                <div className="information">
                    <div className="info-childs">
                        <img src={ImageIcono} width="140" height="140" alt="Apptower" />
                        <h2>Bienvenido</h2>
                        <p>Para unirte a nuestra comunidad por favor regístrate con tus datos</p>
                    </div>
                </div>
                <div className="form-information">
                    <div className="form-information-childs">
                        <img src={ImagenPerson} width="70" height="70" alt="" />
                        <h2>Regístrate</h2>
                        <form className="form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '10px' }}>
                            <label>

                                <select name="tipoDoc" id="dropDown">
                                    <option value="CC">CC</option>
                                    <option value="CE">CE</option>
                                </select>
                            </label>
                            <label>
                                <input type="number" placeholder='Documento' />
                            </label>
                            <label>
                                <input type="text" placeholder='Nombre' />
                            </label>
                            <label>
                                <input type="text" placeholder='Apellido' />
                            </label>
                            <label>
                                <input type="email" placeholder='Correo' />
                            </label>
                            <label>
                                <input type="number" placeholder='Teléfono' />
                            </label>
                            <label>
                                <input type="password" placeholder='Contraseña' />
                            </label>
                            <label>
                                <input type="password" placeholder='Confirmar Contraseña' />
                            </label>
                        </form>
                        <input type="submit" value="Registrarse" id="boton" /><br />
                        <a href="#" class="buttonStyle" id="sign-in">¿Ya tienes acceso? Inicia sesión</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;
