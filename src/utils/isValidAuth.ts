import { NextRequest } from "next/server";

interface IValidAuthResponse {
  isAuth: boolean;
  newToken: string;
}

async function isValidAuth(request: NextRequest): Promise<IValidAuthResponse> {
  const token = request.cookies.get("high.refreshToken")?.value;

  const getToken = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/refresh-token`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => err.response);

  if (!token || !getToken || getToken?.statusCode === 401) {
    return {
      isAuth: false,
      newToken: "",
    };
  }

  return {
    isAuth: true,
    newToken: getToken.token,
  };
}

export { isValidAuth };
