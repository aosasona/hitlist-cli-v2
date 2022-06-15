import axios, { AxiosInstance } from "axios";
const Conf = require("conf");

// Data sto
const store = new Conf("hitlist");

const API_URL = "https://hitlist-server.herokuapp.com/v1";

/**
 * @desc Create requests with user token
 */
const auth = (): AxiosInstance => {
  const token: string = store.get("auth.token");
  const config = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return config;
};

/**
 * @desc Create requests for unprotected routes
 */
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
