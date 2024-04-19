import { BodyPage } from "@/components/BodyPage";
import { FormCreateUser } from "@/components/pages/users/FormCreateUser";
import { IPermissions } from "@/service/users/types";
import { useServer } from "@/utils/useServer";

export default async function CreateUserPage() {
  const permissions = await useServer<IPermissions[]>({
    pathname: "permissions",
  });

  return (
    <BodyPage
      title="Usuários"
      breadcrumbs={[
        { name: "users", href: "/users" },
        { name: "create user", href: "/users/create" },
      ]}
    >
      <FormCreateUser permissions={permissions.data || []} />
    </BodyPage>
  );
}
