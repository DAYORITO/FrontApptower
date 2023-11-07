import React from 'react'
import FormContainer from '../../Components/Forms/FormContainer'
import FormColumn from '../../Components/Forms/FormColumn'
import Inputs from '../../Components/Inputs/Inputs'
import { ContainerHeader } from '../../Components/ContainerHeader/containerHeader'


export const UsersCreate = () => {
    return (
        <>

            <FormContainer name='Crear Usuario'>
                <FormColumn>
                    <Inputs name="Tipo Documento" placeholder="Ingresa tipo de documento"></Inputs>
                    <Inputs name="Nombre" type='text' placeholder="Ingresa tu nombre"></Inputs>
                    <Inputs name="Correo" placeholder="Ingresa tu correo"></Inputs>
                    <Inputs name="Contraseña" type='password' placeholder="Ingresa tu contraseña"></Inputs>
                    <Inputs name="Rol" placeholder="Ingrese un rol"></Inputs>
                </FormColumn>

                <FormColumn>
                    <Inputs name="Documento" type='number' placeholder="Ingresa tu documento"></Inputs>
                    <Inputs name="Apellido" type='text' placeholder="Ingresa tu apellido"></Inputs>
                    <Inputs name="Teléfono" placeholder="Ingresa tu teléfono"></Inputs>
                    <Inputs name="Confirmar Contraseña" type='password' placeholder='Ingresa tu contraseña'></Inputs>

                </FormColumn>


            </FormContainer>
        </>
    )
}

