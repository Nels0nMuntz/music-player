import { useCallback, useEffect, useMemo } from "react";
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
import { cn, formatDate } from "@/shared/lib";
import { Track } from "@/entities/track";
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
  useSettingsActions,
  useSelections,
  usePlaylistActions,
} from "@/shared/model";
import { TracksPagination } from "./TracksPagination";
import { ActionsMenu } from "./ActionsMenu";
import TableSkeleton from "./TrackListSkeleton";
import { useTracksData } from "../../lib/useTracksData";

type OnChangeFn<T> = (updaterOrValue: T | ((old: T) => T)) => void;

const filteringColumns = ["artist", "genres"];

export const TrackList = () => {
  const sorting = useSorting();
  const filters = useFilters();
  const pagination = usePagination();
  const rowSelection = useSelections();
  const { genresData, tracksData, isLoading } = useTracksData();
  const { setSorting, setFilters, setPagination, setSelections } = useSettingsActions();
  const { setTracks, setCurrentTrackIndex, setIsInitialized } = usePlaylistActions();

  useEffect(() => {
    if (tracksData?.data) {
      setTracks(tracksData.data);
      setCurrentTrackIndex(-1);
      setIsInitialized(true);
    }
  }, [tracksData]);

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
              testId: "select-all",
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
                testId: `track-checkbox-${row.id}`,
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
          // console.log({original: info.row.original});
          if (!info.row.original.audioFile) {
            return <UploadTrackButton track={info.row.original} />;
          }
          
          return (
            <div className="flex gap-x-1.5" data-testid={`audio-player-${info.row.original.id}`}>
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
        cell: (info) => (
          <span data-testid={`track-item-${info.row.original.id}-title`}>
            {info.row.original.title}
          </span>
        ),
      },
      {
        header: "Artist",
        accessorKey: "artist",
        enableSorting: true,
        cell: (info) => (
          <span data-testid={`track-item-${info.row.original.id}-artist`}>
            {info.row.original.artist}
          </span>
        ),
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
    rowCount: tracksData?.meta?.total || 0,
    pageCount: Math.ceil((tracksData?.meta?.total || 0) / (tracksData?.meta?.limit || 10)),
    manualPagination: true,

    state: {
      sorting,
      pagination,
      rowSelection,
    },
  });

  const toggleSort = (header: Header<Track, unknown>) => {
    if (header.column.getCanSort()) {
      header.column.toggleSorting(undefined, true);
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="flex flex-col gap-y-4 -ml-4 -mr-4" aria-disabled={isLoading ? "true" : "false"}>
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
                            testId={key === "genres" ? "filter-genre" : "filter-artist"}
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
                        <button
                          onClick={() => toggleSort(header)}
                          className="flex items-center gap-x-2 hover:cursor-pointer group/sort"
                          data-testid="sort-select"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted()
                            ? header.column.getIsSorted() === "asc"
                              ? " ↓"
                              : " ↑"
                            : null}
                          {header.column.getCanSort() && !header.column.getIsSorted() && (
                            <span className="text-xs text-muted-foreground opacity-0 group-hover/sort:opacity-100 transition-opacity">
                              ↑↓
                            </span>
                          )}
                        </button>
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
              data-testid={`track-item-${row.id}`}
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
