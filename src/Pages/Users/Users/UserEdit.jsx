import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchpost, useFetchForFile, useFetchput } from '../../../Hooks/useFetch';
import FormContainer from '../../../Components/Forms/FormContainer';
import FormColumn from '../../../Components/Forms/FormColumn';
import Inputs from '../../../Components/Inputs/Inputs';
import FormButton from '../../../Components/Forms/FormButton';
import Swal from 'sweetalert2';
import InputsSelect from "../../../Components/Inputs/InputsSelect";
import { docTypes, residentsTypes, sexs } from '../../../Hooks/consts.hooks'
import { Uploader } from '../../../Components/Uploader/Uploader'
import { useFetchget } from '../../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import Select2 from '../../../Components/Inputs/Select2';
import { set } from 'date-fns';
import { is } from 'date-fns/locale';
import { useUserLogged } from '../../../Helpers/Helpers';


export const UsersEdit = () => {

    const { iduser } = useParams();

    const { idUserLogged } = useUserLogged()

    const [editedUser, setEditedUser] = useState({});
    const [usersData, setUsersData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [namerole, setNamerole] = useState('');
    const [errors, setErrors] = useState([]);


    console.log(editedUser, "editedUser")


    const birthDate = new Date(editedUser.birthday);


    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    const { data: rolesData } = useFetchget('rols');
    const [roles, setRoles] = useState([]);


    useEffect(() => {
        if (rolesData && rolesData.rols) {
            setRoles(rolesData.rols);
        }
    }, [rolesData]);



    const { error: putError, load: putLoad, } = useFetchput(`users/${iduser}`, editedUser);
    const { data: userData, load: userLoad, error: userError } = useFetchget(`users/${iduser}`);
    const { data: userLogged, load: userLoadLogged, error: userErrorLogged } = useFetchget(`users/${Number(idUserLogged)}`);

    const [EqualUser, setEqualUser] = useState(false);
    console.log(EqualUser, "EqualUser");

    useEffect(() => {
        setEqualUser(userLogged?.user?.document === editedUser?.document);
    }, [idUserLogged]);



    useEffect(() => {
        if (userData && userData.user) {
            const user = userData.user;
            setEditedUser({

                // User logged

                idUserLogged: idUserLogged,
                ...user,
                idrole: user.idrole,
                pdf: user.pdf,
                newFile: user.pdf,
                status: user.status,
                userImg: null,

            });
            setUsersData([user]);
        }
    }, [userData]);

    const [nameRole, setNameRole] = useState('');

    useEffect(() => {
        if (editedUser.idrole && roles && roles.length > 0) {
            const selectedRole = roles.find(rol => rol.idrole === editedUser.idrole);
            if (selectedRole) {
                setNameRole(selectedRole.namerole);
            } else {
                console.log(`No role found with idrole: ${editedUser.idrole}`);
            }
        }
    }, [editedUser.idrole, roles]);


    const [isDocumentTaken, setIsDocumentTaken] = useState(false);
    const [isEmailTaken, setIsEmailTaken] = useState(false);

    const originalDocument = useRef('');
    const originalEmail = useRef('');
    useEffect(() => {
        if (editedUser?.document && originalDocument.current === '') {
            originalDocument.current = editedUser.document;
        }
    }, [editedUser?.document]);

    useEffect(() => {
        if (editedUser?.email && originalEmail.current === '') {
            originalEmail.current = editedUser.email;
        }
    }, [editedUser?.email]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/users/document/${editedUser.document}`)
            .then(response => response.json())
            .then(data => {
                setIsDocumentTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [editedUser.document]);


    useEffect(() => {
        fetch(`http://localhost:3000/api/users/email/${editedUser.email}`)
            .then(response => response.json())
            .then(data => {
                setIsEmailTaken(data && data.message ? true : false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [editedUser.email]);

    const [shouldValidate, setShouldValidate] = useState(false);
    const navigate = useNavigate();


    const handleSaveChanges = async (e) => {
        setShouldValidate(true);
        e.preventDefault();
        console.log('Guardando cambios:', editedUser);
        if (editedUser) {
            try {
                const formData = new FormData();
                Object.keys(editedUser).forEach(key => {
                    if (key === 'userImg' && editedUser[key] === null) {
                        return;
                    }
                    if (key === 'status') {
                        // formData.append(key, editedUser.status);
                        formData.append('state', editedUser.status);
                    }
                    if (key === 'sex') {
                        formData.append(key, "No proporcionado");
                    } else {
                        if ((key === 'pdf' || key === 'newFile') && editedUser[key]) {
                            formData.append(key, editedUser[key]);
                        } else {
                            formData.append(key, editedUser[key]);
                        }
                    }
                });

                const response = await fetch(`http://localhost:3000/api/users/${iduser}`, {
                    method: 'PUT',
                    body: formData,
                });

                console.log('response:', editedUser);


                if (editedUser?.document !== originalDocument.current && isDocumentTaken) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Este documento se encuentra registrado',
                        icon: 'error',
                    });
                    return;
                }

                if (editedUser?.email !== originalEmail.current && isEmailTaken) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Este correo se encuentra registrado',
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

                if (!editedUser?.pdf) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Debe de subir un documento',
                        icon: 'error',
                    });
                    return;
                }


                if (response.ok) {
                    const updatedUsers = usersData.map(user => {
                        if (user.iduser === editedUser.iduser) {
                            return { ...user, ...editedUser };
                        }
                        return user;
                    });
                    setUsersData(updatedUsers);

                    Swal.fire({
                        title: 'Éxito',
                        text: 'Usuario modificado exitosamente.',
                        icon: 'success',
                    }).then(() => {
                        navigate('/admin/users');
                        window.location.reload
                    });
                } else {
                    const errorResponse = await response.json();
                    console.error('Error al guardar los cambios:', response.status, errorResponse);
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al modificar usuario.',
                        icon: 'error',
                    });
                    setErrors(errorResponse);
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }


    };


    const [birthdateResident, setBirthdateResident] = useState(null);
    const [idResidents, setIdResidents] = useState(null);
    const [sexResidents, setSexResidents] = useState(null);

    if (editedUser.idrole === 2) {
        fetch(`https://apptowerbackend.onrender.com/api/residents/document/${editedUser.document}`)
            .then(response => response.json())
            .then(data => {
                if (data.residente) {

                    const birthdate = new Date(data.residente.birthday);
                    const formattedBirthdate = birthdate.toISOString().split('T')[0];
                    setBirthdateResident(formattedBirthdate);
                    setIdResidents(data.residente.idResident);
                    setSexResidents(data.residente.sex);
                    setResidentType(data.residente.residentType);

                }
            })
            .catch(error => console.error('Error:', error));

        fetch(`https://apptowerbackend.onrender.com/api/apartments/${Number(idResidents)}`)
            .then(response => response.json())
            .then(data => {
                if (data.spartment) {
                    setApartment(data.spartment.apartmentName);
                }
            })
    }


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

    const estado = [
        {
            value: "Activo",
            label: "Activo"
        },
        {
            value: "Inactivo",
            label: "Inactivo"
        }
    ];

    const rolDesactivado = roles.find(rol => rol.idrole === editedUser.idrole && rol.state !== "Activo");

    let opcionesRols = roles
        .filter(rol => rol.state === "Activo")
        .map(rol => ({
            value: rol.idrole.toString(),
            label: rol.namerole
        }));

    if (rolDesactivado) {
        opcionesRols = [
            ...opcionesRols,
            {
                value: rolDesactivado.idrole.toString(),
                label: `${rolDesactivado.namerole} (Rol inactivo)`
            }
        ];
    }



    useEffect(() => {
        if (editedUser && editedUser?.idrole) {
            setShowForm(true);
        }
    }, [editedUser]);


    const { data, load, error } = useFetchget('apartments')

    const apartmentList = data && data.apartments
        ? data.apartments
            .filter(apartmentItem => apartmentItem.status === 'Active')
            .map(apartmentItem => ({
                value: apartmentItem.idApartment,
                label: apartmentItem.apartmentName
            }))
        : [];



    // Traer empresas de seguridad
    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')
    const { data: dataWatchman, load5, error5 } = useFetchget('watchman')


    const userWatchman = Array.isArray(dataWatchman?.watchman) ? dataWatchman?.watchman?.find(watchman => watchman.iduser === editedUser.iduser) : null;
    console.log(userWatchman, "userWatchman");
    const enterpriceWatchman = userWatchman ? userWatchman?.idEnterpriseSecurity : null;

    const [selectedEnterprice, setSelectedEnterprice] = useState(null);

    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity
        ? dataEnterprice.enterpriseSecurity
            .filter(enterprice => enterprice.state === "Activo")
            .map(enterprice => ({
                value: enterprice.idEnterpriseSecurity,
                label: enterprice.nameEnterprice
            }))
        : [];

    useEffect(() => {
        if (userWatchman) {
            const initialEnterprice = enterpriceOptions.find(option => option.value === userWatchman?.idEnterpriseSecurity);
            setSelectedEnterprice(initialEnterprice);
        }
    }, [userWatchman]);

    useEffect(() => {
        const enterprice = enterpriceOptions.find(option => option.value === enterpriceWatchman);
        setSelectedEnterprice(enterprice);
    }, [enterpriceWatchman]);


    const handleEnterpriceSecurity = (selectedOption) => {
        setErrors([]);
        setSelectedEnterprice(selectedOption);
        setEditedUser(prevState => ({
            ...prevState,
            idEnterpriseSecurity: selectedOption.value
        }));
    };


    useEffect(() => {
        setEditedUser(prevState => ({
            ...prevState,
            idEnterpriseSecurity: enterpriceWatchman
        }));
    }, [enterpriceWatchman]);


    console.log(editedUser, "editedUser");

    //Traer tipo de residencia
    const { data: dataResidentType, load6, error6 } = useFetchget('residents')
    const userResidente = Array.isArray(dataResidentType.residents) ? dataResidentType.residents.find(resident => resident.iduser === editedUser.iduser) : null;
    const residentTypeUser = userResidente ? userResidente.residentType : null;

    //Traer Apartamentos
    const ResidentApartament = userResidente && userResidente.apartments.length > 0 ? userResidente.apartments[0]?.idApartment : null;


    const [residentType, setResidentType] = useState(residentTypeUser);
    const [idApartment, setApartment] = useState(ResidentApartament);

    useEffect(() => {
        setResidentType(residentTypeUser);
        setApartment(ResidentApartament);
    }, [residentTypeUser, ResidentApartament]);

    useEffect(() => {
        setEditedUser(prevState => ({
            ...prevState,
            residentType
        }));
    }, [residentType]);

    useEffect(() => {
        const idApartmentNumber = Number(idApartment);
        setEditedUser(prevState => ({
            ...prevState,
            idApartment: idApartmentNumber
        }));
    }, [idApartment]);

    console.log(selectedEnterprice, "selectedEnterprice");

    return (

        <>
            <FormContainer
                name='Editar usuario'
                buttons={<FormButton name='Guardar cambios' backButton='Cancelar' to='/admin/users/' onClick={handleSaveChanges} />}
            >

                <InputsSelect
                    id="select"
                    options={opcionesRols}
                    name="Rol"
                    value={
                        editedUser?.idrole
                            ? (opcionesRols.find(rol => rol.value === editedUser.idrole.toString()) || {}).value
                            : ''
                    } onChange={(e) => {
                        const selectedRoleId = e.target.value;
                        const selectedRole = roles.find(rol => rol.idrole === Number(selectedRoleId));
                        const newNamerole = selectedRole ? selectedRole.namerole : '';
                        setEditedUser(prevUser => ({
                            ...prevUser,
                            idrole: Number(selectedRoleId),
                            namerole: newNamerole,
                        }));
                        setShowForm(true);
                    }}
                    StyleInput={{ width: '100%', marginRight: '3.8rem' }}
                    containerStyle={{ width: '97%', marginLeft: '0.9rem' }}
                ></InputsSelect>


                {showForm && (

                    <>
                        {nameRole.toLowerCase().includes('residente') ? (

                            <>



                                <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Informacion personal</h6>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => { setEditedUser({ ...editedUser, docType: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"docType"}
                                    ></InputsSelect>
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => { setEditedUser({ ...editedUser, document: e.target.value }); setErrors([]) }}
                                        inputStyle={editedUser?.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}

                                        errors={errors}
                                        identifier={"document"}

                                    />

                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => { setEditedUser({ ...editedUser, name: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"name"}
                                    />

                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => { setEditedUser({ ...editedUser, lastName: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"lastName"}
                                    />

                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => { setEditedUser({ ...editedUser, email: e.target.value }); setErrors([]) }}
                                        inputStyle={editedUser?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}

                                        errors={errors}
                                        identifier={"email"}
                                    />

                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Numero de telefono" value={editedUser?.phone || ''} onChange={(e) => { setEditedUser({ ...editedUser, phone: e.target.value }); setErrors([]) }} type='number'
                                        errors={errors}
                                        identifier={"phone"}
                                    ></Inputs>

                                </FormColumn>

                                <FormColumn>
                                    <InputsSelect
                                        id="select"
                                        options={sexs}
                                        name="Género"
                                        required={false}
                                        value={editedUser?.sex || ''}
                                        onChange={e => setEditedUser({ ...editedUser, sex: e.target.value })}
                                        errors={errors}
                                        identifier={'sex'}
                                    />
                                </FormColumn>

                                <FormColumn>

                                    <Inputs name="Fecha de nacimiento" type="date" value={editedUser?.birthday ? new Date(editedUser.birthday).toISOString().split('T')[0] : ''}
                                        onChange={(e) => { setEditedUser({ ...editedUser, birthday: e.target.value }); setErrors([]) }}
                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}
                                        errors={errors}
                                        identifier={"birthday"}
                                    ></Inputs>


                                </FormColumn>

                                <FormColumn>
                                    <Uploader
                                        name='pdf'
                                        label='Carga de documento'
                                        formatos='.pdf'
                                        onChange={e => setEditedUser({ ...editedUser, pdf: e.target.files[0], newFile: e.target.files[0] })}
                                        validate={shouldValidate}
                                    />


                                </FormColumn>
                                <FormColumn>

                                    <InputsSelect
                                        id="select"
                                        options={residentsTypes}
                                        name="Tipo residente"
                                        value={residentType || ''}
                                        onChange={e => { setResidentType(e.target.value); setErrors([]) }}
                                        errors={errors}
                                        identifier={"residentType"}
                                    />
                                    <InputsSelect
                                        id="select"
                                        options={apartmentList}
                                        name="Apartamento"
                                        value={idApartment || ''}
                                        onChange={e => { setApartment(e.target.value); setErrors([]) }}


                                        errors={errors}
                                        identifier={"idApartment"}
                                    />
                                    <InputsSelect
                                        id={"select"}
                                        options={estado}
                                        name={"Estado"}
                                        value={editedUser?.status || ''}
                                        onChange={e => { setEditedUser({ ...editedUser, status: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"status"}
                                    />
                                </FormColumn>

                            </>
                        ) : nameRole.toLowerCase().includes('vigilante') || nameRole.toLowerCase().includes('seguridad') || nameRole.toLowerCase().includes('vigilancia') ? (
                            <>



                                <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Informacion personal</h6>

                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => { setEditedUser({ ...editedUser, docType: e.target.value }); setErrors([]) }}

                                        errors={errors}
                                        identifier={"docType"}
                                    ></InputsSelect>
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => { setEditedUser({ ...editedUser, document: e.target.value }); setErrors([]) }}
                                        inputStyle={editedUser?.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}

                                        errors={errors}
                                        identifier={"document"}
                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => { setEditedUser({ ...editedUser, name: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"name"}
                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => { setEditedUser({ ...editedUser, lastName: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"lastName"}
                                    />
                                </FormColumn>


                                <FormColumn>
                                    <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => { setEditedUser({ ...editedUser, email: e.target.value }); setErrors([]) }}
                                        inputStyle={editedUser?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}

                                        errors={errors}
                                        identifier={"email"}
                                    />
                                </FormColumn>


                                <FormColumn>
                                    <Select2
                                        placeholder={'Empresa de Seguridad'}
                                        onChange={handleEnterpriceSecurity}
                                        options={enterpriceOptions}
                                        value={selectedEnterprice}
                                        errors={errors}
                                        identifier={"idEnterpriseSecurity"}
                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => { setEditedUser({ ...editedUser, phone: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"phone"}
                                    />

                                    <Uploader
                                        name='pdf'
                                        label='Carga de documento'
                                        formatos='.pdf'
                                        onChange={e => setEditedUser({ ...editedUser, pdf: e.target.files[0], newFile: e.target.files[0] })}
                                        validate={shouldValidate}

                                    />
                                </FormColumn>


                                <FormColumn>

                                    <Inputs
                                        name="Fecha Nacimiento"
                                        type="date"
                                        value={editedUser?.birthday ? new Date(editedUser.birthday).toISOString().split('T')[0] : ''}
                                        onChange={(e) => { setEditedUser({ ...editedUser, birthday: e.target.value }); setErrors([]) }}


                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}
                                        errors={errors}
                                        identifier={"birthday"}

                                    />

                                    <InputsSelect
                                        id={"select"}
                                        options={estado}
                                        name={"Estado"}
                                        value={editedUser?.status || ''}
                                        onChange={(e) => { setEditedUser({ ...editedUser, status: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"status"}
                                    ></InputsSelect>


                                </FormColumn>






                            </>
                        ) : nameRole.toLowerCase().includes('administrador') ? (

                            <>
                                <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Informacion personal</h6>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => { setEditedUser({ ...editedUser, docType: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"docType"}
                                    ></InputsSelect>

                                </FormColumn>

                                <FormColumn>

                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => { setEditedUser({ ...editedUser, document: e.target.value }); setErrors([]) }}
                                        inputStyle={editedUser?.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}

                                        errors={errors}
                                        identifier={"document"}
                                    />

                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => { setEditedUser({ ...editedUser, name: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"name"}
                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => { setEditedUser({ ...editedUser, lastName: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"lastName"}
                                    />
                                </FormColumn>

                                <FormColumn>
                                    <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => { setEditedUser({ ...editedUser, email: e.target.value }); setErrors([]) }}
                                        inputStyle={editedUser?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}

                                        errors={errors}
                                        identifier={"email"}

                                    />
                                </FormColumn>

                                <FormColumn>

                                    <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => { setEditedUser({ ...editedUser, phone: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"phone"}
                                    />

                                </FormColumn>

                                <FormColumn>
                                    <Uploader
                                        name='pdf'
                                        label='Carga de documento'
                                        formatos='.pdf'
                                        onChange={e => setEditedUser({ ...editedUser, pdf: e.target.files[0], newFile: e.target.files[0] })}
                                        validate={shouldValidate}

                                    />

                                </FormColumn>

                                <FormColumn>

                                    <Inputs
                                        name="Fecha Nacimiento"
                                        type="date"
                                        value={editedUser?.birthday ? new Date(editedUser.birthday).toISOString().split('T')[0] : ''}
                                        onChange={(e) => { setEditedUser({ ...editedUser, birthday: e.target.value }); setErrors([]) }}


                                        inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                        errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}
                                        errors={errors}
                                        identifier={"birthday"}

                                    />


                                    {EqualUser ? null : <InputsSelect
                                        id={"select"}
                                        options={estado}
                                        name={"Estado"}
                                        value={editedUser?.status || ''}
                                        onChange={(e) => { setEditedUser({ ...editedUser, status: e.target.value }); setErrors([]) }}
                                        errors={errors}
                                        identifier={"status"}
                                    ></InputsSelect>
                                    }


                                </FormColumn>
                            </>
                        ) : <>
                            <h6 className='mb-4 w-100 text-muted' style={{ marginLeft: '1.1rem' }}>Informacion personal</h6>
                            <FormColumn>
                                <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => { setEditedUser({ ...editedUser, docType: e.target.value }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"docType"}
                                ></InputsSelect>

                            </FormColumn>

                            <FormColumn>

                                <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => { setEditedUser({ ...editedUser, document: e.target.value }); setErrors([]) }}
                                    inputStyle={editedUser?.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                    errorMessage={editedUser?.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}

                                    errors={errors}
                                    identifier={"document"}
                                />

                            </FormColumn>

                            <FormColumn>
                                <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => { setEditedUser({ ...editedUser, name: e.target.value }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"name"}
                                />
                            </FormColumn>

                            <FormColumn>
                                <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => { setEditedUser({ ...editedUser, lastName: e.target.value }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"lastName"}
                                />
                            </FormColumn>

                            <FormColumn>
                                <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => { setEditedUser({ ...editedUser, email: e.target.value }); setErrors([]) }}
                                    inputStyle={editedUser?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                    errorMessage={editedUser?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}

                                    errors={errors}
                                    identifier={"email"}
                                />
                            </FormColumn>

                            <FormColumn>

                                <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => { setEditedUser({ ...editedUser, phone: e.target.value }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"phone"}

                                />

                            </FormColumn>

                            <FormColumn>
                                <Uploader
                                    name='pdf'
                                    label='Carga de documento'
                                    formatos='.pdf'
                                    onChange={e => setEditedUser({ ...editedUser, pdf: e.target.files[0] })}
                                    validate={shouldValidate}

                                />

                            </FormColumn>

                            <FormColumn>

                                <Inputs
                                    name="Fecha Nacimiento"
                                    type="date"
                                    value={editedUser?.birthday ? new Date(editedUser.birthday).toISOString().split('T')[0] : ''}
                                    onChange={(e) => { setEditedUser({ ...editedUser, birthday: e.target.value }); setErrors([]) }}


                                    inputStyle={age < 18 ? { borderColor: 'red' } : null}
                                    errorMessage={age < 18 ? "Debe de ser mayor de edad" : null}

                                    errors={errors}
                                    identifier={"birthday"}

                                />


                                {EqualUser ? null : <InputsSelect
                                    id={"select"}
                                    options={estado}
                                    name={"Estado"}
                                    value={editedUser?.status || ''}
                                    onChange={(e) => { setEditedUser({ ...editedUser, status: e.target.value }); setErrors([]) }}
                                    errors={errors}
                                    identifier={"status"}
                                ></InputsSelect>
                                }



                            </FormColumn>
                        </>
                        }
                    </>
                )}

            </FormContainer>
        </>
    );
};