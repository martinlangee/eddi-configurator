const Axios = require("axios");

const baseUrl = "http://localhost:3010";
const userUrl = `${baseUrl}/usr`;
const widgetUrl = `${baseUrl}/widget`;
const screenUrl = `${baseUrl}/screen`;
const screenWidgetsUrl = `${baseUrl}/screenwidgets`;

// TODO: remove when authentication works
const CURRENT_USERID = 15;

export async function dbGetCurrentUser() {
    const url = `${userUrl}/${CURRENT_USERID}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveUserData(user) {
    const url = `${userUrl}/${user.id}`;
    const resp = await Axios.put(url, user);
    return resp;
}

export async function dbSaveUserSeePublicWidgets(value) {
    const url = `${userUrl}/${CURRENT_USERID}?see_public_widgets=${value}`;
    const resp = await Axios.put(url, {});
    return resp;
}

export async function dbSaveUserSeePublicScreens(value) {
    const url = `${userUrl}/${CURRENT_USERID}?see_public_screens=${value}`;
    const resp = await Axios.put(url, {});
    return resp;
}

export async function dbGetUserWidgets(userId) {
    const id = userId ? userId : CURRENT_USERID;
    const url = `${widgetUrl}?userId=${id}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbGetUserScreens(userId) {
    userId = userId ? userId : CURRENT_USERID;
    const url = `${screenUrl}?userId=${userId}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbGetWidget(id) {
    const url = `${widgetUrl}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveWidgetData(widget) {
    const url = `${widgetUrl}/${widget.id}`;
    const resp = await Axios.put(url, widget);
    return resp;
}

export async function dbGetScreen(id) {
    const url = `${screenUrl}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveScreenData(screen) {
    const url = `${screenUrl}/${screen.id}`;
    const resp = await Axios.put(url, screen);
    return resp;
}

export async function dbGetScreenWidgets(screenId) {
    const url = `${screenWidgetsUrl}/${screenId}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbSaveScreenWidgets(screenId, widgets) {
    const url = `${screenWidgetsUrl}/${screenId}`;
    const resp = await Axios.post(url, widgets);
    return resp.data;
}