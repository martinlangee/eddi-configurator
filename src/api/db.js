const getWidgets = (userId) => {
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
        "public": false,
        "created": "2022-03-10",
        "last_saved": "2022-03-12"
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
        "created": "2022-03-11",
        "last_saved": "2022-03-13"
    }];
};

const getWidget = (userId, widgetId) => {
    console.log("-- getWidget");
    return getWidgets(userId).find(w => w.id === widgetId);
};

const getScreens = (userId) => {
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

const getScreen = (userId, screenId) => {
    console.log("-- getScreen");
    return getScreen(userId).find(s => s.id === screenId);
};


export { getWidgets, getWidget, getScreens, getScreen };