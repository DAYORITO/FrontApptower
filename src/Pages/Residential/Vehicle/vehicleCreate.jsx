import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"




export const VehicleCreate = () => {
    const navigate = useNavigate();

    const handdleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            idApartment: Apartment,
            licenseplate: plate,
            state: state,
            description: description,
        }
        const { response, error } = await fetch('https://apptowerbackend.onrender.com/api/vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
        if (json) {
            Swal.fire({
                title: 'Éxito',
                text: 'Vehiculo creado exitosamente',
                icon: 'success',
            }).then(() => {
                navigate('/admin/vehicle');
            });
        }

        if (error) {
            console.log('Hubo un error');
            Swal.fire({
                title: 'Error',
                text: 'Error al crear vehiculo',
                icon: 'error',
            });
        }
    }

    const [Apartment, setApartment] = useState('');
    const [plate, setPlate] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');

    const handleApartmentChange = (e) => {
        setApartment(e.target.value);
    }

    useEffect(() => {
        fetch('https://apptowerbackend.onrender.com/api/apartments')
            .then(response => response.json())
            .then(data => setApartment(data))
            .catch(error => console.error('Error al cargar los apartamentos:', error));
    }, []);

    const AparmetList = Apartment && Apartment.apartments ? Apartment.apartments
        .filter(Apartment => Apartment.status === 'Active')
        .map(Apartment => ({
            value: Apartment.idApartment,
            label: Apartment.apartmentName
        }))
        : [];
    console.log(Apartment)

    return (
        <>
            <FormContainer name='Crear vehiculo' buttons={<FormButton name='Crear vehiculo' backButton='Regresar' to='/admin/booking' onClick={handdleSubmit} ></FormButton>}>
                <InputsSelect id={"select-apartment"} options={AparmetList} name={"Apartamento"} onChange={handleApartmentChange}></InputsSelect>
                <Inputs name={"Tipo de usuario"} type="text"></Inputs>
                <Inputs name={"Placa"} type="text"></Inputs>
            </FormContainer>
        </>
    )
}
