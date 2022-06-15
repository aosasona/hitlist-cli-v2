#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import shell from "shelljs";
import updateNotifier from "update-notifier";
import type { UpdateNotifier } from "update-notifier";
import open from "open";
import pkg from "./package.json";
import {
  me,
  login,
  logout,
  signup,
  create,
  view,
  reset,
  execute,
  executePublic,
  del,
  sync,
  commit,
} from "./src/commands";
import { log } from "./src/utils";

// Update Notifier
const notifier: UpdateNotifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
});

if (notifier.update) {
  const { latest } = notifier.update;
  console.log(
    chalk.yellow(
      `You are running an older version of Hitlist (${pkg.version}) \n
    Run ${chalk.green(
      `yarn global add hitlist-cli`
    )} to install version ${latest}.`
    )
  );
}

// New command instance
const program = new Command();

/* =============== METADATA =============== */

program
  .name("hit")
  .version(pkg.version, "-V, --version", "show the current version")
  .description(pkg.description);

/* =============== ACCOUNT =============== */

program
  .command("me")
  .alias("m")
  .description("View currently logged in user")
  .action(me);

program
  .command("login")
  .alias("l")
  .description("Login to your Hit List account")
  .action(login);

program
  .command("join")
  .alias("j")
  .description("Create a new Hit List account")
  .action(signup);

program
  .command("logout")
  .alias("d")
  .description("Logout of your Hit List account")
  .action(logout);

/* =============== COMMANDS =============== */

program
  .command("create <name>")
  .alias("add")
  .description("Create a list")
  .action((name) => create(name));

program
  .command("run <command>")
  .option("-p <user>", "Execute a public list")
  .alias("r")
  .description("Execute a list")
  .action((command, options) => {
    const user = options.p ? options.p : false;
    if (!user) {
      execute(command);
    } else {
      executePublic(command, options.p);
    }
  });

program
  .command("delete <name>")
  .alias("x")
  .description("Delete a list")
  .action((name) => {
    del(name);
  });

program
  .command("list")
  .alias("ls")
  .description("Display all lists")
  .action(view);

program
  .command("sync")
  .alias("s")
  .description("Fetch and save cloud lists")
  .action(sync);

/* =============== EXTRAS =============== */

program
  .command("clean")
  .alias("c")
  .description("Clear console")
  .action(() => {
    shell.exec("clear");
  });

program
  .command("docs")
  .description("Open the online documentation")
  .action(async () => {
    await open("https://www.hitlist.dev/docs");
  });

program
  .command("push <message>")
  .alias("p")
  .description("Make a commit to a SET repository")
  .action((message) => {
    commit(message);
  });

program.command("reset").description("Reset data store").action(reset);

// Parse the arguments
program.parse();
