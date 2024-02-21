import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const connectSocket = async () => {

    const socket = io('http://localhost:3000');

}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);


    const login = async (usuario, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                Swal.fire('Error de inicio de sesión', 'El usuario o la contraseña son incorrectos.', 'error');
                setIsLoggedIn(false);
                setUser(null);
                Cookies.set('isLoggedIn', false);
                return;
            }

            const data = await response.json();

            console.log(data, 'data');

            Cookies.set('token', data.token);
            if (data.user && typeof data.user === 'string') {
                try {
                    const user = JSON.parse(decodeURIComponent(data.user));
                    setUser(user);
                } catch (e) {
                    console.error('Error parsing user data:', e);
                }
            }

            Cookies.set('isLoggedIn', true);
            setIsLoggedIn(true);

            fetchUserData(data.token);

            await connectSocket()

            return data.token;

        } catch (error) {
            console.error('Error de inicio de sesión:', error.message);
            setIsLoggedIn(false);
            setUser(null);
            Cookies.set('isLoggedIn', false);
        }
    };


    const fetchUserData = (token) => {
        return fetch('https://apptowerbackend.onrender.com/api/login/access', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el usuario');
                }
                return response.json();
            })
            .then(data => {
                if (data?.user) {
                    try {
                        const user = JSON.parse(decodeURIComponent(data.user));
                        if (user) {
                            setUser(user);
                            setIsLoggedIn(true);
                            Cookies.set('isLoggedIn', 'true');
                        }
                    } catch (e) {
                        console.error('Error parsing user data:', e);
                    }
                }
            })
            .catch(error => {
                console.error('Error al obtener el usuario:', error.message);
                setIsLoggedIn(false);
                setUser(null);
                Cookies.set('isLoggedIn', 'false');
            });
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
            fetchUserData(token).finally(() => {
                setIsLoading(false);
            });
        } else {
            setUser(null);
            setIsLoggedIn(false);
        }
    }, []);

    const logout = () => {
        Swal.fire({
            title: '¿Estás seguro de que quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Cookies.remove('token');
                Cookies.remove('isLoggedIn');
                Cookies.remove('user');
                Cookies.remove('permisosAndPrivileges');
                Cookies.remove('privileges');
                setUser(null);
                setIsLoggedIn(false);
                Swal.fire({
                    icon: 'success',
                    title: '¡Hasta luego!',
                    text: 'Tu sesión ha sido cerrada.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        });
    }
    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

