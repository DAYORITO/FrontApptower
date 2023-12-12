/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { useFetchget, useFetchpostFile } from '../../../Hooks/useFetch'
import { useEffect, useState } from "react"
import { docTypes } from "../../../Hooks/consts.hooks"
import { useNavigate } from "react-router"
import { parse, format, isValid } from 'date-fns';
import Swal from "sweetalert2"



export const BookingCreate = (props) => {
    //variables
    const socket = props.socket;
    const [docType, setDocTypes] = useState([]);
    const [user, setUsers] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingEnd, setBookingEnd] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedUser, setSelectedUser] = useState();
    const [selectedSpace, setSelectedSpace] = useState();

    const parsedStartDate = parse(bookingDate, "yyyy-MM-dd'T'HH:mm", new Date());
    const parsedEndDate = parse(bookingEnd, "yyyy-MM-dd'T'HH:mm", new Date());
    let dateStart = '';
    let dateEnd = '';

    if (isValid(parsedStartDate) && isValid(parsedEndDate)) {
        dateStart = format(parsedStartDate, 'yyyy-MM-dd HH:mm:ss');
        dateEnd = format(parsedEndDate, 'yyyy-MM-dd HH:mm:ss');
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://apptowerbackend.onrender.com/api/booking';
        const status = 'pendiente'

        const data = {
            "idSpace": selectedSpace,
            "iduser": selectedUser,
            "bookingdate": dateStart,
            "amount": amount,
            "status": status,
            "finalDate": dateEnd
        };
        console.log('Data:', data);
        const {
            response,
            error
        } = await useFetchpostFile(url, data);

        if (response) {
            console.log('Response:', response);
            try {
                socket.emit('notificacion', 'Se ha creado una nueva reserva');
            } catch (error) {
                console.log(error);
            }
            
            Swal.fire({
                title: 'Éxito',
                text: 'Reservas creado exitosamente',
                icon: 'success',
            }).then(() => {

                navigate('/admin/booking');
            });
        }

        if (error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error al crear reservas',
                icon: 'error',
            });
        }
    }

    useEffect(() => {
        fetch('https://apptowerbackend.onrender.com/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error al cargar usuarios:', error));

        fetch('https://apptowerbackend.onrender.com/api/spaces')
            .then(response => response.json())
            .then(data => setSpaces(data))
            .catch(error => console.error('Error al cargar espacios:', error));
    }, []);

    const userList = user && user.user ? user.user
        .filter(users => users.state === 'Activo')
        .map(user => ({
            value: user.iduser,
            label: user.document + ' - ' + user.name
        }))
        : [];

    const spacesList = spaces && spaces.spaces ? spaces.spaces
        .filter(space => space.status === 'Active')
        .map(space => ({
            value: space.idSpace,
            label: space.spaceName
        }))
        : [];



    return (
        <>
            <FormContainer name='Crear reserva' buttons={<FormButton name='Crear reserva' backButton='Regresar' to='/admin/booking/' onClick={handleSubmit} ></FormButton>}>

                <InputsSelect id={"select"} options={docTypes} name={"Tipo Documento"} value={docType} onChange={e => setDocTypes(e.target.value)}></InputsSelect>
                <InputsSelect id={"select"} options={userList} name={"Numero de Documento"} onChange={e => setSelectedUser(parseInt(e.target.value, 10))}></InputsSelect>
                <InputsSelect id={"select"} options={spacesList} name={"Tipo de reserva"} onChange={e => setSelectedSpace(parseInt(e.target.value, 10))}></InputsSelect>
                <Inputs name="fecha de reserva" type="datetime-local" value={bookingDate} onChange={e => setBookingDate(e.target.value)}></Inputs>
                <Inputs name={"Cantidad de personas"} type="number" value={amount} onChange={e => setAmount(parseInt(e.target.value, 10))}></Inputs>
                <Inputs name={"Tiempo de duracion"} type="datetime-local" value={bookingEnd} onChange={e => setBookingEnd(e.target.value)}></Inputs>


            </FormContainer>

        </>

    )
}
