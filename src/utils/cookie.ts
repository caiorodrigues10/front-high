import Cookies from "js-cookie";

export const addCookie = ({
  expirationDays,
  name,
  value,
}: {
  name: string;
  value: string;
  expirationDays: number;
}) => {
  Cookies.set(name, value, { expires: expirationDays });
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const clearCookies = () => {
  const cookies = Cookies.get();
  for (const cookie in cookies) {
    Cookies.remove(cookie);
  }
};
