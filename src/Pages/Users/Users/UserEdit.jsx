import React, { useState, useEffect } from 'react';
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


export const UsersEdit = () => {

    const { iduser } = useParams();
    console.log(iduser, 'iduser')


    const [editedUser, setEditedUser] = useState({});
    console.log(editedUser, 'editedUser holii')
    const [usersData, setUsersData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [namerole, setNamerole] = useState('');

    console.log(editedUser, 'editedUserssss')






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

    const { error: putError, load: putLoad, } = useFetchput(`users/${iduser}`, editedUser);
    const { data: userData, load: userLoad, error: userError } = useFetchget(`users/${iduser}`);

    useEffect(() => {
        if (userData && userData.user) {
            const user = userData.user;
            setEditedUser({
                ...user,
                idrole: user.idrole,
            });
            setUsersData([user]);
        }
    }, [userData]);



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
    const [residentType, setResidentType] = useState(null);
    const [apartment, setApartment] = useState(null);
    console.log('Apartment:', apartment);

    console.log('Birthdate:', birthdateResident);
    console.log('sexResidents:', sexResidents);

    const [birthdate, setBirthdate] = useState(null);
    console.log('Birthdate:', birthdate);

    // if (editedUser?.idrole === 3) {
    //     fetch(`https://apptowerbackend.onrender.com/api/watchman/document/${editedUser.document}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.watchman) {

    //                 const birthdate = new Date(data.watchman.birthday);
    //                 const formattedBirthdate = birthdate.toISOString().split('T')[0];
    //                 setBirthdate(formattedBirthdate);
    //             }
    //         })
    //         .catch(error => console.error('Error:', error));
    // } else 
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



    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRolesData = async () => {
            const rolesData = await fetchRoles();
            setRoles(rolesData);
        };
        fetchRolesData();
    }, []);




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

    const opcionesRols = roles.map(rol => ({
        value: rol.idrole.toString(),
        label: rol.namerole
    }));

    useEffect(() => {
        if (editedUser && editedUser?.idrole) {
            setShowForm(true);
        }
    }, [editedUser]);


    const { data, load, error } = useFetchget('apartments')

    const apartmentList = data && data.apartments
        ? data.apartments
            .filter(apartment => apartment.status === 'Active')
            .map(apartment => ({
                value: apartment.idApartment,
                label: apartment.apartmentName
            }))
        : [];

    useEffect(() => {
        console.log(birthdate);
    }, [birthdate]);

    console.log(apartmentList)


    // Traer empresas de seguridad
    const { data: dataEnterprice, load4, error4 } = useFetchget('enterpricesecurity')
    const [selectedEnterprice, setSelectedEnterprice] = useState(null);

    const enterpriceOptions = dataEnterprice && dataEnterprice.enterpriseSecurity ? dataEnterprice.enterpriseSecurity.map(enterprice => ({
        value: enterprice.idEnterpriseSecurity,
        label: enterprice.nameEnterprice
    })) : [];

    const selectedEnterpriceOption = editedUser && enterpriceOptions.find(option => option.value === editedUser.idEnterpriseSecurity)?.value;
    const handleEnterpriceSecurity = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        setSelectedEnterprice(selectedValueAsNumber);
        setEditedUser({ ...editedUser, idEnterpriseSecurity: selectedValueAsNumber });
    };


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
                    value={editedUser?.idrole || ''}
                    onChange={(e) => {
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
                        {editedUser?.idrole === 2 || editedUser?.namerole === 'Residentes' || editedUser?.namerole === 'Residente' ? (
                            <>
                                <FormColumn>
                                    <Uploader
                                        name='pdf'
                                        label='Documento de identidad'
                                        formatos='.pdf'
                                        onChange={e => setEditedUser({ ...editedUser, pdf: e.target.files[0] })}
                                    />
                                    {/* <a href={urlDelPdf} target="_blank" rel="noopener noreferrer">Ver PDF registrado</a> */}


                                    <Inputs
                                        name="Correo"
                                        type='email'
                                        value={editedUser?.email || ''}
                                        onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
                                    />
                                    <Inputs name="Fecha de nacimiento" type="date" value={birthdateResident}
                                        onChange={e => setBirthdateResident(e.target.value)} ></Inputs>

                                    <InputsSelect
                                        id="select"
                                        options={sexs}
                                        name="Sexo"
                                        value={sexResidents || ''}
                                        onChange={e => setSexResidents(e.target.value)}
                                    />
                                </FormColumn>
                                <FormColumn>
                                    <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => setEditedUser({ ...editedUser, docType: e.target.value })}
                                    ></InputsSelect>
                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} />
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />

                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} />
                                    <Inputs name="Numero de telefono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} type='number'></Inputs>
                                    <InputsSelect
                                        id="select"
                                        options={residentsTypes}
                                        name="Tipo residente"
                                        value={residentType || ''}
                                        onChange={e => setResidentType(e.target.value)}
                                    />

                                    <InputsSelect
                                        id="select"
                                        options={apartmentList}
                                        name="Apartamento"
                                        value={apartment || ''}
                                        onChange={e => setEditedUser(e.target.value)}
                                    />
                                    <InputsSelect
                                        id={"select"}
                                        options={estado}
                                        name={"Estado"}
                                        value={editedUser?.status || ''}
                                        onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })} ></InputsSelect>



                                </FormColumn>
                            </>
                        ) : editedUser?.idrole === 3 || editedUser?.namerole === 'Vigilante' || editedUser?.namerole === 'Vigilantes' || editedUser?.namerole === 'Seguridad' ? (
                            <>
                                <FormColumn>
                                    <Uploader
                                        name='pdf'
                                        label='Documento de Identidad'
                                        formatos='.pdf'
                                        onChange={e => setEditedUser(e.target.files[0])}
                                    />

                                    <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
                                    <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} />

                                    <Inputs
                                        name="Fecha Nacimiento"
                                        type="date"
                                        value={editedUser?.birthday ? new Date(editedUser.birthday).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setEditedUser({ ...editedUser, birthday: e.target.value })}
                                    />

                                </FormColumn>

                                <FormColumn>
                                    <div className="mr-1" style={{ width: '100%' }}>
                                        <Select2
                                            name={'Empresa de Seguridad'}
                                            onChange={(newValue) => {
                                                const setSelectedEnterprice = enterpriceOptions.find(option => option.value === Number(newValue));
                                                const newNameEnterprice = setSelectedEnterprice ? setSelectedEnterprice.label : '';
                                                handleEnterpriceSecurity(newValue);
                                            }}
                                            options={enterpriceOptions}
                                            value={selectedEnterpriceOption}
                                        />
                                    </div>
                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => setEditedUser({ ...editedUser, docType: e.target.value })} ></InputsSelect>
                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} />
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />
                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} />
                                    <InputsSelect
                                        id={"select"}
                                        options={estado}
                                        name={"Estado"}
                                        value={editedUser?.status || ''}
                                        onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })} ></InputsSelect>

                                </FormColumn>

                            </>
                        ) : editedUser?.idrole === 1 || editedUser?.namerole === 'Admin' || editedUser?.namerole === 'Administrador' || editedUser?.namerole === 'Super Administrador' ? (

                            <>
                                <FormColumn>
                                    <Uploader
                                        name='pdf'
                                        label='Documento de identidad'
                                        formatos='.pdf'
                                        onChange={e => setEditedUser(e.target.files[0])}
                                    />
                                    {/* <a href={urlDelPdf} target="_blank" rel="noopener noreferrer">Ver PDF registrado</a> */}

                                    <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} />
                                    <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />

                                </FormColumn>

                                <FormColumn>

                                    <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => setEditedUser({ ...editedUser, docType: e.target.value })} ></InputsSelect>
                                    <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} />
                                    <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />
                                    <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} />
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
                                    label='Documento de identidad'
                                    formatos='.pdf'
                                    onChange={e => setEditedUser(e.target.files[0])}
                                />
                                {/* <a href={urlDelPdf} target="_blank" rel="noopener noreferrer">Ver PDF registrado</a> */}

                                <Inputs name="Teléfono" value={editedUser?.phone || ''} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} />
                                <Inputs name="Correo" value={editedUser?.email || ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />

                            </FormColumn>

                            <FormColumn>

                                <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={editedUser?.docType || ''} onChange={(e) => setEditedUser({ ...editedUser, docType: e.target.value })} ></InputsSelect>
                                <Inputs name="Documento" value={editedUser?.document || ''} onChange={(e) => setEditedUser({ ...editedUser, document: e.target.value })} />
                                <Inputs name="Nombre" value={editedUser?.name || ''} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />
                                <Inputs name="Apellido" value={editedUser?.lastName || ''} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} />
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