import { BriefcaseBusiness, LineChart, User, Wallet } from "lucide-react";
import { SideBarItem } from "./SideBarItem";

export function SideBarBody({ path }: { path: string }) {
  console.log(path);

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-[#00A35B] uppercase text-xl">Menu</p>
      <div className="flex flex-col gap-4">
        <SideBarItem
          active={path === "/dashboard"}
          name="Dashboard"
          icon={<LineChart />}
          path={"dashboard"}
        />
        <SideBarItem
          active={path === "/users"}
          name="Usuários"
          icon={<User />}
          path={"users"}
        />
        <SideBarItem
          active={path === "/services"}
          name="Serviços"
          icon={<BriefcaseBusiness />}
          path={"services"}
        />
        <SideBarItem
          active={path === "/billing"}
          name="Faturamento"
          icon={<Wallet />}
          path={"billing"}
        />
      </div>
    </div>
  );
}
