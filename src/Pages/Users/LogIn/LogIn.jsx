import { useState } from 'react';
import './LogIn.css';
import ImageIcono from '../../../assets/Logo-Apptower.png';
import ImagenPerson from '../../../assets/Person.jpg';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { SelectInput } from '../../../Components/Inputs/selectLogIn';
import { useFetchpost } from '../../../Hooks/useFetch';
import Swal from 'sweetalert2';
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ setShowLoginForm }) => {
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    console.log('Login:', login);
    console.log('username:', username);
    console.log('loginPassword:', loginPassword);
    const navigate = useNavigate();

    const handleLogin = async (event) => {

        if (!username || !loginPassword) {

            Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
            return;
        }
        event.preventDefault();

        try {
            const token = await login(username, loginPassword);
            console.log('Token:', token);

            if (token) {
                const response = await fetch('https://apptowerbackend.onrender.com/api/login/access', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error de inicio de sesión');
                }

                const responseData = await response.json();
                console.log('Response data:', responseData);

                if (responseData.message === 'Acceso denegado') {
                    Swal.fire('Error de inicio de sesión', 'El usuario o la contraseña son incorrectos.', 'error');
                } else {
                    navigate('/admin/residents');
                }
            }
        } catch (error) {
            console.log('password ', loginPassword)
            console.log('username ', username)
            console.error('Error de inicio de sesión Aleja:', error.message);
            Swal.fire('Error de inicio de sesión', error.message, 'error');
        }
    }

    return (
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
                    <img src={ImagenPerson} width="75" height="75" alt="" className='iconperson' />
                    <form className="form" onSubmit={handleLogin}>
                        <InputsLogIn placeholder='Usuario' type='text' value={username} onChange={(newValue) => setUsername(newValue)} />
                        <InputsLogIn placeholder='Contraseña' type='password' value={loginPassword} onChange={(newValue) => setLoginPassword(newValue)} />

                        <div>
                            <a href="/#/recoverpassword" className='buttonStyle'>¿Olvidaste la contraseña?</a>
                        </div>

                        <button className='boton-login'>Iniciar Sesión</button><br />


                        <a className='buttonStyle' href='#' onClick={() => setShowLoginForm(false)}>
                            ¿No puedes acceder? Regístrate
                        </a>

                    </form>
                </div>
            </div>
        </div>
    );
};




const RegisterForm = ({ setShowLoginForm }) => {
    const [documentType, setDocumentType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [document, setDocument] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleDocumentTypeChange = (selectedType) => {
        setDocumentType(selectedType);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const url = 'users';
        const data = {
            documentType,
            name,
            email,
            password,
            document,
            idrole: 2,
            lastname,
            phone,
            state: 'Inactivo'
        };
        const { response, error } = await useFetchpost(url, data);
        console.log('Data:', data);

        if (response) {
            console.log('Response:', response);
            Swal.fire({
                title: 'Éxito',
                text: 'Registro Exitoso',
                icon: 'success',
            }).then(() => {
                navigate('/admin/residents');
            }
            );
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

                        <a className='buttonStyle' href='#' onClick={() => setShowLoginForm(true)}>
                            ¿Ya tienes acceso? Inicia sesión
                        </a>

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
