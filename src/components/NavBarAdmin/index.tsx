import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { Bell } from "lucide-react";
import { cookies } from "next/headers";
import { ClientOnly } from "../ClientOnly";
import { Heading } from "../Heading";
import { Skeleton } from "../ui/skeleton";
import { BreadcrumbContainer } from "./BreadcrumbContainer";

export function NavBarAdmin({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: { name: string; href: string }[];
}) {
  const isOpen = cookies().get("sidebarOpen")?.value;

  return (
    <nav className="flex gap-4 w-full h-[90px] justify-between bg-[#262626] fixed top-0 left-0 items-center px-10">
      <ClientOnly
        fallback={
          <div
            className={clsx("flex gap-8 items-center", {
              "pl-[40px]": isOpen === "false",
              "pl-[350px]": isOpen === "true",
            })}
          >
            <Skeleton className="w-6 h-6 rounded-full bg-zinc-600" />

            <div className="flex flex-col gap-1">
              <Heading>{title}</Heading>
              <div className="flex gap-4 pt-1">
                {breadcrumbs.map((e) => (
                  <Skeleton className="w-20 h-4 bg-zinc-600" key={e.name} />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <BreadcrumbContainer breadcrumbs={breadcrumbs} title={title} />
      </ClientOnly>

      <Button
        variant="light"
        radius="full"
        className="!px-0 min-w-10 hover:!bg-spring-green-900 text-white"
      >
        <Bell />
      </Button>
    </nav>
  );
}
