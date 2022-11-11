const Conf = require("conf");

const store = new Conf("hitlist");
const dataStore = store.get("lists") || [];

/**
 * @desc - Check if a particular hit exists
 */
const exists = (name: string): boolean => {
  const filtered = dataStore.filter((current: any) => current.name === name);

  return filtered?.length > 0;
};

/**
 * @desc - Find ONE hit
 */
const find = (name: string) => {
  return dataStore.find((current: any) => current.name === name);
};

/**
 * @desc - Delete ONE hit
 */
const del = (name: string) => {
  const list = dataStore.filter((current: any) => current.name !== name);
  store.set("lists", [...list]);
};

export { exists, find, del };