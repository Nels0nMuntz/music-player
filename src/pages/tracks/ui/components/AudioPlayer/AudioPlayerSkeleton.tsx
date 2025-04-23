import { Skeleton } from "@/shared/ui";

export const AudioPlayerSkeleton = () => {
  return (
    <section
      className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 rounded-4xl shadow-player border-2 border-primary"
      data-testid="loading-indicator"
      data-loading="true"
    >
      <div className="mt-4">
        <Skeleton className="w-32 h-32 rounded-xl" />
      </div>

      <Skeleton className="h-6 w-40 mt-4" />
      <Skeleton className="h-4 w-24 mt-2" />

      <div className="flex items-center gap-x-6 mt-6">
        <Skeleton className="h-7 w-7 rounded-full" />
        <Skeleton className="h-14 w-14 rounded-full" />
        <Skeleton className="h-7 w-7 rounded-full" />
      </div>
    </section>
  );
};
