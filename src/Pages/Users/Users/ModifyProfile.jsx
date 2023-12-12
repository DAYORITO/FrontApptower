import React, { useState, useEffect } from 'react'
import { TablePerson } from '../../../Components/Tables/Tables'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import './User.css'
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import FormContainer from '../../../Components/Forms/FormContainer';

export const ModifyProfile = () => {
    const token = Cookies.get('token');
    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
    });

    const [editedName, setEditedName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [editedPassword, setEditedPassword] = useState('');


    useEffect(() => {
        if (token) {
            fetchUserInformation(token);
        }
    }, [token]);

    const fetchUserInformation = async (token) => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/informationUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }

            const data = await response.json();
            setUserData(data);

        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };



    const putInformationUser = async () => {

        setUserData(prevUserData => ({
            ...prevUserData,
            user: {
                ...prevUserData.user,
                name: editedName,
                lastname: editedLastName,
                email: editedEmail,
                phone: editedPhone,
                // password: editedPassword,
            },
        }));

        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/informationUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                Swal.fire('Error', 'No se pudo actualizar la información del usuario', 'error');
            }

            const data = await response.json();
            console.log('Data:', data);

            Swal.fire('Información actualizada', 'La información del usuario se actualizó correctamente', 'success');
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };
    return (
        <>
            <FormContainer name='Modificar Perfil'>


                <div className="container-profile">
                    <div className="profile-content">
                        <div className="profile-image">
                            <span className='icon fe fe-user text-muted custom-icon'></span>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="information-user">
                            {/* <div className="user-detail">
                                    <div className="input-container">
                                        <select name="" className='custom-input' id="">
                                            <option value="">Tipo de documento</option>
                                            <option value="">Cédula de ciudadanía</option>
                                            <option value="">Cédula de extranjería</option>
                                            <option value="">Pasaporte</option>
                                        </select>
                                        <label className="custom-label">Nombre</label>
                                    </div>
                                    <div className="input-container">
                                        <input type="text" className="custom-input" placeholder=' ' />
                                        <label className="custom-label">Documento</label>
                                    </div>
                                </div> */}
                            <div className="user-detail">
                                <div className="input-container">
                                    <input
                                        type="text"
                                        className="custom-input"
                                        placeholder=' '
                                        value={editedName || userData?.user?.name || ''}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                    <label className="custom-label">Nombre</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        className="custom-input"
                                        placeholder=' '
                                        value={editedLastName || userData?.user?.lastname || ''}
                                        onChange={(e) => setEditedLastName(e.target.value)}
                                    />
                                    <label className="custom-label">Apellido</label>
                                </div>
                            </div>



                            <div className="user-detail">
                                <div className="input-container">
                                    <input
                                        type="text"
                                        className="custom-input"
                                        placeholder=' '
                                        value={editedEmail || userData?.user?.email || ''}
                                        onChange={(e) => setEditedEmail(e.target.value)}
                                    />
                                    <label className="custom-label">Correo</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        className="custom-input"
                                        placeholder=' '
                                        value={editedPhone || userData?.user?.phone || ''}
                                        onChange={(e) => setEditedPhone(e.target.value)}
                                    />
                                    <label className="custom-label">Teléfono</label>
                                </div>
                            </div>

                            <div className="user-detail">
                                <div className="input-container">
                                    <input type="password" className="custom-input" placeholder=' ' />
                                    <label className="custom-label">Contraseña</label>
                                </div>
                                <div className="input-container">
                                    <input type="text" className="custom-input" placeholder=' ' />
                                    <label className="custom-label">Confirmar Contraseña</label>
                                </div>
                            </div>
                            <div className="edit-buttons">
                                <button className="btn-edit" onClick={putInformationUser}>Guardar</button>
                                <NavLink to="/admin/users/profileList" className="btn-back">Cancelar</NavLink>
                            </div>
                        </div>
                    </div>

                </div>


            </FormContainer>

        </>
    )
}