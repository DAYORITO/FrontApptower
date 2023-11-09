import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'

export const ParkingSpacesCreate = () => {
  return (
<FormContainer name='Crear parqueadero' buttons={<FormButton name='Crear parqueadero' backButton='Regresar' />}>
        {/* <FormColumn> */}
        
        <Inputs name="Tipo de parqueadero" placeholder="Ejemplo: 101"></Inputs>
        <Inputs name="Nombre parqueadero" placeholder="Ejemplo: S101"></Inputs>
        <Inputs name="Estado"></Inputs>

        {/* </FormColumn> */}
        

      </FormContainer>  )
}
