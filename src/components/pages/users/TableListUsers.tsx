"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
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
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { EllipsisVertical, Search } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

export function TableListUsers({ users }: { users: IListUserResponse }) {
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headerColumns = useMemo(
    () => [
      { name: "Nome", uid: "name" },
      { name: "Email", uid: "email" },
      { name: "Permissão", uid: "role" },
      { name: "Status", uid: "status" },
      { name: "Ações", uid: "actions" },
    ],
    []
  );

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const pages = Math.ceil(users.list.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.list.slice(start, end);
  }, [page, users, rowsPerPage]);

  const renderCell = useCallback((user: IUser, columnKey: React.Key) => {
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
                <DropdownItem className="hover:!bg-zinc-900 hover:!text-white">
                  Editar
                </DropdownItem>
                <DropdownItem className="hover:!bg-zinc-900 hover:!text-white">
                  Inativar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue as string;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-4">
        <label className="flex items-center text-default-400 text-small">
          Items por página:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="15">15</option>
            <option value="25">20</option>
            <option value="50">50</option>
          </select>
        </label>
        <span className="text-default-400 text-small">
          Total {users.count} de usuários
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          className="flex justify-end"
          classNames={{
            item: "bg-zinc-800 text-zinc-300 [&[data-hover=true]:not([data-active=true])]:bg-zinc-900 active:!bg-zinc-900",
            cursor: "text-white",
            prev: "bg-zinc-800 text-white data-[disabled=true]:text-zinc-400 [&[data-hover=true]:not([data-active=true])]:bg-zinc-900 active:!bg-zinc-900",
            next: "bg-zinc-800 text-white data-[disabled=true]:text-zinc-400 [&[data-hover=true]:not([data-active=true])]:bg-zinc-900 active:!bg-zinc-900",
          }}
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Card className="bg-[#2C2C2C] border border-[#545454]">
      <CardHeader className="flex justify-between items-center px-6 pt-4 pb-0">
        <Heading>Listagem de usuários</Heading>
        <TextInput
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<Search color="white" size={16} />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
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
                align={column.uid === "actions" ? "center" : "start"}
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
                  <TableCell>
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
  );
}
