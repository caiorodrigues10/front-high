"use client";
import { removeCookie } from "@/utils/cookie";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "../Heading";

export function SideBarFooter({
  name,
  level,
}: {
  name: string;
  level: string;
}) {
  const { push } = useRouter();
  const logOut = () => {
    removeCookie("high.accessLevel");
    removeCookie("high.name");
    removeCookie("high.email");
    removeCookie("high.token");
    removeCookie("high.refreshToken");
    push("/login");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
            onClick={onOpen}
            className="hover:text-pink-600 duration-200 hover:scale-110 cursor-pointer active:scale-90"
          />
        </Tooltip>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-zinc-800">
          <ModalHeader className="flex flex-col gap-1">
            Sair da plataforma
          </ModalHeader>
          <ModalBody className="flex gap-4 flex-row items-end">
            <Heading className="!font-semibold" size="sm">
              Deseja mesmo sair?
            </Heading>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              radius="full"
              className="uppercase"
              onPress={() => {
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button
              radius="full"
              color="danger"
              className="uppercase"
              type="button"
              onPress={logOut}
            >
              Sair
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
