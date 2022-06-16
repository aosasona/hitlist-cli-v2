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
const inquirer_1 = require("inquirer");
const Conf = require("conf");
const prompts_1 = __importDefault(require("../../prompts"));
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
const utils_3 = require("../../utils");
// Config store
const store = new Conf("hitlist");
// Delete function
const deleteList = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check is user is logged in
        if (!store.get("auth.token")) {
            (0, utils_1.log)(chalk_1.default.red("You are not logged in!"));
            process.exit(1);
        }
        // Check and delete locally
        if ((0, utils_1.exists)(name)) {
            (0, utils_1.log)(chalk_1.default.yellow(`>> Deleting list ${name} locally...`));
            (0, utils_2.del)(name);
        }
        // Delete list from server
        (0, utils_1.log)(chalk_1.default.yellow(`>> Deleting list ${name} from the cloud...`));
        utils_3.request
            .auth()
            .delete(`/list/${name}`)
            .then((response) => {
            (0, utils_1.log)(chalk_1.default.green(`${chalk_1.default.greenBright.bold("[SUCCESS]")} List ${name} deleted!`));
            process.exit(0);
        })
            .catch((error) => {
            (0, utils_1.log)(chalk_1.default.red("Unable to delete list from the cloud!"));
            process.exit(1);
        });
    }
    catch (error) {
        (0, utils_1.log)(chalk_1.default.red("Something went wrong!"));
        process.exit(1);
    }
});
// Initiation function
const del = (name) => {
    (0, inquirer_1.prompt)(prompts_1.default.list.delete)
        .then((response) => {
        if (response.confirm.toLowerCase() === "y") {
            deleteList(name);
        }
        else {
            (0, utils_1.log)(chalk_1.default.red("Aborted!"));
            process.exit(1);
        }
    })
        .catch((error) => {
        if (error.isTtyError) {
            (0, utils_1.log)(chalk_1.default.red("Oops! Hit List is not supported here 😔"));
            process.exit(1);
        }
        else {
            (0, utils_1.log)(chalk_1.default.red("Something went wrong!"));
            process.exit(1);
        }
    });
};
exports.default = del;
