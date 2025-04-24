import { useEffect, useRef, useState } from "react";
import { Spinner } from "./Spinner";
import { cn } from "@/shared/lib";

interface Props {
  open: boolean;
}

export const LoadingIndicator: React.FC<Props> = ({ open }) => {
  const [isExpired, setIsExpired] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (open) {
      setIsExpired(false);

      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setIsExpired(true);
      }, 500);
    }
  }, [open]);
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-screen z-10 bg-background flex items-center justify-center transition-opacity duration-300 ease-in-out",
        !isExpired
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none",
      )}
      data-loading={open ? "true" : "false"}
      data-testid="loading-indicator"
    >
      <Spinner size="large" className="text-primary" />
    </div>
  );
};
