import { useState, useEffect } from 'react';
import './LogIn.css';
import ImageIcono from '../../../assets/Logo-Apptower.png';
import ImagenPerson from '../../../assets/Person.jpg';
import { InputsLogIn } from '../../../Components/Inputs/InputsLogIn';
import { SelectInput } from '../../../Components/Inputs/selectLogIn';
import { useFetchpost } from '../../../Hooks/useFetch';
import Swal from 'sweetalert2';
import { useAuth } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ setShowLoginForm }) => {
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    console.log('Login:', login);
    const token = Cookies.get('token');
    console.log('username:', username);
    console.log('loginPassword:', loginPassword);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState('');
    const [userDocument, SetUserDocument] = useState('');
    const [idResidents, setIdResidents] = useState('');
    console.log(userRole, 'userRole aqui en login');

    console.log('userData aqui en login:', userData);


    const redireccion = useNavigate();

    useEffect(() => {
        if (token) {

            fetchUserInformation(token);
        }
    }, [token]);

    const fetchUserInformation = async (token) => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/informationUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }

            const data = await response.json();
            setUserData(data);
            SetUserDocument(data.document);

        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    const fechDataRols = async () => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/rols');

            if (!response.ok) {
                throw new Error('Failed to fetch roles');
            }

            const data = await response.json();
            const rols = data.rols;
            if (Array.isArray(rols)) {
                const userRole = rols.find(role => role.idrole === userData.user.idrole)?.namerole;
                console.log('User Role:', userRole);
                setUserRole(userRole);
            } else {
                console.error('Error: roles data is not an array:', rols);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    useEffect(() => {
        if (userData.user && userData.user.idrole) {
            fechDataRols();
        }
    }, [userData]);


    fetch(`http://localhost:3000/api/residents/document/${userDocument}`)
        .then(response => response.json())
        .then(data => {
            if (data.residente) {
                setIdResidents(data.residente.idResident);

                fetch(`http://localhost:3000/api/apartments/${Number(data.residente.idResident)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.spartment) {
                            setApartment(data.spartment.apartmentName);
                            setIdapartaments(data.spartment.idApartment)

                            // navigate('/resident', {
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error:', error));




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
                    // const response = await fetch('http://localhost:3000/api/login/access', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {

                    Swal.fire('Error de inicio de sesión 2', 'El usuario o la contraseña son incorrectos.', 'error');
                }

                const responseData = await response.json();
                console.log('Response data hola:', responseData);

                if (responseData.message === 'Acceso denegado') {
                    Swal.fire('Error de inicio de sesión', 'El usuario o la contraseña son incorrectos.', 'error');
                } else {
                    if (responseData.role.toLowerCase() === 'vigilante' || responseData.role.toLowerCase() === 'seguridad' || responseData.role.toLowerCase() === 'vigilantes') {

                        navigate('/admin/watchman/shifts');

                    } else if (responseData.role.toLowerCase() === 'administrador' || responseData.role.toLowerCase() === 'admin' || responseData.role.toLowerCase() === 'super administrador') {
                        navigate('/admin/residents');
                    }
                    else if (responseData.role.toLowerCase() === 'residente' || responseData.role.toLowerCase() === 'residentes') {
                        navigate('/resident');

                    }

                }

            }
        } catch (error) {
            console.log('password ', loginPassword)
            console.log('username ', username)
            console.error('Error de inicio de sesión Aleja:', error.message);
            Swal.fire('Error de inicio de sesión 1', error.message, 'error');
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
                            <Link to="recoverpassword" className='buttonStyle'>¿Olvidaste la contraseña?</Link>
                        </div>

                        <button className='boton-login'>Iniciar Sesión</button><br />


                        <Link className='buttonStyle' to='#' onClick={() => setShowLoginForm(false)}>
                            ¿No puedes acceder? Regístrate
                        </Link>

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

    const navigate = useNavigate();

    const handleDocumentTypeChange = (selectedType) => {
        setDocumentType(selectedType);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const url = 'users/login';
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
                navigate('/');
                window.location.reload();
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
