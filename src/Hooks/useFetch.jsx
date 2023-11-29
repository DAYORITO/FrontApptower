import { useEffect, useState } from "react"

//Fetch Get Request
export const useFetchget = (endpoint) => {
    const url='https://apptowerbackend.onrender.com/api/'
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [controllers, setControllers] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setControllers(abortController);
        setLoad(true);

        fetch(url+endpoint, { signal: abortController.signal })
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
    const url='https://apptowerbackend.onrender.com/api/'
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
        const response = await fetch(url+endpoint, {
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
    const url='https://apptowerbackend.onrender.com/api/'
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [controllers, setControllers] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setControllers(abortController);
        setLoad(true);

        fetch(url+endpoint, {
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


