import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// 0. Start UseFech integral experimental

const MethodOptions = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const ApiResponse = {
  data: [],
};

export const useFetch = (baseUrl) => {
  const [data, setData] = useState({ ...ApiResponse });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method, body = null) => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        method,
        url: `${baseUrl}${url}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body) || null,
      };

      const response =
        method !== MethodOptions.GET
          ? await fetch(config.url, {
            method: config.method,
            headers: config.headers,
            body: config.body,
          })
          : await fetch(config.url, {
            method: config.method,
            headers: config.headers,
          });

      const json = await response.json();
      setData({ data: json });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const get = (url) => fetchData(url, MethodOptions.GET);
  const post = (url, body) => fetchData(url, MethodOptions.POST, body);
  const put = (url, body) => fetchData(url, MethodOptions.PUT, body);
  const del = (url, body) => fetchData(url, MethodOptions.DELETE, body);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    del,
  };
};

// 0. End UseFech integer experimental

// 1. Start UseFetch by Id

export const useFetchgetById = (endpoint, id) => {
  const url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [controllers, setControllers] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setControllers(abortController);
    setLoad(true);

    fetch(`${url}${endpoint}/${id}`, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Hola error: " + error.message);
        } else {
          setError(error.message);
        }
      })
      .finally(() => setLoad(false));

    return () => abortController.abort();
  }, [endpoint, id]);

  const handleCancelRequest = () => {
    if (controllers) {
      controllers.abort();
      setError("Request canceled");
    }
  };

  return { data, error, load, handleCancelRequest };
};

// 1. end UseFetch by Id

// 2. start useFetch get All

export const useFetchget = (endpoint) => {
  const url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [controllers, setControllers] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setControllers(abortController);
    setLoad(true);

    fetch(url + endpoint, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Hola error: " + error.message);
        }
      })
      .finally(() => {
        setTimeout(() => setLoad(false), 1000);
      });

    return () => abortController.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controllers) {
      controllers.abort();
      setError("Request canceled");
    }
  };
  return { data, error, load, handleCancelRequest };
};

// 2. end useFetch get All

// 3. start useFetch post files

// 3. start useFetch post files

export const useFetchForFile = async (url, data, method = "POST") => {
  console.log("Data:", data);

  console.log(data);

  const abortController = new AbortController();
  const signal = abortController.signal;

  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
          data[key].forEach((file) => {
              formData.append(key, file);
          });
      } else {
          formData.append(key, data[key]);
      }
    });
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}

    const response = await fetch(url, {
      method: method,
      body: formData,
      signal,
    });

    

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.errorData = errorData; // Agrega errorData al objeto de error para nuestras validaciones
      console.log("Error data:", errorData);

      throw errorData;
      // return { response: null, error: errorData };
    }

    const json = await response.json();
    return { response: json, error: null };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.log("Error:", error);
    }
    return { response: null, error };
  }
};

// 3. end useFetch post files

// 3. end useFetch post files

// 4. Start useFetch post

export const useFetchpost = async (endpoint, data) => {
  const url = import.meta.env.VITE_API_URL;

  const abortController = new AbortController();
  const signal = abortController.signal;

  try {
    const response = await fetch(url + endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.errorData = errorData; // Agrega errorData al objeto de error para nuestras validaciones
      console.log("Error data:", errorData);

      throw errorData;
      // return { response: null, error: errorData };
    }

    const json = await response.json();
    return { response: json, error: null };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.log("Error:", error);
    }
    return { response: null, error };
  }
};

// 4. End useFetch post

//Fetch Put Request
export const useFetchput = (endpoint, data) => {
  const url = "https://apptowerbackend.onrender.com/api/";
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [controllers, setControllers] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setControllers(abortController);
    setLoad(true);

    fetch(url + endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Hola error: " + error.message);
        }
      })
      .finally(() => setLoad(false));

    return () => abortController.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controllers) {
      controllers.abort();
      setError("Request canceled");
    }
  };
  return { error, load, handleCancelRequest };
};

//Fetch Information User

export const useFetchUserInformation = (token) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInformation = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://apptowerbackend.onrender.com/api/informationUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserInformation();
    }
  }, [token]);

  return { data: userData, fetchUserInformation, loading };
};

// Fetch User Permissions

export const useAllowedPermissions = (idToPermissionName) => {
  const [allowedPermissions, setAllowedPermissions] = useState([]);

  useEffect(() => {
    const PermissionsUser = Cookies.get("permisosAndPrivileges");

    if (PermissionsUser) {
      let privileges;
      try {
        privileges = JSON.parse(PermissionsUser).PermissionsAndPrivileges;
      } catch (error) {
        console.error("Error parsing PermissionsUser", error);
      }

      if (privileges) {
        const permissions = privileges.map(
          (privilege) => privilege.idpermission
        );

        const uniquePermissions = [...new Set(permissions)];

        const allowedPermissions = uniquePermissions.map(
          (id) => idToPermissionName[id]
        );

        setAllowedPermissions(allowedPermissions);
      }
    }
  }, []);

  return allowedPermissions;
};

// Fetch User Privileges

export const useAllowedPermissionsAndPrivileges = (
  idToPermissionName,
  idToPrivilegesName
) => {
  const [allowedPermissions, setAllowedPermissions] = useState({});

  useEffect(() => {
    const permisosAndPrivileges = Cookies.get("permisosAndPrivileges");

    if (permisosAndPrivileges) {
      let privileges;
      try {
        privileges = JSON.parse(permisosAndPrivileges).PermissionsAndPrivileges;
      } catch (error) {
        console.error("Error parsing permisosAndPrivileges", error);
      }

      if (privileges) {
        const allowedPermissions = {};

        privileges.forEach((privilege) => {
          const permissionName = idToPermissionName[privilege.idpermission];
          const privilegeName = idToPrivilegesName[privilege.idprivilege];

          if (!allowedPermissions[permissionName]) {
            allowedPermissions[permissionName] = [];
          }
          allowedPermissions[permissionName].push(privilegeName);
        });

        setAllowedPermissions(allowedPermissions);
      } else {
        console.log("No privileges found");
      }
    } else {
      console.log("No permisosAndPrivileges found");
    }
  }, []);

  return allowedPermissions;
};
