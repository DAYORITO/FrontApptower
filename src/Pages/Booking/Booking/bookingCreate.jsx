/* eslint-disable no-unused-vars */
import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { useFetchget, useFetchpostFile } from '../../../Hooks/useFetch'
import { useEffect, useState } from "react"
import { docTypes } from "../../../Hooks/consts.hooks"
import { useNavigate } from "react-router"
import { format, parse, setHours, setMinutes, addHours, addMinutes } from 'date-fns'
import Swal from "sweetalert2"
import TimeInput from "../../../Components/Inputs/InputTime"
const style = {
    width: "50%"
}


export const BookingCreate = () => {
    //variables
    const [docType, setDocTypes] = useState([]);
    const [user, setUsers] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [amount, setAmount] = useState("");
    const [duration, setDuration] = useState("");
    let status = 'pendiente'

    //parsear fechas

    const parseAndFormatDateTime = (variableDate, variableTime) => {

        const date = parse(variableDate, 'yyyy-MM-dd', new Date());

        const [hours, minutes] = variableTime.split(':').map(Number);

        let combinedDateTime = setHours(date, hours);
        combinedDateTime = setMinutes(combinedDateTime, minutes);


        if (isNaN(combinedDateTime)) {
            console.error("combinedDateTime es inválido:", combinedDateTime);
            return null;
        }

        return format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }


    const calculateEndTime = (startDate, duration) => {
        const [durationHours, durationMinutes] = duration.split(':').map(Number);
        let endDate = addHours(startDate, durationHours);
        endDate = addMinutes(endDate, durationMinutes);

        return format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }

    const dateStart = parseAndFormatDateTime(bookingDate, bookingTime);
    let dateEnd;

    if (duration) {
        const startDateObject = parse(dateStart, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date());
        dateEnd = calculateEndTime(startDateObject, duration);
    }



    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://apptowerbackend.onrender.com/api/bookings';
        if (spaces.name === 'Salon Social') {
            status = 'por pagar'
        } else {
            status = 'pendiente'
        }

        const data = {
            idSpace: spaces.idSpace,
            idUser: user.idUser,
            bookingDate: dateStart,
            amount,
            status: status,
            bookingTime: dateEnd
        };
        console.log('Data:', data);
        const { response, error } = await useFetchpostFile(url, data);

        if (response) {
            console.log('Response:', response);
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
            label: user.document+ ' - ' + user.name
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
                <InputsSelect id={"select"} options={userList} name={"Numero de Documento"} ></InputsSelect>
                <InputsSelect id={"select"} options={spacesList} name={"Tipo de reserva"} ></InputsSelect>
                <div className="d-flex " style={style}>
                    <Inputs name="fecha de reserva" type="Date" value={bookingDate} onChange={e => setBookingDate(e.target.value)}></Inputs>
                    <TimeInput name={"Hora de la reserva"} type="number" value={bookingTime} onChange={e => setBookingTime(e.target.value)}></TimeInput>

                </div>
                <Inputs name={"Cantidad de personas"} type="number" value={amount} onChange={e => setAmount(e.target.value)}></Inputs>
                <TimeInput name={"Horas de duracion"} type="Time" value={duration} onChange={e => setDuration(e.target.value)}></TimeInput>


            </FormContainer>

        </>

    )
}
