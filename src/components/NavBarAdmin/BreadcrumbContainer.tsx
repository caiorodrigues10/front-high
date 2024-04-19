"use client";
import { useSideBarContext } from "@/context/SideBarContext";
import { Chip } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { Heading } from "../Heading";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function BreadcrumbContainer({
  breadcrumbs,
  title,
}: {
  title: string;
  breadcrumbs: { name: string; href: string }[];
}) {
  const { asideIsOpen, setAsideIsOpen } = useSideBarContext();
  const { push } = useRouter();

  return (
    <motion.div
      className={clsx("flex gap-8 items-center", {
        "pl-[40px]": !asideIsOpen,
        "pl-[350px]": asideIsOpen,
      })}
      animate={{ paddingLeft: !asideIsOpen ? "40px" : "350px" }}
    >
      <Chip
        className="bg-spring-green-600 text-white px-0 [&>span]:!px-0 w-fit h-fit cursor-pointer"
        onClick={() => setAsideIsOpen((prev) => !prev)}
      >
        <ChevronRight
          className={clsx(asideIsOpen && "rotate-180 duration-200")}
        />
      </Chip>

      <div className="flex flex-col gap-1">
        <Heading>{title}</Heading>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((e, i) => (
              <Fragment key={i}>
                {i !== breadcrumbs.length - 1 && (
                  <BreadcrumbLink
                    className="cursor-pointer"
                    onClick={() => {
                      push(e.href);
                    }}
                  >
                    {e.name}
                  </BreadcrumbLink>
                )}
                {breadcrumbs.length === 1 && i === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{e.name}</BreadcrumbPage>
                ) : i === breadcrumbs.length - 1 ? (
                  <Fragment>
                    <BreadcrumbSeparator className="pl-2" />
                    <BreadcrumbPage>{e.name}</BreadcrumbPage>
                  </Fragment>
                ) : null}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </motion.div>
  );
}
