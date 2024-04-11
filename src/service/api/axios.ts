import axios from "axios";
import { parseCookies } from "nookies";

const getAPIClient = (ctx?: any) => {
  const { "nextauth.token": token } = parseCookies(ctx);
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API,
    // timeout: 15000,
  });

  api.defaults.validateStatus = () => {
    return true;
  };

  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }

  return api;
};

export default getAPIClient;
