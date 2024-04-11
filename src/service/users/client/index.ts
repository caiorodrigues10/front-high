import api from "@/service/api";
import { AppResponse } from "@/service/types";
import { ICreateUser, ISendEmailForgotPassword } from "../types";

async function forgotPassword(
  data: ISendEmailForgotPassword
): Promise<AppResponse> {
  const response = await fetch(`${api}/confirm/recoveryPassword`, {
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

async function createUser(data: ICreateUser): Promise<AppResponse> {
  const response = await fetch(`${api}/users`, {
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

async function confirmCode(data: {
  code: number;
  email: string;
}): Promise<AppResponse> {
  const response = await fetch(`${api}/confirm/code`, {
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

async function resendCode(data: { email: string }): Promise<AppResponse> {
  const response = await fetch(`${api}/confirm/resendCode`, {
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

async function changePassword(data: {
  password: string;
  confirmPass: string;
  token: string;
}): Promise<AppResponse> {
  const response = await fetch(`${api}/confirm/changePassword`, {
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

export { forgotPassword, createUser, confirmCode, resendCode, changePassword };