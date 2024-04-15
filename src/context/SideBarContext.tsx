"use client";
import { addCookie, getCookie } from "@/utils/cookie";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ISideBarContextData {
  asideIsOpen: boolean;
  setAsideIsOpen: (value: SetStateAction<boolean>) => void;
}

const SideBarContext = createContext<ISideBarContextData>(
  {} as ISideBarContextData
);

interface ISideBarProviderProps {
  children: ReactNode;
}

const SideBarProvider = ({ children }: ISideBarProviderProps) => {
  const [asideIsOpen, setAsideIsOpen] = useState(
    getCookie("sidebarOpen") === "true" ? true : false
  );

  useEffect(() => {
    setAsideIsOpen(asideIsOpen);
    addCookie({
      expirationDays: 99999,
      name: "sidebarOpen",
      value: String(asideIsOpen),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asideIsOpen]);

  return (
    <SideBarContext.Provider value={{ asideIsOpen, setAsideIsOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

const useSideBarContext = (): ISideBarContextData => {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }

  return context;
};

export { SideBarProvider, useSideBarContext };
