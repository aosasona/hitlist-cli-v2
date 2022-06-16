"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.find = exports.exists = void 0;
const Conf = require("conf");
const store = new Conf("hitlist");
const dataStore = store.get("lists") || [];
/**
 * @desc - Check if a particular hit exists
 */
const exists = (name) => {
    const filtered = dataStore.filter((current) => current.name === name);
    if ((filtered === null || filtered === void 0 ? void 0 : filtered.length) > 0) {
        return true;
    }
    else {
        return false;
    }
};
exports.exists = exists;
/**
 * @desc - Find ONE hit
 */
const find = (name) => {
    const hit = dataStore.find((current) => current.name === name);
    return hit;
};
exports.find = find;
/**
 * @desc - Delete ONE hit
 */
const del = (name) => {
    const list = dataStore.filter((current) => current.name !== name);
    store.set("lists", [...list]);
};
exports.del = del;
