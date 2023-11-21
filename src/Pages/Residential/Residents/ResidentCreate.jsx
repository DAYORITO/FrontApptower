import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
import InputsSelect from '../../../Components/Inputs/InputsSelect'

export const ResidentCreate = () => {

  const opciones = [
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
    }

  
  ];

  const residentsTypes = [

    {
      value: "Propietario",
      label: "Propietario"
    },

    {
      value: "Arrendatario",
      label: "Arrendatario"
    }
  ]
  return (

    <FormContainer name='Crear residente' buttons={<FormButton name='Crear residente' backButton='Regresar' />}>
      {/* <FormColumn> */}

      <Uploader label='Documento de indentidad' formatos='.pdf' />

      <InputsSelect id={"select"} options={residentsTypes} name={"Tipo residente"}></InputsSelect>
      <InputsSelect id={"select"} options={opciones} name={"Tipo Documento"}></InputsSelect>

      <Inputs name="Numero de documento" placeholder="1000000007"></Inputs>
      <Inputs name="Apellido"></Inputs>
      <Inputs name="Fecha de nacimiento" type="Date"></Inputs>
      <Inputs name="Correo" type="email"></Inputs>
      <Inputs name="Numero de telefono"></Inputs>

      <InputsSelect id={"select"} options={residentsTypes} name={"Apartamento "}></InputsSelect>


    </FormContainer>
  )
}


