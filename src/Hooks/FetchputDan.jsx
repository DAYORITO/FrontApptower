export const useApiUpdate = async (dataToUpdate, endpoint, files) => {
  // const url = `https://apptowerbackend.onrender.com/api/`;
  const url = import.meta.env.VITE_API_URL;

  const formData = new FormData();
  for (const key in dataToUpdate) {
    formData.append(key, dataToUpdate[key]);
  }

  // Agregar archivos adjuntos
  if (files) {
    for (const file of files) {
      formData.append(file.name, file);
    }
  }

  return fetch(url + endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  }).then(async (response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update the data: ${error.message}`);
    }
    return response.json();
  });
};

