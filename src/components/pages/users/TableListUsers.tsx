"use client";
import { Heading } from "@/components/Heading";
import { PaginationTable } from "@/components/PaginationTable";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import {
  PaginationTableProvider,
  usePaginationTableContext,
} from "@/context/PaginationTableContext";
import { inactiveUser, reactiveUser } from "@/service/users/client";
import { IListUserResponse, IUser } from "@/service/users/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
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
  User,
} from "@nextui-org/react";
import clsx from "clsx";
import { EllipsisVertical, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Key, useCallback, useMemo, useState } from "react";

export function TableListUsers({ users }: { users: IListUserResponse }) {
  const [filterValue, setFilterValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [isReactiveUser, setIsReactiveUser] = useState(false);
  const { toast } = useToast();
  const { push, refresh } = useRouter();
  const { page, setPage, rowsPerPage } = usePaginationTableContext();

  const handleOpenModal = useCallback(
    (id: string) => {
      setUserId(id);
      onOpen();
      setIsReactiveUser(false);
    },
    [onOpen]
  );

  const handleOpenModalReactive = useCallback(
    (id: string) => {
      setUserId(id);
      onOpen();
      setIsReactiveUser(true);
    },
    [onOpen]
  );

  const headerColumns = useMemo(
    () => [
      { name: "Nome", uid: "name" },
      { name: "Permissão", uid: "role" },
      { name: "Data de criação", uid: "createdAt" },
      { name: "Status", uid: "status" },
      { name: "Ações", uid: "actions" },
    ],
    []
  );

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.list.slice(start, end);
  }, [page, users, rowsPerPage]);

  const renderCell = useCallback(
    (user: IUser, columnKey: Key) => {
      const cellValue = user[columnKey as keyof IUser];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: "" }}
              description={user.email}
              name={user.name}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {user.userpermissions.description}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.userpermissions.tagPermission}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={user.active ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {user.active ? "Ativo" : "Inativo"}
            </Chip>
          );
        case "createdAt":
          return (
            new Date(user.createdAt)?.toLocaleDateString() +
            " - " +
            new Date(user.createdAt)?.toLocaleTimeString()
          );
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
                    className={clsx("hover:!bg-zinc-900 hover:!text-white", {
                      "text-zinc-400 hover:!bg-zinc-800 hover:!text-zinc-400 cursor-not-allowed":
                        !user.active,
                    })}
                    onClick={() => user.active && push("/users/" + user.id)}
                  >
                    Editar
                  </DropdownItem>
                  {user.active ? (
                    <DropdownItem
                      className="hover:!bg-zinc-900 hover:!text-white"
                      onClick={() => handleOpenModal(user.id)}
                    >
                      Inativar
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      className="hover:!bg-zinc-900 hover:!text-white"
                      onClick={() => handleOpenModalReactive(user.id)}
                    >
                      Reativar
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue as string;
      }
    },
    [handleOpenModal, handleOpenModalReactive, push]
  );

  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    [setPage]
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, [setPage]);

  const bottomContent = useMemo(() => {
    return (
      <PaginationTableProvider>
        <PaginationTable count={users.count} />
      </PaginationTableProvider>
    );
  }, [users]);

  const submitInactiveUser = useCallback(async () => {
    setIsLoading(true);

    const response = await inactiveUser(userId);

    if (response && response.result === "success") {
      toast({
        description: response.message,
        title: "Sucesso!",
        className: "toast-success",
      });
      onClose();
      await fetch("/api/revalidate/users");
      refresh();
    } else {
      toast({
        description: response?.message || "Tente novamente mais tarde!",
        variant: "destructive",
        title: "Erro!",
      });
    }
    setIsLoading(false);
  }, [userId, refresh, onClose, toast]);

  const submitReactiveUser = useCallback(async () => {
    setIsLoading(true);
    const response = await reactiveUser(userId);

    if (response && response.result === "success") {
      toast({
        description: response.message,
        title: "Sucesso!",
        className: "toast-success",
      });
      onClose();
      await fetch("/api/revalidate/users");
      refresh();
    } else {
      toast({
        description: response?.message || "Tente novamente mais tarde!",
        variant: "destructive",
        title: "Erro!",
      });
    }
    setIsLoading(false);
  }, [userId, refresh, onClose, toast]);

  return (
    <>
      <Card className="bg-[#2C2C2C] border border-[#545454] w-full">
        <CardHeader className="flex justify-between items-center px-6 pt-4 pb-0">
          <Heading>Listagem de usuários</Heading>
          <div className="flex gap-4">
            <TextInput
              isClearable
              className="w-full sm:max-w-[50%]"
              placeholder="Pesquise pelo nome..."
              startContent={<Search color="white" size={16} />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <Button
              className="px-6 button-primary"
              onPress={() => push("/users/create")}
            >
              Cadastrar novo usuário
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
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
                    "text-center": column.uid === "status",
                    "text-end": column.uid === "actions",
                  })}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              emptyContent={"Nenhum usuário encontrado"}
              items={users.list}
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
            {isReactiveUser ? "Reativar usuário" : "Inativar usuário"}
          </ModalHeader>
          <ModalBody className="flex gap-4 flex-row items-end">
            {isReactiveUser ? (
              <Heading className="!font-semibold" size="sm">
                Deseja realmente reativar este usuário?
              </Heading>
            ) : (
              <Heading className="!font-semibold" size="sm">
                Deseja realmente inativar este usuário?
              </Heading>
            )}
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
              color={!isReactiveUser ? "danger" : "default"}
              className={clsx("uppercase", {
                "button-primary": isReactiveUser,
              })}
              type="button"
              radius="full"
              onPress={() => {
                isReactiveUser ? submitReactiveUser() : submitInactiveUser();
              }}
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
