import Swal from "sweetalert2";
import { useFetchForFile } from "../Hooks/useFetch";
import { useEffect, useState } from "react"
import Cookies from "js-cookie";


// Use get user logged

export const useUserLogged = () => {
  const [idUserLogged, setIdUserLogged] = useState('');

  useEffect(() => {
    const encodedUser = Cookies.get('user');
    if (encodedUser) {
      const decodedUser = decodeURIComponent(encodedUser);
      const userLogged = JSON.parse(decodedUser);
      setIdUserLogged(userLogged.iduser);
    }
  }, []);

  return idUserLogged;
};

// Use paginator

const usePaginator = (data, itemsPerPage = 10) => {

  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const filteredData = () => {
    const startIndex = currentPage * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return {
    totalPages,
    currentPage,
    nextPage,
    previousPage,
    filteredData,
  };
};

export default usePaginator;




// Filter apartment 

export const filter = (search, myData, searcher, searcher2) => {
  if (!Array.isArray(myData)) {
    console.error("myData is not an array:", myData);
    myData = [];
  }

  let data = [];

  if (!search) {
    data = myData;
    console.log(myData)
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

export const postRequest = async (event, endPoint, method = "POST", modal, data, url, message) => {
  try {
    event.preventDefault();
    console.log('Data:', data);

    const { response, error } = await useFetchForFile(`${url}${endPoint}`, data, method);

    if (response) {
      console.log('Response:', response);

      Swal.fire({
        title: 'Éxito',
        text: message ? message : response,
        icon: 'success',
      }).then(() => {
        modal(false);
      });

      return { success: true, response }
    }

    if (error) {
      console.error('Hubo un error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al realizar la operación',
        icon: 'error',
      }).then(() => {
        modal(false);
      });

      return { success: false, response }
    }
  } catch (error) {
    console.error('Error inesperado:', error);
    return { success: false, response: error }
  }
};

export const putRequest = async (event, endpoint, successMessage, data, modal, put, get, message) => {
  try {

    event.preventDefault();


    const response = await put(endpoint, data);
    // console.log(response)
    // console.log(responseResidents)

    Swal.fire({
      title: 'Éxito',
      text: successMessage ? successMessage : message,
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