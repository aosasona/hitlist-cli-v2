import axios, {AxiosInstance} from "axios";

const Conf = require("conf");

// Data sto
const store = new Conf("hitlist");

const API_URL = "https://hitlist-api-v1.cr.thio.cloud/v1";

const auth = (): AxiosInstance => {
  const token: string = store.get("auth.token");
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

const noauth = (): AxiosInstance => {
  return axios.create({
    baseURL: API_URL,
  });
};

/**
 * @desc Request object
 */
const requests = {
  auth,
  noauth,
};

export default requests;