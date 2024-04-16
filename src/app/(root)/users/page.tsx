import { BodyPage } from "@/components/BodyPage";
import { TableListUsers } from "@/components/pages/users/TableListUsers";
import { IListUserResponse } from "@/service/users/types";
import { useServer } from "@/utils/useServer";

export default async function DashboardPage() {
  const users = await useServer<IListUserResponse>({
    pathname: "users",
  });

  return (
    <BodyPage
      title="Users"
      breadcrumbs={[
        { name: "Usuários", href: "/users" },
        { name: "Cadastro de usuário", href: "/users/create" },
        { name: "Edição de usuário", href: "/users/edit" },
      ]}
    >
      <TableListUsers users={users?.data || { list: [], count: 0 }} />
    </BodyPage>
  );
}
