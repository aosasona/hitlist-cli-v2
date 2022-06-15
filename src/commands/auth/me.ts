const Conf = require("conf");
import chalk from "chalk";
import { log } from "../../utils";

const me = (): any => {
  const store = new Conf("hitlist");
  const username: string = store.get("auth.username");

  if (username) {
    return log(`Currently logged in as ${chalk.green.bold(username)}`);
  } else {
    return log(chalk.red("You are not logged in!"));
  }
};

export default me;
