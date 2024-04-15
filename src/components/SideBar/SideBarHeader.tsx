import Image from "next/image";
import { Heading } from "../Heading";

export default function SideBarHeader() {
  return (
    <div className="flex w-full gap-4 items-center">
      <Image src={"/logo.svg"} alt="logo" width="50" height="50" />
      <Heading className="uppercase" size="lg">
        HIGH BOOST
      </Heading>
    </div>
  );
}
