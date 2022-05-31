const path = require("path");

/**
 * @description Get authorization data store path
 */

const authPath = path.join(__dirname, "..", "stores", "auth.json");

/**
 * @description Get hits data store path
 */

const dataPath = path.join(__dirname, "..", "stores", "data.json");

module.exports = { authPath, dataPath };
