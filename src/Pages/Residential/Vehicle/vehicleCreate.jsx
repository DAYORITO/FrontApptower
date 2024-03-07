import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import React, { useContext, useEffect, useState } from "react"
import { useFetch } from '../../../Hooks/useFetch'
import { useNavigate, useParams } from "react-router"
import { postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { SocketContext } from "../../../Context/SocketContext"
import InputTextArea from "../../../Components/Inputs/InputTextArea"



export const VehicleCreate = (props) => {
    const url = "http://localhost:3000/api/"

    // Socket

    const { socket } = useContext(SocketContext)

    const { id } = useParams()

    const { idUserLogged } = useUserLogged()


    const navigate = useNavigate();

    const [plate, setPlate] = useState('');
    const [description, setDescription] = useState('');
    const [idApartment, setIdApartment] = useState(id != undefined ? id : "");

    const [errorList, setErrorList] = useState([]);

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

            // User logged

            idUserLogged: idUserLogged,

            idApartment: parseInt(idApartment),
            licenseplate: plate,
            description: description

        }

        await postRequest(e, 'vehicle', 'POST', null, data, url, setErrorList, navigate, socket)

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

                <InputsSelect id={"select"} options={AparmetList} name={"Numero de aparmento"}
                    identifier={'idApartment'} errors={errorList}
                    value={idApartment} onChange={e => setIdApartment(e.target.value)}
                    disabled={id ? idApartment : ''}>

                </InputsSelect>
                <Inputs name={"Placa"} value={plate}
                    identifier={'licenseplate'} errors={errorList}
                    type="text" onChange={e => setPlate(e.target.value.toUpperCase())}>

                </Inputs>

                <InputTextArea
                    name="Descripción"
                    identifier={"details"}
                    errors={errorList}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    value={description}
                ></InputTextArea>
                
            </>

        </FormContainer>
    )
}
