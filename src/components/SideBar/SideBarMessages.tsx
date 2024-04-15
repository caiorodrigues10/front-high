import { Avatar, Button, Chip } from "@nextui-org/react";

export default function SideBarMessages() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-[#00A35B] uppercase text-xl w-full">Mensagens</p>

      <div className="flex flex-col gap-2 p-4 border border-spring-green-700 bg-spring-green-500/30 rounded-xl relative pb-10">
        <Button
          variant="light"
          className="w-full flex justify-between text-white text-lg items-center hover:!bg-spring-green-700 py-2 !h-fit"
        >
          <span className="flex gap-4 items-center">
            <Avatar
              name="Usuário 1"
              size="sm"
              className="bg-transparent border border-spring-green-600 text-white"
            />
            Usuário 1
          </span>
          <Chip className="bg-spring-green-600 text-white">4</Chip>
        </Button>
        <Button className="button-primary absolute -bottom-5 ml-2">
          Visualizar todas mensagens
        </Button>
      </div>
    </div>
  );
}
