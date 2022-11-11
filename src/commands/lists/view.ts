import chalk from "chalk";
const Conf = require("conf");
import { log, request } from "../../utils";
const Table = require("easy-table");
const store = new Conf("hitlist");

const view = async () => {
  try {
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }

    let data: any[] = [];
    let source = "LOCAL";

    const dataStore = store.get("lists") || [];
    const table = new Table();

    if (dataStore.length > 0) {
      data = [...dataStore];
      source = chalk.yellow.bold("[LOCAL]");
    } else {
      log(chalk.yellow("Attempting to fetch lists from the cloud..."));
      source = chalk.blueBright.bold("[CLOUD]");
      const serverData = await request.auth().get("/lists");

      if (serverData.data.data.length > 0) {
        const all = serverData.data.data;
        data = [...all];
        store.set("lists", [...all]);
      }
    }

    log(`${source} - ${data.length} list(s) available`);

    if (data.length > 0) {
      data.forEach((list: any) => {
        table.cell("Name/Executor", chalk.bold.green(list.name));
        table.cell("Description", list.description);
        table.cell("Visibility", list.visibility);
        table.newRow();
      });

      log(chalk.white("\n" + table.toString() + "\n"));
      process.exit(0);
    } else {
      log(chalk.red("No lists available!"));
      process.exit(1);
    }
  } catch (e) {
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

export default view;