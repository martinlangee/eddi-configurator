import axios from "axios";
import Api from "../api/api";

const register = (username, email, password) => {
    return axios.post(`${Api.USER_URL}/signup`, {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(`${Api.USER_URL}/login`, {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const signout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const saveUserDate = async(field, value) => {
    return new Promise(async(resolve) => {
        const resp = await Api.saveUserDate(field, value);
        if (resp.result)
            notifyObservers(field, value);
        resolve(resp);
    });
}

const observers = [];

const notifyObservers = (field, value) => {
    observers
        .filter(obs => {
            return obs.field === field;
        }).forEach(
            (obs) => {
                obs.target(field, value);
            });
}

const registerObserver = (field, target) => {
    observers.push({ field, target });
}

const AuthService = {
    register,
    login,
    signout,
    getCurrentUser,
    saveUserDate,
    registerObserver,
};

export default AuthService;