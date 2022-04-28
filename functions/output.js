const shell = require("shelljs");

const output = (text) => {
  shell.echo(text);
};

module.exports = output;
