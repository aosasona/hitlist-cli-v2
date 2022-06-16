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
const chalk_1 = __importDefault(require("chalk"));
const Conf = require("conf");
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
// Config store
const store = new Conf("hitlist");
const sync = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check is user is logged in
        if (!store.get("auth.token")) {
            (0, utils_1.log)(chalk_1.default.red("You are not logged in!"));
            process.exit(1);
        }
        // Output status
        (0, utils_1.log)(chalk_1.default.yellow(`${chalk_1.default.blueBright.bold(`[CLOUD]`)} Syncing...`));
        const serverData = yield utils_2.request.auth().post("/lists/view");
        const data = serverData.data.data;
        if (serverData.data.data.length > 0) {
            const all = serverData.data.data;
            // Save to configstore
            store.set("lists", [...all]);
        }
        // Output success status
        (0, utils_1.log)(chalk_1.default.white(`${chalk_1.default.yellow.bold(`[LOCAL]`)} Saved ${data.length} list(s) locally`));
        process.exit(0);
    }
    catch (err) {
        (0, utils_1.log)(chalk_1.default.red("Something went wrong!"));
        process.exit(1);
    }
});
exports.default = sync;
