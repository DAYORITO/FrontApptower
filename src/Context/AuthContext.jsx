import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchUserData = (token) => {
        fetch('https://apptowerbackend.onrender.com/api/login/access', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el usuario');
                }
                return response.json();
            })
            .then(data => {
                setIsLoggedIn(true);
                setUser(data.user);
            })
            .catch(error => {
                console.error('Error al obtener el usuario:', error.message);
                setIsLoggedIn(false);
                setUser(null);
            });
    };

    const login = async (usuario, password) => {

        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, password }),
            });

            if (!response.ok) {

                Swal.fire('Error de inicio de sesión', 'El usuario o la contraseña son incorrectos.', 'error');
            }

            const data = await response.json();

            document.cookie = `token=${data.token}; path=/`;
            console.log('Token set in cookie:', data.token);

            fetchUserData(data.token);

            return data.token;
        } catch (error) {
            console.error('Error de inicio de sesión:', error.message);

        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        console.log('Token:', token);

        if (token) {
            fetchUserData(token);
        } else {
            setIsLoggedIn(false);
            setUser(null);


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
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
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
