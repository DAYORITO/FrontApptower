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


export const UsersEdit = () => {

    const { iduser } = useParams();
    console.log(iduser, 'iduser')


    const [editedUser, setEditedUser] = useState({});
    console.log(editedUser, 'editedUser holii')
    const [usersData, setUsersData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [namerole, setNamerole] = useState('');


    const { data: rolesData } = useFetchget('rols');
    const [roles, setRoles] = useState([]);


    useEffect(() => {
        if (rolesData && rolesData.rols) {
            setRoles(rolesData.rols);
        }
    }, [rolesData]);



    const { error: putError, load: putLoad, } = useFetchput(`users/${iduser}`, editedUser);
    const { data: userData, load: userLoad, error: userError } = useFetchget(`users/${iduser}`);

    useEffect(() => {
        if (userData && userData.user) {
            const user = userData.user;
            setEditedUser({
                ...user,
                idrole: user.idrole,
                pdf: user.pdf,
                status: user.status
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
        e.preventDefault();
        console.log('Guardando cambios:', editedUser);
        if (editedUser) {
            try {
                // const response = await fetch(`https://apptowerbackend.onrender.com/api/users/${iduser}`, {
                const response = await fetch(`http://localhost:3000/api/users/${iduser}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedUser),
                });

                editedUser.pdf = editedUser.pdf ? editedUser.pdf : null;

                if (!editedUser?.docType || !editedUser.name || !editedUser.email || !editedUser.password || !editedUser.document || !editedUser.lastName) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Por favor, rellene todos los campos requeridos',
                        icon: 'error',
                    });
                    //Activa la validacion de los campos cuando se envia el formulario
                    setShouldValidate(true);
                    return;
                }

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
                        text: 'Usuario modificado exitosamente',
                        icon: 'success',
                    }).then(() => navigate('/admin/users'));
                    // setEditedUser(null);
                } else {
                    const errorResponse = await response.json();
                    console.error('Error al guardar los cambios:', response.status, errorResponse);
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al modificar usuario',
                        icon: 'error',
                    });
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }
    };


    const [birthdateResident, setBirthdateResident] = useState(null);
    const [idResidents, setIdResidents] = useState(null);
    console.log('idResidents:', idResidents);
    const [sexResidents, setSexResidents] = useState(null);



    console.log('Birthdate:', birthdateResident);
    console.log('sexResidents:', sexResidents);

    const [birthdate, setBirthdate] = useState(null);
    console.log('Birthdate:', birthdate);

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
                label: `${rolDesactivado.namerole} (Rol Inactivo)`
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

    useEffect(() => {
        console.log(birthdate);
    }, [birthdate]);

    console.log(apartmentList)


    // Traer empresas de seguridad
    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')
    const { data: dataWatchman, load5, error5 } = useFetchget('watchman')

    const userWatchman = Array.isArray(dataWatchman.watchman) ? dataWatchman.watchman.find(watchman => watchman.iduser === editedUser.iduser) : null;
    const enterpriceWatchman = userWatchman ? userWatchman.idEnterpriseSecurity : null;

    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity ? dataEnterprice.enterpriseSecurity.map(enterprice => ({
        value: enterprice.idEnterpriseSecurity,
        label: enterprice.nameEnterprice
    })) : [];

    const handleEnterpriceSecurity = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        console.log("Selected Value:", selectedValueAsNumber);
        setEditedUser({ ...editedUser, idEnterpriseSecurity: selectedValueAsNumber });
    };


    //Traer tipo de residencia
    const { data: dataResidentType, load6, error6 } = useFetchget('residents')
    const userResidente = Array.isArray(dataResidentType.residents) ? dataResidentType.residents.find(resident => resident.iduser === editedUser.iduser) : null;
    const residentTypeUser = userResidente ? userResidente.residentType : null;

    //Traer Apartamentos
    const ResidentApartament = userResidente && userResidente.apartments.length > 0 ? userResidente.apartments[0].idApartment : null;

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

    return (

        <>
            <FormContainer
                name='Editar Usuario'
                buttons={<FormButton name='Guardar Cambios' backButton='Cancelar' to='/admin/users/' onClick={handleSaveChanges} />}
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
                ></InputsSelect>


                {showForm && (

                    <>
                        {nameRole.toLowerCase().includes('residente') ? (

                            <>
                                <FormColumn>
                                    <Uploader
                                        name='pdf'
                                        label='Documento de identidad'
                                        formatos='.pdf'
                                        onChange={e => setEditedUser({ ...editedUser, pdf: e.target.files[0] })}
                                        validate={shouldValidate}
                                    />
                                    {/* <a href={urlDelPdf} target="_blank" rel="noopener noreferrer">Ver PDF registrado</a> */}


                                    <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                        inputStyle={editedUser?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}
                                        validate={shouldValidate} required={true} />

                                    <Inputs name="Fecha de nacimiento" type="date" value={editedUser?.birthday ? new Date(editedUser.birthday).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setEditedUser({ ...editedUser, birthday: e.target.value })}></Inputs>

                                    <InputsSelect
                                        id="select"
                                        options={sexs}
                                        name="Sexo"
                                        value={editedUser?.sex || ''}
                                        onChange={e => setEditedUser({ ...editedUser, sex: e.target.value })}
                                    />
                                </FormColumn>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => setEditedUser({ ...editedUser, docType: e.target.value })}
                                        validate={shouldValidate} required={true}></InputsSelect>
                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} validate={shouldValidate}
                                        inputStyle={editedUser?.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}
                                        required={true} />
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />

                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} validate={shouldValidate} required={true} />
                                    <Inputs name="Numero de telefono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} type='number' required={true} validate={shouldValidate}></Inputs>

                                    <InputsSelect
                                        id="select"
                                        options={residentsTypes}
                                        name="Tipo residente"
                                        value={residentType || ''}
                                        onChange={e => setResidentType(e.target.value)}
                                        validate={shouldValidate}
                                        required={true}
                                    />

                                    <InputsSelect
                                        id="select"
                                        options={apartmentList}
                                        name="Apartamento"
                                        value={idApartment || ''}
                                        onChange={e => setApartment(e.target.value)}
                                        validate={shouldValidate}
                                        required={true}
                                    />

                                    <InputsSelect
                                        id={"select"}
                                        options={estado}
                                        name={"Estado"}
                                        value={editedUser?.status || ''}
                                        onChange={e => setEditedUser({ ...editedUser, status: e.target.value })} />



                                </FormColumn>
                            </>
                        ) : nameRole.toLowerCase().includes('vigilante') || nameRole.toLowerCase().includes('seguridad') ? (
                            <>
                                <FormColumn>
                                    <Uploader
                                        name='pdf'
                                        label='Documento de Identidad'
                                        formatos='.pdf'
                                        fileUrl={editedUser?.pdf}
                                        onChange={e => setEditedUser({ ...editedUser, pdf: e.target.files[0] })}
                                        validate={shouldValidate}
                                    />

                                    <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                        inputStyle={editedUser?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}
                                        validate={shouldValidate} required={true} />

                                    <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} validate={shouldValidate} required={true} />

                                    <Inputs
                                        name="Fecha Nacimiento"
                                        type="date"
                                        value={editedUser?.birthday ? new Date(editedUser.birthday).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setEditedUser({ ...editedUser, birthday: e.target.value })}
                                        required={true}
                                        validate={shouldValidate}
                                    />

                                </FormColumn>

                                <FormColumn>

                                    <div className="mr-1" style={{ width: '100%' }}>
                                        <Select2
                                            key={enterpriceWatchman}
                                            name={'Empresa de Seguridad'}
                                            onChange={(newValue) => {
                                                const setSelectedEnterprice = enterpriceOptions.find(option => option.value === Number(newValue));
                                                const newNameEnterprice = setSelectedEnterprice ? setSelectedEnterprice.label : '';
                                                handleEnterpriceSecurity(newValue);
                                            }}
                                            options={enterpriceOptions}
                                            value={enterpriceWatchman}
                                            validate={shouldValidate}

                                        />
                                    </div>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => setEditedUser({ ...editedUser, docType: e.target.value })}
                                        validate={shouldValidate} required={true}></InputsSelect>
                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} validate={shouldValidate}
                                        inputStyle={editedUser?.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}
                                        required={true} />
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} validate={shouldValidate} required={true} />
                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} validate={shouldValidate} required={true} />
                                    <InputsSelect
                                        id={"select"}
                                        options={estado}
                                        name={"Estado"}
                                        value={editedUser?.status || ''}
                                        onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })} ></InputsSelect>

                                </FormColumn>

                            </>
                        ) : nameRole.toLowerCase().includes('administrador') ? (

                            <>
                                <FormColumn>
                                    <Uploader
                                        name='pdf'
                                        label='Documento de Identidad'
                                        formatos='.pdf'
                                        onChange={e => setEditedUser({ ...editedUser, pdf: e.target.files[0] })}
                                        validate={shouldValidate}
                                        fileUrl={editedUser?.pdf}
                                    />

                                    <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} validate={shouldValidate} required={true} />
                                    <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                        inputStyle={editedUser?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}
                                        validate={shouldValidate} required={true} />

                                </FormColumn>

                                <FormColumn>

                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => setEditedUser({ ...editedUser, docType: e.target.value })} validate={shouldValidate} required={true}></InputsSelect>
                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} validate={shouldValidate}
                                        inputStyle={editedUser?.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                        errorMessage={editedUser?.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null}
                                        required={true} />
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} validate={shouldValidate} required={true} />
                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} validate={shouldValidate} required={true} />
                                    <InputsSelect
                                        id={"select"}
                                        options={estado}
                                        name={"Estado"}
                                        value={editedUser?.status || ''}
                                        onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })} ></InputsSelect>



                                </FormColumn>
                            </>
                        ) : <>
                            <FormColumn>
                                <Uploader
                                    name='pdf'
                                    label='Documento de Identidad'
                                    formatos='.pdf'
                                    onChange={e => setEditedUser(e.target.files[0])}
                                    validate={shouldValidate}
                                    fileUrl={editedUser?.pdf}
                                />
                                {/* <a href={urlDelPdf} target="_blank" rel="noopener noreferrer">Ver PDF registrado</a> */}

                                <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} validate={shouldValidate} required={true} />
                                <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                    inputStyle={editedUser?.email !== originalEmail.current && isEmailTaken ? { borderColor: 'red' } : null}
                                    errorMessage={editedUser?.email !== originalEmail.current && isEmailTaken ? "El correo ya existe" : null}
                                />

                            </FormColumn>

                            <FormColumn>

                                <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => setEditedUser({ ...editedUser, docType: e.target.value })}
                                    validate={shouldValidate} required={true}></InputsSelect>
                                <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} validate={shouldValidate} required={true}
                                    inputStyle={editedUser?.document !== originalDocument.current && isDocumentTaken ? { borderColor: 'red' } : null}
                                    errorMessage={editedUser?.document !== originalDocument.current && isDocumentTaken ? "El documento ya existe" : null} />
                                <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} validate={shouldValidate} required={true} />
                                <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                                    validate={shouldValidate} required={true} />
                                <InputsSelect
                                    id={"select"}
                                    options={estado}
                                    name={"Estado"}
                                    value={editedUser?.status || ''}
                                    onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })} ></InputsSelect>



                            </FormColumn>
                        </>
                        }
                    </>
                )}

            </FormContainer>
        </>
    );
};