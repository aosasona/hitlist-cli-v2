/* ========== UTILITIES ========== */

// Log
const log = (data: any) => {
  console.log(data);
};

export { default as request } from "./requests";
export { exists, find, del } from "./actions";
export { log };
