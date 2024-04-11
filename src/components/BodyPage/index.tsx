import { clsx } from "clsx";
import NavBar from "../navBar";
import type { BodyPageProps } from "./types";

export default function BodyPage({
  className,
  children,
  navBarDisable = false,
}: BodyPageProps): JSX.Element {
  return (
    <main
      className={clsx(
        "flex w-full h-full justify-center items-center min-w-screen min-h-screen",
        className
      )}
    >
      {!navBarDisable && <NavBar />}
      <div
        className={clsx("flex w-full max-w-7xl h-full px-6 justify-center ", {
          "pt-[124px]": !navBarDisable,
        })}
      >
        {children}
      </div>
    </main>
  );
}
