"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const shelljs_1 = __importDefault(require("shelljs"));
const utils_1 = require("../../utils");
const commit = (message) => {
    const gitCommit = `git add . && git commit -am '${message.toString()}' && git push`;
    if (shelljs_1.default.exec(gitCommit).code === 0) {
        (0, utils_1.log)(chalk_1.default.white(`${chalk_1.default.greenBright.bold("[SUCCESS]")} - ${message}`));
        process.exit(0);
    }
    else {
        (0, utils_1.log)(chalk_1.default.white(`${chalk_1.default.redBright.bold("[FAILED]")} - Unable to make commit!`));
        process.exit(1);
    }
};
exports.default = commit;
