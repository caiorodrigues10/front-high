import { NextResponse } from "next/server";

function removeServerCookie(response: NextResponse) {
  response.cookies.delete("high.token");
  response.cookies.delete("high.name");
  response.cookies.delete("high.email");
  response.cookies.delete("high.accessLevel");
  response.cookies.delete("high.refreshToken");
}

export { removeServerCookie };
