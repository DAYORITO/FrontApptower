import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import React, { useEffect, useState } from "react"
import { useFetch } from '../../../Hooks/useFetch'
import { useNavigate, useParams } from "react-router"
import { postRequest } from '../../../Helpers/Helpers'



export const VehicleCreate = (props) => {
    const url = "http://localhost:3000/api/"
    const { id } = useParams()

    const [plate, setPlate] = useState('');
    const [description, setDescription] = useState('');

    const [idApartment, setIdApartment] = useState(id != undefined ? id : "");

    const navigate = useNavigate();

    const { data: apartments, get: getApartment } = useFetch(url)

    useEffect(() => {
        getApartment("apartments")
    }, []);

    const AparmetList = apartments && apartments?.data?.apartments
        ? apartments?.data?.apartments
            .filter(apartment => apartment.status === 'Active')
            .map(apartment => ({
                value: apartment.idApartment,
                label: `${apartment.apartmentName} ${apartment.Tower.towerName}`
            }))
        : [];

    const createVehicle = async (e) => {
        const data = {
            idApartment: parseInt(idApartment),
            licenseplate: plate,
            description: description
        }

        await postRequest(e, 'vehicle', 'POST', {}, data, url)

        navigate(-1)

    }


    return (
        <FormContainer name='Crear vehiculo'
            buttons={
                <FormButton
                    name='Crear Vehiculo'
                    backButton='Regresar'
                    to='/admin/vehicle/'
                    onClick={createVehicle}
                />}>
            <>

                <InputsSelect id={"select"} options={AparmetList} name={"Numero de aparmento"} value={idApartment} onChange={e => setIdApartment(e.target.value)} disabled={id ? idApartment : ''}></InputsSelect>
                <Inputs name={"Placa"} value={plate} type="text" onChange={e => setPlate(e.target.value)}></Inputs>
                <Inputs name={"Descripcion"} value={description} type="text" onChange={e => setDescription(e.target.value)}></Inputs>
            </>

        </FormContainer>
    )
}
