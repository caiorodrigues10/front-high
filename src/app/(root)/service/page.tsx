import { BodyPage } from "@/components/BodyPage";
import { TableListServices } from "@/components/pages/service/TableListServices";
import { IService } from "@/service/services/types";
import { useServer } from "@/utils/useServer";

export default async function ServicePage() {
  const service = await useServer<IService[]>({
    pathname: "service",
  });

  return (
    <BodyPage
      title="Serviços"
      breadcrumbs={[{ name: "list service", href: "/service" }]}
    >
      <TableListServices services={service?.data || []} />
    </BodyPage>
  );
}
