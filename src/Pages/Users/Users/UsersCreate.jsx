import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../../Components/Forms/FormContainer';
import FormColumn from '../../../Components/Forms/FormColumn';
import Inputs from '../../../Components/Inputs/Inputs';
import FormButton from '../../../Components/Forms/FormButton';
import Swal from 'sweetalert2';
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import { docTypes, residentsTypes, sexs } from '../../../Hooks/consts.hooks'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { useFetchForFile, useFetchget } from '../../../Hooks/useFetch';
import Select2 from '../../../Components/Inputs/Select2'


export const UsersCreate = () => {
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
    const [selectedEnterprice, setSelectedEnterprice] = useState(null);
    const [enterprice, setEnterprice] = useState(null);

    console.log(pdf, 'aqui estoy file')



    //campos adicionales de residentes y vigilantes
    const [sex, setSex] = useState("");
    const [birthday, setBirthday] = useState("");
    const [residentType, setResidentType] = useState("");
    const [dateOfbirth, setDateOfBirth] = useState("");
    console.log(dateOfbirth, 'aqui estoy date Daniel Rivera')



    const fetchRoles = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/rols');
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
            setRoles(rolesData);
        };
        fetchRolesData();
    }, []);



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

    const opcionesRols = roles.map(rol => ({
        value: rol.idrole.toString(),
        label: rol.namerole
    }));

    const handleSubmit = async (event) => {
        // const formattedDate = new Date(dateOfbirth).toISOString().split('T')[0];
        event.preventDefault();

        try {
            const userResponse = await useFetchForFile('http://localhost:3000/api/users', {
                docType: documentType,
                name,
                email,
                password,
                idrole,
                document,
                lastName: lastname,
                phone,
                pdf,
                dateOfbirth,
                state: 'Activo'
            });

            if (userResponse.response) {

                if (namerole === 'Residente' || namerole === 'Residentes') {
                    let roleResponse;
                    roleResponse = await useFetchForFile('http://localhost:3000/api/residents', {
                        docType: documentType,
                        docNumber: document,
                        name,
                        lastName: lastname,
                        sex,
                        birthday,
                        password,
                        email,
                        phoneNumber: phone,
                        residentType,
                        pdf,
                        status: 'Active'
                    });
                } else if (namerole === 'Vigilante' || namerole === 'Vigilantes' || namerole === 'Seguridad') {
                    roleResponse = await useFetchForFile('http://localhost:3000/api/watchman'
                    , 
                    {
                        namewatchman: name,
                        lastnamewatchman: lastname,
                        documentType,
                        document,
                        idEnterpriseSecurity: selectedEnterprice ? selectedEnterprice.idEnterpriseSecurity : null,
                        phone,
                        email,
                        dateOfbirth,
                        state: 'Activo'
                    });
                }



                if (userResponse.response) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Usuario creado exitosamente',
                        icon: 'success',
                    }).then(() => {
                        navigate('/admin/users');
                    });
                } else {
                    console.error('Error al crear el rol del usuario:');
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al crear el rol del usuario',
                        icon: 'error',
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al crear usuario',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const { data, load, error } = useFetchget('apartments')

    const apartmentList = data && data.apartments
        ? data.apartments
            .filter(apartment => apartment.status === 'Active')
            .map(apartment => ({
                value: apartment.idApartment,
                label: apartment.apartmentName
            }))
        : [];

    console.log(apartmentList)


    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')



    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity ? dataEnterprice.enterpriseSecurity.map(enterprice => ({
        value: enterprice.idEnterpriseSecurity,
        label: enterprice.nameEnterprice
    })) : [];


    const handleEnterpriceSecurity = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        console.log("Selected Value:", selectedValueAsNumber);
        setEnterprice(selectedValueAsNumber);

        const selectedEnterprice = dataEnterprice.enterpriseSecurity.find(
            enterprice => enterprice.idEnterpriseSecurity === selectedValueAsNumber
        );

        if (selectedEnterprice) {
            setSelectedEnterprice(selectedEnterprice.idEnterpriseSecurity);
        } else {

            console.error("Selected Enterprice not found or undefined");
            setSelectedEnterprice(null);
        }
    };
    return (
        <>
            <FormContainer
                name='Crear Usuario'
                buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/users/' onClick={handleSubmit} />}
            >

                <InputsSelect
                    id="select"
                    options={opcionesRols}
                    value={idrole}
                    name="Rol"
                    onChange={(e) => {
                        setIdRole(e.target.value);
                        const selectedRole = roles.find(rol => rol.idrole === Number(e.target.value));
                        setRole(selectedRole ? selectedRole.namerole : "");
                        setShowForm(true);
                    }}
                ></InputsSelect>

                {showForm && (
                    <>
                        {namerole === 'Residente' || namerole === 'Residentes' ? (
                            <>
                                <FormColumn>
                                    <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} />
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                                    <Inputs name="Numero de telefono" value={phone} onChange={e => setPhone(e.target.value)} type='number'></Inputs>
                                    <Inputs name="Fecha de nacimiento" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} ></Inputs>
                                    <InputsSelect id={"select"} options={sexs} name={"Sexo"} value={sex} onChange={e => setSex(e.target.value)}></InputsSelect>
                                </FormColumn>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"} value={documentType} onChange={e => setDocumentType(e.target.value)}
                                    ></InputsSelect>
                                    <Inputs name="Numero de documento" type='number' placeholder="1000000007" value={document} onChange={e => setDocument(e.target.value)}></Inputs>
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)}></Inputs>
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)}></Inputs>
                                    <InputsSelect id={"select"} options={residentsTypes} name={"Tipo residente"} value={residentType} onChange={e => setResidentType(e.target.value)}></InputsSelect>
                                    <InputsSelect id={"select"} options={apartmentList} name={"Apartamento"} ></InputsSelect>
                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />


                                </FormColumn>
                            </>
                        ) : namerole === 'Vigilante' || namerole === 'Vigilantes' || namerole === 'Seguridad' ? (
                            <>
                                <FormColumn>
                                    <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
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
                        ) : namerole === 'Admin' || namerole === 'Administrador' || namerole === 'Super Administrador' ? (

                            <>
                                <FormColumn>
                                    <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} />
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                                    <Inputs name="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} />
                                </FormColumn>

                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} onChange={e => setDocumentType(e.target.value)} value={documentType}></InputsSelect>
                                    <Inputs name="Documento" type='number' value={document} onChange={e => setDocument(e.target.value)} />
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} />
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} />
                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                </FormColumn>
                            </>
                        ) :
                            <>
                                <FormColumn>
                                    <Uploader name='pdf' label='Documento de indentidad' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} />
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                                    <Inputs name="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} />
                                </FormColumn>

                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} onChange={e => setDocumentType(e.target.value)} value={documentType}></InputsSelect>
                                    <Inputs name="Documento" type='number' value={document} onChange={e => setDocument(e.target.value)} />
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} />
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} />
                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                </FormColumn>

                            </>}
                    </>
                )}

            </FormContainer>
        </>
    );
};