import { d as derived, w as writable } from "./index.js";
const BASE_API_URL = "http://localhost/api/";
const API_VERSION = "v1";
const UNAUTHORIZED_TOKEN = "unauthorized";
const initialToken = UNAUTHORIZED_TOKEN;
const token = writable(initialToken);
derived(
  token,
  ($token) => $token === UNAUTHORIZED_TOKEN ? false : true
);
export {
  API_VERSION as A,
  BASE_API_URL as B,
  UNAUTHORIZED_TOKEN as U,
  token as t
};
