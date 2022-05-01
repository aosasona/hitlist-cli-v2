const fs = require("fs");
const path = require("path");
const axios = require("axios");
const output = require("./output");
const chalk = require("chalk");
const shell = require("shelljs");

//Import URL
const url = require("../configs/url");
const storePath = path.join(__dirname, "../", "store", "data.json");

/**
 * @description Create a new list
 */

exports.createList = (name, hits, description, visibility) => {
  fs.readFile(storePath, (err, data) => {
    const store = JSON.parse(data);
    shell.echo("Creating list...");
    try {
      if (store.token === undefined) {
        shell.echo(chalk.red("You must be logged in!"));
      }

      const headers = {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      };

      const Hits = hits.split(",");

      if (Hits.length < 1) {
        shell.echo(chalk.red("At least one hit must be specified!"));
      }

      var List = [];

      Hits.forEach((hit, index) => {
        List.push(hit.trim());
      });

      //Construct the body
      const Body = {
        name: name,
        list: List,
        description: description,
        visibility: visibility.toLowerCase() === "y" ? "public" : "private",
      };

      //Make the call to save the list
      axios
        .post(`${url}/lists/create`, Body, headers)
        .then((response) => {
          const listName = chalk.yellow(name);
          output(`✅ Successfully created new list - ${listName}`);
        })
        .catch((error) => {
          output(chalk.red.bold(error.response.data.message));
        });
    } catch (error) {
      output(chalk.red(err.message));
    }
  });
};

/**
 * @description Get all of a user's list'
 */

exports.getAll = () => {
  fs.readFile(storePath, (err, data) => {
    const store = JSON.parse(data);

    shell.echo("Fetching your lists...");

    try {
      if (store.token === undefined) {
        shell.echo(chalk.red("You must be logged in!"));
      }

      const headers = {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      };

      axios
        .post(`${url}/lists/view`, {}, headers)
        .then((response) => {
          const Lists = response.data.data;
          shell.echo(chalk.black.bgWhite(">>>>> YOUR HIT LIST(S) <<<<<"));
          shell.echo(" ");
          Lists.forEach((list) => {
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
    } catch (err) {
      output(chalk.red(err.message));
    }
  });
};

/**
 * @description Get a single list
 */
exports.getList = (name) => {
  shell.echo("Executing...");
  try {
    fs.readFile(storePath, (err, data) => {
      const store = JSON.parse(data);

      if (store.token === undefined) {
        shell.echo(chalk.red("You must be logged in!"));
      }

      const headers = {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      };

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

            shell.echo(chalk.green(`${com} has been successfully executed 🚀`));
          } else {
            const com = chalk.white.bold(name);
            shell.echo(chalk.red(`Failed to execute ${com} list! 😕`));
          }
        })
        .catch((error) => {
          shell.echo(chalk.red.bold(error.response.data.message));
        });
    });
  } catch (err) {
    shell.echo(chalk.red(err.message));
  }
};

/**
 * @description Get a single PUBLIC list
 */
exports.getPublicList = (name, username) => {
  shell.echo("Executing...");
  try {
    fs.readFile(storePath, (err, data) => {
      const store = JSON.parse(data);

      if (store.token === undefined) {
        shell.echo(chalk.red("You must be logged in!"));
      }

      const headers = {
        headers: {
          Authorization: "Bearer " + store.token,
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

            shell.echo(chalk.green(`${com} has been successfully executed 🚀`));
          } else {
            const com = chalk.white.bold(name);
            shell.echo(chalk.red(`Failed to execute ${com} list! 😕`));
          }
        })
        .catch((error) => {
          shell.echo(chalk.red.bold(error.response.data.message));
        });
    });
  } catch (err) {
    shell.echo(chalk.red(err.message));
  }
};

/**
 * @description Delete a list
 */
exports.deleteList = (list) => {
  fs.readFile(storePath, (err, data) => {
    const store = JSON.parse(data);
    shell.echo(chalk.yellow("Destroying list..."));

    try {
      if (store.token === undefined) {
        shell.echo(chalk.red("You must be logged in!"));
      }
      const headers = {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      };
      axios
        .delete(`${url}/list/${list}`, headers, {})
        .then((response) => {
          const com = chalk.white(list);
          output(chalk.green(`💣 Destroyed ${com} successfully!`));
        })
        .catch((error) => {
          output(chalk.red.bold(error.response.data.message));
        });
    } catch (err) {
      output(chalk.red(err.message));
    }
  });
};
