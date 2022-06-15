import chalk from "chalk";
const Conf = require("conf");
import { log } from "../../utils";
import { request } from "../../utils";

// Config store
const store = new Conf("hitlist");

const sync = async () => {
  try {
    // Check is user is logged in
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }
    // Output status
    log(chalk.yellow(`${chalk.blueBright.bold(`[CLOUD]`)} Syncing...`));
    const serverData = await request.auth().post("/lists/view");
    const data = serverData.data.data;
    if (serverData.data.data.length > 0) {
      const all = serverData.data.data;

      // Save to configstore
      store.set("lists", [...all]);
    }

    // Output success status
    log(
      chalk.white(
        `${chalk.yellow.bold(`[LOCAL]`)} Saved ${data.length} list(s) locally`
      )
    );
    process.exit(0);
  } catch (err) {
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

export default sync;
