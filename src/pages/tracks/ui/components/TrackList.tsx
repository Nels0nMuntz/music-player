import { useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  Header,
  flexRender,
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  PaginationState,
  RowSelectionState,
} from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import {
  Button,
  IndeterminateCheckbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { cn, formatDate, useDebounce } from "@/shared/lib";
import { Track } from "@/entities/track";
import { useGenresQuery } from "@/entities/genres";
import {
  DeleteFileButton,
  PlayTrackButton,
  TasksFilter,
  UploadTrackButton,
} from "@/features/tracks";
import {
  useSorting,
  useFilters,
  usePagination,
  useSearchText,
  useSettingsActions,
  useSelections,
} from "@/shared/model";
import { useTracksQuery } from "../../api/useTracksQuery";
import { TracksPagination } from "./TracksPagination";
import { ActionsMenu } from "./ActionsMenu";

type OnChangeFn<T> = (updaterOrValue: T | ((old: T) => T)) => void;

const filteringColumns = ["artist", "genres"];

export const TrackList = () => {
  const sorting = useSorting();
  const filters = useFilters();
  const pagination = usePagination();
  const searchText = useSearchText();
  const rowSelection = useSelections();
  const debouncedSearchText = useDebounce(searchText, 500);
  const { setSorting, setFilters, setPagination, setIsSearching, setSelections } =
    useSettingsActions();
  const { genresData = [], genresError, isLoadingGenres } = useGenresQuery();
  const { tracksData, tracksError, isLoadingTracks } = useTracksQuery({
    pagination,
    sorting: {
      sortBy: sorting[0]?.id,
      order: sorting[0]?.desc ? "desc" : "asc",
    },
    filters: {
      artist: filters.artist,
      genre: filters.genres,
    },
    search: debouncedSearchText,
    queryOptions: {
      placeholderData: (oldData) => oldData,
    },
  });

  const columns = useMemo<ColumnDef<Track>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: "",
        accessorKey: "play",
        enableSorting: false,
        cell: (info) => {
          if (!info.row.original.audioFile) {
            return <UploadTrackButton track={info.row.original} />;
          }
          return (
            <div className="flex gap-x-1.5">
              <PlayTrackButton track={info.row.original} />
              <DeleteFileButton trackId={info.row.original.id} />
            </div>
          );
        },
      },
      {
        header: "Title",
        accessorKey: "title",
        enableSorting: true,
      },
      {
        header: "Artist",
        accessorKey: "artist",
        enableSorting: true,
      },
      {
        header: "Album",
        accessorKey: "album",
        enableSorting: true,
      },
      {
        header: "Genres",
        accessorKey: "genres",
        enableSorting: false,
        cell: (info) => (
          <div className="max-w-48 whitespace-normal">{info.row.original.genres.join(", ")}</div>
        ),
      },
      {
        header: "Added",
        accessorKey: "createdAt",
        enableSorting: true,
        cell: (info) => <span>{formatDate(info.row.original.createdAt)}</span>,
      },
      {
        header: "",
        accessorKey: "more",
        cell: (info) => (
          <ActionsMenu track={info.row.original}>
            <Button size="icon" variant="ghost" className="cursor-pointer">
              <EllipsisVertical />
            </Button>
          </ActionsMenu>
        ),
      },
    ],
    [],
  );

  const handleSortingChange = useCallback<OnChangeFn<SortingState>>(
    (updaterOrValue) => {
      setSorting(typeof updaterOrValue === "function" ? updaterOrValue(sorting) : updaterOrValue);
    },
    [sorting, setSorting],
  );

  const handlePaginationChange = useCallback<OnChangeFn<PaginationState>>(
    (updaterOrValue) => {
      setPagination(
        typeof updaterOrValue === "function" ? updaterOrValue(pagination) : updaterOrValue,
      );
    },
    [pagination, setPagination],
  );

  const handleRowSelectionChange = useCallback<OnChangeFn<RowSelectionState>>(
    (updaterOrValue) => {
      setSelections(
        typeof updaterOrValue === "function" ? updaterOrValue(rowSelection) : updaterOrValue,
      );
    },
    [rowSelection, setSelections],
  );

  const table = useReactTable({
    data: tracksData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),

    // Sort configuration
    onSortingChange: handleSortingChange,
    enableMultiSort: false,
    manualSorting: true,
    sortDescFirst: true,

    // Row selection configuration
    onRowSelectionChange: handleRowSelectionChange,
    enableRowSelection: true,
    getRowId: (row) => row.id,

    // Pagination configuration
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: handlePaginationChange,
    rowCount: tracksData?.meta.total,
    pageCount: Math.ceil((tracksData?.meta.total || 0) / (tracksData?.meta.limit || 10)),
    manualPagination: true,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
  });

  useEffect(() => {
    if (searchText) {
      setSorting([]);
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      });
      setFilters({
        artist: "",
        genres: "",
      });
      setIsSearching(isLoadingTracks);
    } else {
      setIsSearching(false);
    }
  }, [searchText, isLoadingTracks]);

  const sortToggler = (header: Header<Track, unknown>) => {
    if (header.column.getCanSort()) {
      header.column.toggleSorting(undefined, true);
    }
  };

  if (tracksError) {
    toast.error(tracksError.message);
  }
  if (genresError) {
    toast.error(genresError.message);
  }

  const isLoading = isLoadingTracks || isLoadingGenres;

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-col gap-y-4 -ml-4 -mr-4">
      <Table className="border-separate border-spacing-x-0 border-spacing-y-3 px-4 pb-2">
        <TableHeader>
          {table.getHeaderGroups().map((header) => (
            <TableRow
              key={header.id}
              className="bg-white hover:bg-white shadow-table rounded-xl overflow-hidden"
            >
              {header.headers.map((header, index) => {
                const key = header.id;
                return (
                  <TableHead
                    key={key}
                    className={cn([
                      "py-2 border-y-2 border-primary first-of-type:border-l-2 last-of-type:border-r-2 first-of-type:rounded-tl-xl first-of-type:rounded-bl-xl last-of-type:rounded-tr-xl last-of-type:rounded-br-xl",
                      "nth-1:w-[5%] nth-1:min-w-[5%] nth-1:max-w-[5%]",
                      "nth-2:w-[5%] nth-2:min-w-[5%] nth-2:max-w-[5%]",
                      "nth-3:w-[25%] nth-3:min-w-[25%] nth-3:max-w-[25%]",
                      "nth-4:w-[20%] nth-4:min-w-[20%] nth-4:max-w-[20%]",
                      "nth-5:w-[15%] nth-5:min-w-[15%] nth-5:max-w-[15%]",
                      "nth-6:w-[15%] nth-6:min-w-[15%] nth-6:max-w-[15%]",
                      "nth-7:w-[10%] nth-7:min-w-[10%] nth-7:max-w-[10%]",
                      "nth-8:w-[5%] nth-8:min-w-[5%] nth-8:max-w-[5%]",
                    ])}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center gap-x-0.5 select-none",
                          index === 0 && "justify-center",
                        )}
                      >
                        {filteringColumns.includes(key) && (
                          <TasksFilter
                            filter={filters[key as keyof typeof filters]}
                            title={`Filter by ${key}`}
                            options={key === "genres" ? genresData : []}
                            onChange={(value) => {
                              setFilters({ ...filters, [key as keyof typeof filters]: value });
                              setSorting([]);
                              setPagination({
                                pageIndex: 0,
                                pageSize: 10,
                              });
                            }}
                          />
                        )}
                        <div
                          onClick={() => sortToggler(header)}
                          className="flex items-center gap-x-2 hover:cursor-pointer group/sort"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === "asc" ||
                            (header.column.getIsSorted() === "desc" && (
                              <span className="text-xs">
                                {header.column.getIsSorted() === "asc" && " ↑"}
                                {header.column.getIsSorted() === "desc" && " ↓"}
                              </span>
                            ))}
                          {header.column.getCanSort() && !header.column.getIsSorted() && (
                            <span className="text-xs text-muted-foreground opacity-0 group-hover/sort:opacity-100 transition-opacity">
                              ↑↓
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="bg-white hover:bg-white shadow-table rounded-xl overflow-hidden"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn([
                    "py-2 first-of-type:rounded-tl-xl first-of-type:rounded-bl-xl last-of-type:rounded-tr-xl last-of-type:rounded-br-xl",
                    "nth-1:w-[5%] nth-1:min-w-[5%] nth-1:max-w-[5%]",
                    "nth-2:w-[5%] nth-2:min-w-[5%] nth-2:max-w-[5%]",
                    "nth-3:w-[25%] nth-3:min-w-[25%] nth-3:max-w-[25%]",
                    "nth-4:w-[20%] nth-4:min-w-[20%] nth-4:max-w-[20%]",
                    "nth-5:w-[15%] nth-5:min-w-[15%] nth-5:max-w-[15%]",
                    "nth-6:w-[15%] nth-6:min-w-[15%] nth-6:max-w-[15%]",
                    "nth-7:w-[10%] nth-7:min-w-[10%] nth-7:max-w-[10%]",
                    "nth-8:w-[5%] nth-8:min-w-[5%] nth-8:max-w-[5%]",
                  ])}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TracksPagination table={table} />
      {!table.getRowCount() && <div className="text-center">No data found</div>}
    </div>
  );
};
