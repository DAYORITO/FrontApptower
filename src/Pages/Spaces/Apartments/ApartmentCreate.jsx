import React, { useEffect, useState } from 'react'
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


export const ApartmentCreate = () => {



  // const url = 'https://apptowerbackend.onrender.com/api/';
  const url = 'http://localhost:3000/api/';

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

      apartmentsFloor: parseInt(apartmentsFloor),
      idTower: parseInt(tower),
      rangeStart: parseInt(rangeStart),
      rangeEnd: parseInt(rangeEnd),
      area: parseFloat(area)
    };


    await postRequest(event, 'apartments', 'POST', null, data, url, setErrorList, navigate, null);


  };





  return (
    <>

      <FormContainer name='Crear apartamento' buttons={<FormButton name='Crear apartamento' backButton='Regresar' to='/admin/apartaments/' onClick={handleCreateApartment} />}>

        {/* <FormColumn> */}
        <InputsSelect id={"select"} options={towerList} name={"Torre"}
          identifier={'idTower'} errors={errorList}
          value={tower} onChange={e => setTower(e.target.value)}
        ></InputsSelect>

        <Inputs name="Numero de apartamentos por piso " type={"number"}
          identifier={'apartmentsFloor'} errors={errorList}
          value={apartmentsFloor} onChange={e => setApartmentsFloor(e.target.value)}></Inputs>

        <Inputs name="Planta o piso inicial" type={"number"}
          identifier={'rangeStart'} errors={errorList}
          value={rangeStart} onChange={e => setRangeStart(e.target.value)}></Inputs>

        <Inputs name="Planta o piso final " type={"number"}
          identifier={'rangeEnd'} errors={errorList}
          value={rangeEnd} onChange={e => setRangeEnd(e.target.value)}></Inputs>

        {/* </FormColumn> */}
        {/* <FormColumn> */}

        <Inputs name="Area" type="number"
          identifier={'area'} errors={errorList}
          value={area} onChange={e => setArea(e.target.value)}></Inputs>
        {/* </FormColumn> */}

      </FormContainer>
    </>)
}
