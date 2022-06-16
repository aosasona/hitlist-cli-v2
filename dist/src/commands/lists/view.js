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
const Table = require("easy-table");
const store = new Conf("hitlist");
const view = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check is user is logged in
        if (!store.get("auth.token")) {
            (0, utils_1.log)(chalk_1.default.red("You are not logged in!"));
            process.exit(1);
        }
        // Mutable data
        let data = [];
        let source = "LOCAL";
        // Store & data instance
        const dataStore = store.get("lists") || [];
        const table = new Table();
        // If lists are available in configstore
        if (dataStore.length > 0) {
            data = [...dataStore];
            source = chalk_1.default.yellow.bold("[LOCAL]");
        }
        else {
            (0, utils_1.log)(chalk_1.default.yellow("Attempting to fetch lists from the cloud..."));
            // If no lists are available in configstore, fetch from server
            source = chalk_1.default.blueBright.bold("[CLOUD]");
            const serverData = yield utils_1.request.auth().post("/lists/view");
            if (serverData.data.data.length > 0) {
                const all = serverData.data.data;
                data = [...all];
                // Save to configstore
                store.set("lists", [...all]);
            }
        }
        // Show status
        (0, utils_1.log)(`${source} - ${data.length} list(s) available`);
        if (data.length > 0) {
            // Draw table
            data.forEach((list) => {
                table.cell("Name/Executor", chalk_1.default.bold.green(list.name));
                table.cell("Description", list.description);
                table.cell("Visibility", list.visibility);
                table.newRow();
            });
            // Show table
            (0, utils_1.log)(chalk_1.default.white("\n" + table.toString() + "\n"));
            process.exit(0);
        }
        else {
            (0, utils_1.log)(chalk_1.default.red("No lists available!"));
            process.exit(1);
        }
    }
    catch (e) {
        (0, utils_1.log)(chalk_1.default.red("Something went wrong!"));
        process.exit(1);
    }
});
exports.default = view;
