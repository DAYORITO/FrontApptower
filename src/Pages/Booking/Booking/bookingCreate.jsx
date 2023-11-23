import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
const style = {
    width: "50%"
}
const tipo =[
    {
        value: "CC",
        label: "CC"
    },
    {
        value: "TI",
        label: "TI"
    },
    {
        value: "CE",
        label: "CE"
    },
    {
        value: "Pasaporte",
        label: "Pasaporte"
    }
]
const opciones = [
    {
        value: "Zona humeda",
        label: "Zona humeda"
    },
    {
        value: "Salon Social",
        label: "Salon Social"
    }
];

export const BookingCreate = () => {
    return (
        <>
            <FormContainer name='Crear reserva' buttons={<FormButton name='Crear reserva' backButton='Regresar' ></FormButton>}>
                <InputsSelect id={"select"} options={opciones} name={"Tipo de identificación"}></InputsSelect>
                <Inputs name="Numero de documento"></Inputs>
                <InputsSelect id={"select"} options={opciones} name={"Tipo de reserva"}></InputsSelect>
                <div className="d-flex" style={style}>
                    <Inputs name="fecha de reserva" type="Date"></Inputs>
                    <Inputs name="Hora de la reserva" type="Time"></Inputs>
                </div>
                <Inputs name={"Cantidad de personas"} type="number"></Inputs>
                <Inputs name={"Horas de duracion"} type="number"></Inputs>
            </FormContainer>
        </>
    )
}
