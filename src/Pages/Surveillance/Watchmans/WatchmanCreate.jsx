import React, { useState, useEffect } from 'react'
import { useFetchget, useFetchpost, useFetchForFile } from '../../../Hooks/useFetch'
import FormContainer from '../../../Components/Forms/FormContainer'
import FormColumn from '../../../Components/Forms/FormColumn'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import { Uploader } from '../../../Components/Uploader/Uploader'
import Select2 from '../../../Components/Inputs/Select2'
import { useParams } from 'react-router-dom'


export const WatchmanCreate = () => {
    const { id } = useParams();
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
    const [dateOfbirth, setDateOfBirth] = useState("");
    const [nameEnterprice, setNameEnterprice] = useState(null)
    const [selectedEnterprice, setSelectedEnterprice] = useState(null);
    const [enterprice, setEnterprice] = useState(id || null);
    const [errors, setErrors] = useState([]);

    console.log(errors, 'errors')




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

    const birthDate = new Date(dateOfbirth);


    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    const { data: rolesData, error } = useFetchget('rols');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (error) {
            console.error('Error al obtener los roles:', error);
        } else if (rolesData) {
            const roles = rolesData.rols || [];
            const filteredRoles = roles.filter(rol => ['Vigilante', 'Vigilantes', 'Seguridad'].includes(rol.namerole));

            setRoles(filteredRoles);

            const defaultRole = filteredRoles.find(rol => rol.namerole === 'Vigilante' || rol.namerole === 'Seguridad' || rol.namerole === 'Vigilantes');
            if (defaultRole) {
                setIdRole(defaultRole.idrole.toString());
                setRole(defaultRole.namerole);
                setShowForm(true);
            }
        }
    }, [rolesData, error]);

    const opcionesRols = roles
        ? roles
            .filter(rol => rol.state === "Activo")
            .map(rol => ({
                value: rol.idrole,
                label: rol.namerole
            }))
        : [];

    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')



    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity
        ? dataEnterprice.enterpriseSecurity
            .filter(enterprice => enterprice.state === "Activo")
            .map(enterprice => ({
                value: enterprice.idEnterpriseSecurity,
                label: enterprice.nameEnterprice
            }))
        : [];


    const defaultOption = enterpriceOptions.find(option => option.value === Number(id));

    const handleEnterpriceSecurity = (selectedOption) => {
        console.log("Selected Option:", selectedOption);
        if (selectedOption) {
            setEnterprice(selectedOption.value);
            setSelectedEnterprice(selectedOption);
        } else if (defaultOption) {
            setEnterprice(defaultOption.value);
            setSelectedEnterprice(defaultOption);
        }
    };

    const [isDocumentTaken, setIsDocumentTaken] = useState(false);
    const [isEmailTaken, setIsEmailTaken] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/api/users/document/${document}`)
            .then(response => response.json())
            .then(data => {
                setIsDocumentTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [document]);


    useEffect(() => {
        fetch(`http://localhost:3000/api/users/email/${email}`)
            .then(response => response.json())
            .then(data => {
                setIsEmailTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [email]);


    console.log('enterpriceOptions', enterpriceOptions);

    const [shouldValidate, setShouldValidate] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();



        if (isDocumentTaken || isEmailTaken) {
            Swal.fire({
                title: 'Error',
                text: 'El documento o el correo ya existen',
                icon: 'error',
            });
            return;
        }

        // if (!enterprice) {
        //     Swal.fire({
        //         title: 'Error',
        //         text: 'Por favor, seleccione una empresa de seguridad',
        //         icon: 'error',
        //     });
        //     return;
        // }

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
            });
            return;
        }


        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
            });
            return;
        }

        if (age < 18) {
            Swal.fire({
                title: 'Error',
                text: 'Debe de ser mayor de edad',
                icon: 'error',
            });
            return;
        }

        let userResponse;
        userResponse = await useFetchForFile('http://localhost:3000/api/users', {
            docType: documentType,
            name,
            email,
            password,
            idrole: Number(idrole),
            document,
            birthday: dateOfbirth,
            lastName: lastname,
            phone,
            pdf,
            state: 'Activo',
            idEnterpriseSecurity: enterprice,
        });

        if (userResponse.response) {
            const watchmanResponse = await useFetchForFile('http://localhost:3000/api/watchman', {
                idEnterpriseSecurity: userResponse.response.idEnterpriseSecurity,
                iduser: userResponse.response.iduser,
            });

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
        setErrors(userResponse?.error?.errors);
    };

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
                    required={false}
                    StyleInput={{ width: '100%', marginRight: '3.8rem' }}
                    containerStyle={{ width: '97%', marginLeft: '0.9rem' }}
                ></InputsSelect>

                {opcionesRols.length > 0 && showForm ? (
                    <>
                        <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Informacion personal</h6>
                        <FormColumn>
                            <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={documentType} onChange={e => setDocumentType(e.target.value)} errors={error} identifier={'docType'}></InputsSelect>

                        </FormColumn>

                        <FormColumn>
                            <Inputs
                                name="Documento"
                                type='number'
                                value={document}
                                onChange={e => setDocument(e.target.value)}
                                inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                errorMessage={isDocumentTaken ? "El documento ya existe" : null}

                                errors={error} identifier={'document'}
                            />
                        </FormColumn>

                        <FormColumn>
                            <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} errors={error} identifier={'name'} ></Inputs>
                        </FormColumn>

                        <FormColumn>
                            <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} errors={error} identifier={'lastName'}></Inputs>
                        </FormColumn>


                        <FormColumn>
                            <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} errors={error} identifier={'email'}
                                inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                errorMessage={isEmailTaken ? "El correo ya existe" : null}

                            />
                        </FormColumn>

                        <FormColumn>

                            <Select2 placeholder={'Empresa de Seguridad'} value={selectedEnterprice || defaultOption} onChange={handleEnterpriceSecurity} options={enterpriceOptions} errors={error} identifier={'idEnterpriseSecurity'}></Select2>
                        </FormColumn>
                        <FormColumn>
                            <Inputs name="Teléfono" type='number' value={phone} onChange={e => setPhone(e.target.value)} errors={error} identifier={'phone'}></Inputs>
                            <Uploader name='pdf' label='Carga de documento' formatos='.pdf'
                                onChange={e => setPdf(e.target.files[0])} />
                        </FormColumn>

                        <FormColumn>

                            <Inputs name="Fecha Nacimiento" type="date" value={dateOfbirth} onChange={e => setDateOfBirth(e.target.value)} errors={error} identifier={'birthday'}
                                inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}></Inputs>
                            <h6 className='mb-4 text-muted'>Datos de acceso</h6>
                            <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} errors={error} identifier={'password'} />
                            <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} errors={error} identifier={''} />



                        </FormColumn>

                    </>


                ) : null}
            </FormContainer >
        </>
    )
}

