const listPrompt = [
  {
    type: "input",
    name: "hits",
    message: "Hits (commands separated by commas) : ",
  },
  {
    type: "input",
    name: "description",
    message: "Description : ",
  },
  {
    type: "input",
    name: "visibility",
    message: "Public (Y/N) : ",
  },
];

const deletePrompt = [
  {
    type: "input",
    name: "confirm",
    message: "Are you sure? (Y/N) ",
  },
];

module.exports = { listPrompt, deletePrompt };
