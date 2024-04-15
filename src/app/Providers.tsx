"use client";
import { Toaster } from "@/components/ui/toaster";
import { SideBarProvider } from "@/context/SideBarContext";
import { NextUIProvider } from "@nextui-org/system";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <SideBarProvider>
        <Toaster />
        {children}
      </SideBarProvider>
    </NextUIProvider>
  );
}
