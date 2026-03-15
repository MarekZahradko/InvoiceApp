/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */


// base API URL for the server
const API_URL = "http://localhost:8080";

// function to get headers with authentication token
const getHeaders = () => {
    // load token from local storage
    const token = localStorage.getItem('authToken');
    // basic headers for JSON communication
    const headers = {
        "Content-Type": "application/json"
    };
    // add authorization token if it exists
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

// generic fetch function with error handling
const fetchData = (url, requestOptions) => {
    // complete the URL address
    const apiUrl = `${API_URL}${url}`;

    // send request to server
    return fetch(apiUrl, requestOptions)
        .then((response) => {
            // check request success
            if (response.status === 401 || response.status === 403) {
                // unauthorized or forbidden - clear token and redirect to login
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return;
            }

            // parse JSON response (except DELETE)
            if (requestOptions.method !== 'DELETE')
                return response.json();
        })
        .catch((error) => {
            // propagate error
            throw error;
        });
};

// GET request with filters
export const apiGet = (url, params) => {
    // filter empty parameters
    const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => value != null)
    );

    // create URL with parameters
    const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
    // set options for GET
    const requestOptions = {
        method: "GET",
        headers: getHeaders()
    };

    return fetchData(apiUrl, requestOptions);
};

// POST request for creating records
export const apiPost = (url, data) => {
    // set options for POST
    const requestOptions = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

// PUT request for editing records
export const apiPut = (url, data) => {
    // set options for PUT
    const requestOptions = {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

// DELETE request for deleting records
export const apiDelete = (url) => {
    // set options for DELETE
    const requestOptions = {
        method: "DELETE",
        headers: getHeaders()
    };

    return fetchData(url, requestOptions);
};

// GET request for Excel — returns response as a binary blob
export const apiGetExcel = (url) => {
    const apiUrl = `${API_URL}${url}`;
    // set options for GET
    const requestOptions = {
        method: "GET",
        headers: getHeaders()
    };

    return fetch(apiUrl, requestOptions)
        .then((response) => {
            // check request success
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.blob();
        })
        .catch((error) => {
            // propagate error
            throw error;
        });
};

// GET request for PDF
export const apiGetPdf = (url) => {
    const apiUrl = `${API_URL}${url}`;
    // set options for GET
    const requestOptions = {
        
        method: "GET",
        headers: getHeaders()
    };


    return fetch(apiUrl, requestOptions)
        .then((response) => {
            // check request success
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            
            
                return response.blob();
        })
        .catch((error) => {
            // propagate error
            throw error;
        });
}