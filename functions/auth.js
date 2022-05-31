const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const output = require("./output");
const shell = require("shelljs");

//API URL
const url = require("../utils/constants").url;

//Local data stores
const authStore = require("../utils/constants").authStore;
const dataStore = require("../utils/constants").dataStore;

//Store paths
const authPath = require("../utils/paths").authPath;
const dataPath = require("../utils/paths").dataPath;

/**
 * @description Login to an account
 * @param {*} credential
 * @param {*} password
 */
exports.login = (credential, password) => {
  const body = {
    credential: credential,
    password: password,
  };
  output(chalk.italic.yellow("Attempting to sign you in..."));
  axios
    .post(`${url}/auth/login`, body)
    .then((res) => {
      fs.writeFileSync(authPath, JSON.stringify(res.data));
      const user = chalk.underline.green(res.data.username);
      output(
        `--------------------------------------------------------------------------------\nLogged in as ${user} - Welcome back!\n--------------------------------------------------------------------------------`
      );
      return;
    })
    .catch((err) => {
      output(
        chalk.bold.red(
          "--------------------------------------------------------------------------------\nFailed to sign you in - " +
            err.response.data.message +
            "\n--------------------------------------------------------------------------------"
        )
      );
      return;
    });
};

/**
 * @description Create a new account
 * @param {*} username
 * @param {*} email
 * @param {*} password
 * @param {*} confirmPassword
 */
exports.signup = (username, email, password, confirmPassword) => {
  const body = {
    email: email,
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  };

  axios
    .post(`${url}/auth/create`, body)
    .then((res) => {
      const message = chalk.yellow(res.data.message);
      output(`${message} - Please login using your credentials now`);
      return;
    })
    .catch((err) => {
      output(
        chalk.red(
          "Failed to create your account - " + err.response.data.message
        )
      );
      return;
    });
};

/**
 * @description Logout the current user
 */
exports.logout = () => {
  try {
    fs.writeFileSync(authPath, JSON.stringify({}));
    fs.writeFileSync(dataPath, JSON.stringify([]));
    output(
      chalk.yellow(
        "--------------------------------------------------------------------------------\nSuccessfully signed out! - But why would you leave? :( \n--------------------------------------------------------------------------------"
      )
    );
  } catch (error) {
    output(chalk.red("Unable to logout"));
  }
};

/**
 * @description Show the current logged in user
 */
exports.show = () => {
  if (authStore.username) {
    const user = chalk.underline.green(authStore.username);
    output(
      `--------------------------------------------------------------------------------\nCurrently logged in as ${user}\n--------------------------------------------------------------------------------`
    );
  } else {
    output(chalk.red("No user is logged in!"));
  }
};
