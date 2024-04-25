import { BodyPage } from "@/components/BodyPage";
import { TableListTypeServices } from "@/components/pages/typeService/TableListTypeServices";
import { ITypeService } from "@/service/typeService/types";
import { useServer } from "@/utils/useServer";

export default async function TypeServicePage() {
  const typeService = await useServer<ITypeService[]>({
    pathname: "typeService",
  });

  return (
    <BodyPage
      title="Tipos de serviços"
      breadcrumbs={[{ name: "list type service", href: "/typeService" }]}
    >
      <TableListTypeServices typeServices={typeService.data || []} />
    </BodyPage>
  );
}
