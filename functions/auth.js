const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const output = require("./output");
const shell = require("shelljs");

//LOCAL
const url = require("../configs/url");
const storePath = path.join(__dirname, "../", "store", "data.json");

exports.login = (credential, password) => {
  const body = {
    credential: credential,
    password: password,
  };

  axios
    .post(`${url}/auth/login`, body)
    .then((res) => {
      fs.writeFile(storePath, JSON.stringify(res.data), (err, data) => {
        // shell.echo(`Logged in as ${res.data.email}`);
        const user = chalk.yellow(res.data.username);
        output(`Logged in as ${user}`);
      });
    })
    .catch((err) => {
      output(chalk.red("Failed to sign you in - " + err.response.data.message));
    });
};

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
      output(message);
    })
    .catch((err) => {
      output(
        chalk.red(
          "Failed to create your account - " + err.response.data.message
        )
      );
    });
};

exports.logout = () => {
  fs.writeFile(storePath, JSON.stringify({}), (err, data) => {
    output(chalk.red("Logged out successfully!"));
  });
};

exports.show = () => {
  fs.readFile(storePath, (err, data) => {
    const store = JSON.parse(data);
    if (store.username !== undefined) {
      const user = chalk.green.bold(store.username);
      output(`Currently logged in as ${user}`);
    } else {
      output("No user is logged in!");
    }
  });
};
