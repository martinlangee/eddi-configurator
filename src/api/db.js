const Axios = require("axios");

const baseUrl = "http://localhost:3010";
const usersUrl = `${baseUrl}/usr`;
const widgetsUrl = `${baseUrl}/widget`;
const screensUrl = `${baseUrl}/screen`;
const screensWidgetsUrl = `${baseUrl}/screenwidget`;

// TODO: remove when authentication works
const CURRENT_USERID = 15;

export async function dbGetCurrentUser() {
    const url = `${usersUrl}/${CURRENT_USERID}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveUserData(user) {
    const url = `${usersUrl}/${user.id}`;
    const resp = await Axios.put(url, user);
    return resp;
}

export async function dbGetUserWidgets(userId) {
    const id = userId ? userId : CURRENT_USERID;
    const url = `${widgetsUrl}?userId=${id}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbGetUserScreens(userId) {
    const id = userId ? userId : CURRENT_USERID;
    const url = `${screensUrl}?userId=${id}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbGetWidget(id) {
    const url = `${widgetsUrl}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveWidgetData(widget) {
    const url = `${widgetsUrl}/${widget.id}`;
    const resp = await Axios.put(url, widget);
    return resp;
}

export async function dbGetScreen(id) {
    const url = `${screensUrl}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveScreenData(screen) {
    const url = `${screensUrl}/${screen.id}`;
    const resp = await Axios.put(url, screen);
    return resp;
}

export async function dbGetScreenWidgets(screenId) {
    const url = `${screensWidgetsUrl}/${screenId}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbSaveScreenWidgets(screenId, widgets) {
    const url = `${screensWidgetsUrl}/${screenId}`;
    const resp = await Axios.put(url, widgets);
    return resp.data;
}