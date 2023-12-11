import Swal from "sweetalert2";
import { useFetchpostFile } from "../Hooks/useFetch";


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



export const handleRequest = async (event, endPoint, successMessage, modal, data, url) => {
  try {

    event.preventDefault();
    console.log('Data:', data);

    const { response, error } = await useFetchpostFile(`${url}${endPoint}`, data);

    if (response) {
      console.log('Response:', response);

      Swal.fire({
        title: 'Éxito',
        text: successMessage,
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

