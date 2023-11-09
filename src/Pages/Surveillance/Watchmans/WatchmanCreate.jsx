import FormContainer from '../../../Components/Forms/FormContainer'
import FormColumn from '../../../Components/Forms/FormColumn'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'

export const WatchmanCreate = () => {
    return (
        <>

            <FormContainer name='Crear Vigilante' buttons={<FormButton name='Crear' backButton='Cancelar' />}>
                <FormColumn>
                    <Inputs name="Tipo Documento" placeholder="Ingresa tipo de documento"></Inputs>
                    <Inputs name="Nombre" type='text' placeholder="Ingresa tu nombre"></Inputs>
                    <Inputs name="Correo" placeholder="Ingresa tu correo"></Inputs>
                    <Inputs name="Fecha Nacimiento" type="Date" placeholder="Ingresa tu fecha de nacimiento"></Inputs>

                </FormColumn>

                <FormColumn>
                    <Inputs name="Documento" type='number' placeholder="Ingresa tu documento"></Inputs>
                    <Inputs name="Apellido" type='text' placeholder="Ingresa tu apellido"></Inputs>
                    <Inputs name="Teléfono" placeholder="Ingresa tu teléfono"></Inputs>

                </FormColumn>


            </FormContainer>
        </>
    )
}

