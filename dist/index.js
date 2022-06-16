#!/usr/bin/env node
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
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const shelljs_1 = __importDefault(require("shelljs"));
const update_notifier_1 = __importDefault(require("update-notifier"));
const open_1 = __importDefault(require("open"));
const package_json_1 = __importDefault(require("./package.json"));
const commands_1 = require("./src/commands");
// Update Notifier
const notifier = (0, update_notifier_1.default)({
    pkg: package_json_1.default,
    updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
});
if (notifier.update) {
    const { latest } = notifier.update;
    console.log(chalk_1.default.yellow(`You are running an older version of Hitlist (${package_json_1.default.version})
\nRun ${chalk_1.default.green(`yarn global add hitlist-cli`)} to install version ${latest}.`));
}
// New command instance
const program = new commander_1.Command();
/* =============== METADATA =============== */
program
    .name("hit")
    .version(package_json_1.default.version, "-V, --version", "show the current version")
    .description(package_json_1.default.description);
/* =============== ACCOUNT =============== */
program
    .command("me")
    .alias("m")
    .description("View currently logged in user")
    .action(commands_1.me);
program
    .command("login")
    .alias("l")
    .description("Login to your Hit List account")
    .action(commands_1.login);
program
    .command("join")
    .alias("j")
    .description("Create a new Hit List account")
    .action(commands_1.signup);
program
    .command("logout")
    .alias("d")
    .description("Logout of your Hit List account")
    .action(commands_1.logout);
/* =============== COMMANDS =============== */
program
    .command("create <name>")
    .alias("add")
    .description("Create a list")
    .action((name) => (0, commands_1.create)(name));
program
    .command("run <command>")
    .option("-p <user>", "Execute a public list")
    .alias("r")
    .description("Execute a list")
    .action((command, options) => {
    const user = options.p ? options.p : false;
    if (!user) {
        (0, commands_1.execute)(command);
    }
    else {
        (0, commands_1.executePublic)(command, options.p);
    }
});
program
    .command("delete <name>")
    .alias("x")
    .description("Delete a list")
    .action((name) => {
    (0, commands_1.del)(name);
});
program
    .command("list")
    .alias("ls")
    .description("Display all lists")
    .action(commands_1.view);
program
    .command("sync")
    .alias("s")
    .description("Fetch and save cloud lists")
    .action(commands_1.sync);
/* =============== EXTRAS =============== */
program
    .command("clean")
    .alias("c")
    .description("Clear console")
    .action(() => {
    shelljs_1.default.exec("clear");
});
program
    .command("docs")
    .description("Open the online documentation")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, open_1.default)("https://www.hitlist.dev/docs");
}));
program
    .command("push <message>")
    .alias("p")
    .description("Make a commit to a SET repository")
    .action((message) => {
    (0, commands_1.commit)(message);
});
program.command("reset").description("Reset data store").action(commands_1.reset);
// Parse the arguments
program.parse();
