"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Conf = require("conf");
// Data sto
const store = new Conf("hitlist");
const API_URL = "https://hitlist-server.herokuapp.com/v1";
/**
 * @desc Create requests with user token
 */
const auth = () => {
    const token = store.get("auth.token");
    const config = axios_1.default.create({
        baseURL: API_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
    return config;
};
/**
 * @desc Create requests for unprotected routes
 */
const noauth = () => {
    return axios_1.default.create({
        baseURL: API_URL,
    });
};
/**
 * @desc Request object
 */
const requests = {
    auth,
    noauth,
};
exports.default = requests;
