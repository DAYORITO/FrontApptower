import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useFetchget, useFetchpostFile } from '../../../Hooks/useFetch'
import Swal from "sweetalert2"




export const VehicleCreate = () => {
    const [ApartmentByResident, setApartmentByResident] = useState([]);
    const [typeUser, setTypeUser] = useState('');
    const [plate, setPlate] = useState('');
    const [idApartment, setIdApartment] = useState('');
    const [idResident, setIdResident] = useState('');
    const [idApartmentResident, setIdApartmentResident] = useState('');


    const navigate = useNavigate();
    
    const handdleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            typeUser,
            plate
        }
        const {response,error }= await fetch('https://apptowerbackend.onrender.com/api/vehicles', {
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

    const handleApartmentChange = (selectedOption) => {
        setIdApartment(selectedOption.value);
        updateApartmentResidentId(selectedOption.value, idResident);
    };

    const handleResidentChange = (selectedOption) => {
        setIdResident(selectedOption.value);
        updateApartmentResidentId(idApartment, selectedOption.value);
    };

    const updateApartmentResidentId = (apartmentId, residentId) => {
        const found = ApartmentByResident.find(ar => 
            ar.apartments.idApartment === apartmentId && ar.residents.idResident === residentId
        );
        if (found) {
            setIdApartmentResident(found.id);
        }
    };

    useEffect(() => {
        fetch('https://apptowerbackend.onrender.com/api/aparmentResidents')
            .then(response => response.json())
            .then(data => setApartmentByResident(data))
            .catch(error => console.error('Error al cargar los apartamentos por residente:', error));
    }, []);

    const AparmetList = ApartmentByResident && ApartmentByResident.idApartmentResident ? ApartmentByResident.idApartmentResident
        .filter(Apartment => Apartment.status === 'Active')
        .map(Apartment => ({
            value: Apartment.apartments.idApartment,
            label: Apartment.apartments.apartmentName
        }))
        : [];
    const ResidentList = ApartmentByResident && ApartmentByResident.idApartmentResident ? ApartmentByResident.idApartmentResident
        .filter(Apartment => Apartment.status === 'Active')
        .map(Apartment => ({
            value: Apartment.residents.idResident,
            label: Apartment.residents.name
        }))
        : [];
    return (
        <>
            <FormContainer name='Crear vehiculo' buttons={<FormButton name='Crear vehiculo' backButton='Regresar' to='/admin/booking' onClick={handdleSubmit} ></FormButton>}>
            <InputsSelect id={"select-apartment"} options={AparmetList} name={"Apartamento"} onChange={handleApartmentChange}></InputsSelect>
                <InputsSelect id={"select-resident"} options={ResidentList} name={"Residente"} onChange={handleResidentChange}></InputsSelect>
                <Inputs name={"Tipo de usuario"} type="text"></Inputs>
                <Inputs name={"Placa"} type="text"></Inputs>
            </FormContainer>
        </>
    )
}
