"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("../../utils");
const Conf = require("conf");
const store = new Conf("hitlist");
const reset = () => {
    store.set("lists", []);
    (0, utils_1.log)(chalk_1.default.green(">> Successfully reset lists!"));
};
exports.default = reset;
