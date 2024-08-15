import { useContext } from "react";
import {
  PaginationContext,
  PaginationContextProps,
} from "../contexts/pagination.ctx";

export const usePagination = <T>(): PaginationContextProps<T> => {
  const context = useContext(
    PaginationContext as React.Context<PaginationContextProps<T>>
  );
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
