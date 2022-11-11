import chalk from "chalk";
import { prompt } from "inquirer";
const Conf = require("conf");
import prompts from "../../prompts";
import { exists, log } from "../../utils";
import { request } from "../../utils";
import slugify from "slugify";

const store = new Conf("hitlist");

interface Body {
  name: string;
  list: string[];
  description: string;
  visibility: boolean;
}

const createList = async (
  name: string,
  hits: string,
  description: string,
  visibility: boolean
) => {
  try {
    if (exists(name)) {
      log(chalk.red(`List ${name} already exists locally!`));
      process.exit(1);
    }

    if (!(name && hits && visibility)) {
      log(chalk.red("One or more fields are missing!"));
      process.exit(1);
    }

    const listArray: string[] = hits.split(",").map((hit) => hit.trim());

    const body: Body = {
      name: slugify(name, { lower: true, trim: true }),
      list: listArray,
      description,
      visibility,
    };

    log(chalk.yellow(">> Attempting to create list...\n"));

    request
      .auth()
      .post("/lists/create", body)
      .then(({ data }) => {
        log(chalk.white(`>> Saving list ${body.name} locally...\n`));

        const all = store.get("lists") || [];
        const newArray = [...all, body];
        store.set("lists", newArray);

        log(chalk.green(`${chalk.greenBright.bold("[SUCCESS]")} Successfully created list ${body.name}`));
        process.exit(0);
      })
      .catch(({ response }) => {
        log(chalk.red(`Failed! - ${response?.data?.message || "Something went wrong!"}`));
        process.exit(1);
      });
  } catch (error: any) {
    log(chalk.red(`${error?.message || "Something went wrong!"}`));
    process.exit(1);
  }
};

const create = (name: string) => {
  if (!store.get("auth.token")) {
    log(chalk.red("You are not logged in!"));
    process.exit(1);
  }

  if (exists(name)) {
    log(chalk.red(`List ${name} already exists!`));
    process.exit(1);
  }

  prompt(prompts.list.create)
    .then(async (response) => {
      await createList(
        name,
        response?.hits,
        response?.description,
        response?.visibility
      );
    })
    .catch((error) => {
      if (error?.isTtyError) {
        log(chalk.red("Oops! Hit List is not supported here 😔"));
        process.exit(1);
      } else {
        log(chalk.red("Something went wrong!"));
        process.exit(1);
      }
    });
};

export default create;