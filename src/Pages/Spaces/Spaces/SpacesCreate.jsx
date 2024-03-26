import React, { useState, useEffect } from 'react';
import FormContainer from '../../../Components/Forms/FormContainer';
import Inputs from '../../../Components/Inputs/Inputs';
import FormButton from '../../../Components/Forms/FormButton';
import { Uploader } from '../../../Components/Uploader/Uploader';
import { useNavigate } from 'react-router';
import InputsSelect from '../../../Components/Inputs/InputsSelect';
import { spacesTypes } from '../../../Hooks/consts.hooks';
import { postRequest } from '../../../Helpers/Helpers';
import FormColumn from '../../../Components/Forms/FormColumn';

export const SpacesCreate = () => {
  const url = import.meta.env.VITE_API_URL;
  const [spaceType, setSpaceType] = useState("");
  const [image, setImage] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [area, setArea] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Active");
  const [minTime, setMinTime] = useState(1);
  const [maxTime, setMaxTime] = useState(""); // Inicialmente establecido en 0

  const [errorList, setErrorList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Calcula la diferencia entre la hora de cierre y la hora de apertura
    const calculateMaxTime = () => {
      const closingHour = parseInt(closingTime.split(':')[0]);
      const openingHour = parseInt(openingTime.split(':')[0]);
      if (!isNaN(closingHour) && !isNaN(openingHour)) {
        setMaxTime(closingHour - openingHour);
      }
    };
    calculateMaxTime(); // Calcula el valor inicial de maxTime
  }, [closingTime, openingTime]); // Ejecuta el efecto cada vez que closingTime o openingTime cambien

  const createSpace = async (event) => {
    const data = {
      spaceType: spaceType,
      spaceName: spaceName,
      image: image,
      openingTime: openingTime,
      closingTime: closingTime,
      minTime: minTime,
      maxTime: maxTime,
      area: area,
      capacity: capacity,
      status: status
    };

    await postRequest(event, 'spaces', 'POST', null, data, url, setErrorList, navigate, null);
  };

  return (
    <FormContainer name='Crear zona común' buttons={
      <FormButton name='Crear zona común' backButton='Regresar' to='/admin/spaces/' onClick={createSpace} />
    }>
      <FormColumn>
        <h6 className='mb-4 text-muted'>Información zona común</h6>
        <InputsSelect name={"Tipo de espacio"} options={spacesTypes} identifier={'spaceType'} errors={errorList} value={spaceType} onChange={e => setSpaceType(e.target.value)} />
        <Inputs name="Nombre espacio" placeholder="Ejemplo: 101" identifier={'spaceName'} errors={errorList} value={spaceName} onChange={e => setSpaceName(e.target.value)} />
        <Inputs name="Área" type="number" identifier={'area'} errors={errorList} value={area} onChange={e => setArea(e.target.value)} />
        <Inputs name="Capacidad" type="number" identifier={'capacity'} errors={errorList} value={capacity} onChange={e => setCapacity(e.target.value)} />
      </FormColumn>
      <FormColumn>
        <h6 className='mb-4 text-muted'>Disponibilidad de zona común {spaceName}</h6>
        <Inputs name="Hora de apertura" type="time" identifier={'openingTime'} errors={errorList} value={openingTime} onChange={e => setOpeningTime(e.target.value)} />
        <Inputs name="Hora de cierre" type="time" identifier={'closingTime'} errors={errorList} value={closingTime} onChange={e => setClosingTime(e.target.value)} />
        <Inputs min={1} max={24} name="Minimo de horas" type="number" identifier={'minTime'} errors={errorList} value={minTime} onChange={e => setMinTime(e.target.value)} />
        <Inputs min={1} max={24} name="Maximo de horas" type="number" identifier={'maxTime'} errors={errorList} value={maxTime} onChange={e => setMaxTime(e.target.value)} />
      </FormColumn>
      <Uploader label={'Foto de zona común'} name="img" onChange={e => setImage(e.target.files[0])} />
    </FormContainer>
  );
};
