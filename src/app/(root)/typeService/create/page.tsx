import { BodyPage } from "@/components/BodyPage";
import { FormCreateTypeService } from "@/components/pages/typeService/FormCreateTypeService";

export default async function CreateTypeServicePage() {
  return (
    <BodyPage
      title="Serviços"
      breadcrumbs={[
        { name: "list type service", href: "/typeService" },
        { name: "create type service", href: "/typeService/create" },
      ]}
    >
      <FormCreateTypeService />
    </BodyPage>
  );
}
