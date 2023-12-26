import React, { useState } from 'react'
import { useFetchpost } from '../../../Hooks/useFetch'
import FormContainer from '../../../Components/Forms/FormContainer'
import FormColumn from '../../../Components/Forms/FormColumn'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
// import InputsSelect from "../../../Components/Inputs/InputsSelect";

export const EnterpriceSecurityCreate = () => {
    const [nameEnterprice, setNameEnterprice] = useState("");
    const [email, setEmail] = useState("");
    const [NIT, setNIT] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'enterpricesecurity';
        const data = {
            nameEnterprice,
            NIT,
            email,
            address,
            phone,
        };

        console.log('Data:', data);

        const { response, error } = await useFetchpost(url, data);



        if (response) {
            console.log('Response:', response);
            Swal.fire({
                title: 'Éxito',
                text: 'Empresa creada exitosamente',
                icon: 'success',
            }).then(() => {

                navigate('/admin/watchman/enterprice');
            });
        }

        if (error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error al crear la empresa',
                icon: 'error',
            });
        }
    };

    return (
        <>

            <FormContainer name='Crear Empresa' buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/watchman/enterprice' onClick={handleSubmit} />}>
                <FormColumn>
                    <Inputs name="Nombre Empresa" type='text' value={nameEnterprice} onChange={e => setNameEnterprice(e.target.value)}></Inputs>
                    <Inputs name="Dirección" type='text' value={address} onChange={e => setAddress(e.target.value)}></Inputs>
                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} ></Inputs>

                </FormColumn>

                <FormColumn>
                    <Inputs name="NIT" type='number' value={NIT} onChange={e => setNIT(e.target.value)} ></Inputs>
                    <Inputs name="Teléfono" type='number' value={phone} onChange={e => setPhone(e.target.value)}></Inputs>

                </FormColumn>


            </FormContainer>
        </>
    )
}

