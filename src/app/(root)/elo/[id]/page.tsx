import { BodyPage } from "@/components/BodyPage";
import { FormEditElo } from "@/components/pages/elo/FormEditElo";
import { IElo } from "@/service/elo/types";
import { useServer } from "@/utils/useServer";
import { redirect } from "next/navigation";

export default async function EditEloPage({
  params,
}: {
  params: { id: string };
}) {
  const elo = await useServer<IElo>({
    pathname: "elo/" + params.id,
  });

  if (!elo.data) {
    return redirect("/elo");
  }

  return (
    <BodyPage
      title="Elo"
      breadcrumbs={[
        { name: "list elo", href: "/elo" },
        { name: "edit elo", href: "/elo/" + params.id },
      ]}
    >
      <FormEditElo elo={elo.data} />
    </BodyPage>
  );
}
