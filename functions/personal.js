const fs = require("fs");
const path = require("path");
const axios = require("axios");
const output = require("./output");
const chalk = require("chalk");
const shell = require("shelljs");
var slugify = require("slugify");
const { checkHit, fetchHit } = require("../utils/constants");

//API URL
const url = require("../utils/constants").url;

//Local data stores
const authStore = require("../utils/constants").authStore;
const dataStore = require("../utils/constants").dataStore;

//Store paths
const authPath = require("../utils/paths").authPath;
const dataPath = require("../utils/paths").dataPath;

/**
 * @description Create a new list
 * @param {string} name - The name of the list
 * @param {string} description - The description of the list
 * @param {string} hits - The list of commands to execute
 * @param {string} visibility - The visibility of the list
 */
const createList = (name, hits, description, visibility) => {
  try {
    //  If user is not logged in
    if (!authStore.token) {
      shell.echo(chalk.red("You must be logged in!"));
      return;
    }

    //Echo current status
    shell.echo(chalk.yellow(chalk.yellow(">> Creating list...")));

    const headers = {
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    };

    // Create an array of lists
    const trimmedHits = hits.trim();
    const Hits = trimmedHits.split(",");

    if (Hits.length === 0) {
      shell.echo(chalk.red("At least one hit must be specified!"));
    }

    //Trim the lists
    var List = [];
    for (var i = 0; i < Hits.length; i++) {
      List.push(Hits[i].trim());
    }

    //Construct the body
    const Body = {
      name: slugify(name, { lower: true, trim: true }),
      list: List,
      description: description,
      visibility: visibility.toLowerCase(),
    };

    //Add to the current local list
    if (!checkHit(Body.name)) {
      const newList = dataStore;
      newList.push(Body);
      fs.writeFileSync(dataPath, JSON.stringify(newList));
      // fs.writeFile(dataPath, newList, (err) => {
      //   output(chalk.red(err?.message));
      // });

      shell.echo(
        chalk.yellow(
          "--------------------------------------------------------------------------------\nHit saved locally, syncing with the cloud now...\n--------------------------------------------------------------------------------"
        )
      );
    } else {
      shell.echo(
        chalk.red(
          "--------------------------------------------------------------------------------\nList already exists! Please use a different name.\n--------------------------------------------------------------------------------"
        )
      );
      return;
    }

    //Make the call to save the list
    axios
      .post(`${url}/lists/create`, Body, headers)
      .then((response) => {
        const listName = chalk.whiteBright(name);
        output(chalk.bold.whiteBright(`\n✅ Syncing complete\n`));
        output(
          chalk.green(
            `--------------------------------------------------------------------------------\nNew list created! - ${listName} \n--------------------------------------------------------------------------------`
          )
        );
      })
      .catch((error) => {
        output(chalk.red.bold(error.response.data.message));
      });
    // return;
  } catch (error) {
    output(chalk.red(err.message));
  }
};

/**
 * @description Get all of a user's list'
 */

const getAll = () => {
  try {
    if (!authStore.token) {
      shell.echo(chalk.red("You must be logged in!"));
      return;
    }

    shell.echo(chalk.yellow(chalk.yellow(">> Fetching your list...")));

    const headers = {
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    };

    if (dataStore?.length === 0) {
      axios
        .post(`${url}/lists/view`, {}, headers)
        .then((response) => {
          const Lists = response.data.data;
          shell.echo(
            chalk.black.bgWhite(">>>>> YOUR HIT LIST(S) - CLOUD <<<<<")
          );
          shell.echo(" ");
          Lists?.forEach((list) => {
            var List =
              "\t" +
              chalk.green.bold(list.name) +
              " - " +
              list.description +
              "\n";
            shell.echo(List);
          });
        })
        .catch((error) => {
          output(chalk.red.bold(error.response.data.message));
        });
    } else {
      const Lists = dataStore;
      shell.echo(chalk.black.bgWhite(">>>>> YOUR HIT LIST(S) - LOCAL <<<<<"));
      shell.echo(" ");
      Lists?.forEach((list) => {
        var List =
          "\t" + chalk.green.bold(list.name) + " - " + list.description + "\n";
        shell.echo(List);
      });
    }
  } catch (err) {
    output(chalk.red(err.message));
  }
};

