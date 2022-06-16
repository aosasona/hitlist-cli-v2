"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePublic = exports.execute = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const chalk_1 = __importDefault(require("chalk"));
const Conf = require("conf");
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
// Config store
const store = new Conf("hitlist");
// Execute owned list
const execute = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check is user is logged in
        if (!store.get("auth.token")) {
            (0, utils_1.log)(chalk_1.default.red("You are not logged in!"));
            process.exit(1);
        }
        //Mutable variables
        let source = "LOCAL";
        let hit;
        // Check if list exists locally
        if ((0, utils_1.exists)(name)) {
            // Execution source
            const src = chalk_1.default.yellow.bold(`[LOCAL]`);
            (0, utils_1.log)(chalk_1.default.yellow(`${src} Executing ${name}...`));
            // Create single hit from list
            const raw = (0, utils_1.find)(name).list;
            // Check length of list to create string
            if (raw.length === 1) {
                hit = raw[0];
            }
            else {
                hit = raw.join(" && ");
            }
        }
        else {
            const src = chalk_1.default.blueBright.bold(`[CLOUD]`);
            // Log list source
            (0, utils_1.log)(chalk_1.default.yellow(`${src} Executing ${name}...`));
            // Get list from server
            source = "CLOUD";
            const serverData = yield utils_2.request.auth().post(`/list/${name}`);
            const raw = serverData.data.data.list;
            // Check length of list to create string
            if (raw.length === 1) {
                hit = raw[0];
            }
            else {
                hit = raw.join(" && ");
            }
        }
        // Execute list
        if (shelljs_1.default.exec(hit).code === 0) {
            (0, utils_1.log)(chalk_1.default.white(`${source === "LOCAL"
                ? chalk_1.default.yellow.bold(`[LOCAL]`)
                : chalk_1.default.blueBright.bold(`[CLOUD]`)} Successfully executed ${chalk_1.default.bold.underline(name)}!`));
            process.exit(0);
        }
        else {
            (0, utils_1.log)(chalk_1.default.red(`${source === "LOCAL"
                ? chalk_1.default.yellow.bold(`[LOCAL]`)
                : chalk_1.default.blueBright.bold(`[CLOUD]`)} Failed to execute ${name}!`));
            process.exit(1);
        }
    }
    catch (err) {
        (0, utils_1.log)(chalk_1.default.red("Something went wrong!"));
        process.exit(1);
    }
});
exports.execute = execute;
// Execute public list
const executePublic = (name, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check is user is logged in
        if (!store.get("auth.token")) {
            (0, utils_1.log)(chalk_1.default.red("You are not logged in!"));
            process.exit(1);
        }
        let hit;
        const src = chalk_1.default.greenBright.bold(`[PUBLIC]`);
        // Log list source
        (0, utils_1.log)(chalk_1.default.yellow(`${src} Executing ${name}...`));
        // Get list from server
        const serverData = yield utils_2.request
            .auth()
            .post(`/lists/public/${user}/${name}`);
        const raw = serverData.data.data.list;
        // Check length of list to create string
        if (raw.length === 1) {
            hit = raw[0];
        }
        else {
            hit = raw.join(" && ");
        }
        // Execute list
        if (shelljs_1.default.exec(hit).code === 0) {
            (0, utils_1.log)(chalk_1.default.white(`${chalk_1.default.greenBright.bold(`[PUBLIC]`)} Successfully executed public list - ${chalk_1.default.bold.underline(name)}`));
            process.exit(0);
        }
        else {
            (0, utils_1.log)(chalk_1.default.red(`${chalk_1.default.greenBright.bold(`[PUBLIC]`)} Failed to execute ${name}!`));
            process.exit(1);
        }
    }
    catch (err) {
        console.log(err);
        (0, utils_1.log)(chalk_1.default.red("Something went wrong!"));
        process.exit(1);
    }
});
exports.executePublic = executePublic;
