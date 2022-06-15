import shell from "shelljs";
import chalk from "chalk";
import { prompt } from "inquirer";
const Conf = require("conf");
import prompts from "../../prompts";
import { log } from "../../utils";
import { request } from "../../utils";

const store = new Conf("hitlist");

// Body interface
interface Body {
  credential: string;
  password: string;
}

// Login function
const login = async (credential: string, password: string) => {
  try {
    // Construct data body
    const body: Body = {
      credential,
      password,
    };
    log(chalk.yellow("Attempting to sign you in..."));

    // Make request
    request
      .noauth()
      .post("/auth/login", body)
      .then(({ data }) => {
        // Save token to configstore
        store.set("auth.token", data.token);
        store.set("auth.username", data.username);
        log(chalk.green(`Successfully logged in as ${data.username}`));
        process.exit(0);
      })
      .catch(({ response }) => {
        log(
          chalk.red(
            `Failed! - ${response?.data?.message || "Something went wrong!"}`
          )
        );
        process.exit(1);
      });
  } catch {
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

// Default export
const initiateLogin = () => {
  shell.echo(
    chalk.bgGreen.black.bold(
      ">> Welcome Back! Login to continue hitting like a pro "
    )
  );
  prompt(prompts.auth.login)
    .then((response) => login(response.credential, response.password))
    .catch((error) => {
      if (error.isTtyError) {
        log(chalk.red("Oops! Hit List is not supported here 😔"));
        process.exit(1);
      } else {
        log(chalk.red("Something went wrong!"));
        process.exit(1);
      }
    });
};

export default initiateLogin;
