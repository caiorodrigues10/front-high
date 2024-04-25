import { BodyPage } from "@/components/BodyPage";
import { TableListElo } from "@/components/pages/elo/TableListElo";
import { IElo } from "@/service/elo/types";
import { useServer } from "@/utils/useServer";

export default async function TypeServicePage() {
  const elo = await useServer<IElo[]>({
    pathname: "elo",
  });

  return (
    <BodyPage title="Elo" breadcrumbs={[{ name: "list elo", href: "/elo" }]}>
      <TableListElo elo={elo.data || []} />
    </BodyPage>
  );
}
