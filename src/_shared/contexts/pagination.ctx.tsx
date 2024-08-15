import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface PaginationContextProps<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  paginatedItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setTotalPages: (total: number) => void;
  setItems: (items: T[]) => void;
  canNextPage: () => boolean;
  canPrevPage: () => boolean;
}

export const PaginationContext = createContext<
  PaginationContextProps<any> | undefined
>(undefined);

interface PaginationProviderProps<T> {
  children: ReactNode;
  items: T[];
  itemsPerPage: number;
  initialPage?: number;
}

export const PaginationProvider = <T,>({
  children,
  items,
  itemsPerPage,
  initialPage = 1,
}: PaginationProviderProps<T>) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [paginatedItems, setPaginatedItems] = useState<T[]>([]);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const updatePaginatedItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedItems(items.slice(start, end));
  };

  const canNextPage = () => currentPage < totalPages;
  const canPrevPage = () => currentPage > 1;

  useEffect(() => {
    updatePaginatedItems();
  }, [currentPage, items]);

  const value = {
    items,
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
    setItems: (newItems: T[]) => {
      setCurrentPage(1);
      setPaginatedItems(newItems.slice(0, itemsPerPage));
    },
    setTotalPages: (total: number) => {
      setCurrentPage(1);
      setPaginatedItems(items.slice(0, itemsPerPage));
    },
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
