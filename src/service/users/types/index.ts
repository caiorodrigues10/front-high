interface ISendEmailForgotPassword {
  email: string;
}
interface ICreateUser {
  email: string;
  name: string;
  password: string;
  confirmPass: string;
}

interface IVerifyTokenForgotPassword {
  token: string;
}

interface IUser {
  email: string;
  id: string;
  name: string;
  active: false;
  createdAt: string;
  userpermissions: {
    description: string;
    id: string;
    tagPermission: string;
  };
}

interface IListUserResponse {
  list: IUser[];
  count: number;
}

export type {
  ISendEmailForgotPassword,
  ICreateUser,
  IUser,
  IListUserResponse,
  IVerifyTokenForgotPassword,
};
