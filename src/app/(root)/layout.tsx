import { ClientOnly } from "@/components/ClientOnly";
import NavBar from "@/components/NavBar";
import NavBarAdmin from "@/components/NavBarAdmin";
import { SideBar } from "@/components/SideBar";
import clsx from "clsx";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";

export default function LayoutRoot({
  children,
}: PropsWithChildren): JSX.Element {
  const token = cookies().get("high.token");
  const accessLevel = cookies().get("high.accessLevel")?.value;

  return (
    <main
      className={clsx(
        "scrollbar-hide flex h-screen w-screen flex-1 justify-end overflow-hidden"
      )}
    >
      {String(accessLevel) === "admin_user" && token && (
        <ClientOnly>
          <SideBar />
        </ClientOnly>
      )}
      <div className="flex min-w-[calc(100%-350px)] flex-1 justify-center pt-[100px]">
        {children}
      </div>
    </main>
  );
}
