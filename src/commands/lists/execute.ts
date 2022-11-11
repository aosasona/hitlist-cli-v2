import shell from "shelljs";
import chalk from "chalk";
const Conf = require("conf");
import { exists, find, log } from "../../utils";
import { request } from "../../utils";

const store = new Conf("hitlist");

const execute = async (name: string) => {
  try {
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }

    let source = "LOCAL";
    let hit;

    if (exists(name)) {
      const src = chalk.yellow.bold(`[LOCAL]`);
      log(chalk.yellow(`${src} Executing ${name}...`));

      const raw = find(name)?.list;

      if (raw.length === 1) {
        hit = raw[0];
      } else {
        hit = raw.join(" && ");
      }
    } else {
      const src = chalk.blueBright.bold(`[CLOUD]`);
      log(chalk.yellow(`${src} Executing ${name}...`));

      source = "CLOUD";
      const serverData = await request.auth().get(`/list/${name}`);
      const raw = serverData?.data?.data?.list;

      if (raw.length === 1) {
        hit = raw[0];
      } else {
        hit = raw?.join(" && ");
      }
    }

    if (shell.exec(hit).code === 0) {
      log(chalk.white(`${
            source === "LOCAL"
              ? chalk.yellow.bold(`[LOCAL]`)
              : chalk.blueBright.bold(`[CLOUD]`)
          } Successfully executed ${chalk.bold.underline(name)}!`));
      process.exit(0);
    } else {
      log(chalk.red(`${
            source === "LOCAL"
              ? chalk.yellow.bold(`[LOCAL]`)
              : chalk.blueBright.bold(`[CLOUD]`)
          } Failed to execute ${name}!`));
      process.exit(1);
    }
  } catch (err) {
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

const executePublic = async (name: string, user: string) => {
  try {
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }

    let hit;
    const src = chalk.greenBright.bold(`[PUBLIC]`);
    log(chalk.yellow(`${src} Executing ${name}...`));

    const serverData = await request
      .auth()
      .get(`/lists/public/${user}/${name}`);
    const raw = serverData?.data?.data?.list;

    if (raw.length === 1) {
      hit = raw[0];
    } else {
      hit = raw.join(" && ");
    }

    if (shell.exec(hit).code === 0) {
      log(chalk.white(`${chalk.greenBright.bold(`[PUBLIC]`)} Successfully executed public list - ${chalk.bold.underline(name)}`)
      );
      process.exit(0);
    } else {
      log(chalk.red(`${chalk.greenBright.bold(`[PUBLIC]`)} Failed to execute ${name}!`));
      process.exit(1);
    }
  } catch (err) {
    console.log(err);
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

export { execute, executePublic };