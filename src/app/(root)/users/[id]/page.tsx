import { BodyPage } from "@/components/BodyPage";
import { FormEditUser } from "@/components/pages/users/FormEditUser";
import { IPermissions, IUser } from "@/service/users/types";
import { useServer } from "@/utils/useServer";
import { redirect } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await useServer<IUser>({
    pathname: "users/" + params.id,
  });

  if (!user || !user?.data) {
    return redirect("/users");
  }

  const permissions = await useServer<IPermissions[]>({
    pathname: "permissions",
  });

  return (
    <BodyPage
      breadcrumbs={[
        { href: "/users", name: "users" },
        { href: "/users" + params.id, name: "edit users" },
      ]}
      title="Editar usuário"
    >
      <FormEditUser permissions={permissions.data || []} user={user.data} />
    </BodyPage>
  );
}
