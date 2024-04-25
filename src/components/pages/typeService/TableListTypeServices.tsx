"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { deleteTypeService } from "@/service/typeService/client";
import { ITypeService } from "@/service/typeService/types";
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

export function TableListTypeServices({
  typeServices,
}: {
  typeServices: ITypeService[];
}) {
  const [filterValue, setFilterValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [typeServiceId, setTypeServiceId] = useState("");
  const { toast } = useToast();
  const { push, refresh } = useRouter();

  const handleOpenModalDelete = useCallback(
    (id: string) => {
      setTypeServiceId(id);
      onOpen();
    },
    [onOpen]
  );

  const headerColumns = useMemo(
    () => [
      { name: "Name", uid: "name" },
      { name: "Ações", uid: "actions" },
    ],
    []
  );

  const renderCell = useCallback(
    (service: ITypeService, columnKey: Key) => {
      const cellValue = service[columnKey as keyof ITypeService];

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
                    onClick={() => push("/typeService/" + service.id)}
                  >
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    className="hover:!bg-zinc-900 hover:!text-white"
                    onClick={() => handleOpenModalDelete(service.id)}
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

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const submitDeleteTypeService = useCallback(async () => {
    setIsLoading(true);

    const response = await deleteTypeService(typeServiceId);

    if (response && response.result === "success") {
      toast({
        description: response.message,
        title: "Sucesso!",
        className: "toast-success",
      });
      onClose();
      await fetch("/api/revalidate/typeService");
      refresh();
    } else {
      toast({
        description: response?.message || "Tente novamente mais tarde!",
        variant: "destructive",
        title: "Erro!",
      });
    }
    setIsLoading(false);
  }, [refresh, typeServiceId, onClose, toast]);

  return (
    <>
      <Card className="bg-[#2C2C2C] border border-[#545454] w-full">
        <CardHeader className="flex justify-between items-center px-6 pt-4 pb-0">
          <Heading>Listagem de tipo de serviço</Heading>
          <div className="flex gap-4">
            <TextInput
              isClearable
              className="w-full sm:max-w-[45%]"
              placeholder="Pesquise pelo nome..."
              startContent={<Search color="white" size={16} />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <Button
              className="px-6 button-primary"
              onPress={() => push("/typeService/create")}
            >
              Cadastrar novo tipo de serviço
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
                    "text-center": column.uid === "rangeValues",
                    "text-end": column.uid === "actions",
                  })}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              emptyContent={"Nenhum tipo serviço encontrado"}
              items={typeServices}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell
                      className={clsx({
                        "text-center": columnKey === "status",
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
          <ModalHeader className="flex flex-col gap-1">
            Deletar tipo serviço
          </ModalHeader>
          <ModalBody className="flex gap-4 flex-row items-end">
            <Heading className="!font-semibold" size="sm">
              Deseja realmente deletar este tipo de serviço?
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
              onPress={submitDeleteTypeService}
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