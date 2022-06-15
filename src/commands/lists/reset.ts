import chalk from "chalk";
import { log } from "../../utils";

const Conf = require("conf");
const store = new Conf("hitlist");

const reset = () => {
  store.set("lists", []);
  log(chalk.green(">> Successfully reset lists!"));
};
export default reset;
