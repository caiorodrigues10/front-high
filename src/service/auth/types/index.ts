import { AppResponse } from "@/service/types";

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponseLogin extends AppResponse {
  data: {
    token: string;
    user: IUserLogin;
    refreshToken: string;
  };
}

export interface IUserLogin {
  name: string;
  email: string;
  tagPermission: string;
}
