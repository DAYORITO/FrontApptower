import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import { LoadingPage } from '../Pages/PagesAdicional/Loading';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState([{}]);

    console.log(error, 'error AuthContext');


    const login = async (usuario, password) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, password }),
                credentials: 'include',
            });

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('permisosAndPrivileges', JSON.stringify(data.permisosAndPrivileges));

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Usuario o contraseña incorrectos.',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsLoggedIn(false);
                setUser(null);
                setError(data.errors);
                localStorage.setItem('isLoggedIn', 'false');
                return;
            }

            setError(response.errors);

            if (data.user && typeof data.user === 'string') {
                try {
                    const user = JSON.parse(decodeURIComponent(data.user));
                    setUser(user);
                } catch (e) {
                    console.error('Error parsing user data:', e);
                }
            }
            await fetchUserData(data.token);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);


            return data.token;

        } catch (error) {
            console.error('Error de inicio de sesión:', error.message);
            setIsLoggedIn(false);
            setUser(null);
            localStorage.setItem('isLoggedIn', 'false');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token)
                .then(() => setIsLoggedIn(true))
                .catch(() => setIsLoggedIn(false))
                .finally(() => setIsLoading(false));

            const timer = setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('isLoggedIn', 'false');
                localStorage.removeItem('user');
                localStorage.removeItem('permisosAndPrivileges');
                setIsLoggedIn(false);
            }, 45 * 60 * 1000);

            return () => clearTimeout(timer);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const timerId = setTimeout(() => {
        console.log('Esta función se ejecutará después de 5 segundos');
    }, 5000);


    clearTimeout(timerId);


    const fetchUserData = (token) => {
        if (!token) {
            console.error('Token not found in localStorage');
            return;
        }
        return fetch('https://apptowerbackend.onrender.com/api/login/access', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
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
                            localStorage.setItem('isLoggedIn', 'true');
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
                localStorage.setItem('isLoggedIn', 'false');
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token)
                .then(() => setIsLoggedIn(true))
                .catch(() => setIsLoggedIn(false))
                .finally(() => setIsLoading(false));
        } else {
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
                localStorage.removeItem('token');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                localStorage.removeItem('permisosAndPrivileges');
                setUser(null);
                setIsLoggedIn(false);
                Swal.fire({
                    icon: 'success',
                    title: '¡Hasta luego!',
                    text: 'Tu sesión ha sido cerrada.',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.href = '/#/';
            }
        });
    };
    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, isLoading, error, setError }}>
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