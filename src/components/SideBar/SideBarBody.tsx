"use client";
import {
  BriefcaseBusiness,
  LineChart,
  Swords,
  User,
  Wallet,
  Workflow,
} from "lucide-react";
import { SideBarItem } from "./SideBarItem";

export function SideBarBody({ path }: { path: string }) {
  const routeWithID = (name: string) => {
    const id = path.split("/")[2];

    return id ? `${name}/${id}` : name;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-[#00A35B] uppercase text-xl">Menu</p>
      <div className="flex flex-col gap-4">
        <SideBarItem
          pathname={["/dashboard"]}
          name="Dashboard"
          icon={<LineChart />}
          path={path}
          href={"/dashboard"}
        />
        <SideBarItem
          pathname={["/users", "/users/create", routeWithID("/users")]}
          name="Usuários"
          icon={<User />}
          path={path}
          href={"/users"}
        />
        <SideBarItem
          pathname={["/service", "/service/create", routeWithID("/service")]}
          name="Serviços"
          icon={<BriefcaseBusiness />}
          path={path}
          href={"/service"}
        />
        <SideBarItem
          pathname={["/elo", "/elo/create", routeWithID("/elo")]}
          name="Elo"
          icon={<Swords />}
          path={path}
          href={"/elo"}
        />
        <SideBarItem
          pathname={["/billing"]}
          name="Faturamento"
          icon={<Wallet />}
          path={path}
          href={"/billing"}
        />
      </div>
    </div>
  );
}
