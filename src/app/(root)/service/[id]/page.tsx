import { BodyPage } from "@/components/BodyPage";
import { FormEditService } from "@/components/pages/service/FormEditService";
import { IElo } from "@/service/elo/types";
import { IService } from "@/service/services/types";
import { useServer } from "@/utils/useServer";
import { redirect } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await useServer<IService>({
    pathname: "service/" + params.id,
  });

  const elo = await useServer<IElo[]>({
    pathname: "elo",
  });

  if (!service.data) {
    return redirect("/service");
  }

  return (
    <BodyPage
      title="Serviços"
      breadcrumbs={[
        { name: "list service", href: "/service" },
        { name: "create service", href: "/service/create" },
      ]}
    >
      <FormEditService elo={elo?.data || []} service={service.data} />
    </BodyPage>
  );
}
