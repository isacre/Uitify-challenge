import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import type React from "react";
import LoadingSpinner from "./loadingSpinner";
interface Props {
  columns: { name: string; sortable?: boolean }[];
  currentSort?: string | null;
  children: React.ReactNode | React.ReactNode[];
  maxHeight?: string;
  itemsCount: number;
  loading: boolean;
  setCurrentSort?: (sort: string | null) => void;
}
export default function TableComponent(props: Props) {
  const {
    columns,
    children,
    maxHeight = "max-h-[calc(100vh-9rem)]",
    currentSort,
    itemsCount,
    loading,
    setCurrentSort,
  } = props;

  function handleSorting(column: string) {
    if (!setCurrentSort) return;
    if (currentSort === null) {
      setCurrentSort(`${column}&desc`);
    }
    if (currentSort === `${column}&desc`) {
      setCurrentSort(`${column}&asc`);
    }
    if (currentSort === `${column}&asc`) {
      setCurrentSort(null);
    }
  }
  return (
    <div className={`flex flex-col ${maxHeight}`}>
      {loading && <LoadingSpinner />}
      {itemsCount === 0 && !loading && (
        <div className="flex justify-center items-center h-[calc(100vh-6rem)] w-full ">
          No Results
        </div>
      )}
      {itemsCount > 0 && !loading && (
        <Table className="border-separate border-spacing-0 [&_td]:border-border [&_th]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader className="sticky backdrop-blur-xs">
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead key={column.name}>
                  <div
                    onClick={() =>
                      column.sortable && handleSorting(column.name)
                    }
                    className={cn(
                      "flex items-center gap-2 cursor-pointer",
                      column.sortable ? "cursor-pointer" : "cursor-default"
                    )}
                  >
                    {column.name}
                    {currentSort?.includes(column.name) && (
                      <ChevronDownIcon
                        className={`w-4 h-4 ${
                          currentSort?.includes(`${column.name}&asc`)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {itemsCount === 0 ? (
              <TableRow>
                <div className="w-full text-center bg-red-50">No Results</div>
              </TableRow>
            ) : (
              children
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
