import { BodyPage } from "@/components/BodyPage";
import { FormEditTypeService } from "@/components/pages/typeService/FormEditTypeService";
import { ITypeService } from "@/service/typeService/types";
import { useServer } from "@/utils/useServer";
import { redirect } from "next/navigation";

export default async function EditTypeServicePage({
  params,
}: {
  params: { id: string };
}) {
  const typeService = await useServer<ITypeService>({
    pathname: "typeService/" + params.id,
  });

  if (!typeService.data) {
    return redirect("/typeService");
  }

  return (
    <BodyPage
      title="Tipos de serviços"
      breadcrumbs={[
        { name: "list type service", href: "/typeService" },
        { name: "edit type service", href: "/typeService/" + params.id },
      ]}
    >
      <FormEditTypeService typeService={typeService.data} />
    </BodyPage>
  );
}
