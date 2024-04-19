import clsx from "clsx";
import Link from "next/link";

export function SideBarItem({
  icon,
  name,
  pathname,
  path,
  href,
}: {
  icon: JSX.Element;
  name: string;
  pathname: string[];
  path: string;
  href: string;
}) {
  const compareToCurrentPage = (subtitle?: string) => {
    const path = subtitle;

    return path ? pathname.includes(path) : false;
  };

  return (
    <Link
      href={href}
      className={clsx(
        "flex gap-4 w-full p-2 rounded-xl px-4 py-2 text-[#AAAAAA] ",
        {
          "border-spring-green-500 bg-spring-green-500/20 text-spring-green-600":
            compareToCurrentPage(path),
        }
      )}
    >
      {icon}
      <span
        className={clsx("font-medium text-lg", {
          "": compareToCurrentPage(path),
        })}
      >
        {name}
      </span>
    </Link>
  );
}
