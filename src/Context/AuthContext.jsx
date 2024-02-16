import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const connectSocket = async (user) => {

    const socket = io('http://localhost:3000');
    let menssage;
    socket.on('connect', (menssage) => {
        menssage = `Se conecto ${user.name}${user.lastName}`

        socket.emit('response-connection', menssage)
        console.log(menssage)

        socket.on('response-servidor', menssage => {

            console.log(menssage)
        })

    })

    // socket.on('active-users', data => {

    //     console.log(data, 'data' )
    // })

    socket.on('disconnect', menssage => {
        menssage = `Se desconecto ${user.name} ${user.lastName}`
        console.log(menssage)

    })

    socket.on('receive message', () => {


    })

}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);





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
                setIsLoggedIn(true);
                setUser(data?.role);
                Cookies.set('isLoggedIn', 'true');
            })
            .catch(error => {
                console.error('Error al obtener el usuario:', error.message);
                setIsLoggedIn(false);
                setUser(null);
                Cookies.set('isLoggedIn', 'false');
            });
    };



    const login = async (usuario, password) => {

        try {
            const response = await fetch('http://localhost:3000/api/login', {
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

            console.log(data)

            fetchUserData(data.token);

            await connectSocket(data.user)

            return data.token;

        } catch (error) {
            console.error('Error de inicio de sesión:', error.message);

        }
    };



    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            setIsLoading(true);
            fetchUserData(Cookies.get('token')).finally(() => {
                setIsLoading(false);
            });


        } else {
            setUser(null);
        }
    }, [isLoggedIn]);

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


