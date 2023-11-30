import { useState, useEffect } from 'react';


// Define las opciones de método como constantes
const MethodOptions = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

// Define la estructura del objeto de respuesta según tus necesidades
// Esto es solo un ejemplo, ajusta según tu API
const ApiResponse = {
    data: [],
    // Otros campos de la respuesta, como errores, metadatos, etc.
    // Puedes ajustar según las necesidades de tu aplicación
    // error: null,
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
                // mode: "no-cors", 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body) || null,
            };

            const response = await fetch(config.url, {
                method: config.method,
                headers: config.headers,
                body: config.body,
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



export const useFetchgetById = (endpoint, id) => {
    const url = 'http://localhost:3000/api/';
    // const url = 'https://apptowerbackend.onrender.com/api/';
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [controllers, setControllers] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setControllers(abortController);
        setLoad(true);

        fetch(`${url}${endpoint}/${id}`, { signal: abortController.signal })
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Hola error: ' + error.message);
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
            setError('Request canceled');
        }
    };

    return { data, error, load, handleCancelRequest };
};


//Fetch Get Request
export const useFetchget = (endpoint) => {
    const url = 'http://localhost:3000/api/'
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [controllers, setControllers] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setControllers(abortController);
        setLoad(true);

        fetch(url + endpoint, { signal: abortController.signal })
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Hola error: ' + error.message)
                }
            }).finally(() => setLoad(false));

        return () => abortController.abort();

    }, []);

    const handleCancelRequest = () => {
        if (controllers) {
            controllers.abort();
            setError('Request canceled');
        }
    }
    return { data, error, load, handleCancelRequest }
}


export const useFetchpostFile = async (url, data) => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
        console.log(data)

        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            signal
        });

        console.log(formData)


        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error data:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return { response: json, error: null };
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.log('Error:', error);
        }
        return { response: null, error };
    } finally {
        abortController.abort();
    }
}


//Fetch Post Request
export const useFetchpost = async (endpoint, data) => {
    const url = 'https://apptowerbackend.onrender.com/api/'
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
        const response = await fetch(url + endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            signal
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error data:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return { response: json, error: null };
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.log('Error:', error);
        }
        return { response: null, error };
    } finally {
        abortController.abort();
    }

    
}
//Fetch Put Request
export const useFetchput = (endpoint, data) => {
    const url = 'https://apptowerbackend.onrender.com/api/'
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [controllers, setControllers] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setControllers(abortController);
        setLoad(true);

        fetch(url + endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            signal: abortController.signal
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Hola error: ' + error.message)
                }
            }).finally(() => setLoad(false));

        return () => abortController.abort();

    }, []);

    const handleCancelRequest = () => {
        if (controllers) {
            controllers.abort();
            setError('Request canceled');
        }
    }
    return { error, load, handleCancelRequest }
}


