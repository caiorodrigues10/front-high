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

export type {
  ISendEmailForgotPassword,
  ICreateUser,
  IVerifyTokenForgotPassword,
};
