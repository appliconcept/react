import * as Settings from "./Settings";

const setMe = (key, value)=>{
    key = "apc-" + Settings.appname + "-" + key;
    value = JSON.stringify(value);
    return Promise.resolve(localStorage.setItem(key, value));
}

const getMe = (key)=>{
    key = "apc-" + Settings.appname + "-" + key;
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    if(value === null || value === undefined || value === ""){
        value = "";
    }
    return Promise.resolve(value);
}

const Storage = {
    set: setMe,
    get: getMe
}

export default Storage;