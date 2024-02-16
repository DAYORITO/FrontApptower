import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2"
import { useFetchForFile } from '../../../Hooks/useFetch'



export const VehicleCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const handdleSubmit = async (e) => {
        e.preventDefault();
        const url = 'https://apptowerbackend.onrender.com/api/vehicle';
        const data = {
            "idApartment": selectedApartment,
            "licenseplate": plate,
            "description": description,
        }
        const { response, error } = await useFetchForFile(url, data);


        if (response) {
            Swal.fire({
                title: 'Éxito',
                text: 'Vehiculo creado exitosamente',
                icon: 'success',
            }).then(() => {
                navigate(-1);
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

    const [Apartment, setApartment] = useState(id === null ? "" : id);
    const [plate, setPlate] = useState('');
    const [description, setDescription] = useState('');
    const [selectedApartment, setSelectedApartment] = useState('');

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
                <InputsSelect id={"select"} options={AparmetList} name={"Numero de Apartamento"} onChange={e => setSelectedApartment(e.target.value)}></InputsSelect>
                <Inputs name={"Placa"} type="text" onChange={e => setPlate(e.target.value)}></Inputs>
                <Inputs name={"Descripcion"} type="text" onChange={e => setDescription(e.target.value)}></Inputs>
            </FormContainer>
        </>
    )
}
