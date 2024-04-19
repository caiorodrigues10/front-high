import { ClientOnly } from "@/components/ClientOnly";
import { SideBar } from "@/components/SideBar";
import SideBarHeader from "@/components/SideBar/SideBarHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Divider } from "@nextui-org/react";
import clsx from "clsx";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";

export default function LayoutRoot({
  children,
}: PropsWithChildren): JSX.Element {
  const token = cookies().get("high.token");
  const accessLevel = cookies().get("high.accessLevel")?.value;
  const sidebarOpen = cookies().get("sidebarOpen")?.value;

  return (
    <main
      className={clsx(
        "scrollbar-hide flex h-screen w-screen flex-1 justify-end overflow-hidden"
      )}
    >
      {String(accessLevel) === "admin_user" && token && (
        <ClientOnly
          fallback={
            <div
              className={clsx(
                "flex flex-col justify-between p-6 !w-[350px] z-10 min-h-screen h-full bg-[#313131]",
                {
                  "fixed left-0 h-full hidden": sidebarOpen !== "true",
                  relative: sidebarOpen === "true",
                }
              )}
            >
              <div className="flex flex-col gap-4">
                <SideBarHeader />
                <Divider className="bg-[#595959]" />
                <p className="text-[#00A35B] uppercase text-xl">Menu</p>
                {[1, 2, 3, 4].map((e) => (
                  <Skeleton
                    className="w-full flex gap-4 h-10 p-2 rounded-xl px-4 py-2 bg-zinc-600"
                    key={e}
                  />
                ))}
                <Divider className="bg-[#595959]" />
                <p className="text-[#00A35B] uppercase text-xl">Mensagens</p>
                <Skeleton className="w-full h-32 rounded-xl bg-zinc-600" />
              </div>
              <Skeleton className="w-full h-24 bg-zinc-600 rounded-xl" />
            </div>
          }
        >
          <SideBar />
        </ClientOnly>
      )}
      <div className="flex min-w-[calc(100%-350px)] flex-1 justify-center pt-[100px]">
        {children}
      </div>
    </main>
  );
}
