
const URL = "http://localhost:8080/skabelon_war_exploded"

function handleHttpErrors(response) {
    if (!response.ok) {
        return Promise.reject({ status: response.status, fullError: response.json() })
    }
    return response.json();
}

function apiFacade() {
    const login = (user, password) => {
        const options = makeOptions("POST", true, { username: user, password: password });
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(response => { setToken(response.token) })
    };
    const fetchData = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }
    const makeOptions = (method, addToken, body) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    const setToken = (token) => {
        localStorage.setItem('jwtToken', token);
    }
    const getToken = () => {
        return localStorage.getItem('jwtToken');
    }
    const loggedIn = () => {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () => {
        localStorage.removeItem('jwtToken');
    }
    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData
    }
}
const facade = apiFacade();
export default facade;