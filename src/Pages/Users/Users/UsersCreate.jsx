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


    const birthDate = new Date(dateOfbirth || birthday);


    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }



    const { data: roles } = useFetchget('rols');




    useEffect(() => {
        if (id && roles && roles.rols) {
            const selectedRole = roles.rols.find(rol => rol.idrole === Number(id));
            if (selectedRole) {
                setIdRole(selectedRole.idrole);
                setRole(selectedRole.namerole);
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


        if (!documentType || !name || !email || !password || !document || !lastname || birthday) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, rellene todos los campos requeridos',
                icon: 'error',
            });
            //Activa la validacion de los campos cuando se envia el formulario
            setShouldValidate(true);
            return;
        }

        if (isDocumentTaken || isEmailTaken) {
            Swal.fire({
                title: 'Error',
                text: 'El documento o el correo ya existen',
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
                docType: documentType,
                name,
                email,
                password,
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
                idApartment: Number(idApartment)

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
                    value={idrole ? idrole : id}
                    name="Rol"
                    onChange={(e) => {
                        setIdRole(e.target.value);
                        const selectedRole = roles.rols.find(rol => rol.idrole === Number(e.target.value));
                        setRole(selectedRole ? selectedRole.namerole : "");
                        setShowForm(true);
                    }}
                ></InputsSelect>


                {showForm && (
                    <>
                        {namerole === 'Residente' || namerole === 'Residentes' ? (
                            <>
                                <FormColumn>
                                    <Uploader name='pdf' label='Documento de Identidad' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} validate={shouldValidate} required={true}
                                        inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isEmailTaken ? "El correo ya existe" : null}

                                    /> <Inputs name="Numero de telefono" value={phone} onChange={e => setPhone(e.target.value)} type='number' validate={shouldValidate} required={true}></Inputs>
                                    <Inputs name="Fecha de nacimiento" type="date" value={birthday} onChange={e => setBirthday(e.target.value)}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null} ></Inputs>

                                    <InputsSelect id={"select"} options={sexs} name={"Sexo"} value={sex} onChange={e => setSex(e.target.value)} ></InputsSelect>
                                </FormColumn>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"} value={documentType} onChange={e => setDocumentType(e.target.value)} validate={shouldValidate} required={true}
                                    ></InputsSelect>
                                    <Inputs name="Numero de documento" type='number' value={document} onChange={e => setDocument(e.target.value)} validate={shouldValidate} required={true}></Inputs>
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} validate={shouldValidate} required={true}></Inputs>
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} validate={shouldValidate} required={true}></Inputs>
                                    <InputsSelect id={"select"} options={residentsTypes} name={"Tipo residente"} value={residentType} onChange={e => setResidentType(e.target.value)} validate={shouldValidate} required={true}></InputsSelect>

                                    <InputsSelect
                                        id={"select"}
                                        options={apartmentList}
                                        name={"Apartamento"}
                                        value={idApartment}
                                        onChange={e => setIdApartment(e.target.value)}
                                    ></InputsSelect>

                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} validate={shouldValidate} required={true} />


                                </FormColumn>
                            </>
                        ) : namerole === 'Vigilante' || namerole === 'Vigilantes' || namerole === 'Seguridad' ? (
                            <>
                                <FormColumn>
                                    <Uploader name='pdf' label='Documento de Identidad' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} validate={shouldValidate} required={true}
                                        inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isEmailTaken ? "El correo ya existe" : null}

                                    /> <Inputs name="Teléfono" type='number' value={phone} onChange={e => setPhone(e.target.value)} validate={shouldValidate} required={true}></Inputs>
                                    <Inputs name="Fecha Nacimiento" type="date" value={dateOfbirth} onChange={e => setDateOfBirth(e.target.value)}
                                        validate={shouldValidate} required={true}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null} ></Inputs>

                                </FormColumn>

                                <FormColumn>
                                    <div className="mr-1" style={{ width: '100%' }}>

                                        <Select2 name={'Empresa de Seguridad'} onChange={handleEnterpriceSecurity} options={enterpriceOptions} validate={shouldValidate} ></Select2>
                                    </div>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={documentType} onChange={e => setDocumentType(e.target.value)} validate={shouldValidate} required={true} ></InputsSelect>
                                    <Inputs
                                        name="Documento"
                                        type='number'
                                        value={document}
                                        onChange={e => setDocument(e.target.value)}
                                        inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isDocumentTaken ? "El documento ya existe" : null}
                                        validate={shouldValidate}
                                        required={true}
                                    /> <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} validate={shouldValidate} required={true} ></Inputs>
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} validate={shouldValidate} required={true}></Inputs>

                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} validate={shouldValidate} required={true} />
                                </FormColumn>

                            </>
                        ) : namerole === 'Admin' || namerole === 'Administrador' || namerole === 'Super Administrador' ? (

                            <>
                                <FormColumn>
                                    <Uploader name='pdf' label='Documento de Identidad' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} validate={shouldValidate} required={true}
                                        inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isEmailTaken ? "El correo ya existe" : null}

                                    />
                                    <Inputs name="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Fecha de Nacimiento" placeholder='Fecha de Nacimiento' type="date" value={dateOfbirth} onChange={e => setDateOfBirth(e.target.value)} validate={shouldValidate} required={true}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}></Inputs>

                                </FormColumn>

                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} onChange={e => setDocumentType(e.target.value)} value={documentType} validate={shouldValidate} required={true}></InputsSelect>
                                    <Inputs
                                        name="Documento"
                                        type='number'
                                        value={document}
                                        onChange={e => setDocument(e.target.value)}
                                        inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isDocumentTaken ? "El documento ya existe" : null}
                                        validate={shouldValidate}
                                        required={true}
                                    />
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} required={true} validate={shouldValidate} />
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required={true} validate={shouldValidate} />
                                </FormColumn>
                            </>
                        ) :
                            <>
                                <FormColumn>
                                    <Uploader name='pdf' label='Documento de Identidad' formatos='.pdf'
                                        onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />
                                    <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} validate={shouldValidate} required={true}
                                        inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isEmailTaken ? "El correo ya existe" : null}
                                    />
                                    <Inputs name="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Fecha Nacimiento" type="date" value={dateOfbirth} onChange={e => setDateOfBirth(e.target.value)} validate={shouldValidate} required={true}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}></Inputs>

                                </FormColumn>

                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} onChange={e => setDocumentType(e.target.value)} value={documentType}
                                        validate={shouldValidate} required={true}></InputsSelect>
                                    <Inputs
                                        name="Documento"
                                        type='number'
                                        value={document}
                                        onChange={e => setDocument(e.target.value)}
                                        inputStyle={isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={isDocumentTaken ? "El documento ya existe" : null}
                                        validate={shouldValidate}
                                        required={true}
                                    />
                                    <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} validate={shouldValidate} required={true} />
                                    <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} validate={shouldValidate} required={true} />

                                </FormColumn>

                            </>}
                    </>
                )}

            </FormContainer>
        </>
    );
};