import clsx from "clsx";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { ClientOnly } from "./ClientOnly";
import NavBar from "./NavBar";
import { NavBarAdmin } from "./NavBarAdmin";
import { Skeleton } from "./ui/skeleton";

interface BodyPageProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  breadcrumbs: { name: string; href: string }[];
  className?: string;
}

export function BodyPage({
  children,
  breadcrumbs,
  title,
  className,
}: BodyPageProps) {
  const accessLevel = cookies().get("high.accessLevel")?.value;

  return (
    <div className="scrollbar-hide relative flex w-full flex-1 flex-col items-center overflow-hidden">
      {String(accessLevel) === "common_user" && <NavBar />}
      {String(accessLevel) === "admin_user" && (
        <NavBarAdmin breadcrumbs={breadcrumbs} title={title} />
      )}

      <main
        className={clsx(
          "scrollbar-hide flex h-full w-full flex-col items-center overflow-y-auto",
          className
        )}
      >
        <div className="flex w-full justify-center p-4 px-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
