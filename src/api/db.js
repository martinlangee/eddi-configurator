const Axios = require("axios");

const baseUrl = "http://localhost:8081/api";
const userUrl = `${baseUrl}/usr`;
const widgetUrl = `${baseUrl}/widget`;
const screenUrl = `${baseUrl}/screen`;
const screenWidgetsUrl = `${baseUrl}/screenwidgets`;

// TODO: remove when authentication works
export const CURRENT_USERID = 15;

export async function dbGetCurrentUser() {
    const url = `${userUrl}/${CURRENT_USERID}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveUser(user) {
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

export async function dbGetUserWidgets(userId) {
    const id = userId ? userId : CURRENT_USERID;
    const url = `${widgetUrl}?userId=${id}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbDeleteWidget(widgetId) {
    const url = `${widgetUrl}/${widgetId}`;
    const resp = await Axios.delete(url);
    return resp;
}

export async function dbGetUserScreens(userId) {
    userId = userId ? userId : CURRENT_USERID;
    const url = `${screenUrl}?userId=${userId}`;
    const resp = await Axios.get(url);
    return resp.data;
}

export async function dbDeleteScreen(screenId) {
    const url = `${screenUrl}/${screenId}`;
    const resp = await Axios.delete(url);
    return resp;
}

export async function dbGetWidget(id) {
    const url = `${widgetUrl}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveWidget(widget) {
    const url = `${widgetUrl}/${widget.id}`;
    const resp = await Axios.put(url, widget);
    return resp;
}

export async function dbInsertWidget(widget) {
    const url = `${widgetUrl}`;
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
    const url = `${screenUrl}/${id}`;
    const resp = await Axios.get(url);
    return resp.data[0];
}

export async function dbSaveScreen(screen) {
    const url = `${screenUrl}/${screen.id}`;
    const resp = await Axios.put(url, screen);
    return resp;
}

export async function dbInsertScreen(screen) {
    const url = `${screenUrl}`;
    const resp = await Axios.post(url, screen);
    return resp.data.rows[0].id;
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