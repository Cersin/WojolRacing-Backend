import {isEmpty, isObjectLike} from "lodash";

export const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

export const splitString = (value, separator) => {
    return value?.split(separator);
}

export const removeFalsy = obj => {
    let newObj = {};
    Object.keys(obj).forEach(prop => {
        if (
            (isObjectLike(obj[prop]) && !isEmpty(obj[prop])) ||
            (!isObjectLike(obj[prop]) && obj[prop])
        ) {
            newObj[prop] = obj[prop];
        }
    });
    return newObj;
};

export const tryParseJSONObject = (jsonString) => {
    try {
        const o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};