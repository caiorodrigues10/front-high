"use client";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface IPaginationTableContextData {
  rowsPerPage: number;
  setRowsPerPage: (value: SetStateAction<number>) => void;
  page: number;
  setPage: (value: SetStateAction<number>) => void;
}

const PaginationTableContext = createContext<IPaginationTableContextData>(
  {} as IPaginationTableContextData
);

interface IPaginationTableProviderProps {
  children: ReactNode;
}

const PaginationTableProvider = ({
  children,
}: IPaginationTableProviderProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);

  return (
    <PaginationTableContext.Provider
      value={{ rowsPerPage, setRowsPerPage, page, setPage }}
    >
      {children}
    </PaginationTableContext.Provider>
  );
};

const usePaginationTableContext = (): IPaginationTableContextData => {
  const context = useContext(PaginationTableContext);

  if (!context) {
    throw new Error(
      "usePaginationTableContext must be used within a PaginationTableProvider"
    );
  }

  return context;
};

export { PaginationTableProvider, usePaginationTableContext };
