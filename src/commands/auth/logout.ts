import chalk from "chalk";
import { log } from "../../utils";

const Conf = require("conf");

const store = new Conf("hitlist");

const logout = (): void => {
  store.clear();
  log(chalk.green("Successfully logged out!"));
  process.exit(0);
};

export default logout;
