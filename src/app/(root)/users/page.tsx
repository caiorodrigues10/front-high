import { BodyPage } from "@/components/BodyPage";
import { TableListUsers } from "@/components/pages/users/TableListUsers";
import { IListUserResponse } from "@/service/users/types";
import { useServer } from "@/utils/useServer";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number };
}) {
  const users = await useServer<IListUserResponse>({
    pathname: "users",
    query: [
      { name: "page", value: searchParams?.page || 0 },
      { name: "limit", value: searchParams?.limit || 15 },
    ],
  });

  return (
    <BodyPage
      title="Usuários"
      breadcrumbs={[{ name: "users", href: "/users" }]}
    >
      <TableListUsers users={users?.data || { list: [], count: 0 }} />
    </BodyPage>
  );
}
