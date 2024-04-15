import clsx from "clsx";
import Link from "next/link";

export function SideBarItem({
  icon,
  name,
  active,
  path,
}: {
  icon: JSX.Element;
  name: string;
  active: boolean;
  path: string;
}) {
  return (
    <Link
      href={path}
      className={clsx(
        "flex gap-4 w-full p-2 rounded-xl px-4 py-2 text-[#AAAAAA] ",
        {
          "border-spring-green-500 bg-spring-green-500/20 text-spring-green-600":
            active,
        }
      )}
    >
      {icon}
      <span
        className={clsx("font-medium text-lg", {
          "": active,
        })}
      >
        {name}
      </span>
    </Link>
  );
}
