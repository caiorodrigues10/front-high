"use client";
import { BriefcaseBusiness, LineChart, User, Wallet } from "lucide-react";
import { SideBarItem } from "./SideBarItem";

export function SideBarBody({ path }: { path: string }) {
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
          pathname={["/users", "/users/create", "/users/edit"]}
          name="Usuários"
          icon={<User />}
          path={path}
          href={"/users"}
        />
        <SideBarItem
          pathname={["/services"]}
          name="Serviços"
          icon={<BriefcaseBusiness />}
          path={path}
          href={"/services"}
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
