export function getWidgets(userId) {

    // todo: consider userId if set

    console.log("-- getWidgets");
    return [{
        "id": 1,
        "user_id": 1,
        "name": "Weather",
        "description": "displays the current weather",
        "size_x": 200,
        "size_y": 100,
        "icon": "",
        "content": "<empty>",
        "public": true,
        "created": "2022-03-10 / 09:12",
        "last_saved": "2022-03-12 / 16:01"
    }, {
        "id": 2,
        "user_id": 1,
        "name": "Stock",
        "description": "displays the current stock market",
        "size_x": 300,
        "size_y": 200,
        "icon": "",
        "content": "<empty>",
        "public": false,
        "created": "2022-03-11 / 10:22",
        "last_saved": "2022-03-13 / 18:56"
    }];
};

export function getWidget(id) {
    console.log("-- getWidget");
    return getWidgets().find(w => w.id === id);
};

export function getScreens(userId) {
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

export function getScreen(userId, screenId) {
    console.log("-- getScreen");
    return getScreen(userId).find(s => s.id === screenId);
};

let _user = {
    "user_id": 1,
    "user_name": "jdthesouther",
    "first_name": "John",
    "last_name": "Doe",
    "email": "jf@mailer.fr",
    "description": "I am the one who is not the one",
    "pwd": "*****"
}

export function getCurrentUser() {
    return _user;
}

export function saveUserData(user) {
    console.log("-- saveUserData", user);
    _user = user;
}