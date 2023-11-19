import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
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
                <Inputs name="Tipo de documento" placeholder="Ejemplo: CC"></Inputs>
                <Inputs name="Numero de documento"></Inputs>
                <InputsSelect id={"select"} options={opciones} name={"Tipo de reserva"}></InputsSelect>
                <Inputs name="fecha de reserva" type="Date"></Inputs>


            </FormContainer>
        </>
    )
}
