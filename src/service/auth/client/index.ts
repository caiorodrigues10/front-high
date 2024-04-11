import api from "@/service/api";
import { ILogin, IResponseLogin } from "../types";

async function login(data: ILogin): Promise<IResponseLogin> {
  const response = await fetch(`${api}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err.response);

  return response;
}

export { login };
