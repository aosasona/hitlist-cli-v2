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
const prompts_1 = __importDefault(require("../../prompts"));
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
// Signup function
const signup = (username, email, password, confirmPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Construct data body
        const body = {
            username,
            email,
            password,
            confirmPassword,
        };
        // Make request
        utils_2.request
            .noauth()
            .post("/auth/create", body)
            .then(({ data }) => {
            (0, utils_1.log)(chalk_1.default.green(`${data === null || data === void 0 ? void 0 : data.message} - Please login using your credentials now by using the "hit login" command`));
            process.exit(0);
        })
            .catch(({ response }) => {
            var _a;
            (0, utils_1.log)(chalk_1.default.red(`Failed! - ${((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.message) || "Something went wrong!"}`));
            process.exit(1);
        });
    }
    catch (error) {
        (0, utils_1.log)(chalk_1.default.red("Something went wrong!"));
        process.exit(1);
    }
});
// Default export
const initiateSignup = () => {
    (0, inquirer_1.prompt)(prompts_1.default.auth.register)
        .then((response) => signup(response.username, response.email, response.password, response.confirmPassword))
        .catch((error) => {
        if (error.isTtyError) {
            (0, utils_1.log)(chalk_1.default.red("Oops! Hit List is not supported here 😔"));
        }
        else {
            (0, utils_1.log)(chalk_1.default.red("Something went wrong!"));
        }
    });
};
exports.default = initiateSignup;
