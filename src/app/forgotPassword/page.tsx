import BodyPage from "@/components/BodyPage";
import { FormChangePassword } from "@/components/pages/forgotPassword/FormChangePassword";
import { IVerifyTokenForgotPassword } from "@/service/users/types";
import { useServer } from "@/utils/useServer";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const validToken = await useServer<IVerifyTokenForgotPassword>({
    pathname: "confirm/validateToken/" + searchParams.token,
  });

  if (!validToken || validToken?.result !== "success") {
    return redirect("/login");
  }

  return (
    <BodyPage navBarDisable>
      <FormChangePassword token={searchParams.token || ""} />
    </BodyPage>
  );
}
