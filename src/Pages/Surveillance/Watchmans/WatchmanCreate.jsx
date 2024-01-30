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


    const handleEnterpriceSecurity = (selectedValue) => {
        const selectedValueAsNumber = Number(selectedValue);
        console.log("Selected Value:", selectedValueAsNumber);
        setEnterprice(selectedValueAsNumber);

        setSelectedEnterprice(selectedValueAsNumber);
    };



    console.log('enterpriceOptions', enterpriceOptions);

    const [shouldValidate, setShouldValidate] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();



        if (!documentType || !name || !email || !password || !document || !lastname || !phone || !confirmPassword || !dateOfbirth || !pdf) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, rellene todos los campos requeridos',
                icon: 'error',
            });
            //Activa la validacion de los campos cuando se envia el formulario
            setShouldValidate(true);
            return;
        }

        if (!enterprice) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, seleccione una empresa de seguridad',
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

        if (!documentType || !name || !email || !password || !document || !lastname || !phone || !confirmPassword || !dateOfbirth || !pdf) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, rellene todos los campos requeridos',
                icon: 'error',
            });
            //Activa la validacion de los campos cuando se envia el formulario
            setShouldValidate(true);
            return;
        }

        if (!enterprice) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, seleccione una empresa de seguridad',
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

        const userResponse = await useFetchForFile('http://localhost:3000/api/watchman', {
            documentType,
            namewatchman: name,
            email,
            document,
            idEnterpriseSecurity: enterprice,
            lastnamewatchman: lastname,
            phone,
            dateOfbirth,
            state: 'Activo'
        });


        console.log('userResponse', userResponse);


        if (userResponse.response) {
            let roleResponse;
            roleResponse = await useFetchForFile('http://localhost:3000/api/users', {
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
                                onChange={e => setPdf(e.target.files[0])} validate={shouldValidate} />
                            <Inputs name="Correo" type='email' value={email} onChange={e => setEmail(e.target.value)} validate={shouldValidate} required={true}
                                inputStyle={isEmailTaken ? { borderColor: 'red' } : null}
                                errorMessage={isEmailTaken ? "El correo ya existe" : null}

                            /> <Inputs name="Teléfono" type='number' value={phone} onChange={e => setPhone(e.target.value)} validate={shouldValidate} required={true}></Inputs>

                            <Inputs name="Fecha Nacimiento" type="date" value={dateOfbirth} onChange={e => setDateOfBirth(e.target.value)} validate={shouldValidate} required={true}></Inputs>

                        </FormColumn>

                        <FormColumn>
                            <div className="mr-1" style={{ width: '100%' }}>

                                <Select2 name={'Empresa de Seguridad'} onChange={handleEnterpriceSecurity} options={enterpriceOptions} validate={shouldValidate}></Select2>
                            </div>
                            <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"} value={documentType} onChange={e => setDocumentType(e.target.value)} validate={shouldValidate} required={true}></InputsSelect>
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
                            <Inputs name="Nombre" type='text' value={name} onChange={e => setName(e.target.value)} validate={shouldValidate} required={true} ></Inputs>
                            <Inputs name="Apellido" type='text' value={lastname} onChange={e => setLastName(e.target.value)} validate={shouldValidate} required={true}></Inputs>

                            <Inputs name="Confirmar Contraseña" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} validate={shouldValidate} required={true} />
                            <Inputs name="Contraseña" type='password' value={password} onChange={e => setPassword(e.target.value)} validate={shouldValidate} required={true} />
                        </FormColumn>
                    </>


                )}
            </FormContainer >
        </>
    )
}

