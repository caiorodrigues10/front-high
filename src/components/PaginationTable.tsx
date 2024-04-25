import { usePaginationTableContext } from "@/context/PaginationTableContext";
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect } from "react";

export function PaginationTable({ count }: { count: number }) {
  const { page, setPage, setRowsPerPage, rowsPerPage } =
    usePaginationTableContext();
  const { push } = useRouter();
  const pathname = usePathname();
  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
      push(
        pathname + "?page=" + (page - 1) + "&limit=" + Number(e.target.value)
      );
    },
    [push, pathname, page, setPage, setRowsPerPage]
  );

  const onChangePage = useCallback(
    (e: number) => {
      setPage(e);
      push(pathname + "?page=" + (e - 1) + "&limit=" + rowsPerPage);
    },
    [rowsPerPage, pathname, push, setPage]
  );

  useEffect(() => {
    push(pathname + "?page=" + (page - 1) + "&limit=" + rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <div className="flex items-center justify-between px-4">
      <label className="flex items-center text-default-400 text-small">
        Itens por página:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          onChange={onRowsPerPageChange}
        >
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </label>
      <span className="text-default-400 text-small">
        Total {count} de usuário{count > 1 && "s"}
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
        total={totalPages}
        onChange={onChangePage}
      />
    </div>
  );
}
