import chalk from "chalk";
const Conf = require("conf");
import { log } from "../../utils";
import { request } from "../../utils";

const store = new Conf("hitlist");

const sync = async () => {
  try {
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }

    log(chalk.yellow(`${chalk.blueBright.bold(`[CLOUD]`)} Syncing...`));
    const serverData = await request.auth().get("/lists");
    const data = serverData.data.data;
    if (serverData?.data?.data?.length > 0) {
      const all = serverData?.data?.data;

      store.set("lists", [...all]);
    }

    log(
      chalk.white(
        `${chalk.yellow.bold(`[LOCAL]`)} Saved ${data?.length} list(s) locally`
      )
    );
    process.exit(0);
  } catch (err) {
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

export default sync;