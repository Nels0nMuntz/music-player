import { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui";
import { Track } from "@/entities/track";

interface Props {
  table: Table<Track>;
}

export const TracksPagination: React.FC<Props> = ({ table }) => {
  if (!table.getRowCount() || table.getPageCount() === 1) return null;
  return (
    <Pagination className="w-min mx-0 ml-auto px-4" data-testid="pagination">
      <PaginationContent>
        <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
          <PaginationPrevious onClick={() => table.previousPage()} data-testid="pagination-prev"/>
        </PaginationItem>
        {table.getState().pagination.pageIndex + 1 >= 4 && (
          <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
            <PaginationLink onClick={() => table.setPageIndex(0)}>1</PaginationLink>
          </PaginationItem>
        )}
        {table.getState().pagination.pageIndex + 1 >= 5 && (
          <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {/* 2 pages before */}
        {table.getState().pagination.pageIndex + 1 - 2 > 0 && (
          <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
            <PaginationLink
              onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 2)}
            >
              {table.getState().pagination.pageIndex + 1 - 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {/* 1 page before */}
        {table.getState().pagination.pageIndex + 1 - 1 > 0 && (
          <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
            <PaginationLink
              onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
            >
              {table.getState().pagination.pageIndex + 1 - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {/* Current page */}
        <PaginationItem className="bg-violet-100 rounded-md">
          <PaginationLink>{table.getState().pagination.pageIndex + 1}</PaginationLink>
        </PaginationItem>
        {/* 1 page after */}
        {table.getState().pagination.pageIndex + 1 + 1 <= table?.getPageCount() && (
          <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
            <PaginationLink
              onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
            >
              {table.getState().pagination.pageIndex + 1 + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {/* 2 page after */}
        {table.getState().pagination.pageIndex + 1 + 2 <= table?.getPageCount() && (
          <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
            <PaginationLink
              onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 2)}
            >
              {table.getState().pagination.pageIndex + 1 + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {table.getState().pagination.pageIndex + 1 + 2 < table?.getPageCount() - 1 && (
          <PaginationItem className="bg-violet-300 rounded-md">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {table.getState().pagination.pageIndex + 1 + 2 < table?.getPageCount() && (
          <>
            <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
              <PaginationLink onClick={() => table.setPageIndex(table?.getPageCount())}>
                {table?.getPageCount()}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem className="bg-violet-300 rounded-md hover:cursor-pointer">
          <PaginationNext onClick={() => table.nextPage()} data-testid="pagination-next"/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
