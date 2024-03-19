import React, { useContext, useEffect, useState } from 'react'
import FormContainer from '../../../Components/Forms/FormContainer'
import Inputs from '../../../Components/Inputs/Inputs'
import FormButton from '../../../Components/Forms/FormButton'
import { Uploader } from '../../../Components/Uploader/Uploader'
// import InputsSelect from '../../../Components/Inputs/InputsSelect'
import Swal from 'sweetalert2'
import { useFetch, useFetchForFile } from '../../../Hooks/useFetch'
import { useNavigate, useParams } from 'react-router'
import FormColumn from "../../../Components/Forms/FormColumn";
import InputsSelect from '../../../Components/Inputs/InputsSelect'
import { handlePostRequest, postRequest } from '../../../Helpers/Helpers'
import { bools } from '../../../Hooks/consts.hooks'
import { SocketContext } from '../../../Context/SocketContext'


export const ApartmentCreate = () => {

  // Socket

  const { socket } = useContext(SocketContext)

  // const url = 'https://apptowerbackend.onrender.com/api/';
  const url = import.meta.env.VITE_API_URL;

  const { post: postApartment } = useFetch(url)
  const { data: towers, get: getTowers } = useFetch(url)


  useEffect(() => {

    getTowers('towers')

  }, [])


  const { id } = useParams()


  const [tower, setTower] = useState(id === null ? "" : id);
  const [apartmentsFloor, setApartmentsFloor] = useState("");

  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");

  const [area, setArea] = useState("");
  const [status, setStatus] = useState("Active");

  let [isUniqueTower, setIsUniqueTower] = useState('true');

  const [lastApartmentNumber, setLastApartmentNumber] = useState(0);

  const [errorList, setErrorList] = useState([]);



  const navigate = useNavigate();


  const towerList = towers?.data?.towers

    ? towers.data?.towers
      .map(tower => ({
        value: tower.idTower,
        label: `${tower.towerName}`
      }))
    : [];

  const handleCreateApartment = async (event) => {

    const data = {

      apartmentsFloor: apartmentsFloor,
      idTower: tower,
      rangeStart: rangeStart,
      rangeEnd: rangeEnd,
      area: area,

      isUniqueTower: isUniqueTower,
      lastApartmentNumber: lastApartmentNumber

    };

    await postRequest(event, 'apartments', 'POST', null, data, url, setErrorList, navigate, socket);


  };




  return (
    <>

      <FormContainer name='Crear apartamento' buttons={<FormButton name='Crear apartamento' backButton='Regresar' to='/admin/apartaments/' onClick={handleCreateApartment} />}>

        <InputsSelect id={"select"} options={towerList} name={"Torre"}
          identifier={'idTower'} errors={errorList}
          value={tower} onChange={e => setTower(e.target.value)}
        ></InputsSelect>

        <InputsSelect
          id={"select"}
          options={bools}
          name={"¿Numeración única?"}
          identifier={'isUniqueTower'}
          errors={errorList}
          value={isUniqueTower}
          onChange={e => setIsUniqueTower(e.target.value)}
        ></InputsSelect>

        {
          isUniqueTower == 'true' ? (
            <Inputs
              name="Último apartamento del bloque anterior."
              type={"number"}
              identifier={'lastApartmentNumber'}
              errors={errorList}
              value={lastApartmentNumber}
              onChange={e => setLastApartmentNumber(e.target.value)}
            ></Inputs>
          ) : null
        }
        <Inputs name="Numero de apartamentos por piso " type={"number"}
          identifier={'apartmentsFloor'} errors={errorList}
          value={apartmentsFloor} onChange={e => setApartmentsFloor(e.target.value)}></Inputs>

        <Inputs name="Planta o piso inicial" type={"number"}
          identifier={'rangeStart'} errors={errorList}
          value={rangeStart} onChange={e => setRangeStart(e.target.value)}></Inputs>

        <Inputs name="Planta o piso final " type={"number"}
          identifier={'rangeEnd'} errors={errorList}
          value={rangeEnd} onChange={e => setRangeEnd(e.target.value)}></Inputs>


        <Inputs name="Area" type="number"
          identifier={'area'} errors={errorList}
          value={area} onChange={e => setArea(e.target.value)}></Inputs>

      </FormContainer>
    </>)
}
