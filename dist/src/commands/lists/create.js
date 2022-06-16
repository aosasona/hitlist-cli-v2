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
const slugify_1 = __importDefault(require("slugify"));
const store = new Conf("hitlist");
// Create function
const createList = (name, hits, description, visibility) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if list already exists
        if ((0, utils_1.exists)(name)) {
            (0, utils_1.log)(chalk_1.default.red(`List ${name} already exists!`));
            process.exit(1);
        }
        // Check that all data is provided
        if (!(name && hits && visibility)) {
            (0, utils_1.log)(chalk_1.default.red("One or more fields are missing!"));
            process.exit(1);
        }
        //Construct list array
        const listArray = hits.split(",").map((hit) => hit.trim());
        // Construct data body
        const body = {
            name: (0, slugify_1.default)(name, { lower: true, trim: true }),
            list: listArray,
            description,
            visibility,
        };
        (0, utils_1.log)(chalk_1.default.yellow(">> Attempting to create list...\n"));
        //Make request and sync locally
        utils_2.request
            .auth()
            .post("/lists/create", body)
            .then(({ data }) => {
            (0, utils_1.log)(chalk_1.default.white(`>> Saving list ${body.name} locally...\n`));
            // Save list to configstore
            const all = store.get("lists") || [];
            const newArray = [...all, body];
            store.set("lists", newArray);
            // Show success message
            (0, utils_1.log)(chalk_1.default.green(`${chalk_1.default.greenBright.bold("[SUCCESS]")} Successfully created list ${body.name}`));
            process.exit(0);
        })
            .catch(({ response }) => {
            var _a;
            (0, utils_1.log)(chalk_1.default.red(`Failed! - ${((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.message) || "Something went wrong!"}`));
            process.exit(1);
        });
    }
    catch (error) {
        (0, utils_1.log)(chalk_1.default.red(`${(error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!"}`));
        process.exit(1);
    }
});
// Initiation function
const create = (name) => {
    // Check is user is logged in
    if (!store.get("auth.token")) {
        (0, utils_1.log)(chalk_1.default.red("You are not logged in!"));
        process.exit(1);
    }
    // Check if list already exists
    if ((0, utils_1.exists)(name)) {
        (0, utils_1.log)(chalk_1.default.red(`List ${name} already exists!`));
        process.exit(1);
    }
    // Ask for details
    (0, inquirer_1.prompt)(prompts_1.default.list.create)
        .then((response) => {
        createList(name, response.hits, response.description, response.visibility);
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
exports.default = create;
