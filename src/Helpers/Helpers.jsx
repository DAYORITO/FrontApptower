import Swal from "sweetalert2";
import { useFetchForFile } from "../Hooks/useFetch";
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { useNavigate } from "react-router";


// Use get user logged

export const useUserLogged = () => {
  const [idUserLogged, setIdUserLogged] = useState('');
  const [idRolLogged, setIdRolLogged] = useState('');

  useEffect(() => {
    const encodedUser = Cookies.get('user');
    if (encodedUser) {
      const decodedUser = decodeURIComponent(encodedUser);
      let userLogged;
      try {
        userLogged = JSON.parse(decodedUser);
      } catch (error) {
        console.error("Error parsing decodedUser", error);
      }
      if (userLogged) {
        setIdUserLogged(userLogged.iduser);
        setIdRolLogged(userLogged.idrole);
      }
    }
  }, []);

  return { idUserLogged, idRolLogged };
};

// Use capitalize first letter

export const useCapitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);

}

// Use paginator

export const usePaginator = (data, itemsPerPage = 10) => {

  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const filteredData = () => {
    const startIndex = currentPage * itemsPerPage;
    return data?.slice(startIndex, startIndex + itemsPerPage);
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



export const showConfirmationDialog = async (deleteFunction, modal) => {
  try {
    const result = await Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta acción no es reversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar'
    });

    if (result.isConfirmed) {
      await deleteFunction();
      Swal.fire(
        'Eliminado',
        'Eliminaste correctamente',
        'success'
      ).then(() => {
        modal(false);
      });
    }
  } catch (error) {
    console.error("Error al eliminar:", error);
    Swal.fire(
      'Error',
      'Ocurrió un error al eliminar.',
      'error'
    );
  }
};



export const postRequest = async (event, endPoint, method = "POST", modal, data, url, errors, navigate, socket) => {


  try {
    event.preventDefault();
    const { response, error } = await useFetchForFile(`${url}${endPoint}`, data, method);

    if (response) {
      console.log('Response:', response);

      Swal.fire({
        title: 'Éxito',
        text: response.message,
        icon: 'success',
      }).then(() => {

        if (socket) { socket.disconnect(); socket.connect(); console.log('disconnect and re coneect socket') }


        if (typeof modal === 'function') { modal(false) }

        if (navigate) { navigate(-1); }


      });

      return { success: true, response };
    }

    if (error) {
      console.error('Hubo un error:', error);
      const errorMessage = error.errors ? error.errors[0].message : error.error;
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
      });
      errors(error)
      return { success: false, error: error };
    }
  } catch (error) {
    console.error('Error inesperado:', error);
    return { success: false, error: error };
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