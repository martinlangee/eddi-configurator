import AuthService from "../services/auth.service";
const Axios = require("axios");

const API_URL = process.env.NODE_ENV === 'development' ?
    "http://localhost:3010/api" :
    "https://eddi-config-api.herokuapp.com/api/";

const USER_URL = `${API_URL}/user`;
const WIDGET_URL = `${API_URL}/widget`;
const SCREEN_URL = `${API_URL}/screen`;
const SCREEN_WIDGET_URL = `${API_URL}/screenwidgets`;

const currentUserId = () => {
    const user = AuthService.getCurrentUser();
    return user ? user.id : 0;
}

async function getAllUsers() {
    const url = `${USER_URL}`;
    const resp = await Axios.get(url);
    return resp.data;
}

async function getCurrentUser() {
    const url = `${USER_URL}/${currentUserId()}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

async function saveUserDate(dbField, value) {
    const url = `${USER_URL}/${currentUserId()}`;
    const resp = await Axios.put(url, { dbField, value });
    return resp.data;
}

async function saveUserSeePublicWidgets(value) {
    const url = `${USER_URL}/${currentUserId()}?see_public_widgets=${value}`;
    const resp = await Axios.put(url, {});
    return resp;
}

async function saveUserSeePublicScreens(value) {
    const url = `${USER_URL}/${currentUserId()}?see_public_screens=${value}`;
    const resp = await Axios.put(url, {});
    return resp;
}

async function getNewWidget() {
    const currentUser = await getCurrentUser();
    return {
        description: "Enter description",
        first_name: currentUser.first_name,
        id: undefined,
        last_name: currentUser.last_name,
        last_saved: "",
        name: "New widget",
        public: false,
        size_x: 100,
        size_y: 100,
        content: "",
        thumbnail: {
            data: (1)[0],
            type: "Buffer"
        },
        user_id: currentUser.id,
        user_name: currentUser.user_name
    }
};

async function getAllWidgets() {
    const url = `${WIDGET_URL}`;
    const resp = await Axios.get(url);
    return resp.data;
}

async function getUserWidgets() {
    const url = `${WIDGET_URL}?userId=${currentUserId()}`;
    const resp = await Axios.get(url);
    return resp.data;
}

async function deleteWidget(widgetId) {
    const url = `${WIDGET_URL}/${widgetId}`;
    const resp = await Axios.delete(url);
    return resp;
}

async function getAllScreens() {
    const url = `${SCREEN_URL}`;
    const resp = await Axios.get(url);
    return resp.data;
}

async function getUserScreens() {
    const url = `${SCREEN_URL}?userId=${currentUserId()}`;
    const resp = await Axios.get(url);
    return resp.data;
}

async function deleteScreen(screenId) {
    const url = `${SCREEN_URL}/${screenId}`;
    const resp = await Axios.delete(url);
    return resp;
}

async function getWidget(id) {
    const url = `${WIDGET_URL}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

async function saveWidget(widget) {
    const url = `${WIDGET_URL}/${widget.id}`;
    const resp = await Axios.put(url, widget);
    return resp;
}

async function insertWidget(widget) {
    const url = `${WIDGET_URL}`;
    const resp = await Axios.post(url, widget);
    return resp.data.rows[0].id;
}

async function getNewScreen() {
    const currentUser = await getCurrentUser();
    return {
        description: "Enter description",
        first_name: currentUser.first_name,
        id: undefined,
        last_name: currentUser.last_name,
        last_saved: "",
        name: "New screen",
        public: false,
        size_x: 600,
        size_y: 800,
        content: "",
        thumbnail: {
            data: (1)[0],
            type: "Buffer"
        },
        user_id: currentUser.id,
        user_name: currentUser.user_name
    }
};

async function getScreen(id) {
    const url = `${SCREEN_URL}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

async function saveScreen(screen) {
    const url = `${SCREEN_URL}/${screen.id}`;
    const resp = await Axios.put(url, screen);
    return resp;
}

async function insertScreen(screen) {
    const url = `${SCREEN_URL}`;
    const resp = await Axios.post(url, screen);
    return resp.data.rows[0].id;
}

async function getScreenWidgets(screenId) {
    const url = `${SCREEN_WIDGET_URL}/${screenId}`;
    const resp = await Axios.get(url);
    return resp.data;
}

async function getAllScreenWidgets() {
    const url = `${SCREEN_WIDGET_URL}`;
    const resp = await Axios.get(url);
    return resp.data;
}

async function saveScreenWidgets(screenId, widgets) {
    const url = `${SCREEN_WIDGET_URL}/${screenId}`;
    const resp = await Axios.post(url, widgets);
    return resp.data;
}

const Api = {
    API_URL,
    USER_URL,
    getAllUsers,
    getCurrentUser,
    saveUserDate,
    saveUserSeePublicWidgets,
    saveUserSeePublicScreens,
    getNewWidget,
    getAllWidgets,
    getUserWidgets,
    deleteWidget,
    getAllScreens,
    getUserScreens,
    deleteScreen,
    getWidget,
    saveWidget,
    insertWidget,
    getNewScreen,
    getScreen,
    saveScreen,
    insertScreen,
    getAllScreenWidgets,
    getScreenWidgets,
    saveScreenWidgets
}

export default Api;