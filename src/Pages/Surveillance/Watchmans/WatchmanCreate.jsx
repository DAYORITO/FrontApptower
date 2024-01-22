import React, { useState, useEffect } from 'react'
import { useFetchget, useFetchpost, useFetchpostFile } from '../../../Hooks/useFetch'
import FormContainer from '../../../Components/Forms/FormContainer'
import FormColumn from '../../../Components/Forms/FormColumn'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import { Uploader } from '../../../Components/Uploader/Uploader'
import Select2 from '../../../Components/Inputs/Select2'


export const WatchmanCreate = () => {
    const [documentType, setDocumentType] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idrole, setIdRole] = useState("");
    const [namerole, setRole] = useState("");
    const [document, setDocument] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pdf, setPdf] = useState("");
    const [showForm, setShowForm] = useState(false);
    console.log(pdf, 'aqui estoy file')
    const [dateOfbirth, setDateOfBirth] = useState("");
    const [nameEnterprice, setNameEnterprice] = useState(null)
    const [selectedEnterprice, setSelectedEnterprice] = useState(null);
    const [enterprice, setEnterprice] = useState(null);
    console.log(enterprice, 'aqui estoy enterprice')


    const navigate = useNavigate();

    const opciones = [
        {
            value: "CC",
            label: "CC"
        },
        {
            value: "CE",
            label: "CE"
        }
    ];



    const fetchRoles = async () => {
        try {
            const response = await fetch('https://apptowerbackend.onrender.com/api/rols');
            if (!response.ok) {
                throw new Error('Error al obtener los roles');
            }
            const data = await response.json();
            const rolesData = data.rols || [];
            return rolesData;
        } catch (error) {
            console.error('Error al obtener los roles:', error);
            return [];
        }
    };


    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRolesData = async () => {
            const rolesData = await fetchRoles();
            const filteredRoles = rolesData.filter(rol => ['Vigilante', 'Vigilantes', 'Seguridad'].includes(rol.namerole));
            setRoles(filteredRoles);


            const defaultRole = filteredRoles.find(rol => rol.namerole === 'Vigilante' || rol.namerole === 'Seguridad' || rol.namerole === 'Vigilantes');
            if (defaultRole) {
                setIdRole(defaultRole.idrole.toString());
                setRole(defaultRole.namerole);
                setShowForm(true);
            }
        };
        fetchRolesData();
    }, []);

    const opcionesRols = roles.map(rol => ({
        value: rol.idrole.toString(),
        label: rol.namerole
    }));



    const handleSubmit = async (event) => {
        event.preventDefault();

        const idEnterpriseSecurity = selectedEnterprice ? selectedEnterprice.idEnterpriseSecurity : null;

        const userResponse = await useFetchpostFile('http://localhost:3000/api/watchman', {
            documentType,
            namewatchman: name,
            email,
            document,
            idEnterpriseSecurity: idEnterpriseSecurity,
            lastnamewatchman: lastname,
            phone,
            dateOfbirth,
            state: 'Activo'
        });


        console.log('userResponse', userResponse);


        if (userResponse.response) {
            let roleResponse;
            roleResponse = await useFetchpostFile('http://localhost:3000/api/users', {
                docType: documentType,
                name,
                email,
                password,
                idrole,
                document,
                lastName: lastname,
                phone,
                pdf,
                state: 'Activo'
            });
        }

        if (userResponse.response) {

            Swal.fire({
                title: 'Éxito',
                text: 'Vigilante creado exitosamente',
                icon: 'success',
            }).then(() => {

                navigate('/admin/watchman');
            });
        }

        if (userResponse.error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error al crear vigilante',
                icon: 'error',
            });
        }
    };

    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')



    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity ? dataEnterprice.enterpriseSecurity.map(enterprice => ({
        value: enterprice.idEnterpriseSecurity,
        label: enterprice.nameEnterprice
    })) : [];


    const handleEnterpriceSecurity = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        console.log("Selected Value:", selectedValueAsNumber);
        setEnterprice(selectedValueAsNumber);

        setSelectedEnterprice(selectedValueAsNumber);
    };



    console.log('enterpriceOptions', enterpriceOptions);



    return (
        <>

            <FormContainer name='Crear Vigilante' buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/watchman/' onClick={handleSubmit} />}>
                <InputsSelect
                    id="select"
                    options={opcionesRols}
                    value={idrole}
                    name="Rol"
                    onChange={(e) => {
                        setIdRole(e.target.value);
                        const selectedRole = roles.find(rol => rol.idrole === Number(e.target.value));
                        setRole(selectedRole ? selectedRole.namerole : "");
                        setShowForm(['Vigilante', 'Vigilantes', 'Seguridad'].includes(selectedRole ? selectedRole.namerole : ""));
                    }}
                ></InputsSelect>

                {showForm && (
                    <>
                        <FormColumn>
                            <Uploader name='pdf' label='Documento de Identidad' formatos='.pdf'
                                onChange={e => setPdf(e.target.files[0])} />
                            <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                            <Inputs name="Teléfono" type='number' value={phone} onChange={e => setPhone(e.target.value)}></Inputs>

                            <Inputs name="Fecha Nacimiento" type="date" value={dateOfbirth} onChange={e => setDateOfBirth(e.target.value)}></Inputs>

                        </FormColumn>

                        <FormColumn>
                            <div className="mr-1" style={{ width: '100%' }}>

                                <Select2 name={'Empresa de Seguridad'} onChange={handleEnterpriceSecurity} options={enterpriceOptions}></Select2>
                            </div>
                            <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={documentType} onChange={e => setDocumentType(e.target.value)}></InputsSelect>
                            <Inputs name="Documento" type='number' value={document} onChange={e => setDocument(e.target.value)} ></Inputs>
                            <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} ></Inputs>
                            <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} ></Inputs>

                            <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                        </FormColumn>
                    </>


                )}
            </FormContainer >
        </>
    )
}

