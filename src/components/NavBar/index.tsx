"use client";
import { clsx } from "clsx";
import Image from "next/image";
import { IoMdMenu } from "react-icons/io";
import { Button } from "@nextui-org/react";

export default function NavBar() {
  return (
    <nav
      className={clsx(
        "flex gap-4 w-full h-[75px] justify-between bg-easyFun-600 fixed top-0 items-center px-10"
      )}
    >
      <Image alt="" src="/logo.png" width={200} height={200} />
      <div className="flex gap-4 w-fit max-md:hidden">
        <Button variant="ghost">Ofertas</Button>
        <Button
          className="!text-white hover:!bg-white/20 !w-fit active:!bg-white/30"
          variant="ghost"
        >
          Cadastre-se
        </Button>
        <Button
          className="!text-white hover:!bg-white/20 !w-fit active:!bg-white/30"
          variant="ghost"
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
