import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/shared/ui";
import { DeleteTrackDialog } from "./DeleteTrackDialog";
import { forwardRef } from "react";

interface Props {
  trackId: string;
  onCloseDialog: () => void;
}

export const DeleteTrackButton = forwardRef<HTMLButtonElement, Props>(({ trackId, onCloseDialog }, ref) => {
  const [open, setOpen] = useState(false);
  const handleDeleted = () => {
    setOpen(false);
    onCloseDialog();
  };
  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value === false) onCloseDialog();
  };
  return (
    <DeleteTrackDialog trackId={trackId} open={open} onOpenChange={handleOpenChange} onDeleted={handleDeleted}>
      <Button
        ref={ref}
        variant="ghost"
        className="w-full flex items-center gap-x-4"
        data-testid={`delete-track-${trackId}`}
      >
        <Trash2 className="shrink-0 text-destructive" />
        <span className="grow text-left text-destructive">Delete</span>
      </Button>
    </DeleteTrackDialog>
  );
});