/**
 * @description Get a single list
 */
const getList = (name) => {
  try {
    if (!authStore.token) {
      shell.echo(chalk.red("You must be logged in!"));
      return;
    }

    const headers = {
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    };

    if (!checkHit(name)) {
      shell.echo(chalk.yellow(">> Executing (cloud)..."));
      axios
        .post(`${url}/list/${name}`, {}, headers)
        .then((response) => {
          //   shell.echo(response.data.data.list);
          var List = response.data.data.list;
          let Hit;
          //   List.forEach((list) => {

          //   });
          if (List.length === 1) {
            Hit = List[0];
          } else if (List.length >= 2) {
            Hit = List.join(" && ");
          }

          if (shell.exec(Hit)) {
            const com = chalk.white.bold(name);

            shell.echo(
              chalk.green(
                `--------------------------------------------------------------------------------\n${com} has been successfully executed 🚀 \n--------------------------------------------------------------------------------`
              )
            );
          } else {
            const com = chalk.white.bold(name);
            shell.echo(chalk.red(`Failed to execute ${com} list! 😕`));
          }
        })
        .catch((error) => {
          shell.echo(chalk.red.bold(error.response.data.message));
        });
    } else {
      shell.echo(chalk.yellow(">> Executing locally..."));
      var List = fetchHit(name).list;
      let Hit;

      if (List.length === 1) {
        Hit = List[0];
      } else if (List.length >= 2) {
        Hit = List.join(" && ");
      }

      if (shell.exec(Hit)) {
        const com = chalk.white.bold(name);

        shell.echo(
          chalk.green(
            `--------------------------------------------------------------------------------\n${com} has been successfully executed 🚀 \n--------------------------------------------------------------------------------`
          )
        );
      } else {
        const com = chalk.white.bold(name);
        shell.echo(chalk.red(`Failed to execute ${com} list! 😕`));
      }
    }
  } catch (err) {
    shell.echo(chalk.red(err.message));
  }
};

/**
 * @description Get a single PUBLIC list
 */
const getPublicList = (name, username) => {
  try {
    if (authStore.token) {
      shell.echo(chalk.red("You must be logged in!"));
      return;
    }

    shell.echo(chalk.yellow(chalk.yellow(">> Executing public list...")));

    const headers = {
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    };

    axios
      .post(`${url}/lists/public/${username}/${name}`, {}, headers)
      .then((response) => {
        //   shell.echo(response.data.data.list);
        var List = response.data.data.list;
        let Hit;
        //   List.forEach((list) => {

        //   });
        if (List.length === 1) {
          Hit = List[0];
        } else if (List.length >= 2) {
          Hit = List.join(" && ");
        }

        if (shell.exec(Hit)) {
          const com = chalk.white.bold(name);

          shell.echo(
            chalk.green(
              `--------------------------------------------------------------------------------\n${com} has been successfully executed 🚀 \n--------------------------------------------------------------------------------`
            )
          );
        } else {
          const com = chalk.white.bold(name);
          shell.echo(
            chalk.red(
              `--------------------------------------------------------------------------------\nFailed to execute ${com} list! 😕 \n--------------------------------------------------------------------------------`
            )
          );
        }
      })
      .catch((error) => {
        shell.echo(chalk.red.bold(error.response.data.message));
      });
  } catch (err) {
    shell.echo(chalk.red(err.message));
  }
};

/**
 * @description Delete a list
 */
const deleteList = (list) => {
  try {
    if (authStore.token) {
      shell.echo(chalk.red("You must be logged in!"));
      return;
    }

    //Echo status
    shell.echo(chalk.yellow(chalk.yellow(">> Destroying list...")));

    const headers = {
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    };
    axios
      .delete(`${url}/list/${list}`, headers, {})
      .then((response) => {
        const com = chalk.white(list);
        output(
          chalk.green(
            `--------------------------------------------------------------------------------\n💣 Destroyed ${com} successfully!\n--------------------------------------------------------------------------------`
          )
        );
      })
      .catch((error) => {
        output(chalk.red.bold(error.response.data.message));
      });
  } catch (err) {
    output(chalk.red(err.message));
  }
};

module.exports = { createList, getAll, getList, deleteList, getPublicList };
