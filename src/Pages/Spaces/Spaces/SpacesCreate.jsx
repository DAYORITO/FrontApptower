import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'

export const SpacesCreate = () => {
  return (
    <>

      <FormContainer name='Crear espacio' buttons={<FormButton name='Crear espacio' backButton='Regresar' />}>
        {/* <FormColumn> */}
        
        <Inputs name="Tipo de espacio" placeholder="Ejemplo: 101"></Inputs>
        <Inputs name="Nombre espacio" placeholder="Ejemplo: 101"></Inputs>
        <Inputs name="Area" type="number"></Inputs>
        <Inputs name="Capacidad" type="number"></Inputs>
        <Inputs name="Estado"></Inputs>

        {/* </FormColumn> */}
        

      </FormContainer>
    </>)
}
