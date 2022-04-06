import axios from "axios";
import { USER_URL } from "../api/db";

const register = (username, email, password) => {
    return axios.post(USER_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(USER_URL + "login", {
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

const AuthService = {
    register,
    login,
    signout,
    getCurrentUser,
};

export default AuthService;