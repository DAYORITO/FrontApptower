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
import { is, tr } from 'date-fns/locale';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserLogged } from '../../../Helpers/Helpers';
import { set } from 'date-fns';


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
    const { id } = useParams();

    //campos adicionales de residentes y vigilantes
    const [sex, setSex] = useState("");
    const [birthday, setBirthday] = useState("");
    const [residentType, setResidentType] = useState("");
    const [dateOfbirth, setDateOfBirth] = useState("");
    const [idApartment, setIdApartment] = useState("");
    const [errors, setErrors] = useState([{}]);
    console.log(errors, "errors daata holaaa")



    const birthDate = new Date(dateOfbirth || birthday);

    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }



    const { data: roles } = useFetchget('rols');

    const { idUserLogged } = useUserLogged()



    useEffect(() => {
        if (id && roles && roles.rols) {
            const selectedRole = roles.rols.find(rol => rol.idrole === Number(id));
            if (selectedRole) {
                setIdRole(selectedRole.idrole);
                setRole(selectedRole.namerole.toLowerCase());
                setShowForm(true);
            }
        }
    }, [id, roles]);


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

    const rol = roles && roles.rols ? roles.rols.find(rol => rol.idrole === id) : undefined;

    const opcionesRols = rol ? [{
        value: id,
        label: rol.namerole
    }] : roles && roles.rols ? roles.rols
        .filter(rol => rol.state === "Activo")
        .map(rol => ({
            value: rol.idrole,
            label: rol.namerole
        })) : [];

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

    const [shouldValidate, setShouldValidate] = useState(false);


    const handleSubmit = async (event) => {
        // const formattedDate = new Date(dateOfbirth).toISOString().split('T')[0];
        event.preventDefault();
        setShouldValidate(true);



        if (isDocumentTaken || isEmailTaken) {
            Swal.fire({
                title: 'Error',
                text: 'El documento o el correo ya existen',
                icon: 'error',
            });
            return;
        }


        if (namerole === 'Vigilate' || namerole === 'Vigilantes' || namerole === 'Seguridad' && !enterprice) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, seleccione una empresa de seguridad',
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

        try {
            const userResponse = await useFetchForFile('http://localhost:3000/api/users', {

                // User logged

                idUserLogged: idUserLogged,

                docType: documentType,
                name,
                email,
                password,
                passwordConfirm: confirmPassword,
                idrole,
                document,
                lastName: lastname,
                phone,
                pdf,
                birthday: dateOfbirth ? dateOfbirth : birthday,
                sex: sex ? sex : 'No proporcionado',
                status: 'Activo',
                idEnterpriseSecurity: enterprice,
                residentType: residentType,
                idApartment: idApartment

            });

            if (userResponse.response) {

                if (namerole === 'Residente' || namerole === 'Residentes') {

                    await useFetchForFile('http://localhost:3000/api/residents', {
                        residentType: userResponse.response.residentType,
                        iduser: userResponse.response.iduser,
                        idApartment: userResponse.response.idApartment,
                    });
                } else if (namerole === 'Vigilante' || namerole === 'Vigilantes' || namerole === 'Seguridad') {
                    await useFetchForFile('http://localhost:3000/api/watchman',
                        {
                            iduser: userResponse.response.iduser,
                            idEnterpriseSecurity: userResponse.response.idEnterpriseSecurity,
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
                    shouldValidate(true)
                } else {
                    console.error('Error al crear el rol del usuario:');
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al crear el rol del usuario',
                        icon: 'error',
                    });
                    // setErrors(userResponse?.errorData);
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al crear usuario',
                    icon: 'error',
                });
                setErrors(userResponse?.error);
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
        setErrors([]);
        console.log("Selected Option:", selectedOption);
        if (selectedOption) {
            setEnterprice(selectedOption.value);
            setSelectedEnterprice(selectedOption);
        } else if (defaultOption) {
            setEnterprice(defaultOption.value);
            setSelectedEnterprice(defaultOption);
        }
    };
    return (
        <>
            <FormContainer
                name='Crear usuario'
                buttons={<FormButton name='Crear' backButton='Cancelar' to='/admin/users/' onClick={handleSubmit} />}
            >

                <InputsSelect
                    id="select"
                    options={opcionesRols}
                    value={idrole ? idrole : id}
                    name="Rol"
                    onChange={(e) => {
                        setIdRole(e.target.value);
                        const selectedRole = roles.rols.find(rol => rol.idrole === Number(e.target.value));
                        setRole(selectedRole ? selectedRole.namerole.toLowerCase() : "");
                        setShowForm(true);
                    }}
                    StyleInput={{ width: '100%', marginRight: '3.8rem' }}
                    containerStyle={{ width: '97%', marginLeft: '0.9rem' }}
                    required={false}
                ></InputsSelect>


                {showForm && (
                    <>
                        {namerole.includes('residente') ? (
                            <>

                                <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Información personal</h6>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={docTypes} name={"Tipo documento"} value={documentType} onChange={e => { setDocumentType(e.target.value); setErrors([]) }} errors={errors} identifier={'docType'}
                                    ></InputsSelect>
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Documento" type='number' value={document} onChange={e => { setDocument(e.target.value); setErrors([]) }}
                                        errors={errors} identifier={'document'}
                                        inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isDocumentTaken ? "El documento ya existe" : null}
                                    ></Inputs>
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => { setName(e.target.value); setErrors([]) }} errors={errors} identifier={'name'} ></Inputs>

                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => { setLastName(e.target.value); setErrors([]) }} errors={errors} identifier={'lastName'} ></Inputs>

                                </FormColumn>

                                <FormColumn>

                                    <Inputs name="Correo" type='email' value={email} onChange={e => { setEmail(e.target.value); setErrors([]) }} errors={errors} identifier={'email'}
                                        inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isEmailTaken ? "El correo ya existe" : null}

                                    />
                                    <Uploader name='pdf' label='Carga de documento' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />


                                </FormColumn>

                                <FormColumn>


                                    <Inputs name="Teléfono" value={phone} onChange={e => { setPhone(e.target.value); setErrors([]) }} type='number' errors={errors} identifier={'phone'} ></Inputs>

                                    <InputsSelect id={"select"} options={sexs} name={"Género"} value={sex} onChange={e => { setSex(e.target.value); setErrors([]) }} required={false} errors={errors} identifier={'sex'} ></InputsSelect>

                                    <Inputs name="Fecha de nacimiento" type="date" value={birthday} onChange={e => { setBirthday(e.target.value); setErrors([]) }}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}
                                        errors={errors} identifier={'birthday'}
                                    ></Inputs>

                                    <InputsSelect
                                        id={"select"}
                                        options={apartmentList}
                                        name={"Apartamento"}
                                        value={idApartment}
                                        onChange={e => { setIdApartment(e.target.value); setErrors([]) }}
                                        errors={errors}
                                        identifier={'idApartment'}
                                    ></InputsSelect>

                                    <InputsSelect id={"select"} options={residentsTypes} name={"Tipo residente"} value={residentType} onChange={e => { setResidentType(e.target.value); setErrors([]) }} errors={errors} identifier={'residentType'} ></InputsSelect>


                                </FormColumn>

                            </>
                        ) : namerole.includes('vigilante') || namerole.includes('vigilancia') || namerole.includes('seguridad') ? (
                            <>
                                <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Información personal</h6>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo documento"} value={documentType} onChange={e => { setDocumentType(e.target.value); setErrors([]) }} errors={errors} identifier={'docType'}  ></InputsSelect>
                                </FormColumn>

                                <FormColumn>
                                    <Inputs
                                        name="Documento"
                                        type='number'
                                        value={document}
                                        onChange={e => { setDocument(e.target.value); setErrors([]) }}
                                        inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isDocumentTaken ? "El documento ya existe" : null}
                                        identifier={"document"}
                                        errors={errors}

                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => { setName(e.target.value); setErrors([]) }} errors={errors} identifier={'name'}  ></Inputs>
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => { setLastName(e.target.value); setErrors([]) }} errors={errors} identifier={'lastName'} ></Inputs>
                                </FormColumn>

                                <FormColumn>

                                    <Uploader name='pdf' label='Carga de documento' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />

                                </FormColumn>

                                <FormColumn>
                                    <Select2 placeholder={'Empresa de seguridad'} value={selectedEnterprice || defaultOption} onChange={handleEnterpriceSecurity} options={enterpriceOptions} identifier={"idEnterpriseSecurity"}
                                        errors={errors}></Select2>

                                    <Inputs name="Correo" type='email' value={email} onChange={e => { setEmail(e.target.value); setErrors([]) }} errors={errors} identifier={'email'}
                                        inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isEmailTaken ? "El correo ya existe" : null}

                                    />

                                    <Inputs name="Teléfono" type='number' value={phone} onChange={e => { setPhone(e.target.value); setErrors([]) }} errors={errors} identifier={'phone'} ></Inputs>

                                    <Inputs name="Fecha nacimiento" type="date" value={dateOfbirth} onChange={e => { setDateOfBirth(e.target.value); setErrors([]) }}
                                        errors={errors} identifier={'birthday'}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null} ></Inputs>
                                </FormColumn>

                            </>
                        ) : namerole.includes('admin') ? (

                            <>
                                <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Informacion personal</h6>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo documento"} onChange={e => { setDocumentType(e.target.value); setErrors([]) }} value={documentType} errors={errors} identifier={'docType'} ></InputsSelect>

                                </FormColumn>

                                <FormColumn>
                                    <Inputs
                                        name="Documento"
                                        type='number'
                                        value={document}
                                        onChange={e => { setDocument(e.target.value); setErrors([]) }}
                                        inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isDocumentTaken ? "El documento ya existe" : null}
                                        errors={errors}
                                        identifier={'document'}


                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => { setName(e.target.value); setErrors([]) }} errors={errors} identifier={'name'} />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => { setLastName(e.target.value); setErrors([]) }} errors={errors} identifier={'lastName'} />
                                </FormColumn>

                                <FormColumn>
                                    <Uploader name='pdf' label='Carga de documento' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />


                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Correo" type='email' value={email} onChange={e => { setEmail(e.target.value); setErrors([]) }} errors={errors} identifier={'email'}
                                        inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isEmailTaken ? "El correo ya existe" : null}

                                    />
                                    <Inputs name="Teléfono" value={phone} onChange={e => { setPhone(e.target.value); setErrors([]) }} errors={errors} identifier={'phone'} />

                                    <Inputs name="Fecha de nacimiento" placeholder='Fecha de nacimiento' type="date" value={dateOfbirth} onChange={e => { setDateOfBirth(e.target.value); setErrors([]) }}
                                        errors={errors} identifier={'birthday'}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}></Inputs>

                                </FormColumn>



                            </>
                        ) :
                            <>
                                <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Información personal</h6>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo documento"} onChange={e => { setDocumentType(e.target.value); setErrors([]) }} value={documentType} errors={errors} identifier={'docType'}></InputsSelect>

                                </FormColumn>

                                <FormColumn>
                                    <Inputs
                                        name="Documento"
                                        type='number'
                                        value={document}
                                        onChange={e => { setDocument(e.target.value); setErrors([]) }}
                                        inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isDocumentTaken ? "El documento ya existe" : null}
                                        identifier={"document"}
                                        errors={errors}

                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => { setName(e.target.value); setErrors([]) }}
                                        errors={errors}
                                        identifier={"name"}
                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => { setLastName(e.target.value); setErrors([]) }}
                                        errors={errors}
                                        identifier={"lastName"}
                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Uploader name='pdf' label='Carga de documento' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />


                                </FormColumn>

                                <FormColumn>

                                    <Inputs name="Correo" type='email' value={email} onChange={e => { setEmail(e.target.value); setErrors([]) }}
                                        inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isEmailTaken ? "El correo ya existe" : null}
                                        errors={errors}
                                        identifier={"email"}

                                    />

                                    <Inputs name="Teléfono" value={phone} onChange={e => { setPhone(e.target.value); setErrors([]) }}
                                        errors={errors}
                                        identifier={"phone"}

                                    />


                                    <Inputs name="Fecha de Nacimiento" placeholder='Fecha de nacimiento' type="date" value={dateOfbirth} onChange={e => { setDateOfBirth(e.target.value); setErrors([]) }}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}
                                        errors={errors}
                                        identifier={"birthday"}
                                    ></Inputs>
                                </FormColumn>




                            </>}
                    </>
                )}

            </FormContainer >
        </>
    );
};