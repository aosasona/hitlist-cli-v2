"use strict";
/* ========== UTILITIES ========== */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.del = exports.find = exports.exists = exports.request = void 0;
// Log
const log = (data) => {
    console.log(data);
};
exports.log = log;
var requests_1 = require("./requests");
Object.defineProperty(exports, "request", { enumerable: true, get: function () { return __importDefault(requests_1).default; } });
var actions_1 = require("./actions");
Object.defineProperty(exports, "exists", { enumerable: true, get: function () { return actions_1.exists; } });
Object.defineProperty(exports, "find", { enumerable: true, get: function () { return actions_1.find; } });
Object.defineProperty(exports, "del", { enumerable: true, get: function () { return actions_1.del; } });
