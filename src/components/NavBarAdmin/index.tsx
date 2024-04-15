"use client";
import { useSideBarContext } from "@/context/SideBarContext";
import { BreadcrumbItem, Button, Chip } from "@nextui-org/react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Bell, ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { Heading } from "../Heading";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function NavBarAdmin({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: { name: string; href: string }[];
}) {
  const { asideIsOpen, setAsideIsOpen } = useSideBarContext();

  return (
    <motion.nav
      className={clsx(
        "flex gap-4 w-full h-[90px] justify-between bg-[#262626] fixed top-0 left-0 items-center px-10 "
      )}
      animate={{ paddingLeft: !asideIsOpen ? "40px" : "380px" }}
      transition={{ type: "tween" }}
    >
      <div className="flex gap-8 items-center">
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
              {breadcrumbs.length < 1 &&
                breadcrumbs.map((e, i) => (
                  <Fragment key={i}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={e.href}>{e.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
              {breadcrumbs.length > 0 && (
                <Fragment>
                  {breadcrumbs.length > 1 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {breadcrumbs[breadcrumbs.length - 1].name}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </Fragment>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Button
        variant="light"
        radius="full"
        className="!px-0 min-w-10 hover:!bg-spring-green-900 text-white"
      >
        <Bell />
      </Button>
    </motion.nav>
  );
}
