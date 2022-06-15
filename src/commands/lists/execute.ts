import shell from "shelljs";
import chalk from "chalk";
const Conf = require("conf");
import { exists, find, log } from "../../utils";
import { request } from "../../utils";

// Config store
const store = new Conf("hitlist");

// Execute owned list
const execute = async (name: string) => {
  try {
    // Check is user is logged in
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }

    //Mutable variables
    let source = "LOCAL";
    let hit;

    // Check if list exists locally
    if (exists(name)) {
      // Execution source
      const src = chalk.yellow.bold(`[LOCAL]`);
      log(chalk.yellow(`${src} Executing ${name}...`));

      // Create single hit from list
      const raw = find(name).list;

      // Check length of list to create string
      if (raw.length === 1) {
        hit = raw[0];
      } else {
        hit = raw.join(" && ");
      }
    } else {
      const src = chalk.blueBright.bold(`[CLOUD]`);
      // Log list source
      log(chalk.yellow(`${src} Executing ${name}...`));

      // Get list from server
      source = "CLOUD";
      const serverData = await request.auth().post(`/list/${name}`);
      const raw = serverData.data.data.list;

      // Check length of list to create string
      if (raw.length === 1) {
        hit = raw[0];
      } else {
        hit = raw.join(" && ");
      }
    }

    // Execute list
    if (shell.exec(hit).code === 0) {
      log(
        chalk.white(
          `${
            source === "LOCAL"
              ? chalk.yellow.bold(`[LOCAL]`)
              : chalk.blueBright.bold(`[CLOUD]`)
          } Successfully executed ${chalk.bold.underline(name)}!`
        )
      );
      process.exit(0);
    } else {
      log(
        chalk.red(
          `${
            source === "LOCAL"
              ? chalk.yellow.bold(`[LOCAL]`)
              : chalk.blueBright.bold(`[CLOUD]`)
          } Failed to execute ${name}!`
        )
      );
      process.exit(1);
    }
  } catch (err) {
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

// Execute public list
const executePublic = async (name: string, user: string) => {
  try {
    // Check is user is logged in
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }

    let hit;
    const src = chalk.greenBright.bold(`[PUBLIC]`);
    // Log list source
    log(chalk.yellow(`${src} Executing ${name}...`));

    // Get list from server

    const serverData = await request
      .auth()
      .post(`/lists/public/${user}/${name}`);
    const raw = serverData.data.data.list;

    // Check length of list to create string
    if (raw.length === 1) {
      hit = raw[0];
    } else {
      hit = raw.join(" && ");
    }

    // Execute list
    if (shell.exec(hit).code === 0) {
      log(
        chalk.white(
          `${chalk.greenBright.bold(
            `[PUBLIC]`
          )} Successfully executed public list - ${chalk.bold.underline(name)}`
        )
      );
      process.exit(0);
    } else {
      log(
        chalk.red(
          `${chalk.greenBright.bold(`[PUBLIC]`)} Failed to execute ${name}!`
        )
      );
      process.exit(1);
    }
  } catch (err) {
    console.log(err);
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

export { execute, executePublic };
