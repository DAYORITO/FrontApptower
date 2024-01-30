import React, { useState, useEffect } from 'react'
import { TablePerson } from '../../../Components/Tables/Tables'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import './User.css'
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import FormContainer from '../../../Components/Forms/FormContainer';


export const ModifyProfileList = () => {
    const token = Cookies.get('token');
    const [userData, setUserData] = useState({});

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

        } catch (error) {
            console.error('Error fetching user information:', error);
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
                            <div className='info-user-ob'>
                                <div className="user-detail">
                                    <span>Nombre:</span>
                                    <span> {userData.user?.name ? userData.user.name : ''}
                                        {userData.user?.lastName ? ' ' + userData.user.lastName : ''}</span>
                                </div>

                                <div className="user-detail">
                                    <span>Correo:</span>
                                    <span>{userData.user?.email ? userData.user.email : ''}</span>
                                </div>
                                <div className="user-detail">
                                    <span>Teléfono:</span>
                                    <span>{userData.user?.phone}</span>
                                </div>
                            </div>

                            <div className="edit-buttons">
                                <NavLink to="/admin/users/profile" className="btn-edit">Editar</NavLink>


                            </div>
                        </div>
                    </div>

                </div>
            </FormContainer>

        </>
    )
}