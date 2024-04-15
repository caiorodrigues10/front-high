import { BodyPage } from "@/components/BodyPage";
import { BodyDashboard } from "@/components/pages/dashboard/BodyDashboard";

export default function DashboardPage() {
  return (
    <BodyPage
      title="Dashboard"
      breadcrumbs={[{ name: "Dashboard", href: "/dashboard" }]}
    >
      <BodyDashboard />
    </BodyPage>
  );
}
