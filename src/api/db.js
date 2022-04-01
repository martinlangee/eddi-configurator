const Axios = require("axios");

const baseUrl = "http://localhost:3010";
const usersUrl = `${baseUrl}/users`;
const widgetsUrl = `${baseUrl}/widgets`;
const screensUrl = `${baseUrl}/screens`;

// TODO: remove when authentication works
const CURRENT_USERID = 14;

export function getScreens(userId) {

    // todo: consider userId is set

    console.log("-- getScreens");
    return [{
        "id": 1,
        "user_id": 1,
        "name": "Office",
        "description": "For my office desk",
        "size_x": 800,
        "size_y": 600,
        "public": false,
        "created": "2022-03-10",
        "last_saved": "2022-03-12"
    }, {
        "id": 2,
        "user_id": 1,
        "name": "Kitchen",
        "description": "For my kitchen wall",
        "size_x": 800,
        "size_y": 600,
        "public": false,
        "created": "2022-03-11",
        "last_saved": "2022-03-14"
    }]
};

export function getScreen(screenId) {
    console.log("-- getScreen");
    return getScreens().find(s => s.id === screenId);
};

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