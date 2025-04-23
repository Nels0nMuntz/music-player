import { Skeleton } from "@/shared/ui";

export default function TableSkeleton() {
  const rows = Array.from({ length: 5 });

  return (
    <div className="p-4" data-testid="loading-tracks" data-loading="true">
      <div className="rounded-2xl border border-gray-200 shadow-md overflow-hidden">
        <div className="grid grid-cols-6 items-center gap-4 p-4 bg-muted text-muted-foreground font-semibold">
          <Skeleton className="h-6 w-6 rounded-full" />
          <div className="col-span-1 text-sm">Title</div>
          <div className="col-span-1 text-sm flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            Artist
          </div>
          <div className="col-span-1 text-sm">Album</div>
          <div className="col-span-1 text-sm flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            Genres
          </div>
          <div className="col-span-1 text-sm">Added</div>
        </div>
        {rows.map((_, i) => (
          <div key={i} className="grid grid-cols-6 items-center gap-4 p-4 border-t border-gray-100">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="col-span-1">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="col-span-1">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="col-span-1">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="col-span-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="col-span-1">
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
