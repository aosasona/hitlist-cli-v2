import chalk from "chalk";
import { prompt } from "inquirer";
const Conf = require("conf");
import prompts from "../../prompts";
import { exists, log } from "../../utils";
import { del as deleteAction } from "../../utils";
import { request } from "../../utils";

// Config store
const store = new Conf("hitlist");

// Delete function
const deleteList = async (name: string) => {
  try {
    // Check is user is logged in
    if (!store.get("auth.token")) {
      log(chalk.red("You are not logged in!"));
      process.exit(1);
    }

    // Check and delete locally
    if (exists(name)) {
      log(chalk.yellow(`>> Deleting list ${name} locally...`));
      deleteAction(name);
    }

    // Delete list from server
    log(chalk.yellow(`>> Deleting list ${name} from the cloud...`));
    request
      .auth()
      .delete(`/list/${name}`)
      .then((response) => {
        log(
          chalk.green(
            `${chalk.greenBright.bold("[SUCCESS]")} List ${name} deleted!`
          )
        );
        process.exit(0);
      })
      .catch((error) => {
        log(chalk.red("Unable to delete list from the cloud!"));
        process.exit(1);
      });
  } catch (error) {
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

// Initiation function
const del = (name: string) => {
  prompt(prompts.list.delete)
    .then((response) => {
      if (response.confirm.toLowerCase() === "y") {
        deleteList(name);
      } else {
        log(chalk.red("Aborted!"));
        process.exit(1);
      }
    })
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

export default del;
