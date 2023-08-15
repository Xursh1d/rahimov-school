import axios from "axios";
import { isJwtExpired } from "jwt-check-expiration";
import { BASE_API_URL } from "./constant";
import { RedirectLogin } from "./redirectToLogin";

export const axiosAuthInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

const setAuthHeader = (config, token) => {
  config.headers["Authorization"] = "Bearer " + token.access_token;
  config.headers["Content-Type"] = "application/json";
  return config;
};

axiosAuthInstance.interceptors.request.use(
  async (config) => {
    const tokenString = localStorage.getItem("user");
    if (!tokenString) {
      return config;
    }
    const token = JSON.parse(tokenString);
    const checkToken = isJwtExpired(token.access_token);
    if (checkToken) {
      RedirectLogin();
      throw new Error("Access token expired");
    }
    config = setAuthHeader(config, token);
    return config;
  },
  (error) => Promise.reject(error)
);
