import { useState, useEffect } from 'react';
import './LogIn.css';
import ImageIcono from '../../../assets/Logodomus.png';
import ImagenPerson from '../../../assets/Person.jpg';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { SelectInput } from '../../../Components/Inputs/selectLogIn';
import { useFetchpost } from '../../../Hooks/useFetch';
import Swal from 'sweetalert2';
import { useAuth } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { dotSpinner } from 'ldrs'


const LoginForm = ({ setShowLoginForm }) => {

    const [showModaload, setShowModaload] = useState(false);
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const token = Cookies.get('token');
    const navigate = useNavigate();
    dotSpinner.register()




    const handleLogin = async (event) => {
        event.preventDefault();
        setShowModaload(true)

        if (!username || !loginPassword) {
            Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
            setShowModaload(false);
            return;
        }


        try {
            const token = await login(username, loginPassword);

            if (token) {
                const response = await fetch('http://localhost:3000/api/login/access', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    Swal.fire('Error de inicio de sesión.', 'El usuario o la contraseña son incorrectos.', 'error');
                    setShowModaload(false);
                    return;
                }

                const responseData = await response.json();

                if (responseData.message === 'Acceso denegado') {
                    Swal.fire('Error de inicio de sesión', 'El usuario o la contraseña son incorrectos.', 'error');
                    setShowModaload(false);
                    return;
                } else {
                    if (responseData.role) {
                        const role = responseData.role.toLowerCase();

                        if (role.includes('vigilante') || role.includes('seguridad') || role.includes('vigilantes')) {
                            navigate(`admin/watchman/details/${responseData.user}`);
                            window.location.reload();
                        } else if (role.includes('administrador')) {
                            navigate('/admin/dashboard');
                            window.location.reload();
                        } else if (role.includes('residente')) {
                            navigate(`/admin/resident/details/${responseData.user}`);
                            window.location.reload();
                        } else {
                            navigate(`admin/users/details/${responseData.user}`);
                            window.location.reload();
                        }
                    } else {
                        console.error('Error: role is undefined');
                        setShowModaload(false);
                        return;
                    }
                }
            }
            setShowModaload(false);
        } catch (error) {
            console.error('Error:', error);
            setShowModaload(false);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    return (
        <div className="container-form login">
            <div className="informations">
                <div className="info-childs">
                    {/* <img src={ImageIcono} width="140" height="140" className='logo' alt="ApptowerApart" /> */}
                    <h2>Bienvenido</h2>
                    <p className='loginp'>Inicia sesión para interactuar con nuestra comunidad residencial.</p>
                </div>
            </div>
            <div className="form-informations">
                <div className="form-information-childs">
                    <img src={ImageIcono} alt="" className='iconperson' />
                    <form className="form" onSubmit={handleLogin}>
                        <InputsLogIn placeholder='Usuario' type='text' value={username} onChange={(newValue) => setUsername(newValue)} onKeyPress={handleKeyPress} />
                        <InputsLogIn placeholder='Contraseña' type='password' value={loginPassword} onChange={(newValue) => setLoginPassword(newValue)} onKeyPress={handleKeyPress} />

                        <div>
                            <Link to="recoverpassword" className='buttonStyle'>¿Olvidaste la contraseña?</Link>
                        </div>

                        <button className='boton-login' type="submit" disabled={showModaload}>
                            {showModaload ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Ingresando...
                                </>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>

                        {/* <Link className='buttonStyle' to='#' onClick={() => setShowLoginForm(false)}>
                            ¿No puedes acceder? Regístrate
                        </Link> */}

                    </form>

                </div>
            </div>
        </div>

    );
};



//Este ya no se esta utilizando pero si algo se deja 
const RegisterForm = ({ setShowLoginForm }) => {
    const [documentType, setDocumentType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [document, setDocument] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleDocumentTypeChange = (selectedType) => {
        setDocumentType(selectedType);
    };

    const [shouldRegister, setShouldRegister] = useState(false);
    const handleRegister = async (event) => {
        event.preventDefault();

        if (!documentType || !name || !email || !password || !document || !lastname || !phone || !confirmPassword) {
            Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
            return;
        }

        const url = 'login/users';
        const data = {
            docType: documentType,
            name,
            email,
            password,
            document,
            idrole: 2,
            lastName: lastname,
            phone,
            status: 'Inactivo'
        };
        const { response, error } = await useFetchpost(url, data);
        console.log('Data:', data);

        if (response) {
            console.log('Response:', response);
            Swal.fire({
                title: '¡Registro Exitoso!',
                text: 'Tu cuenta ha sido creada con éxito. Por favor revise su correo.',
                icon: 'success',
            }).then(() => {
                navigate('/');
            });
        }

        if (error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error',
                icon: 'error',
            });
        }
        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
            });
            return;
        }
    };

    return (
        <div className="container-form register">
            <div className="information">
                <div className="info-childs">
                    <img src={ImageIcono} width="140" height="140" alt="Apptower" />
                    <h2>Bienvenido</h2>
                    <p className='registerp'>Para unirte a nuestra comunidad por favor regístrate con tus datos</p>
                </div>
            </div>
            <div className="form-information">
                <div className="form-information-childs">
                    <img src={ImagenPerson} width="75" height="75" alt="" className='iconperson' />
                    <form className="form-register" onSubmit={handleRegister}>
                        <SelectInput
                            onChange={handleDocumentTypeChange}
                            value={documentType}
                            options={[
                                { value: 'CC', label: 'Cédula' },
                                { value: 'CE', label: 'Cédula de extranjería' }
                            ]}
                            placeholder={'Tipo Documento'}
                        />

                        <InputsLogIn placeholder='Documento' type='number' value={document} onChange={(newValue) => setDocument(newValue)} />
                        <InputsLogIn placeholder='Nombre' type='text' value={name} onChange={(newValue) => setName(newValue)} />
                        <InputsLogIn placeholder='Apellido' type='text' value={lastname} onChange={(newValue) => setLastName(newValue)} />
                        <InputsLogIn placeholder='Correo' type='email' value={email} onChange={(newValue) => setEmail(newValue)} />
                        <InputsLogIn placeholder='Teléfono' type='number' value={phone} onChange={(newValue) => setPhone(newValue)} />
                        <InputsLogIn placeholder='Contraseña' type='password' value={password} onChange={(newValue) => setPassword(newValue)} />
                        <InputsLogIn placeholder='Confirmar Contraseña' type='password' value={confirmPassword} onChange={(newValue) => setConfirmPassword(newValue)} />


                        <button className='boton-register'>Regístrate</button>

                        <Link className='buttonStyle' to='#' onClick={() => setShowLoginForm(true)}>
                            ¿Ya tienes acceso? Inicia sesión
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    );
};

const LogIn = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    return (
        <div className='container-login '>
            {showLoginForm ? <LoginForm setShowLoginForm={setShowLoginForm} /> : <RegisterForm setShowLoginForm={setShowLoginForm} />}
        </div>
    );
};

export default LogIn;
