import { BodyPage } from "@/components/BodyPage";
import { FormCreateElo } from "@/components/pages/elo/FormCreateElo";

export default async function CreateEloPage() {
  return (
    <BodyPage
      title="Elo"
      breadcrumbs={[
        { name: "list elo", href: "/elo" },
        { name: "create elo", href: "/elo/create" },
      ]}
    >
      <FormCreateElo />
    </BodyPage>
  );
}
