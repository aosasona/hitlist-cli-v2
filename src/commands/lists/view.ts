import chalk from "chalk";
const Conf = require("conf");
import { log, request } from "../../utils";
const Table = require("easy-table");
const store = new Conf("hitlist");

const view = async () => {
  try {
    // Check is user is logged in
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }

    // Mutable data
    let data: any[] = [];
    let source = "LOCAL";

    // Store & data instance
    const dataStore = store.get("lists") || [];
    const table = new Table();

    // If lists are available in configstore
    if (dataStore.length > 0) {
      data = [...dataStore];
      source = chalk.yellow.bold("[LOCAL]");
    } else {
      log(chalk.yellow("Attempting to fetch lists from the cloud..."));
      // If no lists are available in configstore, fetch from server
      source = chalk.blueBright.bold("[CLOUD]");
      const serverData = await request.auth().post("/lists/view");

      if (serverData.data.data.length > 0) {
        const all = serverData.data.data;
        data = [...all];
        // Save to configstore
        store.set("lists", [...all]);
      }
    }

    // Show status
    log(`${source} - ${data.length} list(s) available`);

    if (data.length > 0) {
      // Draw table
      data.forEach((list: any) => {
        table.cell("Name/Executor", chalk.bold.green(list.name));
        table.cell("Description", list.description);
        table.cell("Visibility", list.visibility);
        table.newRow();
      });

      // Show table
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
