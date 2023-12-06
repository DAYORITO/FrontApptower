export const useApiUpdate = (dataToUpdate, endpoint) => {
  const url = `https://apptowerbackend.onrender.com/api/`;

  return fetch(url + endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToUpdate),
  }).then(async (response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update the data: ${error.message}`);
    }
    return response.json();
  });
};

