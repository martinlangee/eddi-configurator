import AuthService from "../services/auth.service";
const Axios = require("axios");

export const API_URL = "http://localhost:3010/api";
export const USER_URL = `${API_URL}/user`;
const WIDGET_URL = `${API_URL}/widget`;
const SCREEN_URL = `${API_URL}/screen`;
const SCREEN_WIDGET_URL = `${API_URL}/screenwidgets`;

const currentUserId = () => {
    const user = AuthService.getCurrentUser();
    return user ? user.id : 0;
}

export async function dbGetCurrentUser() {
    const url = `${USER_URL}/${currentUserId()}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveUser(user) {
    const url = `${USER_URL}/${user.id}`;
    const resp = await Axios.put(url, user);
    return resp;
}

export async function dbSaveUserSeePublicWidgets(value) {
    const url = `${USER_URL}/${currentUserId()}?see_public_widgets=${value}`;
    const resp = await Axios.put(url, {});
    return resp;
}

export async function dbSaveUserSeePublicScreens(value) {
    const url = `${USER_URL}/${currentUserId()}?see_public_screens=${value}`;
    const resp = await Axios.put(url, {});
    return resp;
}

export async function dbGetNewWidget() {
    const currentUser = await dbGetCurrentUser();
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

export async function dbGetUserWidgets() {
    const url = `${WIDGET_URL}?userId=${currentUserId()}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbDeleteWidget(widgetId) {
    const url = `${WIDGET_URL}/${widgetId}`;
    const resp = await Axios.delete(url);
    return resp;
}

export async function dbGetUserScreens() {
    const url = `${SCREEN_URL}?userId=${currentUserId()}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbDeleteScreen(screenId) {
    const url = `${SCREEN_URL}/${screenId}`;
    const resp = await Axios.delete(url);
    return resp;
}

export async function dbGetWidget(id) {
    const url = `${WIDGET_URL}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveWidget(widget) {
    const url = `${WIDGET_URL}/${widget.id}`;
    const resp = await Axios.put(url, widget);
    return resp;
}

export async function dbInsertWidget(widget) {
    const url = `${WIDGET_URL}`;
    const resp = await Axios.post(url, widget);
    return resp.data.rows[0].id;
}

export async function dbGetNewScreen() {
    const currentUser = await dbGetCurrentUser();
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

export async function dbGetScreen(id) {
    const url = `${SCREEN_URL}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveScreen(screen) {
    const url = `${SCREEN_URL}/${screen.id}`;
    const resp = await Axios.put(url, screen);
    return resp;
}

export async function dbInsertScreen(screen) {
    const url = `${SCREEN_URL}`;
    const resp = await Axios.post(url, screen);
    return resp.data.rows[0].id;
}

export async function dbGetScreenWidgets(screenId) {
    const url = `${SCREEN_WIDGET_URL}/${screenId}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbSaveScreenWidgets(screenId, widgets) {
    const url = `${SCREEN_WIDGET_URL}/${screenId}`;
    const resp = await Axios.post(url, widgets);
    return resp.data;
}