import FormContainer from "../../../Components/Forms/FormContainer"
import FormButton from "../../../Components/Forms/FormButton"
import Inputs from "../../../Components/Inputs/Inputs"
import InputsSelect from "../../../Components/Inputs/InputsSelect"




export const VehicleCreate = () => {
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
    return (
        <>
            <FormContainer name='Crear vehiculo' buttons={<FormButton name='Crear vehiculo' backButton='Regresar' ></FormButton>}>
                <InputsSelect id={"select"} options={tipo} name={"Usuarios disponibles"}></InputsSelect>
                
                <Inputs name={"Cantidad de personas"} type="number"></Inputs>
            </FormContainer>
        </>
    )
}
