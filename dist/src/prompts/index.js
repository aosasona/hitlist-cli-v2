"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts = {
    // Auth Prompts
    auth: {
        login: [
            {
                type: "input",
                name: "credential",
                message: "Username or email address : ",
            },
            {
                type: "password",
                name: "password",
                message: "Password : ",
            },
        ],
        register: [
            {
                type: "input",
                name: "username",
                message: "Username : ",
            },
            {
                type: "input",
                name: "email",
                message: "Email address : ",
            },
            {
                type: "password",
                name: "password",
                message: "Password [At least one UPPERCASE, one LOWERCASE character, one SYMBOL & one NUMBER] : ",
            },
            {
                type: "password",
                name: "confirmPassword",
                message: "Confirm Password : ",
            },
        ],
    },
    // List Prompts
    list: {
        create: [
            {
                type: "input",
                name: "hits",
                message: "Hits (commands separated by commas) : ",
            },
            {
                type: "input",
                name: "description",
                message: "Description : ",
            },
            {
                type: "list",
                name: "visibility",
                message: "List visibility : ",
                choices: ["Public", "Private"],
            },
        ],
        delete: [
            {
                type: "input",
                name: "confirm",
                message: "Are you sure? (Y/N) ",
            },
        ],
    },
};
exports.default = prompts;
