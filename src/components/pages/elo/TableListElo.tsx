"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { deleteElo } from "@/service/elo/client";
import { IElo } from "@/service/elo/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
import { EllipsisVertical, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Key, useCallback, useMemo, useState } from "react";

export function TableListElo({ elo }: { elo: IElo[] }) {
  const [filterValue, setFilterValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [eloId, setEloId] = useState("");
  const { toast } = useToast();
  const { push, refresh } = useRouter();

  const handleOpenModalDelete = useCallback(
    (id: string) => {
      setEloId(id);
      onOpen();
    },
    [onOpen]
  );

  const headerColumns = useMemo(
    () => [
      { name: "Name", uid: "name" },
      { name: "Posição", uid: "position" },
      { name: "Ações", uid: "actions" },
    ],
    []
  );

  const renderCell = useCallback(
    (elo: IElo, columnKey: Key) => {
      const cellValue = elo[columnKey as keyof IElo];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown
                classNames={{
                  content: "bg-zinc-800",
                }}
              >
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisVertical className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    className="hover:!bg-zinc-900 hover:!text-white"
                    onClick={() => push("/elo/" + elo.id)}
                  >
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    className="hover:!bg-zinc-900 hover:!text-white"
                    onClick={() => handleOpenModalDelete(elo.id)}
                  >
                    Deletar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue as string;
      }
    },
    [push, handleOpenModalDelete]
  );

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const submitDeleteElo = useCallback(async () => {
    setIsLoading(true);

    const response = await deleteElo(eloId);

    if (response && response.result === "success") {
      toast({
        description: response.message,
        title: "Sucesso!",
        className: "toast-success",
      });
      onClose();
      await fetch("/api/revalidate/elo");
      refresh();
    } else {
      toast({
        description: response?.message || "Tente novamente mais tarde!",
        variant: "destructive",
        title: "Erro!",
      });
    }
    setIsLoading(false);
  }, [refresh, eloId, onClose, toast]);

  return (
    <>
      <Card className="bg-[#2C2C2C] border border-[#545454] w-full">
        <CardHeader className="flex justify-between items-center px-6 pt-4 pb-0">
          <Heading>Listagem de elo</Heading>
          <div className="flex gap-4">
            <TextInput
              isClearable
              className="w-full sm:max-w-[50%]"
              placeholder="Pesquise pelo nome..."
              startContent={<Search color="white" size={16} />}
              value={filterValue}
              onClear={() => onClear()}
            />
            <Button
              className="px-6 button-primary"
              onPress={() => push("/elo/create")}
            >
              Cadastrar novo elo
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Table
            isHeaderSticky
            classNames={{
              wrapper:
                "max-h-[382px] bg-[#373737] border border-zinc-700 scrollbar-hide",
              td: "first:rounded-l-xl last:rounded-r-xl",
              tr: " mt-4 text-white hover:bg-[#3e3e3e]",
              th: "bg-[#1B1B1B] text-white",
            }}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  className={clsx({
                    "text-center": column.uid === "position",
                    "text-end": column.uid === "actions",
                  })}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"Nenhum elo encontrado"} items={elo}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell
                      className={clsx({
                        "text-center": columnKey === "position",
                      })}
                    >
                      {typeof renderCell(item, columnKey) === "object"
                        ? renderCell(item, columnKey)
                        : renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <ModalContent className="bg-zinc-800">
          <ModalHeader className="flex flex-col gap-1">Deletar elo</ModalHeader>
          <ModalBody className="flex gap-4 flex-row items-end">
            <Heading className="!font-semibold" size="sm">
              Deseja realmente deletar este elo?
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
              Não
            </Button>
            <Button
              color="danger"
              className="uppercase"
              type="button"
              radius="full"
              onPress={submitDeleteElo}
              isLoading={isLoading}
            >
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
