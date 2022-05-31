const package = require("../package.json");
const { prompt } = require("inquirer");
const program = require("commander");
const chalk = require("chalk");
const shell = require("shelljs");

//Import functions
const { login, signup, logout, show } = require("../functions/auth");
const {
  getAll,
  getList,
  getPublicList,
  deleteList,
  createList,
  syncLists,
} = require("../functions/personal");
const { loginPrompt, signupPrompt } = require("../prompts/auth");
const { listPrompt, deletePrompt } = require("../prompts/list");

program
  .version(package.version)
  .description("Your personal online commands manager");

/**
 * @description Clear the console
 */
program
  .command("clean")
  .alias("c")
  .description("Clear console")
  .action(() => {
    shell.exec("clear");
  });

/* ============== ACCOUNT ============== */

/**
 * @description Show logged in user
 */
program
  .command("me")
  .alias("m")
  .description("View logged in user")
  .action(() => {
    show();
  });

/**
 * @description Login user
 */
program
  .command("login")
  .alias("l")
  .description("Login to your Hit List account")
  .action(() => {
    shell.echo(
      chalk.bgGreen.black.bold(
        ">> Welcome Back! Login to continue hitting like a pro "
      )
    );
    prompt(loginPrompt)
      .then((response) => login(response.credential, response.password))
      .catch((error) => {
        if (error.isTtyError) {
          shell.error(chalk.red("Oops! Hit List is not supported here 😔"));
        } else {
          shell.error(chalk.red("Something went wrong!"));
        }
      });
  });

/**
 * @description Create a new account
 */
program
  .command("join")
  .alias("j")
  .description("Create a new Hit List account")
  .action(() => {
    prompt(signupPrompt)
      .then((response) =>
        signup(
          response.username,
          response.email,
          response.password,
          response.confirmPassword
        )
      )
      .catch((error) => {
        if (error.isTtyError) {
          shell.error(chalk.red("Oops! Hit List is not supported here 😔"));
        } else {
          shell.error(chalk.red("Something went wrong!"));
        }
      });
  });

/**
 * @description Logout user
 */
program
  .command("logout")
  .alias("d")
  .description("Logout of your Hit List account")
  .action(() => {
    logout();
  });

/* ============== COMMANDS ============== */

/**
 * @description Create a new list
 */
program
  .command("create <list>")
  .alias("c")
  .description("Create a list")
  .action((list) => {
    prompt(listPrompt)
      .then((response) =>
        createList(
          list,
          response.hits,
          response.description,
          response.visibility
        )
      )
      .catch((error) => {
        if (error.isTtyError) {
          shell.error(chalk.red("Oops! Hit List is not supported here 😔"));
        } else {
          shell.error(chalk.red("Something went wrong!"));
        }
      });
  });

/**
 * @description Execute a public list
 */
program
  .command("run <command>")
  .option("-p <user>", "Execute a public list")
  .alias("r")
  .description("Execute a list")
  .action((command, options) => {
    const user = options.p ? options.p : false;
    if (!user) {
      getList(command);
    } else {
      getPublicList(command, options.p);
    }
  });

/**
 * @description Display All lists
 */
program
  .command("list")
  .alias("ls")
  .description("Display all lists")
  .action(() => {
    getAll();
  });

/**
 * @description Delete a list
 */
program
  .command("delete <list>")
  .alias("x")
  .description("Delete a list")
  .action((list) => {
    prompt(deletePrompt)
      .then((response) => {
        if (response.confirm.toLowerCase() === "y") {
          deleteList(list);
        } else {
          shell.echo(chalk.yellow("Aborted!"));
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          shell.error(chalk.red("Oops! Hit List is not supported here 😔"));
        } else {
          shell.error(chalk.red("Something went wrong!"));
        }
      });
  });

/**
 * @description Sync lists
 */
program
  .command("sync")
  .alias("s")
  .description("Fetch and save cloud lists")
  .action(() => {
    syncLists();
  });

/* ============== EXTRAS ============== */

/**
 * @description Make a git commit
 */
program
  .command("push <message>")
  .alias("p")
  .description("Make a commit to a SET repository")
  .action((message) => {
    const gitCommit = `git add . && git commit -am '${message}' && git push`;
    if (shell.exec(gitCommit).code === 1) {
      shell.echo(
        chalk.red(
          "--------------------------------------------------------------------------------\nUnable to make commit to repository\n--------------------------------------------------------------------------------"
        )
      );
    } else {
      shell.echo(
        chalk.green(
          `--------------------------------------------------------------------------------\nPushed successfully - ${chalk.underline(
            message
          )} \n--------------------------------------------------------------------------------`
        )
      );
    }
  });

program.parse(process.argv);
