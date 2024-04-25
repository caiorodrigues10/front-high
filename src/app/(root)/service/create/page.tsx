import { BodyPage } from "@/components/BodyPage";
import { FormCreateService } from "@/components/pages/service/FormCreateService";
import { IElo } from "@/service/elo/types";
import { ITypeService } from "@/service/typeService/types";
import { useServer } from "@/utils/useServer";

export default async function CreateServicePage() {
  const elo = await useServer<IElo[]>({
    pathname: "elo",
  });

  const typeService = await useServer<ITypeService[]>({
    pathname: "typeService",
  });

  return (
    <BodyPage
      title="Serviços"
      breadcrumbs={[
        { name: "list service", href: "/service" },
        { name: "create service", href: "/service/create" },
      ]}
    >
      <FormCreateService
        elo={elo?.data || []}
        typeService={typeService.data || []}
      />
    </BodyPage>
  );
}
