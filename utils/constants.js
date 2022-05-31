const path = require("path");
const fs = require("fs");

/**
 * @description API URL
 */
const url = "https://hitlist-server.herokuapp.com/v1/";

/**
 * @description Read authorization data store
 */
const readAuth = fs.readFileSync(
  path.join(__dirname, "..", "stores", "auth.json"),
  "utf8"
);
const authStore = JSON?.parse(readAuth);

/**
 * @description Read authorization data store
 */
const readData = fs.readFileSync(
  path.join(__dirname, "..", "stores", "data.json"),
  "utf8"
);
const dataStore = JSON?.parse(readData);

/**
 * @description Find a particular list
 * @param {*} name
 * @returns {boolean}
 */
const checkHit = (name) => {
  const filtered = dataStore?.filter((hit) => {
    if (hit.name === name) {
      return hit;
    }
  });

  if (filtered.length === 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * @description Find and return ONE hit
 * @param {*} name
 * @returns {object}
 */
const fetchHit = (name) => {
  const filtered = dataStore?.filter((hit) => {
    if (hit.name === name) {
      return hit;
    }
  });

  return filtered[0];
};

/**
 * @description Delete a local list
 * @param {*} name
 * @returns {object}
 */
const deleteHit = (name) => {
  const filtered = dataStore?.filter((hit) => {
    if (hit.name !== name) {
      return hit;
    }
  });
  return filtered;
};

module.exports = { url, authStore, dataStore, checkHit, fetchHit, deleteHit };
