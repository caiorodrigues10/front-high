import { Avatar, Tooltip } from "@nextui-org/react";
import { LogOut } from "lucide-react";
import { Heading } from "../Heading";

export function SideBarFooter({
  name,
  level,
  logOut,
}: {
  name: string;
  level: string;
  logOut: () => void;
}) {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-4 items-center">
        <Avatar name={name} />
        <div className="flex flex-col gap-1">
          <Heading size="sm">{name}</Heading>
          <p className="text-sm">{level}</p>
        </div>
      </div>
      <Tooltip content={"Sair"} color="danger" placement="right">
        <LogOut
          size={28}
          onClick={logOut}
          className="hover:text-pink-600 duration-200 hover:scale-110 cursor-pointer active:scale-90"
        />
      </Tooltip>
    </div>
  );
}
