import clsx from "clsx";

import { HeadingProps } from "./types";

export function Heading({
  children,
  as = "h2",
  size = "md",
  className,
}: HeadingProps) {
  const Comp = as;

  return (
    <Comp
      className={clsx(
        "font-bold text-white",
        {
          "text-lg leading-5": size === "sm",
          "text-xl leading-6": size === "md",
          "text-2xl leading-7": size === "lg",
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
