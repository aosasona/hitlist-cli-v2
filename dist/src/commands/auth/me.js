"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conf = require("conf");
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("../../utils");
const me = () => {
    const store = new Conf("hitlist");
    const username = store.get("auth.username");
    if (username) {
        return (0, utils_1.log)(`Currently logged in as ${chalk_1.default.green.bold(username)}`);
    }
    else {
        return (0, utils_1.log)(chalk_1.default.red("You are not logged in!"));
    }
};
exports.default = me;
