import { Heading } from "@/components/Heading";
import { CardForms } from "@/components/pages/login/client/CardForms";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex w-full h-screen justify-between">
      <div className="flex w-full h-full justify-center items-center">
        <CardForms />
      </div>

      <div className="relative flex-col h-full min-w-[670px]  max-lg:hidden">
        <Image
          src="/login.svg"
          alt="Yone"
          width="700"
          height="10000"
          className="h-full absolute top-0 bottom-0"
        />
        <div className="absolute z-10 bottom-16 px-14 flex flex-col gap-14">
          <Heading className="!text-4xl !font-normal text-[#E1E1E1]">
            Seja bem-vindo ao seu painel de controle invocador!
          </Heading>
          <Heading className="!text-5xl">HIGH BOOST</Heading>
        </div>
      </div>
    </div>
  );
}
