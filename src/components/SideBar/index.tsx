"use client";
import { useSideBarContext } from "@/context/SideBarContext";
import { Divider } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SideBarBody } from "./SideBarBody";
import { SideBarFooter } from "./SideBarFooter";
import SideBarHeader from "./SideBarHeader";
import SideBarMessages from "./SideBarMessages";

export function SideBar() {
  const { asideIsOpen } = useSideBarContext();
  const path = usePathname();

  return (
    <motion.div
      className={clsx(
        "flex flex-col justify-between p-6 !w-[350px] z-10 min-h-screen h-full bg-[#313131]",
        {
          "fixed left-0 h-full border-transparent": !asideIsOpen,
          relative: asideIsOpen && asideIsOpen,
        }
      )}
      initial={{ x: asideIsOpen ? 0 : -350 }}
      animate={{ x: asideIsOpen ? 0 : -350 }}
      transition={{ type: "tween" }}
    >
      <div className="flex flex-col gap-4">
        <SideBarHeader />
        <Divider className="bg-[#595959]" />
        <SideBarBody path={path} />
        <Divider className="bg-[#595959]" />
        <SideBarMessages />
      </div>
      <SideBarFooter level="Admin" name="Administrador" logOut={() => {}} />
    </motion.div>
  );
}
