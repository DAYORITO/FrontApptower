import Swal from "sweetalert2";
import { useFetchForFile } from "../Hooks/useFetch";


// Filter apartment 

export const filter = (search, myData, searcher, searcher2) => {
  if (!Array.isArray(myData)) {
    console.error("myData is not an array:", myData);
    myData = [];
  }

  let data = [];

  if (!search) {
    data = myData;
  } else {
    console.log(searcher)
    data = myData.filter((dato) =>
      searcher2 != null ?
        dato[searcher][searcher2].toLowerCase().includes(search.toLowerCase()) :
        dato[searcher].toLowerCase().includes(search.toLowerCase())

    );
  }

  return data;
};


export const filterPerSelect = (search, myData, searcher) => {
  if (!Array.isArray(myData)) {
    console.error("myData is not an array:", myData);
    myData = [];
  }

  let data = [];

  if (!search) {
    data = myData;
  } else {
    console.log(searcher)
    data = myData.filter((dato) =>

      dato[searcher] == search

    );

    console.log(data)
  }

  return data;
};



export const filterGuestIncomes = (search, guestIncomes) => {

  let guestIncomesbyApartment = [];

  if (!search) {
    guestIncomesbyApartment = guestIncomes.data.guestIncome;
  } else {
    guestIncomesbyApartment = guestIncomes.data.guestIncome.filter((dato) =>
      dato.asociatedVisitor.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return guestIncomesbyApartment;
};

export const filterFines = (search, fines) => {

  let fineByApartment = [];

  if (!search) {
    fineByApartment = fines.data.fines;
  } else {
    fineByApartment = fines.data.fines.filter((dato) =>
      dato.fineType.toLowerCase().includes(search.toLowerCase())
    );
  }

  return fineByApartment;
};


export const showConfirmationDialog = async (title, message, confirmButtonText, deleteFunction) => {
  try {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#6c757d',
      confirmButtonText: confirmButtonText
    });

    if (result.isConfirmed) {
      await deleteFunction();
      Swal.fire(
        'Eliminado',
        'Eliminaste correctamente',
        'success'
      );
    }
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
};



export const postRequest = async (event, endPoint, method = "POST", modal, data, url) => {
  try {

    event.preventDefault();
    console.log('Data:', data);

    const { response, error } = await useFetchForFile(`${url}${endPoint}`, data, method);

    if (response) {
      console.log('Response:', response);

      Swal.fire({
        title: 'Éxito',
        text: response,
        icon: 'success',
      }).then(() => {

        modal(false);

      });
    }

    if (error) {
      console.error('Hubo un error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al realizar la operación',
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};


export const putRequest = async (event, endpoint, successMessage, data, modal, put, get) => {
  try {

    event.preventDefault();


    const response = await put(endpoint, data);
    // console.log(response)
    // console.log(responseResidents)

    Swal.fire({
      title: 'Éxito',
      text: successMessage,
      icon: 'success',
    });

    get(endpoint);

  } catch (error) {
    console.error('Error al realizar la operación:', error);

    Swal.fire({
      title: 'Error',
      text: 'Error al realizar la operación',
      icon: 'error',
    });

  } finally {
    modal(false);
  }
};


export const handlePostRequest = async (event, endpoint, successMessage, data, modal, post, get) => {
  try {

    event.preventDefault();


    const response = await post(endpoint, data);
    // console.log(response)
    // console.log(responseResidents)

    Swal.fire({
      title: 'Éxito',
      text: successMessage,
      icon: 'success',
    });

    get(endpoint);

  } catch (error) {
    console.error('Error al realizar la operación:', error);

    Swal.fire({
      title: 'Error',
      text: 'Error al realizar la operación',
      icon: 'error',
    });

  } finally {
    modal(false);
  }
};