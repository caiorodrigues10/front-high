"use client";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/system";
import { TimerProvider } from "@/context/TimerContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <Toaster />
      {children}
    </NextUIProvider>
  );
}
