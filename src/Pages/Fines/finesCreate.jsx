import React, { useContext, useEffect } from "react";
import FormContainer from "../../Components/Forms/FormContainer";
import InputsSelect from "../../Components/Inputs/InputsSelect";
import { fineTypes } from "../../Hooks/consts.hooks";
import Inputs from "../../Components/Inputs/Inputs";
import { Form } from "react-router-dom";
import { useState } from "react";
import FormButton from "../../Components/Forms/FormButton";
import InputTextArea from "../../Components/Inputs/InputTextArea";
import { Uploader } from "../../Components/Uploader/Uploader";
import { useFetchForFile } from "../../Hooks/useFetch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Select2 from "../../Components/Inputs/Select2";
import { useFetchget } from "../../Hooks/useFetch";
import { get } from "jquery";
import FormColumn from "../../Components/Forms/FormColumn";
import { useParams } from "react-router";
import { tr } from "date-fns/locale";
import Cookies from 'js-cookie';
import { useUserLogged } from "../../Helpers/Helpers";
import { SocketContext } from "../../Context/SocketContext";
import { set } from "date-fns";

function FinesCreate() {

  // Socket

  const { socket } = useContext(SocketContext)

  // User Logeed

  const { idUserLogged } = useUserLogged()

  const { id } = useParams();
  const [fineType, setFineType] = useState("");
  const [idApartment, setIdApartment] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState("");
  const navigate = useNavigate();
  const [apartmets, setApartments] = useState({ apartments: [] });
  const [showModal, setShowmodal] = useState(false);
  const [errors, setErrors] = useState([{}])

  // Limid date calculated
  
  useEffect(() => {
    const today = new Date();
    const oneMonthFromNow = new Date(today);
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    const formattedLimitDate = oneMonthFromNow.toISOString().split('T')[0]; // Esto te dará la fecha en formato YYYY-MM-DD
    setLimitDate(formattedLimitDate);
  }, []);
  
  console.log(limitDate);

  const { data, load, error } = useFetchget("apartments");
  // console.log(data);

  //Se crean los estados para los datos del usuario
  const [userData, setUserData] = useState({});

  //
  const token = Cookies.get('token');
  // console.log("Datos piopio", userData)

  //Funcion para obtener el documento del usuario
  const fetchUserInformation = async (token) => {
    try {
      const response = await fetch('https://apptowerbackend.onrender.com/api/informationUser', {
        headers: {
          Authorization: `Bearer ${token}`
        }, credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }

      const data = await response.json();
      setUserData(data);
      // SetUserDocument(data.user.document);

    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchUserInformation(token);
    }
  }, [token]);


  useEffect(() => {
    // Cuando la carga está en progreso (load es true), activamos el modal de carga
    if (load) {
      // setShowModaload(true);
    } else {
      // Cuando la carga se completa (load es false), desactivamos el modal de carga
      // setShowModaload(false);
    }
  });
  useEffect(
    (data) => {
      if (data && data.apartments) {
        setApartments(getApartments(data));
      }
    },
    [data]
  );

  const getApartments = (data) => {
    const apartmentsList =
      data?.apartments?.map((apartment) => ({
        value: apartment.idApartment,
        label: apartment.apartmentName,
      })) || [];

    // Agrega un registro vacío al principio de la lista
    apartmentsList.unshift({
      value: "",
      label: "",
    });
    // console.log(apartmentsList);
    return apartmentsList;
  };

  useEffect(() => {
    if (data && data.apartments) {
      const apartment = data.apartments.find((apartment) => apartment.idApartment === Number(id));
      if (apartment) {
        setIdApartment(apartment.idApartment);
        console.log(apartment.idApartment, "apartment.idApartment");
      }
    }
  }, [data, id]);

  const getApartmentName = (id) => {
    const apartment = data?.apartments?.find(apartment => apartment.idApartment === id);
    return apartment ? apartment.apartmentName : "";
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("antes de enviar: ", idApartment?.value);
    // const url = 'https://apptowerbackend.onrender.com/api/fines';
    const url = "http://localhost:3000/api/fines";
    const data = {

      // User logged

      idUserLogged: idUserLogged,

      fineType: fineType,
      idApartment: idApartment?.value,
      incidentDate: incidentDate,
      paymentDate: limitDate,
      amount: Math.round(parseFloat(amount) * 100) / 100,
      details: description,
      state: "Pendiente",
      evidenceFiles: evidence,
      iduser: parseInt(userData?.user.iduser),
    };

    console.log("Data:", data);

    const { response, error } = await useFetchForFile(url, data);

    console.log(response);

    console.log("Response:", response);
    if (response) {
      Swal.fire({
        title: "Éxito",
        text: "Multa creada exitosamente",
        icon: "success",
      }).then(() => {

        if (socket) { socket.disconnect(); socket.connect(); console.log('disconnect and re coneect socket') };

        navigate(-1);

      });

    }

    if (error) {
      console.log("Hubo un error");
      Swal.fire({
        title: "Error",
        text: "Error al crear la multa",
        icon: "error",
      });
      // const errorData = error.;
      console.log("errosData pa enviar", error)
      setErrors(error);

    }
  };
  return (
    <>
      <FormContainer
        name="Crear multa"
        buttons={
          <FormButton
            name="Crear multa"
            backButton="Cancelar"
            onClick={handleSubmit}
          />
        }
      >
        <FormColumn>
          <InputsSelect
            name="Tipo de multa"
            identifier={"fineType"}
            errors={errors}
            onChange={(e) => {
              setFineType(e.target.value);
            }}
            options={fineTypes}
          ></InputsSelect>


          {!id ?
            <Select2
              // key={idApartment}
              placeholder="Apartamento"
              value={idApartment}
              onChange={setIdApartment}
              options={getApartments(data)}
              identifier={"idApartment"}
              errors={errors}
            />
            :
            <Inputs
              key={idApartment}
              name="Apartamento"
              value={getApartmentName(idApartment) || ""}
              type="text"
              readonly={true}
              inputStyle={{ backgroundColor: '#F8F8F8' }}
            />
          }
          <Inputs
            name="Fecha del incidente"
            identifier={"incidentDate"}
            errors={errors}
            onChange={(e) => {
              setIncidentDate(e.target.value);
            }}
            type="date"
          ></Inputs>

          <Inputs
            name="Fecha límite de pago"
            identifier={"paymentDate"}
            errors={errors}
            value={limitDate}
            onChange={(e) => {
              setLimitDate(e.target.value);
            }}
            type="date"
          ></Inputs>
          <Inputs
            name="Monto"
            type="number"
            identifier={"amount"}
            onChange={(e) => {
              setAmount(e.target.value);
              console.log(amount);
            }}
            errors={errors}
            validate={true}
            required={true}
          ></Inputs>
          <InputTextArea
            name="Descripción"
            identifier={"details"}
            errors={errors}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></InputTextArea>
        </FormColumn>
        <FormColumn>
          <Uploader
            label="Adjuntar evidencia"
            multiple={true}
            onChange={(e) => {
              const filesArray = Array.from(e.target.files),
                files = filesArray.map((file) => file);
              setEvidence(files);
              console.log("evidence", files);
            }}
          ></Uploader>
        </FormColumn>
      </FormContainer>
      {/* {showModal && } */}
    </>
  );
}

export default FinesCreate;
